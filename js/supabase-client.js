// js/supabase-client.js
// -----------------------------------------------------------------------------
// Khởi tạo Supabase client dùng chung cho cả app. Đặt ở window.sb (không dùng
// tên "supabase" để khỏi đè lên biến toàn cục "supabase" mà thư viện
// supabase-js (bản UMD) đã tạo sẵn).
// -----------------------------------------------------------------------------

if (typeof supabase === 'undefined') {
    console.error('[Supabase] Không tải được thư viện supabase-js. Kiểm tra kết nối mạng hoặc CDN.');
}

if (typeof SUPABASE_URL === 'undefined' || SUPABASE_URL.includes('YOUR-PROJECT-REF')) {
    console.warn('[Supabase] Bạn chưa cấu hình SUPABASE_URL / SUPABASE_ANON_KEY trong js/supabase-config.js');
}

window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
