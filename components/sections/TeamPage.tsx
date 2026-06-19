import type { ReactNode, SVGProps } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FinalCTA } from "./FinalCTA";
import { Button, SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/* ── Mockup variant types ─────────────────────────────── */

export type MockVariant =
  | "statement" | "performance" | "ai-chat"
  | "plan-design" | "org-tree" | "quota-dist"
  | "accruals" | "audit-log" | "payout-calc"
  | "kpi-grid" | "team-perf" | "forecast";

const variantLabel: Record<MockVariant, string> = {
  "statement": "Statement",
  "performance": "Performance",
  "ai-chat": "AI Assistant",
  "plan-design": "Plan Design",
  "org-tree": "Org Mgmt.",
  "quota-dist": "Quota Mgmt.",
  "accruals": "Accruals",
  "audit-log": "Audit Trail",
  "payout-calc": "Payouts",
  "kpi-grid": "Dashboard",
  "team-perf": "Performance",
  "forecast": "Forecasting",
};

/* ── Mockup content per variant ───────────────────────── */

function StatementContent() {
  const items = [
    { label: "New Business", amount: "$8,400" },
    { label: "Renewal Bonus", amount: "$2,100" },
    { label: "Accelerator (1.5×)", amount: "$3,200" },
  ];
  return (
    <div className="space-y-1.5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate/60">Q1 2025</p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between rounded-lg bg-light-gray/70 px-3 py-2">
          <span className="text-[11px] text-navy">{item.label}</span>
          <span className="text-[11px] font-semibold text-dark-green">{item.amount}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2" style={{ backgroundColor: "#00A651" }}>
        <span className="text-[11px] font-semibold text-white">Total Earned</span>
        <span className="text-[12px] font-bold text-white">$13,700</span>
      </div>
    </div>
  );
}

function PerformanceContent() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Q1 Attainment</p>
      <div>
        <div className="mb-1.5 flex justify-between">
          <span className="text-[11px] text-navy">$210K of $250K</span>
          <span className="text-[12px] font-bold text-green">84%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-light-gray">
          <div className="h-full rounded-full" style={{ width: "84%", backgroundColor: "#00A651" }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-light-green/60 px-2.5 py-2">
          <p className="text-[10px] text-slate">Rank</p>
          <p className="text-[12px] font-bold text-dark-green">#3 of 12</p>
        </div>
        <div className="rounded-lg bg-light-green/60 px-2.5 py-2">
          <p className="text-[10px] text-slate">To 100% tier</p>
          <p className="text-[12px] font-bold text-dark-green">+$40K</p>
        </div>
      </div>
    </div>
  );
}

function AIChatContent() {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-tr-sm px-3 py-2" style={{ backgroundColor: "#00A651" }}>
          <p className="text-[10.5px] text-white">How do I hit top tier?</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-light-gray px-3 py-2">
          <p className="text-[10.5px] leading-relaxed text-navy">You&apos;re at 84%. Close any 2 of 3 open deals to hit $250K and unlock the 1.5&times; rate.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-light-gray px-3 py-2">
        <div className="h-1.5 flex-1 rounded-full bg-light-gray" />
        <div className="grid h-5 w-5 place-items-center rounded-full" style={{ backgroundColor: "#00A651", opacity: 0.2 }}>
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#00A651" }} />
        </div>
      </div>
    </div>
  );
}

function PlanDesignContent() {
  const tiers = [
    { tier: "Base", range: "0–80%", rate: "1.0×", active: false },
    { tier: "Merit", range: "80–100%", rate: "1.25×", active: true },
    { tier: "Top", range: "100%+", rate: "1.5×", active: false },
  ];
  return (
    <div className="space-y-1.5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate/60">Enterprise FY25</p>
      {tiers.map((t) => (
        <div
          key={t.tier}
          className={`grid grid-cols-3 items-center rounded-lg px-3 py-2 ${
            t.active ? "ring-1" : "bg-light-gray/60"
          }`}
          style={t.active ? { backgroundColor: "#00BFA50D", boxShadow: "0 0 0 1px rgba(0,191,165,0.3)" } : {}}
        >
          <span className={`text-[11px] font-semibold ${t.active ? "text-teal" : "text-navy"}`}>{t.tier}</span>
          <span className="text-center text-[10.5px] text-slate">{t.range}</span>
          <span className={`text-right text-[11px] font-bold ${t.active ? "text-teal" : "text-dark-green"}`}>{t.rate}</span>
        </div>
      ))}
      <div className="mt-1 flex items-center justify-between rounded-lg px-3 py-1.5" style={{ backgroundColor: "#00A65112" }}>
        <span className="text-[10.5px] font-medium text-green">SPIF active</span>
        <span className="text-[11px] font-bold text-green">+$500 / deal</span>
      </div>
    </div>
  );
}

function OrgTreeContent() {
  return (
    <div className="flex flex-col items-center gap-2 pt-1">
      <div className="rounded-xl px-4 py-2 text-center" style={{ backgroundColor: "#00BFA5" }}>
        <p className="text-[10px] font-bold text-white">VP Sales</p>
      </div>
      <div className="h-3 w-px bg-light-gray" />
      <div className="flex gap-3 items-start">
        {["East\n6 reps", "West\n8 reps", "Central\n5 reps"].map((label) => {
          const [team, count] = label.split("\n");
          return (
            <div key={team} className="flex flex-col items-center gap-1">
              <div className="rounded-xl bg-light-green px-3 py-2 text-center ring-1 ring-teal/20">
                <p className="text-[10px] font-semibold text-dark-green">{team}</p>
              </div>
              <p className="text-[9px] text-slate">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuotaDistContent() {
  const rows = [
    { name: "East", amount: "$2.4M", pct: 82 },
    { name: "West", amount: "$1.8M", pct: 62 },
    { name: "Central", amount: "$1.2M", pct: 41 },
    { name: "SMB", amount: "$2.1M", pct: 72 },
  ];
  return (
    <div className="space-y-2">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate/60">Q1 Targets</p>
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-[11px] text-slate">{r.name}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-light-gray">
            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: "#00BFA5" }} />
          </div>
          <span className="w-10 shrink-0 text-right text-[10.5px] font-semibold text-dark-green">{r.amount}</span>
        </div>
      ))}
    </div>
  );
}

function AccrualsContent() {
  const months = [
    { m: "Jan", val: "$142K", pct: 62 },
    { m: "Feb", val: "$158K", pct: 69 },
    { m: "Mar", val: "$167K", pct: 73 },
    { m: "Apr", val: "$149K", pct: 65 },
  ];
  return (
    <div className="space-y-2">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate/60">Comp Expense</p>
      {months.map((m) => (
        <div key={m.m} className="flex items-center gap-2">
          <span className="w-6 shrink-0 text-[10.5px] text-slate">{m.m}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-light-gray">
            <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: "#00A651" }} />
          </div>
          <span className="w-12 shrink-0 text-right text-[10.5px] font-semibold text-dark-green">{m.val}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between rounded-lg bg-light-green/60 px-3 py-1.5">
        <span className="text-[10.5px] text-slate">YTD Total</span>
        <span className="text-[11px] font-bold text-dark-green">$616K</span>
      </div>
    </div>
  );
}

function AuditLogContent() {
  const entries = [
    { label: "Plan v3 deployed", date: "Mar 15" },
    { label: "Rate adjusted", date: "Mar 12" },
    { label: "SPIF added", date: "Mar 8" },
    { label: "Quota updated", date: "Feb 28" },
  ];
  return (
    <div className="space-y-1.5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate/60">Audit Log</p>
      {entries.map((e) => (
        <div key={e.label} className="flex items-center gap-2 rounded-lg bg-light-gray/60 px-2.5 py-1.5">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ backgroundColor: "#00A651" }}>
            <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6l3 3 5-5" />
            </svg>
          </span>
          <span className="flex-1 text-[10.5px] text-navy">{e.label}</span>
          <span className="shrink-0 text-[9px] text-slate">{e.date}</span>
        </div>
      ))}
    </div>
  );
}

function PayoutCalcContent() {
  const rows = [
    { label: "Attainment", value: "84%" },
    { label: "Rate", value: "1.25×" },
    { label: "Base payout", value: "$12,600" },
    { label: "+ Accelerator", value: "$3,200" },
  ];
  return (
    <div className="space-y-1.5">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate/60">Smith, J. · Q1</p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between border-b border-light-gray/60 pb-1">
          <span className="text-[11px] text-slate">{r.label}</span>
          <span className="text-[11px] font-semibold text-navy">{r.value}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2" style={{ backgroundColor: "#00A651" }}>
        <span className="text-[11px] font-semibold text-white">Total payout</span>
        <span className="text-[12px] font-bold text-white">$15,800</span>
      </div>
    </div>
  );
}

function KpiGridContent() {
  const kpis = [
    { label: "Attainment", value: "84%", delta: "+6%", up: true },
    { label: "Revenue", value: "$12.4M", delta: "+12%", up: true },
    { label: "At-Risk Reps", value: "3 / 24", delta: "−2", up: false },
    { label: "Forecasted", value: "$14.8M", delta: "+8%", up: true },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-xl bg-light-green/60 p-2.5">
          <p className="text-[12px] font-bold text-dark-green">{k.value}</p>
          <p className="mt-0.5 text-[9.5px] text-slate">{k.label}</p>
          <p className="mt-0.5 text-[9px] font-semibold" style={{ color: k.up ? "#00A651" : "#FFB703" }}>{k.delta}</p>
        </div>
      ))}
    </div>
  );
}

function TeamPerfContent() {
  const teams = [
    { name: "East", pct: 102, over: true },
    { name: "West", pct: 88, over: false },
    { name: "Central", pct: 85, over: false },
    { name: "SMB", pct: 91, over: false },
  ];
  return (
    <div className="space-y-2">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate/60">Q1 Attainment</p>
      {teams.map((t) => (
        <div key={t.name} className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-[11px] text-slate">{t.name}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-light-gray">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(t.pct, 100)}%`, backgroundColor: t.over ? "#00A651" : "#0092FF" }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-[11px] font-bold" style={{ color: t.over ? "#00A651" : "#0B1D2D" }}>
            {t.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

function ForecastContent() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Q1 Projection</p>
      <svg viewBox="0 0 160 56" fill="none" className="w-full" aria-hidden>
        <path d="M0 48 L50 34 L100 22 L160 6 L160 56 L0 56 Z" fill="#00A651" fillOpacity="0.07" />
        <path d="M0 48 L50 34 L95 24" stroke="#00BFA5" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M95 24 L130 14 L160 6" stroke="#00A651" strokeWidth="1.6" strokeDasharray="3 2" strokeLinecap="round" />
        <circle cx="95" cy="24" r="2.5" fill="#00BFA5" />
        <line x1="95" y1="4" x2="95" y2="56" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="2 2" />
        <text x="97" y="11" className="text-[7px]" style={{ fontSize: 7, fill: "#475569" }}>Today</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-light-green/60 px-2.5 py-2">
          <p className="text-[9.5px] text-slate">Current</p>
          <p className="text-[11px] font-bold text-dark-green">$12.4M</p>
        </div>
        <div className="rounded-lg px-2.5 py-2" style={{ backgroundColor: "#00A65112" }}>
          <p className="text-[9.5px] text-slate">Forecast</p>
          <p className="text-[11px] font-bold text-green">$14.8M ↑</p>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup card shell ─────────────────────────────────── */

function MockupCard({ variant }: { variant: MockVariant }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-light-gray bg-white shadow-float">
      <div className="flex items-center gap-1.5 border-b border-light-gray px-4 py-2.5">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#E9534F", opacity: 0.65 }} />
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FFB703", opacity: 0.65 }} />
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#00A651", opacity: 0.65 }} />
        <span className="ml-2 text-[10px] font-medium text-slate/50">{variantLabel[variant]}</span>
      </div>
      <div className="p-4">
        {variant === "statement" && <StatementContent />}
        {variant === "performance" && <PerformanceContent />}
        {variant === "ai-chat" && <AIChatContent />}
        {variant === "plan-design" && <PlanDesignContent />}
        {variant === "org-tree" && <OrgTreeContent />}
        {variant === "quota-dist" && <QuotaDistContent />}
        {variant === "accruals" && <AccrualsContent />}
        {variant === "audit-log" && <AuditLogContent />}
        {variant === "payout-calc" && <PayoutCalcContent />}
        {variant === "kpi-grid" && <KpiGridContent />}
        {variant === "team-perf" && <TeamPerfContent />}
        {variant === "forecast" && <ForecastContent />}
      </div>
    </div>
  );
}

/* ── Highlight card ────────────────────────────────────── */

function HighlightCard({
  icon: Icon,
  title,
  body,
}: {
  icon: (p: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  body: string;
}) {
  return (
    <article
      className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
      style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
    >
      {/* green accent strip */}
      <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />

      <div className="flex flex-1 flex-col p-7">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E8F5E9] text-[#00A651] transition-all duration-[250ms] ease-out group-hover/card:bg-[#00A651] group-hover/card:text-white">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#0B1D2D]">{title}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">{body}</p>
      </div>
    </article>
  );
}

/* ── TeamPage component ────────────────────────────────── */

export type TeamPageProps = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  highlightsTitle: string;
  highlights: { icon: (p: SVGProps<SVGSVGElement>) => JSX.Element; title: string; body: string }[];
  mockups: [MockVariant, MockVariant, MockVariant];
};

export function TeamPage({ eyebrow, title, body, highlightsTitle, highlights, mockups }: TeamPageProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="mesh grain relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-teal opacity-40 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-light-gray opacity-45 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-light-green opacity-60 blur-3xl" />

          <div className="shell relative">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {/* text */}
              <div>
                <span className="eyebrow">{eyebrow}</span>
                <h1 className="mt-4 font-display text-display-1 font-bold text-dark-green text-balance">{title}</h1>
                <p className="mt-5 max-w-xl text-lead text-navy text-pretty">{body}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="/book-demo" variant="primary">Book a demo</Button>
                  <Button href="/teams" variant="secondary">All teams</Button>
                </div>
              </div>

              {/* mockups — stacked on desktop, row on tablet, hidden on mobile */}
              <Reveal delay={0.1} className="hidden sm:grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {mockups.map((v) => (
                  <MockupCard key={v} variant={v} />
                ))}
              </Reveal>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-light-gray/60 to-transparent" />
        </section>

        {/* Highlights */}
        <section className="py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="HIGHLIGHTS"
                title={highlightsTitle}
                description="The essentials, built into one governed platform on ServiceNow."
              />
            </Reveal>

            <RevealGroup className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <RevealItem key={h.title}>
                  <HighlightCard {...h} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
