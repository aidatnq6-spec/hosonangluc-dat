/**
 * Gửi thông báo Telegram mỗi khi có đăng ký tư vấn mới trên website.
 * Token bot và chat ID lưu trong Secret Manager (không nằm trong mã nguồn):
 *   firebase functions:secrets:set TELEGRAM_BOT_TOKEN
 *   firebase functions:secrets:set TELEGRAM_CHAT_ID
 */
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");

const TELEGRAM_BOT_TOKEN = defineSecret("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = defineSecret("TELEGRAM_CHAT_ID");

// Phải trùng vị trí Firestore đã chọn khi tạo database (khuyến nghị asia-southeast1 – Singapore).
const REGION = "asia-southeast1";
const COLLECTION = "dang_ky_tu_van";

const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

exports.baoTelegramKhiCoDangKy = onDocumentCreated(
  { document: `${COLLECTION}/{docId}`, region: REGION, secrets: [TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID] },
  async (event) => {
    const d = event.data && event.data.data();
    if (!d) return;

    const time = d.taoLuc && d.taoLuc.toDate
      ? d.taoLuc.toDate().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
      : "";

    const text = [
      "🆕 <b>ĐĂNG KÝ TƯ VẤN MỚI</b>",
      `👤 Họ tên: <b>${esc(d.hoTen)}</b>`,
      `📞 SĐT: ${esc(d.soDienThoai)}`,
      `✉️ Email: ${esc(d.email)}`,
      `🎯 Nhu cầu: ${esc(d.nhuCau)}`,
      time ? `🕒 Thời gian: ${esc(time)}` : "",
      `🔖 Mã: ${esc(event.params.docId)}`,
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN.value()}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID.value(), text, parse_mode: "HTML", disable_web_page_preview: true }),
      });
      if (!res.ok) logger.error("Telegram trả lỗi", res.status, await res.text());
    } catch (err) {
      logger.error("Không gửi được Telegram", err);
    }
  }
);
