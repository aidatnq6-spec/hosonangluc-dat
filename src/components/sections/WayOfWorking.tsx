import { Reveal } from "@/components/Reveal";
import { Section, SectionHead } from "@/components/SectionHead";
import { STEPS, VALUES } from "@/lib/site";

export function WayOfWorking() {
  return (
    <Section id="cach-lam-viec" alt>
      <SectionHead kicker="Cách tôi làm việc" title="Thực chiến · Kỷ luật · Cầu thị" />

      <Reveal className="grid gap-6 md:grid-cols-3 md:gap-9">
        {VALUES.map((x) => (
          <div key={x.title} className="border-l-2 border-gold py-1 pl-5">
            <h3 className="mb-1.5 text-xl font-bold">{x.title}</h3>
            <p className="text-base text-muted">{x.desc}</p>
          </div>
        ))}
      </Reveal>

      <Reveal
        as="p"
        className="my-14 rounded-[18px] border border-gold/40 bg-navy-up px-6 py-7 font-head text-[clamp(19px,4.8vw,24px)] leading-normal font-semibold text-balance text-white"
      >
        Việc gì cũng phải <span className="text-gold">đo được bằng con số</span>. Dữ liệu dẫn dắt quyết định.
      </Reveal>

      <div className="eyebrow mb-[22px]">Quy trình 4 bước</div>
      <Reveal as="ol" className="m-0 grid list-none gap-3.5 p-0 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="grid grid-cols-[44px_1fr] items-start gap-x-4 gap-y-0.5 rounded-2xl border border-line p-[18px] lg:grid-cols-1 lg:gap-3"
          >
            <span className="row-span-2 grid size-11 place-items-center rounded-full bg-gold font-head text-lg font-bold text-navy-deep lg:row-span-1">
              {i + 1}
            </span>
            <h3 className="text-[17px] font-bold">{s.title}</h3>
            <p className="text-[15.5px] leading-[1.6] text-muted">{s.desc}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
