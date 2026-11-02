// Kiểm tra và gửi đăng ký tư vấn. Dùng chung cho form (trình duyệt) và API /api/dang-ky (server).
import { NEEDS } from "./site";

export type Registration = {
  hoTen: string;
  soDienThoai: string;
  email: string;
  nhuCau: string;
};

export type RegistrationErrors = Partial<Record<keyof Registration, string>>;

// Chuẩn hóa số điện thoại VN về dạng 0xxxxxxxxx
export function normPhone(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("84") && d.length === 11) d = "0" + d.slice(2);
  return d;
}

// Quy tắc phải khớp với firestore.rules.
export function validateRegistration(v: Partial<Record<keyof Registration, unknown>>) {
  const str = (x: unknown) => (typeof x === "string" ? x : "");
  const data: Registration = {
    hoTen: str(v.hoTen).trim().replace(/\s+/g, " "),
    soDienThoai: normPhone(str(v.soDienThoai)),
    email: str(v.email).trim().toLowerCase(),
    nhuCau: str(v.nhuCau),
  };
  const errors: RegistrationErrors = {};
  if (data.hoTen.length < 2 || data.hoTen.length > 80) errors.hoTen = "Vui lòng nhập họ và tên.";
  if (!/^0[35789]\d{8}$/.test(data.soDienThoai))
    errors.soDienThoai = "Số điện thoại chưa đúng (10 số, ví dụ 0968273868).";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) || data.email.length > 120)
    errors.email = "Email chưa đúng định dạng.";
  if (!(NEEDS as readonly string[]).includes(data.nhuCau)) errors.nhuCau = "Vui lòng chọn nhu cầu.";
  return { data, errors };
}

// Gửi lên API của website; API lưu vào Firestore và báo Telegram.
export async function submitRegistration(data: Registration & { website: string }) {
  const res = await fetch("/api/dang-ky", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API trả lỗi ${res.status}: ${await res.text()}`);
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
