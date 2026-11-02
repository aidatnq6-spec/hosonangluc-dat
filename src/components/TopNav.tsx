"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAME, NAV, ZALO_URL } from "@/lib/site";

export function TopNav() {
  const [open, setOpen] = useState(false);
  // Ẩn tên trên thanh menu khi phần đầu trang còn hiển thị (tránh trùng lặp)
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
      rootMargin: "-60px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Phủ màu vùng tai thỏ trên iPhone */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-31 h-[env(safe-area-inset-top,0px)] bg-navy-deep/96"
      />
      <nav
        aria-label="Điều hướng"
        className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-line bg-navy-deep/94 backdrop-blur-md"
      >
        <div className="wrap">
          <div className="flex h-[60px] items-center justify-between gap-4">
            <a
              href="#top"
              className={`flex min-w-0 items-center gap-2.5 no-underline transition duration-300 ${
                heroVisible ? "pointer-events-none -translate-y-1.5 opacity-0" : ""
              }`}
            >
              <span className="inline-flex flex-none rounded-md bg-white px-1.5 py-[3px] leading-none">
                <Image src="/assets/logo.png" alt="Logo Vi-Tech" width={300} height={191} className="h-[26px] w-auto" />
              </span>
              <span className="truncate font-head text-[15px] font-bold text-white">{NAME}</span>
            </a>

            <div className="hidden items-center gap-[26px] lg:flex">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="font-head text-[13.5px] font-semibold text-muted no-underline transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
            </div>

            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-gold hidden !px-[18px] !py-2.5 !text-[13.5px] lg:inline-flex"
            >
              Nhắn Zalo
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="nav-menu"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              className="grid size-[42px] flex-none cursor-pointer place-items-center rounded-[10px] border border-line text-white lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {open && (
            <div id="nav-menu" className="border-t border-line pt-2 pb-4 lg:hidden">
              {NAV.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-line px-0.5 py-3 font-head text-[15px] font-semibold no-underline last:border-b-0 ${
                    i === NAV.length - 1 ? "text-gold" : "text-ink"
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
