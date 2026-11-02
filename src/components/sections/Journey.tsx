import { Reveal } from "@/components/Reveal";
import { Section, SectionHead } from "@/components/SectionHead";
import { JOURNEY } from "@/lib/site";

// Mobile: dòng thời gian dọc; desktop: 4 cột ngang.
export function Journey() {
  return (
    <Section id="hanh-trinh" alt>
      <SectionHead title="Hành trình" />
      <Reveal as="ol" className="m-0 grid list-none p-0 lg:grid-cols-4 lg:gap-6">
        {JOURNEY.map((j, i) => {
          const last = i === JOURNEY.length - 1;
          return (
            <li
              key={j.title}
              className={`relative border-l pl-[34px] lg:border-t lg:border-l-0 lg:border-gold/40 lg:px-0 lg:pt-7 lg:pb-0 ${
                last ? "border-transparent" : "border-gold/40 pb-[34px]"
              }`}
            >
              <span
                aria-hidden
                className={`absolute top-1.5 -left-[7px] size-[13px] rounded-full border-2 border-gold lg:-top-[7px] lg:left-0 ${
                  j.now ? "bg-gold" : "bg-navy-deep"
                }`}
              />
              <h3 className="mt-1 text-lg font-bold">{j.title}</h3>
              {j.lines.map((l) => (
                <p key={l} className="mt-1.5 text-[15.5px] leading-[1.65] text-muted">
                  {l}
                </p>
              ))}
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
