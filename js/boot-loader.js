// js/boot-loader.js
// -----------------------------------------------------------------------------
// Vì app.js đọc DOM của các modal (document.getElementById('productModal'), ...)
// ngay khi khởi động, ta PHẢI nạp xong toàn bộ HTML modal vào #modalsRoot
// *trước khi* app.js chạy. File này làm đúng việc đó:
//   1) fetch() từng modal partial trong /modals/ (song song, giữ đúng thứ tự chèn)
//   2) chèn vào <div id="modalsRoot"></div>
//   3) sau đó mới nạp hoadon.js -> app.js -> backup.js (đúng thứ tự, không async)
//
// Nếu bạn thêm modal mới: tạo file trong /modals/, rồi thêm tên file vào mảng
// MODAL_FILES bên dưới. Không cần sửa gì khác.
// -----------------------------------------------------------------------------

const MODAL_FILES = [
    'modals/product-modal.html',
    'modals/order-modal.html',
    'modals/customer-modal.html',
    'modals/new-debt-modal.html',
    'modals/finance-transaction-modal.html'
];

// Nạp 1 file <script> và trả về Promise khi nó chạy xong.
// async = false để đảm bảo thứ tự thực thi giống hệt <script> tĩnh.
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = () => resolve(src);
        s.onerror = () => reject(new Error('Không tải được script: ' + src));
        document.body.appendChild(s);
    });
}

async function bootApp() {
    if (window.__appAlreadyBooted) return; // tránh nạp app 2 lần
    window.__appAlreadyBooted = true;

    const modalsRoot = document.getElementById('modalsRoot');

    try {
        // Tải song song để nhanh, nhưng chèn vào DOM đúng thứ tự ban đầu
        const htmlParts = await Promise.all(
            MODAL_FILES.map(path => fetch(path).then(res => {
                if (!res.ok) throw new Error('Không tải được modal: ' + path);
                return res.text();
            }))
        );
        modalsRoot.innerHTML = htmlParts.join('\n');
    } catch (err) {
        console.error('[boot-loader] Lỗi khi nạp modal:', err);
        // Vẫn tiếp tục nạp app để phần còn lại của trang không bị treo trắng,
        // nhưng các chức năng liên quan tới modal sẽ không hoạt động.
    }

    // Modal đã có trong DOM -> giờ mới nạp logic (thứ tự bắt buộc: hoadon -> app -> backup)
    await loadScript('js/hoadon.js');
    await loadScript('js/app.js');
    await loadScript('js/backup.js');
}

// GHI CHÚ: trước đây file này tự chạy ngay (bootApp()). Từ khi thêm đăng
// nhập Supabase, ta CHỈ được nạp app SAU KHI người dùng đăng nhập thành công
// và dữ liệu đã được kéo về từ cloud (xem js/auth.js). Vì vậy hàm này giờ
// chỉ được export ra window, và js/auth.js sẽ là nơi gọi nó.
window.__bootMainApp = bootApp;
