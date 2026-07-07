// js/cloud-sync.js
// -----------------------------------------------------------------------------
// Lớp đồng bộ dữ liệu với Supabase, KHÔNG đụng vào logic bên trong app.js.
//
// Cách hoạt động (local-first, đồng bộ nền):
//   1) Khi đăng nhập xong -> pullFromCloud(userId): tải toàn bộ dữ liệu của
//      user đó từ bảng `user_app_data`, ghi thẳng vào localStorage với đúng
//      các key mà app.js / hoadon.js đã và đang dùng (products, orders,...).
//      -> app.js không cần biết Supabase tồn tại, vẫn đọc localStorage như cũ.
//   2) enableAutoPush(userId): "chèn" (patch) hàm localStorage.setItem để mỗi
//      khi app.js lưu 1 trong các key nói trên, dữ liệu cũng được tự động
//      đẩy (upsert) lên Supabase sau một khoảng debounce ngắn.
//
// Yêu cầu bảng Supabase (xem README.md để lấy SQL đầy đủ):
//   user_app_data(user_id uuid, data_key text, data_value jsonb, updated_at)
//   khóa chính (user_id, data_key) + RLS chỉ cho phép user thao tác dữ liệu
//   của chính mình.
// -----------------------------------------------------------------------------

const CloudSync = (function () {
    const TRACKED_KEYS = [
        'products',
        'orders',
        'customers',
        'debts_v2',
        'payments_v2',
        'financialTransactions',
        'invoiceSettings'
    ];

    let currentUserId = null;
    let autoPushEnabled = false;
    const pushTimers = {};

    // Ghi vào localStorage bằng hàm gốc của trình duyệt (Storage.prototype),
    // để không tự kích hoạt việc đẩy ngược lên cloud ngay sau khi vừa tải về.
    function rawSetItem(key, value) {
        Storage.prototype.setItem.call(localStorage, key, value);
    }

    async function pullFromCloud(userId) {
        currentUserId = userId;
        const { data, error } = await sb
            .from('user_app_data')
            .select('data_key, data_value')
            .eq('user_id', userId);

        if (error) {
            console.error('[CloudSync] Lỗi khi tải dữ liệu từ Supabase:', error.message);
            throw error;
        }

        const map = {};
        (data || []).forEach(row => { map[row.data_key] = row.data_value; });

        TRACKED_KEYS.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                // data_value là jsonb -> supabase-js trả về sẵn dạng object/array JS.
                rawSetItem(key, JSON.stringify(map[key]));
            }
            // Nếu user mới, chưa có dữ liệu trên cloud cho key này -> giữ nguyên
            // localStorage hiện tại (thường là rỗng), app.js sẽ tự khởi tạo mảng rỗng.
        });
    }

    function pushKeyToCloud(key, rawValue) {
        if (!currentUserId) return;
        let parsedValue;
        try {
            parsedValue = JSON.parse(rawValue);
        } catch (err) {
            parsedValue = rawValue; // phòng trường hợp giá trị không phải JSON hợp lệ
        }

        sb.from('user_app_data')
            .upsert(
                {
                    user_id: currentUserId,
                    data_key: key,
                    data_value: parsedValue,
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'user_id,data_key' }
            )
            .then(({ error }) => {
                if (error) console.error(`[CloudSync] Lỗi đồng bộ "${key}" lên Supabase:`, error.message);
            });
    }

    function enableAutoPush(userId) {
        currentUserId = userId;
        if (autoPushEnabled) return; // đã patch localStorage.setItem rồi thì thôi
        autoPushEnabled = true;

        const originalSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function (key, value) {
            originalSetItem(key, value);
            if (TRACKED_KEYS.includes(key)) {
                clearTimeout(pushTimers[key]);
                // Debounce 600ms: nếu 1 hành động lưu gọi setItem nhiều lần liên
                // tiếp (hiếm khi xảy ra) thì chỉ đẩy lên cloud 1 lần cuối cùng.
                pushTimers[key] = setTimeout(() => pushKeyToCloud(key, value), 600);
            }
        };
    }

    function disableAutoPush() {
        currentUserId = null;
    }

    return { pullFromCloud, enableAutoPush, disableAutoPush, TRACKED_KEYS };
})();
