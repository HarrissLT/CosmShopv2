# CosmShop v1 — Bản Nâng Cấp Cấu Trúc

Bản này giữ **100% logic nghiệp vụ gốc**, chỉ tổ chức lại file cho gọn, tách
modal ra riêng, tách CSS theo chức năng, và bổ sung 1 tính năng mới:
**Sao lưu / Khôi phục dữ liệu**.

## Vì sao phải chạy qua server, không mở trực tiếp file:// ?

Modal giờ được nạp bằng `fetch()` (xem `js/boot-loader.js`), mà trình duyệt
chặn `fetch()` với giao thức `file://` vì lý do bảo mật (CORS). Vì vậy bạn
cần chạy qua 1 local server đơn giản, ví dụ:

```bash
# Cách 1: dùng Python (có sẵn trên hầu hết máy)
python3 -m http.server 8000
# rồi mở http://localhost:8000

# Cách 2: dùng VS Code + extension "Live Server"
# Cách 3: dùng Node: npx serve .
```

## Cấu trúc thư mục

```
CosmShopv1-upgraded/
├── index.html                  # Khung trang chính (không còn chứa modal)
├── css/
│   ├── base.css                # Biến màu, layout chung, form cơ bản
│   ├── order-customer.css      # Card đơn hàng + tìm kiếm trong modal đơn hàng + card/tab khách hàng
│   ├── debt.css                 # Toàn bộ giao diện Sổ Nợ
│   ├── finance-dashboard.css   # Tài chính + Dashboard
│   ├── reports-invoice.css     # Báo cáo + khu vực tùy biến hóa đơn
│   ├── toast-fullscreen.css    # Layout hóa đơn tùy biến, toast, xem hóa đơn toàn màn hình
│   ├── responsive-print.css    # Responsive + in ấn
│   ├── backup-feature.css      # (MỚI) style cho nút Sao lưu/Khôi phục ở header
│   └── auth.css                # (MỚI) style màn hình Đăng nhập / Đăng ký
├── js/
│   ├── supabase-config.js      # (MỚI) ⚠️ Bạn cần dán URL + anon key vào đây
│   ├── supabase-client.js      # (MỚI) khởi tạo Supabase client
│   ├── cloud-sync.js           # (MỚI) đồng bộ dữ liệu 2 chiều với Supabase
│   ├── boot-loader.js          # nạp modal + nạp các script theo đúng thứ tự (gọi bởi auth.js)
│   ├── auth.js                 # (MỚI) đăng nhập / đăng ký / đăng xuất
│   ├── hoadon.js               # Module hóa đơn (giữ nguyên, không đổi 1 dòng)
│   ├── app.js                  # Logic chính (giữ nguyên logic, chỉ đổi cách khởi động)
│   └── backup.js               # tính năng Sao lưu / Khôi phục dữ liệu ra file JSON (thủ công)
├── modals/
│   ├── product-modal.html      # Tách từ index.html gốc, dòng 810-911
│   ├── order-modal.html        # dòng 913-1069
│   ├── customer-modal.html     # dòng 1071-1185
│   ├── new-debt-modal.html     # dòng 1187-1265
│   └── finance-transaction-modal.html  # dòng 1267-1309
└── legacy/
    └── sono.js                 # File cũ KHÔNG được index.html gọi tới nữa
                                  # (đã bị thay bằng logic debts_v2 trong app.js).
                                  # Giữ lại để tham khảo, không ảnh hưởng app.
```

## Những gì đã thay đổi so với bản gốc

1. **Tách 5 modal** ra `modals/*.html`, nạp động lúc chạy bằng
   `js/boot-loader.js` — thay vì nằm cứng trong `index.html`.
   → `index.html` gọn hơn ~500 dòng, mỗi modal có file riêng dễ sửa/dễ review.
2. **Tách `style.css`** (2614 dòng) thành 7 file theo đúng ranh giới comment
   đã có sẵn trong file gốc — thứ tự `<link>` giữ nguyên nên **kết quả hiển
   thị y hệt bản gốc**, không có rủi ro vỡ giao diện.
3. **`app.js` và `hoadon.js` giữ nguyên toàn bộ logic.** Chỉ có 1 thay đổi kỹ
   thuật bắt buộc: `app.js` trước đây chạy trong
   `document.addEventListener('DOMContentLoaded', ...)`, giờ đổi thành hàm
   tự gọi `(function(){...})()` vì file này giờ được nạp *sau khi* DOM đã
   sẵn sàng (do phải chờ modal fetch xong) — nạp theo kiểu cũ sẽ không bao
   giờ chạy vì sự kiện `DOMContentLoaded` đã trôi qua trước đó.
4. **Tính năng mới: Sao lưu / Khôi phục dữ liệu** (`js/backup.js`) — 2 nút
   ở góc header:
   - **Sao Lưu Dữ Liệu**: xuất toàn bộ `products`, `orders`, `customers`,
     `debts_v2`, `payments_v2`, `financialTransactions`, `invoiceSettings`
     ra 1 file `.json` tải về máy.
   - **Khôi Phục**: chọn lại file `.json` đó để phục hồi (có hộp thoại xác
     nhận vì thao tác này ghi đè dữ liệu hiện tại).
   - Đây là tính năng **quan trọng nhất nên dùng ngay**, vì hiện tại toàn bộ
     dữ liệu chỉ nằm trong `localStorage` của trình duyệt — xóa cache hoặc
     đổi máy là mất hết nếu không sao lưu.

## Thêm modal mới trong tương lai

1. Tạo file `modals/ten-modal-moi.html`.
2. Thêm đường dẫn đó vào mảng `MODAL_FILES` trong `js/boot-loader.js`.
3. Viết logic xử lý modal trong `app.js` như bình thường — không cần sửa gì khác.

## Việc chưa làm (gợi ý bước tiếp theo)

`app.js` (~2300 dòng) hiện vẫn là 1 khối logic lớn duy nhất — bản này mới
tách phần **modal/CSS** theo đúng yêu cầu, chưa tách tiếp `app.js` thành các
module nhỏ hơn (product/order/customer/debt/finance) vì việc đó cần rà từng
hàm phụ thuộc lẫn nhau để tránh vỡ chức năng, nên làm dần từng phần một thay
vì làm 1 lần cho cả 2300 dòng. Có thể làm tiếp nếu bạn muốn, bắt đầu từ 1 khu
vực (ví dụ Sản phẩm) để giữ an toàn.

---

## 🔐 Đăng nhập / Đăng ký + Lưu dữ liệu theo tài khoản trên Supabase (MỚI)

### Cách hoạt động

- `app.js` **không hề bị sửa logic đọc/ghi dữ liệu** — nó vẫn đọc/ghi
  `localStorage` y hệt trước giờ. Cái mới là 1 lớp đồng bộ nền
  (`js/cloud-sync.js`) đứng giữa `localStorage` và Supabase:
  1. **Lúc đăng nhập**: tải toàn bộ dữ liệu của tài khoản đó từ Supabase,
     ghi thẳng vào `localStorage` → app chạy như cũ, không biết gì về cloud.
  2. **Trong lúc dùng app**: mỗi khi app lưu dữ liệu (gọi `localStorage.setItem`),
     lớp đồng bộ tự động đẩy (upsert) dữ liệu đó lên Supabase sau ~0.6 giây.
  3. Mỗi tài khoản chỉ thấy dữ liệu của chính mình nhờ **Row Level Security (RLS)**.
- Vì vậy, đăng nhập trên máy khác / trình duyệt khác => dữ liệu tự động có mặt.

### Bước 1 — Tạo project Supabase

1. Vào https://supabase.com → tạo project mới (chọn region gần bạn, ví dụ Singapore).
2. Vào **Project Settings → API**, copy 2 giá trị:
   - `Project URL`
   - `anon public` key (**không dùng** `service_role` key ở đây)
3. Dán 2 giá trị đó vào file `js/supabase-config.js`:
   ```js
   const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
   ```

### Bước 2 — Tạo bảng dữ liệu + bật RLS

Vào **SQL Editor** trong Supabase, chạy đoạn SQL sau (chỉ cần chạy 1 lần):

```sql
create table if not exists public.user_app_data (
  user_id     uuid not null references auth.users(id) on delete cascade,
  data_key    text not null,
  data_value  jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  primary key (user_id, data_key)
);

alter table public.user_app_data enable row level security;

create policy "select_own_data" on public.user_app_data
  for select using (auth.uid() = user_id);

create policy "insert_own_data" on public.user_app_data
  for insert with check (auth.uid() = user_id);

create policy "update_own_data" on public.user_app_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "delete_own_data" on public.user_app_data
  for delete using (auth.uid() = user_id);
```

Đây là 1 bảng "key-value theo user" duy nhất (mỗi dòng = 1 loại dữ liệu của 1
user: `products`, `orders`, `customers`, `debts_v2`, `payments_v2`,
`financialTransactions`, `invoiceSettings`) — cách này an toàn nhất vì không
cần đụng vào cấu trúc dữ liệu bên trong `app.js`.

### Bước 3 — Cấu hình Auth (tùy chọn nhưng nên làm khi test)

Vào **Authentication → Providers → Email**:
- Nếu muốn **test nhanh** (đăng ký xong vào thẳng app, khỏi cần xác nhận email):
  tắt **"Confirm email"**.
- Nếu để mặc định (bật xác nhận email), sau khi đăng ký, người dùng phải bấm
  link xác nhận trong email trước khi đăng nhập được — Supabase cần đã cấu
  hình SMTP hoặc dùng email mặc định giới hạn số lượng của Supabase (đủ dùng
  để test).

### Bước 4 — Chạy thử

```bash
python3 -m http.server 8000
```
Mở `http://localhost:8000` → sẽ thấy màn hình Đăng Nhập / Đăng Ký trước khi
vào được app. Tạo tài khoản, đăng nhập, dùng thử vài chức năng (thêm sản
phẩm...) rồi vào Supabase Table Editor → bảng `user_app_data` để thấy dữ liệu
đã được đồng bộ lên.

### Các file mới liên quan

| File | Vai trò |
|---|---|
| `js/supabase-config.js` | **Bạn cần sửa file này** — dán URL + anon key |
| `js/supabase-client.js` | Khởi tạo Supabase client (`window.sb`) |
| `js/cloud-sync.js` | Kéo dữ liệu về lúc đăng nhập + tự đẩy lên khi có thay đổi |
| `js/auth.js` | Giao diện & xử lý Đăng nhập / Đăng ký / Đăng xuất |
| `css/auth.css` | Giao diện màn hình đăng nhập/đăng ký |

### Lưu ý bảo mật

- `anon public key` **được phép** xuất hiện trong code phía client (đây là
  thiết kế bình thường của Supabase) — sự an toàn nằm ở **RLS policies**, không
  phải ở việc giấu key. Tuyệt đối không đưa `service_role key` vào code frontend.
- Nút **"Sao Lưu Dữ Liệu"** (JSON, xem phần trên) vẫn hoạt động song song, dùng
  như bản sao lưu thủ công thêm — không thay thế Supabase, mà bổ sung an toàn.

