import { Download, MessageCircle } from "lucide-react";
import Image from "next/image";
import { RegisterButton } from "@/components/register/RegisterButton";
import { NAME, PROFILE_URL, ROLE, ZALO_URL } from "@/lib/site";

export function Hero() {
  return (
    <header id="top" className="overflow-hidden border-b border-line bg-navy-deep">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="grid gap-[26px] pt-9 pb-16 lg:py-[72px]">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex flex-none rounded-lg bg-white px-2.5 py-1.5 leading-none">
                <Image src="/assets/logo.png" alt="Logo Vi-Tech" width={300} height={191} className="h-11 w-auto" priority />
              </span>
              <div>
                <div className="font-head text-xl leading-[1.3] font-bold text-white">{NAME}</div>
                <div className="mt-1 text-sm leading-normal text-muted">{ROLE}</div>
              </div>
            </div>

            <div aria-hidden className="h-0.5 w-14 bg-gold" />

            <h1 className="text-[clamp(27px,7vw,44px)] leading-[1.3] font-bold tracking-[-.005em]">
              Đưa doanh nghiệp từ vận hành theo kinh nghiệm sang vận hành bằng{" "}
              <em className="text-gold not-italic">quy trình, dữ liệu và AI.</em>
            </h1>

            <p>
              Tôi đồng hành cùng doanh nghiệp, đơn vị hành chính sự nghiệp và trường học trong các thủ tục số bắt
              buộc: Chữ ký số, Hóa đơn điện tử, Phần mềm Bảo hiểm xã hội, Phần mềm khấu trừ thuế TNCN. Song song,
              tôi giúp doanh nghiệp từng bước tự động hóa vận hành bằng AI.
            </p>

            <div className="grid gap-3 md:flex md:flex-wrap">
              <a className="btn btn-gold" href={ZALO_URL} target="_blank" rel="noopener">
                <MessageCircle className="size-[18px]" aria-hidden />
                Nhắn Zalo cho tôi
              </a>
              <RegisterButton />
              <a className="btn btn-soft" href={PROFILE_URL} target="_blank" rel="noopener">
                <Download className="size-[18px]" aria-hidden />
                Tải hồ sơ năng lực
              </a>
            </div>
          </div>

          {/* Mobile: ảnh tràn viền ở trên cùng; tablet: bo góc 16:10; desktop: vuông bên phải */}
          <div className="group relative -order-1 -mx-[max(22px,env(safe-area-inset-left,0px))] aspect-4/3 overflow-hidden md:order-none md:mx-0 md:mt-7 md:aspect-16/10 md:rounded-3xl lg:my-14 lg:aspect-square">
            <Image
              src="/assets/photo.jpg"
              alt={`Chân dung ${NAME}`}
              fill
              priority
              sizes="(min-width: 960px) 520px, 100vw"
              className="origin-[20%_50%] object-cover object-[0%_38%] transition-transform duration-800 ease-out motion-reduce:transition-none lg:object-[0%_50%] lg:group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-b from-navy-deep/0 to-navy-deep md:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
