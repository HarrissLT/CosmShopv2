// js/backup.js
// -----------------------------------------------------------------------------
// TÍNH NĂNG MỚI: Sao lưu / Khôi phục toàn bộ dữ liệu.
//
// Vì toàn bộ dữ liệu của app đang chỉ nằm trong localStorage của trình duyệt,
// nếu người dùng xóa cache, đổi máy, hoặc đổi trình duyệt là MẤT SẠCH dữ liệu.
// File này thêm 2 nút ở header:
//   - "Sao Lưu Dữ Liệu": gom toàn bộ dữ liệu thành 1 file .json để tải về máy.
//   - "Khôi Phục": chọn lại file .json đó để phục hồi dữ liệu (có xác nhận).
//
// Không đụng vào app.js / hoadon.js, hoàn toàn độc lập, an toàn khi thêm vào.
// -----------------------------------------------------------------------------

(function () {
    // Đúng với các key localStorage đang được app.js / hoadon.js sử dụng.
    const BACKUP_KEYS = [
        'products',
        'orders',
        'customers',
        'debts_v2',
        'payments_v2',
        'financialTransactions',
        'invoiceSettings'
    ];

    const BACKUP_MARKER = '__cosmshop_backup__';

    function pad(n) { return String(n).padStart(2, '0'); }

    function buildFileName() {
        const d = new Date();
        return `cosmshop-backup-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.json`;
    }

    // Toast tối giản, dùng chung khung #toastNotification có sẵn trong index.html
    function showBackupToast(message, type = 'success') {
        const toastEl = document.getElementById('toastNotification');
        const msgEl = document.getElementById('toastMessage');
        const iconEl = document.getElementById('toastIcon');
        if (!toastEl || !msgEl) { alert(message); return; }

        toastEl.classList.remove('success', 'error', 'warning', 'info', 'show', 'hide');
        msgEl.textContent = message;
        toastEl.classList.add(type);
        if (iconEl) {
            iconEl.className = type === 'success' ? 'fas fa-check-circle toast-icon'
                : type === 'error' ? 'fas fa-times-circle toast-icon'
                : 'fas fa-info-circle toast-icon';
        }
        requestAnimationFrame(() => toastEl.classList.add('show'));
        setTimeout(() => toastEl.classList.add('hide'), 2700);
        setTimeout(() => toastEl.classList.remove('show', 'hide'), 3000);
    }

    function exportBackup() {
        const data = {};
        BACKUP_KEYS.forEach(key => {
            const raw = localStorage.getItem(key);
            if (raw !== null) data[key] = raw; // giữ nguyên chuỗi gốc, không parse lại
        });

        const payload = {
            [BACKUP_MARKER]: true,
            exportedAt: new Date().toISOString(),
            appVersion: 1,
            data
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = buildFileName();
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        showBackupToast('Đã tải file sao lưu dữ liệu về máy.', 'success');
    }

    function restoreBackup(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let parsed;
            try {
                parsed = JSON.parse(e.target.result);
            } catch (err) {
                showBackupToast('File không hợp lệ (không phải JSON).', 'error');
                return;
            }

            if (!parsed || parsed[BACKUP_MARKER] !== true || typeof parsed.data !== 'object') {
                showBackupToast('File này không phải file sao lưu của CosmShop.', 'error');
                return;
            }

            const confirmed = window.confirm(
                'Khôi phục sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại (sản phẩm, đơn hàng, khách hàng, sổ nợ, tài chính) bằng dữ liệu trong file sao lưu.\n\nBạn có chắc chắn muốn tiếp tục?'
            );
            if (!confirmed) return;

            BACKUP_KEYS.forEach(key => {
                if (Object.prototype.hasOwnProperty.call(parsed.data, key)) {
                    localStorage.setItem(key, parsed.data[key]);
                }
            });

            showBackupToast('Khôi phục thành công! Đang tải lại trang...', 'success');
            setTimeout(() => window.location.reload(), 1200);
        };
        reader.onerror = () => showBackupToast('Không đọc được file đã chọn.', 'error');
        reader.readAsText(file);
    }

    function initBackupFeature() {
        const exportBtn = document.getElementById('exportBackupBtn');
        const importBtn = document.getElementById('importBackupBtn');
        const fileInput = document.getElementById('restoreBackupFile');
        if (!exportBtn || !importBtn || !fileInput) return; // header chưa có nút -> bỏ qua an toàn

        exportBtn.addEventListener('click', exportBackup);
        importBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) restoreBackup(file);
            fileInput.value = ''; // cho phép chọn lại cùng 1 file lần sau
        });
    }

    initBackupFeature();
})();
