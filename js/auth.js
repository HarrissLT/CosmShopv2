// js/auth.js
// -----------------------------------------------------------------------------
// Xử lý màn hình Đăng Nhập / Đăng Ký (#authScreen) bằng Supabase Auth.
// Sau khi xác thực thành công: kéo dữ liệu về (CloudSync.pullFromCloud),
// bật đồng bộ nền (CloudSync.enableAutoPush), rồi mới nạp phần còn lại của
// app (window.__bootMainApp, xem js/boot-loader.js).
// -----------------------------------------------------------------------------

(function () {
    const authScreen = document.getElementById('authScreen');
    const appContainer = document.getElementById('appContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authMessage = document.getElementById('authMessage');
    const authLoading = document.getElementById('authLoading');
    const tabBtns = document.querySelectorAll('.auth-tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            const targetForm = document.getElementById(btn.dataset.tab + 'Form');
            if (targetForm) targetForm.classList.add('active');
            clearMessage();
        });
    });

    function setLoading(isLoading) {
        authLoading.style.display = isLoading ? 'flex' : 'none';
        [...loginForm.querySelectorAll('input,button'), ...registerForm.querySelectorAll('input,button')]
            .forEach(el => { el.disabled = isLoading; });
    }

    function showMessage(msg, type) {
        authMessage.textContent = msg;
        authMessage.className = 'auth-message ' + (type || 'error');
    }

    function clearMessage() {
        authMessage.textContent = '';
        authMessage.className = 'auth-message';
    }

    function translateAuthError(msg) {
        if (!msg) return 'Có lỗi xảy ra, vui lòng thử lại.';
        if (msg.includes('Invalid login credentials')) return 'Email hoặc mật khẩu không đúng.';
        if (msg.includes('already registered') || msg.includes('already been registered')) return 'Email này đã được đăng ký, hãy đăng nhập.';
        if (msg.includes('Password should be at least')) return 'Mật khẩu quá ngắn (tối thiểu 6 ký tự).';
        if (msg.includes('Unable to validate email')) return 'Email không hợp lệ.';
        if (msg.includes('rate limit')) return 'Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.';
        return msg;
    }

    async function onAuthenticated(user) {
        authScreen.style.display = 'none';
        appContainer.classList.remove('app-hidden');

        try {
            await CloudSync.pullFromCloud(user.id);
        } catch (err) {
            // Không chặn người dùng nếu tải cloud lỗi (vd mất mạng tạm thời) -
            // vẫn cho vào app với dữ liệu cục bộ hiện có, để không "khóa" người dùng ngoài app.
            console.error('[Auth] Lỗi tải dữ liệu từ Supabase:', err);
        }
        CloudSync.enableAutoPush(user.id);

        if (typeof window.__bootMainApp === 'function') {
            window.__bootMainApp();
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessage();
        setLoading(true);
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) { showMessage(translateAuthError(error.message)); return; }
        onAuthenticated(data.user);
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessage();
        const p1 = document.getElementById('registerPassword').value;
        const p2 = document.getElementById('registerPasswordConfirm').value;
        if (p1 !== p2) { showMessage('Mật khẩu nhập lại không khớp.'); return; }

        setLoading(true);
        const email = document.getElementById('registerEmail').value.trim();
        const { data, error } = await sb.auth.signUp({ email, password: p1 });
        setLoading(false);

        if (error) { showMessage(translateAuthError(error.message)); return; }

        if (data.session) {
            // Dự án Supabase của bạn đang tắt "Confirm email" -> vào thẳng app
            onAuthenticated(data.user);
        } else {
            showMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản, sau đó quay lại đăng nhập.', 'success');
        }
    });

    // Đăng xuất (nút nằm ở header, chỉ hiện sau khi đã vào app)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#logoutBtn')) {
            sb.auth.signOut().then(() => window.location.reload());
        }
    });

    // Nếu đã có phiên đăng nhập từ trước (chưa đăng xuất) -> vào thẳng app, khỏi hỏi lại
    (async function checkExistingSession() {
        const { data } = await sb.auth.getSession();
        if (data && data.session && data.session.user) {
            onAuthenticated(data.session.user);
        }
    })();
})();
