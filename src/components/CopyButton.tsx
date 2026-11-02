"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [text, setText] = useState<string | null>(null);

  async function copy() {
    let msg = "Đã sao chép";
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      msg = value; // Không có quyền clipboard: hiện giá trị để khách tự chép
    }
    setText(msg);
    setTimeout(() => setText(null), 1800);
  }

  const Icon = text ? Check : Copy;
  return (
    <button type="button" className="mini" onClick={copy}>
      <Icon className="size-3.5" aria-hidden />
      <span aria-live="polite">{text ?? label}</span>
    </button>
  );
}
