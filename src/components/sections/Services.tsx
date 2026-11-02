import { Bot, FileSignature, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHead } from "@/components/SectionHead";
import { SERVICES } from "@/lib/site";

const ICONS = [FileSignature, Bot, GraduationCap];

export function Services() {
  return (
    <Section id="linh-vuc">
      <SectionHead kicker="Tôi có thể giúp gì" title="Ba lĩnh vực tôi đồng hành cùng anh chị" />
      <div className="grid gap-[18px] md:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal as="article" key={s.no} className="card flex flex-col gap-4 px-6 py-[30px]">
              <div className="flex min-h-[26px] items-center justify-between gap-2.5">
                <span className="flex items-center gap-2 font-head text-sm font-bold tracking-[.08em] text-gold">
                  <Icon className="size-5" aria-hidden />
                  {s.no}
                </span>
                {s.tag && (
                  <span className="rounded-full border border-gold px-3 py-1 font-head text-xs font-semibold whitespace-nowrap text-gold">
                    {s.tag}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-base leading-[1.75] text-muted">{s.desc}</p>
              {s.basis && (
                <div className="rounded-[10px] border border-gold/25 bg-gold/8 px-3.5 py-2.5 text-[14.5px] leading-[1.6]">
                  <div className="mb-1.5 font-head text-xs font-bold tracking-[.16em] text-gold uppercase">Nền tảng</div>
                  <ul className="m-0 grid list-disc gap-1.5 pl-[18px]">
                    {s.basis.map((b) => (
                      <li key={b.k}>
                        <b className="font-semibold text-white">{b.k}:</b> {b.v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-auto border-t border-line pt-4 text-[15.5px]">
                <b className="font-semibold text-gold">Giúp anh chị:</b> {s.gain}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
