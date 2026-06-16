import { SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { IconCheck } from "../ui/icons";

const stats = [
  { value: "25–28%", label: "Quota achievement", body: "Only ~1 in 4 reps consistently hit quota, eroding plan credibility." },
  { value: "2–3", unit: "days", label: "Admin overhead", body: "Sales Ops lose days each cycle reconciling calculations and disputes." },
  { value: "~9%", label: "Dispute attrition", body: "Nearly 1 in 10 reps leave over incentive errors or opaque payouts." },
  { value: "$2.3B", label: "Market opportunity", body: "A 9.7% CAGR signals deep dissatisfaction with legacy approaches." },
];

const challenges = [
  "Disconnected systems and spreadsheets create operational inefficiencies.",
  "Slow commission calculations undermine sales motivation and trust.",
  "Limited visibility into quota attainment and incentive performance.",
  "Manual dispute management adds finance and operations overhead.",
  "Traditional platforms lack embedded AI-driven insights and forecasting.",
];

export function Problem() {
  return (
    <section id="problem" className="bg-surface py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="THE PROBLEM"
            title={<>Incentive management <span className="text-gradient">breaks at scale.</span></>}
            description="Sales incentive execution is failing across the enterprise — low attainment, heavy admin overhead, and payout disputes that quietly cost trust."
          />
        </Reveal>

        {/* oversized editorial stats */}
        <RevealGroup className="mt-16 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((s, i) => (
            <RevealItem key={s.label}>
              <div className={["px-0 lg:px-9", i !== 0 ? "lg:border-l lg:border-line" : ""].join(" ")}>
                <p className="text-gradient font-display text-[clamp(3rem,5.4vw,4.5rem)] font-bold leading-none tracking-tight">
                  {s.value}
                  {s.unit ? <span className="ml-1.5 text-xl font-semibold text-muted/70">{s.unit}</span> : null}
                </p>
                <p className="mt-4 text-[15.5px] font-semibold text-ink">{s.label}</p>
                <p className="mt-1.5 max-w-[17rem] text-[13.5px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* challenges + shift */}
        <div className="mt-24 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="rounded-xl3 border border-line bg-white p-8 shadow-soft sm:p-12">
            <p className="eyebrow">Key challenges</p>
            <ul className="mt-6 space-y-4">
              {challenges.map((c) => (
                <li key={c} className="flex items-start gap-3.5">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-line">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-2">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative flex flex-col justify-center overflow-hidden rounded-xl3 border border-accent-soft bg-gradient-to-br from-accent-wash via-white to-mesh-sage/40 p-8 sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-mesh-blue opacity-50 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-8 left-4 h-40 w-40 rounded-full bg-mesh-lilac opacity-40 blur-3xl" />
            <p className="eyebrow relative">The shift</p>
            <p className="relative mt-4 font-display text-display-3 font-bold leading-snug text-ink text-balance">
              From back-office calculations to a governed, intelligent enterprise workflow.
            </p>
            <p className="relative mt-5 text-[15px] leading-relaxed text-ink-2">
              IncentIQ moves incentives onto the Now Platform, where data, automation, and AI finally operate as one — at scale, with trust built in.
            </p>
            <div className="relative mt-7 flex flex-col gap-2">
              {["Governed by design", "Transparent for every rep", "Intelligent at every step"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-2">
                  <IconCheck className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
