# Hướng dẫn đưa website lên Firebase Hosting

**Kết quả sau khi làm xong:**
- Website chạy tại `https://<project-id>.web.app` (có thể gắn tên miền riêng sau).
- Khách bấm **Đăng ký tư vấn** → điền form → dữ liệu lưu vào Firestore (collection `dang_ky_tu_van`).
- Mỗi đăng ký mới → bot gửi tin nhắn Telegram cho Anh.
- Nút **Gọi điện thoại** mở thẳng trình quay số.

**Thời gian:** khoảng 30–45 phút cho lần đầu.

---

## Cấu trúc thư mục

| Đường dẫn | Nội dung |
|---|---|
| `src/lib/site.ts` | **Toàn bộ nội dung chữ** (số điện thoại, dịch vụ, hành trình…) |
| `src/app/` | Khung trang Next.js (`layout.tsx`, `page.tsx`, `globals.css` chứa màu/font) |
| `src/components/` | Các phần giao diện (Hero, Giới thiệu, Dịch vụ, Liên hệ, form đăng ký…) |
| `src/lib/registration.ts` | Gửi đăng ký vào Firestore |
| `.env.local` | **Chỗ dán cấu hình web Firebase** (copy từ `.env.example`) |
| `public/assets/` | Ảnh chân dung, logo |
| `out/` | Website đã build (tự sinh khi chạy `npm run build`, đây là thư mục được deploy) |
| `legacy/` | Bản HTML cũ, giữ để đối chiếu |
| `firestore.rules` | Quy tắc bảo mật: khách chỉ được gửi mới, không ai đọc được từ website |
| `functions/index.js` | Hàm gửi thông báo Telegram |
| `firebase.json`, `.firebaserc` | Cấu hình triển khai |

---

## Bước 1. Tạo dự án Firebase mới

> ⚠️ **Nên tạo dự án riêng cho website, không dùng chung dự án CRM.** File `firestore.rules` khi deploy sẽ **thay thế toàn bộ** quy tắc của dự án. Nếu dùng chung, CRM có thể bị chặn truy cập. Nếu bắt buộc dùng chung, gửi Em file quy tắc hiện tại của CRM để Em gộp.

1. Vào https://console.firebase.google.com → **Add project** → đặt tên, ví dụ `nguyenquangdat-web`.
2. Ghi lại **Project ID** (ví dụ `nguyenquangdat-web`).

## Bước 2. Bật Firestore

1. **Build → Firestore Database → Create database**.
2. Chọn **Production mode**.
3. Vị trí: **asia-southeast1 (Singapore)**. Vị trí này phải trùng với `REGION` trong `functions/index.js`; nếu chọn vị trí khác thì sửa dòng `REGION` cho khớp.

## Bước 3. Lấy cấu hình web

1. **Project settings (bánh răng) → General → Your apps → biểu tượng `</>` (Web)** → đặt tên app → **Register app** (không cần tick Firebase Hosting ở bước này).
2. Copy đoạn `firebaseConfig = { apiKey: ..., authDomain: ..., projectId: ..., ... }`.
3. Copy file `.env.example` thành `.env.local`, rồi điền từng giá trị (`apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`, `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, …). Giá trị được gắn vào website lúc build, nên phải điền **trước** khi chạy `firebase deploy`.
4. Mở `.firebaserc`, thay `DIEN_PROJECT_ID` bằng Project ID.

> Đoạn cấu hình web được phép công khai. **Không gửi** file service account (.json), mật khẩu Google hay mã xác thực.

## Bước 4. Nâng gói Blaze và đặt cảnh báo ngân sách

Cloud Functions (để gửi Telegram) và Secret Manager (để giữ token bot) **chỉ chạy trên gói Blaze** (trả theo mức dùng, cần gắn thẻ thanh toán).

1. Góc dưới trái console → **Upgrade → Blaze**.
2. Vào Google Cloud Console → **Billing → Budgets & alerts** → tạo ngân sách nhỏ (ví dụ 50.000đ/tháng) để được báo khi phát sinh chi phí.

Với lượng truy cập và đăng ký của một website cá nhân, chi phí thường nằm trong hạn mức miễn phí hoặc rất nhỏ. Anh kiểm tra bảng giá hiện hành tại https://firebase.google.com/pricing.

## Bước 5. Tạo bot Telegram (Anh tự làm, không gửi token cho ai)

1. Trong Telegram, nhắn **@BotFather** → gõ `/newbot` → đặt tên → nhận **token** (dạng `123456:ABC...`).
2. Mở chat với bot vừa tạo, bấm **Start** và gửi 1 tin bất kỳ.
3. Mở trình duyệt: `https://api.telegram.org/bot<TOKEN>/getUpdates` → tìm `"chat":{"id":...}` → đó là **chat ID**.
   - Muốn nhận vào **nhóm**: thêm bot vào nhóm, gửi 1 tin trong nhóm, chat ID của nhóm là số âm (ví dụ `-100...`).

## Bước 6. Cài công cụ trên máy tính

1. Cài **Node.js 20** từ https://nodejs.org.
2. Mở Terminal (macOS) hoặc PowerShell (Windows):
   ```
   npm install -g firebase-tools
   firebase login
   ```

## Bước 7. Cài thư viện cho website và hàm Telegram

```
cd duong-dan-toi/hosonangluc-dat
npm install
cd functions
npm install
cd ..
```

Xem thử trên máy: `npm run dev` rồi mở http://localhost:3000.

## Bước 8. Lưu token Telegram vào Secret Manager

Chạy trong thư mục gốc của dự án, dán giá trị khi được hỏi:
```
firebase functions:secrets:set TELEGRAM_BOT_TOKEN
firebase functions:secrets:set TELEGRAM_CHAT_ID
```

## Bước 9. Triển khai

```
firebase deploy
```
Lệnh này tự build website (`npm run build` → thư mục `out/`) rồi đưa lên cùng lúc: website, quy tắc Firestore và hàm Telegram. Khi xong, Terminal hiện **Hosting URL**, ví dụ `https://nguyenquangdat-web.web.app`.

## Bước 10. Kiểm tra

1. Mở Hosting URL trên điện thoại.
2. Bấm **Đăng ký tư vấn** → điền thử → **Gửi đăng ký** → phải thấy "Đã gửi đăng ký".
3. Firebase Console → Firestore → collection `dang_ky_tu_van` → có bản ghi mới.
4. Telegram nhận được tin "ĐĂNG KÝ TƯ VẤN MỚI" trong vài giây.
5. Bấm **Gọi điện thoại** → máy mở trình quay số.

Nếu không nhận Telegram: Firebase Console → **Functions → Logs**, xem dòng báo lỗi.

## Bước 11 (tùy chọn). Gắn tên miền riêng

Firebase Console → **Hosting → Add custom domain** → làm theo hướng dẫn thêm bản ghi DNS tại nơi mua tên miền.

---

## Xem và xử lý danh sách đăng ký

- Xem tại **Firestore → dang_ky_tu_van**. Mỗi bản ghi có: `hoTen`, `soDienThoai`, `email`, `nhuCau`, `taoLuc`, `trangThai` (mặc định `moi`), `nguon` (`website`), `dongY`.
- Anh có thể tự sửa `trangThai` trong console (ví dụ `da_lien_he`, `da_chot`) để theo dõi.
- Muốn đưa vào CRM hiện có: Em có thể viết thêm phần đồng bộ sau.

## Cập nhật nội dung sau này

Sửa chữ trong `src/lib/site.ts` (hoặc ảnh trong `public/assets/`) rồi chạy lại:
```
firebase deploy --only hosting
```

## Bảo mật đã có sẵn

- Kiểm tra dữ liệu ở cả trình duyệt và **quy tắc Firestore** (đúng 8 trường, số điện thoại VN 10 số, email hợp lệ, nhu cầu thuộc danh sách).
- Website **không đọc, sửa, xóa** được dữ liệu, chỉ được thêm mới.
- Ô ẩn bắt bot spam; giới hạn 1 lần gửi/phút trên mỗi trình duyệt.
- Token Telegram nằm trong Secret Manager, không có trong mã nguồn.

**Nên làm thêm khi có spam:** bật **App Check** với reCAPTCHA (Em hỗ trợ khi cần).

## Lưu ý pháp lý (cần chuyên gia kiểm tra)

- Form thu thập **dữ liệu cá nhân** (họ tên, số điện thoại, email). Việt Nam có Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân; câu đồng ý trong form là bản nháp.
- Firestore đặt tại **Singapore**, tức dữ liệu được lưu ngoài Việt Nam. Quy định về chuyển dữ liệu cá nhân ra nước ngoài có thể yêu cầu thủ tục riêng.
- Anh nên nhờ chuyên gia pháp lý xác nhận câu đồng ý, nhu cầu có trang chính sách quyền riêng tư và thủ tục liên quan.
