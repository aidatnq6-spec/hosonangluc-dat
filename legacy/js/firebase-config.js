// Cấu hình web của dự án Firebase (Project settings → General → Your apps → Web app → SDK setup and configuration → Config).
// Đoạn cấu hình web này được phép đặt công khai trên website. KHÔNG dán file service account (.json) hay mật khẩu vào đây.
export const firebaseConfig = {
  apiKey: "DIEN_API_KEY",
  authDomain: "DIEN_PROJECT_ID.firebaseapp.com",
  projectId: "DIEN_PROJECT_ID",
  storageBucket: "DIEN_PROJECT_ID.appspot.com",
  messagingSenderId: "DIEN_SENDER_ID",
  appId: "DIEN_APP_ID"
};

// Tên bộ sưu tập (collection) lưu đăng ký trong Firestore. Nếu đổi, phải đổi cả trong firestore.rules và functions/index.js.
export const COLLECTION = "dang_ky_tu_van";
