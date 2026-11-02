import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHead } from "@/components/SectionHead";
import { STATS, TRAINING } from "@/lib/site";

const cellCls = {
  hero: "col-span-full min-h-[170px] border-transparent bg-linear-135 from-gold to-gold-dark md:col-span-2 md:row-span-2 md:min-h-[300px]",
  normal: "",
  wide: "col-span-full md:col-span-2",
};

export function About() {
  return (
    <Section id="ve-toi">
      <SectionHead kicker="Về tôi" title="Từ kỹ sư viễn thông đến người xây hệ thống vận hành cho doanh nghiệp" />

      <Reveal className="grid max-w-[64ch] gap-[22px] [&_strong]:font-semibold [&_strong]:text-gold">
        <p>
          Tôi là kỹ sư Điện tử Viễn thông (Đại học Bách khoa Đà Nẵng) và cử nhân Quản trị Kinh doanh (Trường Đại học
          Mở Hà Nội). Tám năm làm việc tại chi nhánh Viettel Đà Nẵng cho tôi nền tảng về công nghệ, giải pháp và cách
          đào tạo con người. Ở đó, tôi làm Kỹ sư Công nghệ thông tin, Kỹ sư dịch vụ Giải pháp, rồi phụ trách đào tạo
          Bán hàng và Kỹ thuật.
        </p>
        <p>
          Trong 15 năm qua, tôi đã làm việc trực tiếp với chủ doanh nghiệp và kế toán trong lĩnh vực Chữ ký số, Hóa
          đơn điện tử, Phần mềm Bảo hiểm xã hội và Phần mềm khấu trừ thuế TNCN. Tôi thấy một điểm chung ở rất nhiều
          đơn vị: công việc chạy được nhờ kinh nghiệm của vài người. Khi người đó bận hoặc nghỉ, vận hành chậm lại.
        </p>
        <p>
          Vì vậy, điều tôi theo đuổi bây giờ là giúp doanh nghiệp vận hành bằng <strong>quy trình, dữ liệu và AI</strong>,
          kết hợp phương pháp <strong>Bộ não thứ 2</strong>. Bộ não thứ 2 là cách lưu trữ và tổ chức tri thức để không
          phụ thuộc vào trí nhớ của cá nhân.
        </p>
      </Reveal>

      <Reveal className="mt-[60px] grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {STATS.map((s) => {
          const hero = s.variant === "hero";
          return (
            <div
              key={s.label}
              className={`card grid min-h-[140px] content-between gap-[18px] px-5 py-[22px] ${cellCls[s.variant]}`}
            >
              <b
                className={`font-head leading-none font-bold ${
                  hero ? "text-[72px] text-navy-deep md:text-[100px]" : "text-[46px] text-white"
                }`}
              >
                <CountUp to={s.value} />
                <small
                  className={`ml-1.5 font-semibold tracking-[.06em] ${
                    hero ? "text-lg text-navy-deep" : "text-sm text-gold"
                  }`}
                >
                  NĂM
                </small>
              </b>
              <span
                className={`leading-normal ${hero ? "text-base font-semibold text-navy-deep" : "text-[15px] text-muted"}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </Reveal>

      <Reveal className="mt-11 border-t border-line pt-7">
        <div className="eyebrow mb-[18px]">Đào tạo chuyên sâu</div>
        <div className="grid gap-3.5 md:grid-cols-2 md:gap-7">
          {TRAINING.map((t) => (
            <div key={t.title} className="grid gap-1 border-l-2 border-gold py-0.5 pl-[18px]">
              <span className="font-head text-base font-bold text-white">{t.title}</span>
              <p className="text-[15.5px] text-muted">{t.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
