import { SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import {
  IconOrg, IconBusinessUnit, IconQuota, IconPerformance,
  IconStatement, IconDispute, IconPlan, IconAssistant, IconSpark,
} from "../ui/icons";

const standard = [
  { icon: IconOrg, title: "Organization Management", body: "Model your full org hierarchy — roles, territories, reporting lines — as the backbone for every plan." },
  { icon: IconBusinessUnit, title: "Business Unit Management", body: "Run distinct compensation structures per business unit while keeping governance centralized." },
  { icon: IconQuota, title: "Quota Management", body: "Set, distribute, and adjust quotas with full version history and complete auditability." },
  { icon: IconPerformance, title: "Performance Tracking", body: "Track attainment in real time, with drill-downs from team to individual rep." },
  { icon: IconStatement, title: "Statements Management", body: "Generate clear, itemized payout statements reps trust at a glance." },
  { icon: IconDispute, title: "Dispute Resolution", body: "Route, investigate, and resolve payout disputes through a governed workflow." },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-mist py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title={<>Everything incentive operations need, <span className="text-gradient">in one place.</span></>}
            description="From org modeling to AI-assisted answers for reps, IncentIQ covers the full incentive lifecycle on a single platform."
          />
        </Reveal>

        {/* featured row */}
        <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Incentive Plans card */}
          <RevealItem>
            <article className="card group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-9 sm:flex-row sm:items-center sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-wash/60 blur-3xl" />
              <div className="relative max-w-xs">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-canvas shadow-soft">
                  <IconPlan className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-display-3 font-bold text-ink">Incentive Plan Management</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">Design tiered plans, accelerators, and rules — then deploy them without a single spreadsheet.</p>
              </div>
              {/* tier chart mini */}
              <div className="relative flex items-end gap-2 self-stretch rounded-2xl bg-canvas/80 p-4 ring-1 ring-line sm:w-44">
                {[38, 56, 72, 100].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full flex-1 items-end" style={{ minHeight: 90 }}>
                      <div
                        className="w-full rounded-md"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #2B4A7F, #4a78c7 ${h}%, #7ba0d4)`,
                          opacity: 0.7 + i * 0.08,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted">{["1×","1.2×","1.4×","1.6×"][i]}</span>
                  </div>
                ))}
                <span className="absolute left-3 top-3 text-[10px] font-semibold text-muted/70">Accelerators</span>
              </div>
            </article>
          </RevealItem>

          {/* AI Assistant card */}
          <RevealItem>
            <article className="card group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-9 sm:flex-row sm:items-center sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-wash/60 blur-3xl" />
              <div className="relative max-w-xs">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-canvas shadow-soft">
                  <IconAssistant className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-display-3 font-bold text-ink">AI Assistant for Sales Teams</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">Reps get instant, plain-language answers on earnings, quota, and the next best payout.</p>
              </div>
              {/* chat mini */}
              <div className="relative flex flex-col justify-between self-stretch rounded-2xl bg-canvas/80 p-4 ring-1 ring-line sm:w-52">
                <span className="mb-3 text-[10px] font-semibold text-muted/70">AI assistant</span>
                <div className="space-y-2.5">
                  <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-surface px-3 py-1.5 text-[11px] leading-snug text-ink">
                    How do I hit top tier?
                  </div>
                  <div className="flex items-start gap-1.5 rounded-xl rounded-tl-sm border border-accent-soft bg-accent-wash px-3 py-2 text-[11px] leading-snug text-ink-2">
                    <IconSpark className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                    <span>Close $48K more — you&apos;re 93% there. Focus on Q4 renewal deals.</span>
                  </div>
                  <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-surface px-3 py-1.5 text-[11px] leading-snug text-ink">
                    When does this quarter end?
                  </div>
                </div>
              </div>
            </article>
          </RevealItem>
        </RevealGroup>

        {/* standard grid */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {standard.map((c) => (
            <RevealItem key={c.title}>
              <article className="card group flex h-full flex-col p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-wash text-accent-600 ring-1 ring-accent-soft transition-all duration-300 group-hover:bg-accent group-hover:text-canvas group-hover:shadow-soft">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[15.5px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
