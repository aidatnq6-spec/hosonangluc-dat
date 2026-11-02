import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { FACEBOOK_URL, NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-deep py-8">
      <div className="wrap flex flex-wrap items-center gap-x-[18px] gap-y-3.5 text-sm text-muted">
        <span className="inline-flex flex-none rounded-lg bg-white px-2.5 py-1.5 leading-none">
          <Image src="/assets/logo.png" alt="Logo Vi-Tech" width={300} height={191} className="h-8 w-auto" />
        </span>
        <span>
          © {new Date().getFullYear()} {NAME} · Đồng sáng lập Vi-Tech
        </span>
        <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="text-gold no-underline hover:underline">
          Facebook
        </a>
        <a href="#top" className="inline-flex items-center gap-1 text-gold no-underline hover:underline">
          Về đầu trang <ArrowUp className="size-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
