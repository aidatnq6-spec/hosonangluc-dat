// Cấu hình web Firebase được phép công khai, nên đặt sẵn ở đây để build ở đâu cũng chạy.
// Biến môi trường NEXT_PUBLIC_FIREBASE_* (nếu có) sẽ được ưu tiên.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAabOe6V5mCjw_DJW-wMI1uibT4BShSpjw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hosonangluc-dat.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hosonangluc-dat",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hosonangluc-dat.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "246306963100",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:246306963100:web:e949cb4435b23f32d8f759",
};

// Tên collection. Nếu đổi, phải đổi cả trong firestore.rules.
export const COLLECTION = "dang_ky_tu_van";
