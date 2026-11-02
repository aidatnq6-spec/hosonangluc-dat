"use client";

import { ClipboardPen } from "lucide-react";
import { useOpenRegister } from "./RegisterProvider";

export function RegisterButton({ className = "btn btn-line" }: { className?: string }) {
  const open = useOpenRegister();
  return (
    <button type="button" className={className} onClick={open}>
      <ClipboardPen className="size-[18px]" aria-hidden />
      Đăng ký tư vấn
    </button>
  );
}
