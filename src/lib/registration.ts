// Gửi đăng ký tư vấn vào Firestore. SDK Firebase chỉ được tải khi khách bấm "Gửi đăng ký".

// Tên collection. Nếu đổi, phải đổi cả trong firestore.rules và functions/index.js.
export const COLLECTION = "dang_ky_tu_van";

// Cấu hình web Firebase được phép công khai, nên đặt sẵn ở đây để build ở đâu (Vercel, Firebase) cũng chạy.
// Biến môi trường NEXT_PUBLIC_FIREBASE_* (nếu có) sẽ được ưu tiên.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAabOe6V5mCjw_DJW-wMI1uibT4BShSpjw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hosonangluc-dat.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hosonangluc-dat",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hosonangluc-dat.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "246306963100",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:246306963100:web:e949cb4435b23f32d8f759",
};

export const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export type Registration = {
  hoTen: string;
  soDienThoai: string;
  email: string;
  nhuCau: string;
};

export async function submitRegistration(data: Registration) {
  const [{ initializeApp, getApps }, { getFirestore, collection, addDoc, serverTimestamp }] =
    await Promise.all([import("firebase/app"), import("firebase/firestore")]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  await addDoc(collection(getFirestore(app), COLLECTION), {
    ...data,
    dongY: true,
    nguon: "website",
    trangThai: "moi",
    taoLuc: serverTimestamp(),
  });
}

// Chuẩn hóa số điện thoại VN về dạng 0xxxxxxxxx
export function normPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("84") && d.length === 11) d = "0" + d.slice(2);
  return d;
}

const LAST_KEY = "reg_last";
export function lastSent() {
  try {
    return Number(localStorage.getItem(LAST_KEY) || 0);
  } catch {
    return 0;
  }
}
export function markSent() {
  try {
    localStorage.setItem(LAST_KEY, String(Date.now()));
  } catch {}
}
