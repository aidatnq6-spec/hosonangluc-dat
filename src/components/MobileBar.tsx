"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { PHONE, ZALO_URL } from "@/lib/site";

// Thanh liên hệ nhanh dưới đáy màn hình (chỉ hiện trên điện thoại / tablet).
export function MobileBar() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  const item =
    "flex h-[42px] items-center justify-center gap-[7px] rounded-full font-head text-sm font-bold no-underline transition-colors active:bg-white active:text-navy-deep";

  return (
    <>
      {/* Chừa chỗ cho thanh cố định để không che nội dung cuối trang */}
      <div aria-hidden className="h-[calc(58px+env(safe-area-inset-bottom,0px))] lg:hidden" />
      <nav
        aria-label="Liên hệ nhanh"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-[1fr_1fr_34px] items-center gap-2 border-t border-gold/25 bg-navy-deep/94 px-[max(12px,env(safe-area-inset-right,0px))] pt-[7px] pb-[calc(7px+env(safe-area-inset-bottom,0px))] backdrop-blur-md lg:hidden"
      >
        <a href={ZALO_URL} target="_blank" rel="noopener" className={`${item} bg-gold text-navy-deep`}>
          <MessageCircle className="size-[17px]" aria-hidden />
          Nhắn Zalo
        </a>
        <a href={`tel:${PHONE}`} className={`${item} border border-gold/70 text-gold`}>
          <Phone className="size-[17px]" aria-hidden />
          Gọi điện thoại
        </a>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Đóng thanh liên hệ"
          className="grid size-[34px] cursor-pointer place-items-center rounded-full border border-line text-muted"
        >
          <X className="size-3.5" strokeWidth={2.4} aria-hidden />
        </button>
      </nav>
    </>
  );
}
