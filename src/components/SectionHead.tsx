import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({ kicker, title, children }: { kicker?: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-11 grid max-w-[720px] gap-3.5">
      {kicker && <div className="kicker">{kicker}</div>}
      <h2 className="text-[clamp(24px,5.6vw,34px)] font-bold">{title}</h2>
      {children && <p className="text-muted">{children}</p>}
    </Reveal>
  );
}

export function Section({ id, alt, children }: { id: string; alt?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`border-b border-line py-20 md:py-[104px] ${alt ? "bg-navy-deep" : ""}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
