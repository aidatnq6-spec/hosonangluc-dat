// Nhận đăng ký tư vấn: kiểm tra lại dữ liệu → lưu Firestore → báo Telegram.
// Token bot và chat ID lấy từ biến môi trường của Vercel (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID),
// không bao giờ gửi xuống trình duyệt.
import { getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore/lite";
import { COLLECTION, firebaseConfig } from "@/lib/firebase-config";
import { validateRegistration, type Registration } from "@/lib/registration";

const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  // Bot điền ô ẩn: trả về thành công nhưng không lưu, không báo
  if (body.website) return Response.json({ ok: true });

  const { data, errors } = validateRegistration(body);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 });

  let id: string;
  try {
    const app = getApps()[0] ?? initializeApp(firebaseConfig);
    const ref = await addDoc(collection(getFirestore(app), COLLECTION), {
      ...data,
      dongY: true,
      nguon: "website",
      trangThai: "moi",
      taoLuc: serverTimestamp(),
    });
    id = ref.id;
  } catch (err) {
    console.error("Không lưu được vào Firestore", err);
    return Response.json({ error: "Không lưu được đăng ký" }, { status: 500 });
  }

  // Dữ liệu đã lưu; lỗi Telegram không báo lỗi cho khách, chỉ ghi log và trả trạng thái để dễ kiểm tra
  const telegram = await notifyTelegram(data, id);
  return Response.json({ ok: true, id, telegram });
}

// Bỏ khoảng trắng và dấu ngoặc kép thừa khi dán giá trị vào Vercel
const env = (k: string) => (process.env[k] ?? "").trim().replace(/^["']|["']$/g, "");

async function notifyTelegram(d: Registration, id: string): Promise<string> {
  const token = env("TELEGRAM_BOT_TOKEN");
  const chatId = env("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    console.error("Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong biến môi trường");
    return !token ? "thieu_TELEGRAM_BOT_TOKEN" : "thieu_TELEGRAM_CHAT_ID";
  }

  const time = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const text = [
    "🆕 <b>ĐĂNG KÝ TƯ VẤN MỚI</b>",
    `👤 Họ tên: <b>${esc(d.hoTen)}</b>`,
    `📞 SĐT: ${esc(d.soDienThoai)}`,
    `✉️ Email: ${esc(d.email)}`,
    `🎯 Nhu cầu: ${esc(d.nhuCau)}`,
    `🕒 Thời gian: ${esc(time)}`,
    `🔖 Mã: ${esc(id)}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (res.ok) return "da_gui";
    const body = await res.text();
    console.error("Telegram trả lỗi", res.status, body);
    return `loi_${res.status}: ${(JSON.parse(body)?.description as string) ?? ""}`.slice(0, 200);
  } catch (err) {
    console.error("Không gửi được Telegram", err);
    return "loi_ket_noi";
  }
}
