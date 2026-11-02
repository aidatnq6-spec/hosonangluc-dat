# Hướng dẫn triển khai website (Vercel + Firebase Firestore + Telegram)

**Cách hoạt động:**
- Website (Next.js) chạy trên **Vercel**, tự build lại mỗi khi đẩy code lên GitHub.
- Khách bấm **Đăng ký tư vấn** → form gửi tới `/api/dang-ky` (chạy trên Vercel) → API kiểm tra dữ liệu, lưu vào **Firestore** (collection `dang_ky_tu_van`) rồi gửi tin **Telegram**.
- Không cần gói Blaze của Firebase (không dùng Cloud Functions).

---

## Cấu trúc thư mục

| Đường dẫn | Nội dung |
|---|---|
| `src/lib/site.ts` | **Toàn bộ nội dung chữ** (số điện thoại, dịch vụ, hành trình…) |
| `src/app/` | Khung trang Next.js (`layout.tsx`, `page.tsx`, `globals.css` chứa màu/font) |
| `src/app/api/dang-ky/route.ts` | API nhận đăng ký: lưu Firestore + gửi Telegram |
| `src/components/` | Các phần giao diện (Hero, Giới thiệu, Dịch vụ, Liên hệ, form đăng ký…) |
| `src/lib/registration.ts` | Quy tắc kiểm tra form (dùng chung cho trình duyệt và API) |
| `src/lib/firebase-config.ts` | Cấu hình web Firebase (được phép công khai) |
| `.env.local` | Token Telegram để chạy thử trên máy (không đưa lên git) |
| `public/assets/` | Ảnh chân dung, logo |
| `firestore.rules` | Quy tắc bảo mật Firestore: chỉ được tạo mới, không ai đọc được từ ngoài |
| `legacy/` | Bản HTML cũ và hàm Cloud Functions cũ, giữ để đối chiếu |

---

## 1. Firestore (làm một lần)

1. Firebase Console → dự án `hosonangluc-dat` → **Firestore Database** (đã tạo).
2. Đưa quy tắc bảo mật lên:
   ```
   firebase deploy --only firestore:rules
   ```

## 2. Biến môi trường trên Vercel (bắt buộc để gửi Telegram)

Vercel → Project `hosonangluc-dat` → **Settings → Environment Variables**, thêm 2 biến (chọn cả Production, Preview, Development):

| Tên | Giá trị |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Token bot từ @BotFather |
| `TELEGRAM_CHAT_ID` | Chat ID (nhóm là số âm, ví dụ `-100...`) |

> Không thêm tiền tố `NEXT_PUBLIC_`, nếu không token sẽ lộ ra website.

Sau khi thêm/đổi biến, vào **Deployments → Redeploy** để áp dụng.

## 3. Đưa code lên

```
git add .
git commit -m "Cập nhật website"
git push
```
Vercel tự build và cập nhật website sau 1–2 phút.

## 4. Kiểm tra

1. Mở website → **Đăng ký tư vấn** → điền thử → **Gửi đăng ký** → thấy "Đã gửi đăng ký".
2. Firestore → `dang_ky_tu_van` → có bản ghi mới.
3. Telegram nhận tin "ĐĂNG KÝ TƯ VẤN MỚI".

Nếu không nhận Telegram: Vercel → Project → **Logs**, tìm dòng `Telegram trả lỗi` hoặc `Thiếu TELEGRAM_BOT_TOKEN`.

## Chạy thử trên máy

```
npm install
npm run dev
```
Mở http://localhost:3000. Token Telegram lấy từ `.env.local`.

---

## Xem và xử lý danh sách đăng ký

- Xem tại **Firestore → dang_ky_tu_van**. Mỗi bản ghi có: `hoTen`, `soDienThoai`, `email`, `nhuCau`, `taoLuc`, `trangThai` (mặc định `moi`), `nguon` (`website`), `dongY`.
- Có thể tự sửa `trangThai` trong console (ví dụ `da_lien_he`, `da_chot`) để theo dõi.

## Bảo mật đã có sẵn

- Kiểm tra dữ liệu 3 lớp: trình duyệt, API trên Vercel, và **quy tắc Firestore** (đúng 8 trường, số điện thoại VN 10 số, email hợp lệ, nhu cầu thuộc danh sách).
- Không ai đọc, sửa, xóa được dữ liệu từ ngoài, chỉ được thêm mới.
- Ô ẩn bắt bot spam; giới hạn 1 lần gửi/phút trên mỗi trình duyệt.
- Token Telegram chỉ nằm trong biến môi trường của Vercel, không có trong mã nguồn.

## Lưu ý pháp lý (cần chuyên gia kiểm tra)

- Form thu thập **dữ liệu cá nhân** (họ tên, số điện thoại, email). Việt Nam có Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân; câu đồng ý trong form là bản nháp.
- Firestore đặt tại **Singapore**, tức dữ liệu được lưu ngoài Việt Nam. Quy định về chuyển dữ liệu cá nhân ra nước ngoài có thể yêu cầu thủ tục riêng.
- Nên nhờ chuyên gia pháp lý xác nhận câu đồng ý, trang chính sách quyền riêng tư và thủ tục liên quan.
