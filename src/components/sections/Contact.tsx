import { Download, ExternalLink, Mail, MapPin, MessageCircle, Phone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/CopyButton";
import { RegisterButton } from "@/components/register/RegisterButton";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHead } from "@/components/SectionHead";
import { EMAIL, FACEBOOK_HANDLE, FACEBOOK_URL, PHONE, PHONE_DISPLAY, PROFILE_URL, ZALO_URL } from "@/lib/site";

// long: giá trị dài (email, Facebook) thu nhỏ chữ ở bố cục 4 cột để nằm trên 1 dòng
function Item({
  icon: Icon,
  label,
  value,
  long,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  long?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 content-start gap-2 rounded-[18px] border border-line bg-navy-up p-[22px]">
      <span className="eyebrow flex items-center gap-2 !text-xs">
        <Icon className="size-4 text-gold" aria-hidden />
        {label}
      </span>
      <span
        className={`font-head text-xl leading-[1.4] font-bold wrap-anywhere text-white ${long ? "lg:text-[15px] xl:text-[17px]" : ""}`}
      >
        {value}
      </span>
      {children}
    </div>
  );
}

export function Contact() {
  return (
    <Section id="lien-he">
      <SectionHead kicker="Liên hệ" title="Trao đổi trực tiếp với tôi">
        Anh chị cần cấp mới hoặc gia hạn Chữ ký số, Hóa đơn điện tử, hay muốn tìm hiểu cách đưa AI vào vận hành? Hãy
        nhắn cho tôi, tôi sẽ phản hồi sớm nhất có thể.
      </SectionHead>

      <Reveal className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
        <Item icon={Phone} label="Điện thoại / Zalo" value={PHONE_DISPLAY}>
          <div className="mt-2 flex flex-wrap gap-2">
            <a className="mini mini-solid" href={ZALO_URL} target="_blank" rel="noopener">
              <MessageCircle className="size-3.5" aria-hidden />
              Nhắn Zalo ngay
            </a>
            <a className="mini" href={`tel:${PHONE}`}>
              <Phone className="size-3.5" aria-hidden />
              Gọi điện
            </a>
            <CopyButton value={PHONE} label="Sao chép số" />
          </div>
        </Item>
        <Item icon={Mail} label="Email" value={EMAIL} long>
          <div className="mt-2 flex flex-wrap gap-2">
            <CopyButton value={EMAIL} label="Sao chép email" />
          </div>
        </Item>
        <Item icon={Users} label="Facebook" value={FACEBOOK_HANDLE} long>
          <div className="mt-2 flex flex-wrap gap-2">
            <a className="mini" href={FACEBOOK_URL} target="_blank" rel="noopener">
              <ExternalLink className="size-3.5" aria-hidden />
              Xem Facebook
            </a>
          </div>
        </Item>
        <Item icon={MapPin} label="Khu vực" value="Đà Nẵng">
          <span className="text-[15.5px] text-muted">Phục vụ khách hàng toàn quốc</span>
        </Item>
      </Reveal>

      <div className="mt-7 grid gap-3 md:flex md:flex-wrap">
        <RegisterButton className="btn btn-gold" />
        <a className="btn btn-line" href={PROFILE_URL} target="_blank" rel="noopener">
          <Download className="size-[18px]" aria-hidden />
          Tải hồ sơ năng lực
        </a>
      </div>
    </Section>
  );
}
