"use client";

import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { lastSent, markSent, submitRegistration, validateRegistration, type RegistrationErrors } from "@/lib/registration";
import { NEEDS, PHONE_DISPLAY } from "@/lib/site";

type Errors = RegistrationErrors & { dongY?: string };

const EMPTY = { hoTen: "", soDienThoai: "", email: "", nhuCau: "", website: "", dongY: false };

function validate(v: typeof EMPTY) {
  const { data, errors } = validateRegistration(v);
  return { data, errors: (v.dongY ? errors : { ...errors, dongY: "" }) as Errors };
}

const inputCls = (bad?: boolean) =>
  `h-12 w-full rounded-xl border bg-navy-deep px-3.5 font-body text-base text-white outline-none transition-colors placeholder:text-muted/55 focus:border-gold ${
    bad ? "border-[#FF8A80]" : "border-white/25"
  }`;

export function RegisterDialog({ onClose }: { onClose: () => void }) {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function set<K extends keyof typeof EMPTY>(k: K, val: (typeof EMPTY)[K]) {
    setV((s) => ({ ...s, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const { data, errors } = validate(v);
    setErrors(errors);
    if (Object.keys(errors).length) {
      if (!v.dongY) setFormError("Vui lòng đánh dấu đồng ý để tôi có thể liên hệ lại.");
      return;
    }
    // Bot điền ô ẩn: giả vờ thành công, không lưu
    if (v.website) return setDone(true);
    if (Date.now() - lastSent() < 60_000)
      return setFormError("Anh chị vừa gửi đăng ký. Vui lòng chờ 1 phút nếu muốn gửi thêm.");

    setSending(true);
    try {
      await submitRegistration({ ...data, website: v.website });
      markSent();
      setV(EMPTY);
      setDone(true);
    } catch (err) {
      console.error(err);
      setFormError(`Chưa gửi được đăng ký. Anh chị vui lòng thử lại, hoặc nhắn Zalo ${PHONE_DISPLAY}.`);
    } finally {
      setSending(false);
    }
  }

  const closeBtn =
    "h-10 cursor-pointer rounded-full font-head text-[15px] font-semibold text-muted hover:text-white";

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-[rgba(4,8,40,.6)] md:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-title"
        className="grid max-h-[92vh] w-full max-w-[480px] gap-4 overflow-y-auto rounded-t-[20px] border border-gold/35 bg-navy-up px-[max(22px,env(safe-area-inset-right,0px))] pt-[22px] pb-[calc(22px+env(safe-area-inset-bottom,0px))] md:rounded-[20px]"
      >
        <div id="reg-title" className="eyebrow text-center">
          Đăng ký tư vấn
        </div>

        {done ? (
          <div className="grid gap-3 py-2.5 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold text-navy-deep">
              <Check className="size-7" strokeWidth={3} aria-hidden />
            </div>
            <h3 className="text-xl font-bold">Đã gửi đăng ký</h3>
            <p className="text-[15px] text-muted">
              Cảm ơn anh chị. Tôi sẽ liên hệ lại sớm nhất có thể. Cần trao đổi ngay, anh chị nhắn Zalo{" "}
              {PHONE_DISPLAY}.
            </p>
            <button type="button" className={closeBtn} onClick={onClose}>
              Đóng
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-3.5">
            <p className="-mt-1.5 text-center text-[15px] text-muted">
              Để lại thông tin, tôi sẽ liên hệ lại với anh chị sớm nhất có thể.
            </p>

            <Fld label="Họ và tên" error={errors.hoTen}>
              <input
                ref={firstRef}
                name="hoTen"
                type="text"
                autoComplete="name"
                maxLength={80}
                placeholder="Nguyễn Văn A"
                value={v.hoTen}
                onChange={(e) => set("hoTen", e.target.value)}
                aria-invalid={!!errors.hoTen}
                className={inputCls(!!errors.hoTen)}
              />
            </Fld>
            <Fld label="Số điện thoại" error={errors.soDienThoai}>
              <input
                name="soDienThoai"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={16}
                placeholder="09xx xxx xxx"
                value={v.soDienThoai}
                onChange={(e) => set("soDienThoai", e.target.value)}
                aria-invalid={!!errors.soDienThoai}
                className={inputCls(!!errors.soDienThoai)}
              />
            </Fld>
            <Fld label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={120}
                placeholder="ten@congty.vn"
                value={v.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                className={inputCls(!!errors.email)}
              />
            </Fld>
            <Fld label="Nhu cầu" error={errors.nhuCau}>
              <div className="relative">
                <select
                  name="nhuCau"
                  value={v.nhuCau}
                  onChange={(e) => set("nhuCau", e.target.value)}
                  aria-invalid={!!errors.nhuCau}
                  className={`${inputCls(!!errors.nhuCau)} appearance-none pr-10`}
                >
                  <option value="">Chọn nhu cầu</option>
                  {NEEDS.map((n) => (
                    <option key={n} value={n} className="bg-white text-[#111]">
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-gold"
                  aria-hidden
                />
              </div>
            </Fld>

            {/* Ô ẩn bắt bot spam */}
            <label aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              Website
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={v.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </label>

            <label className="grid cursor-pointer grid-cols-[22px_1fr] items-start gap-2.5 text-[13.5px] leading-[1.55] text-muted">
              <input
                type="checkbox"
                checked={v.dongY}
                onChange={(e) => set("dongY", e.target.checked)}
                className="mt-px size-5 accent-gold"
              />
              <span className={errors.dongY !== undefined ? "text-danger" : ""}>
                Tôi đồng ý để Nguyễn Quang Đạt và Công ty TNHH Dịch vụ Giải pháp Vi-Tech sử dụng thông tin trên để
                liên hệ tư vấn.
              </span>
            </label>

            {formError && (
              <p
                role="alert"
                className="rounded-[10px] border border-[#FF8A80]/35 bg-[#FF8A80]/10 px-3 py-2.5 text-sm text-danger"
              >
                {formError}
              </p>
            )}

            <div className="grid gap-2.5">
              <button
                type="submit"
                disabled={sending}
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold font-head text-[15px] font-bold text-navy-deep disabled:cursor-wait disabled:opacity-60"
              >
                {sending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                {sending ? "Đang gửi…" : "Gửi đăng ký"}
              </button>
              <button type="button" className={closeBtn} onClick={onClose}>
                Đóng
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Fld({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="font-head text-[13.5px] font-semibold text-white">
        {label} <i className="text-gold not-italic">*</i>
      </span>
      {children}
      {error && <small className="text-[13px] text-danger">{error}</small>}
    </label>
  );
}
