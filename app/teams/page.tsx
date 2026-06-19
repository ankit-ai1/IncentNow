import type { Metadata } from "next";
import type { SVGProps } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Button, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconPerformance,
  IconStatement,
  IconWorkflow,
  IconVisibility,
  IconAssistant,
  IconTrust,
  IconAttainment,
  IconPlan,
  IconOrg,
  IconGovernance,
  IconAnomaly,
  IconForecast,
  IconData,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Teams — IncentIQ",
  description:
    "Incentive Intelligence for every team. Sales gains transparency. Finance gains control. RevOps gains agility. Leadership gains insight.",
};

/* ─── Section data ─────────────────────────────────────── */

const salesHighlights = [
  {
    icon: IconAttainment,
    title: "Know What You've Earned",
    body: "Real-time visibility into attainment, commissions, and projected payouts.",
  },
  {
    icon: IconAssistant,
    title: "Ask Anything",
    body: "AI-powered answers on quotas, earnings, accelerators, and next-best actions.",
  },
  {
    icon: IconTrust,
    title: "Trust Every Payout",
    body: "Transparent, itemized statements that explain every dollar earned.",
  },
];

const revopsHighlights = [
  {
    icon: IconPlan,
    title: "Intelligent Plan Management",
    body: "Design tiers, accelerators, SPIFs, bonuses, and incentive rules in a centralized rules engine.",
  },
  {
    icon: IconOrg,
    title: "Unified Organizational Structure",
    body: "Model hierarchies, territories, quota ownership, and reporting relationships in one connected platform.",
  },
  {
    icon: IconGovernance,
    title: "Governed Plan Deployment",
    body: "Roll out compensation changes with approvals, versioning, audit trails, and enterprise-grade controls.",
  },
];

const financeHighlights = [
  {
    icon: IconData,
    title: "Complete Auditability",
    body: "Track every calculation, rule change, approval, and adjustment with full version history and traceability.",
  },
  {
    icon: IconWorkflow,
    title: "Controlled Exception Management",
    body: "Resolve disputes, exceptions, and payout inquiries through governed workflows with clear accountability.",
  },
  {
    icon: IconStatement,
    title: "Trusted Financial Accuracy",
    body: "Ensure accurate accruals, predictable compensation expenses, and confidence in every payout.",
  },
];

const leadershipHighlights = [
  {
    icon: IconVisibility,
    title: "Unified Performance Visibility",
    body: "Track attainment, compensation, and performance from company to team to rep.",
  },
  {
    icon: IconForecast,
    title: "Predictive Forecasting",
    body: "See where performance and incentive spend are likely to land before the quarter closes.",
  },
  {
    icon: IconAnomaly,
    title: "Intelligent Anomaly Detection",
    body: "Identify payout exceptions, unusual trends, and emerging risks before they impact the business.",
  },
];

const summaryRows = [
  { persona: "Sales", highlights: ["Visibility", "AI Guidance", "Transparency"] },
  { persona: "RevOps", highlights: ["Plan Design", "Org Modelling", "Governance"] },
  { persona: "Finance", highlights: ["Auditability", "Dispute Resolution", "Accuracy"] },
  { persona: "Leadership", highlights: ["Visibility", "Forecasting", "Risk Detection"] },
];

/* ─── Mock visual placeholder ──────────────────────────── */

function MockScreen({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-light-gray bg-white shadow-float">
      <div className="flex items-center gap-1.5 border-b border-light-gray px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/60" />
        <span className="ml-3 text-[11px] font-medium text-slate/60">{label}</span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-light-green" />
          <div className="h-3 w-12 rounded bg-green/20" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[85, 62, 91].map((v, i) => (
            <div key={i} className="rounded-xl bg-light-green/60 p-3 text-center">
              <div className="text-[18px] font-bold text-dark-green">{v}%</div>
              <div className="mt-0.5 h-2 w-10 mx-auto rounded bg-light-green" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-full rounded bg-light-green/80" style={{ maxWidth: `${60 + i * 12}%` }} />
              <div className="h-2 w-10 shrink-0 rounded bg-green/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Highlight card ────────────────────────────────────── */

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
    <div className="card group flex flex-col gap-4 p-7 sm:p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-light-green ring-1 ring-light-green transition-all duration-300 group-hover:bg-green group-hover:text-white group-hover:shadow-soft text-dark-green">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[15px] font-semibold text-dark-green">{title}</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-slate">{body}</p>
      </div>
    </div>
  );
}

/* ─── Collaboration visual (hero right side) ───────────── */

function CollaborationVisual() {
  const teams = [
    { label: "Sales", color: "bg-green", icon: IconPerformance },
    { label: "RevOps", color: "bg-sky", icon: IconWorkflow },
    { label: "Finance", color: "bg-teal", icon: IconStatement },
    { label: "Leadership", color: "bg-navy", icon: IconVisibility },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* central platform node */}
      <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-white shadow-float border border-light-gray text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-green">IncentIQ</div>
        <div className="mt-0.5 text-[9px] text-slate">Platform</div>
      </div>

      {/* connector lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 320 280"
        fill="none"
      >
        <line x1="160" y1="140" x2="60" y2="60" stroke="#E8F5E9" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="160" y1="140" x2="260" y2="60" stroke="#E8F5E9" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="160" y1="140" x2="60" y2="220" stroke="#E8F5E9" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="160" y1="140" x2="260" y2="220" stroke="#E8F5E9" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>

      {/* team nodes */}
      {teams.map((t, i) => {
        const positions = [
          "absolute top-2 left-2",
          "absolute top-2 right-2",
          "absolute bottom-2 left-2",
          "absolute bottom-2 right-2",
        ];
        return (
          <div
            key={t.label}
            className={`${positions[i]} flex h-[72px] w-[72px] flex-col items-center justify-center rounded-2xl ${t.color} text-white shadow-soft`}
          >
            <t.icon className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-semibold">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function TeamsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="mesh grain relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-teal opacity-55 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-light-gray opacity-45 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-light-green opacity-60 blur-3xl" />

          <div className="shell relative">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="eyebrow">Teams</span>
                <h1 className="mt-4 font-display text-display-1 font-bold text-dark-green text-balance">
                  Incentive Intelligence for every team.
                </h1>
                <p className="mt-5 max-w-xl text-lead text-navy text-pretty">
                  Sales gains transparency. Finance gains control. RevOps gains agility. Leadership gains insight. All from a unified platform built natively on ServiceNow.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="/book-demo" variant="primary">Book a demo</Button>
                  <Button href="/capabilities" variant="secondary">Explore capabilities</Button>
                </div>
              </div>

              <Reveal delay={0.1} className="hidden lg:block">
                <div className="relative h-[280px]">
                  <CollaborationVisual />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-gray/60 to-transparent" />
        </section>

        {/* ── Section 1: Sales ─────────────────────────────── */}
        <section id="sales" className="scroll-mt-28 py-24 sm:py-32">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="space-y-5">
                <span className="eyebrow">For Sales Teams</span>
                <h2 className="font-display text-display-2 font-bold text-dark-green text-balance">
                  Turn performance into predictable earnings.
                </h2>
                <p className="text-lead text-slate text-pretty">
                  Reps gain real-time visibility into attainment, commissions, bonuses, and payouts—along with intelligent insights that help them understand what's driving earnings and what to do next.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {["Statement", "Performance", "AI Assistant"].map((label) => (
                    <MockScreen key={label} label={label} />
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                  What Sales Teams Gain
                </p>
              </Reveal>
              <RevealGroup className="grid gap-5 sm:grid-cols-3">
                {salesHighlights.map((h) => (
                  <RevealItem key={h.title}>
                    <HighlightCard {...h} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ── Section 2: RevOps ────────────────────────────── */}
        <section id="revops" className="scroll-mt-28 bg-light-green py-24 sm:py-32">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal delay={0.08} className="order-last lg:order-first">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {["Plan Design", "Org Mgmt.", "Quota Mgmt."].map((label) => (
                    <MockScreen key={label} label={label} />
                  ))}
                </div>
              </Reveal>

              <Reveal className="space-y-5">
                <span className="eyebrow">For RevOps</span>
                <h2 className="font-display text-display-2 font-bold text-dark-green text-balance">
                  Design incentives with confidence.
                </h2>
                <p className="text-lead text-slate text-pretty">
                  Model territories, hierarchies, quotas, accelerators, and compensation plans in a single governed platform. Launch changes faster, reduce operational complexity, and maintain complete control at scale.
                </p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                  What You Get
                </p>
              </Reveal>
              <RevealGroup className="grid gap-5 sm:grid-cols-3">
                {revopsHighlights.map((h) => (
                  <RevealItem key={h.title}>
                    <HighlightCard {...h} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ── Section 3: Finance ───────────────────────────── */}
        <section id="finance" className="scroll-mt-28 py-24 sm:py-32">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="space-y-5">
                <span className="eyebrow">For Finance</span>
                <h2 className="font-display text-display-2 font-bold text-dark-green text-balance">
                  Control costs with confidence.
                </h2>
                <p className="text-lead text-slate text-pretty">
                  Every calculation is governed, versioned, and fully traceable. IncentIQ helps finance teams manage compensation expense, accelerate close cycles, and maintain a complete audit trail behind every payout.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {["Accruals", "Audit Trail", "Payouts"].map((label) => (
                    <MockScreen key={label} label={label} />
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                  What You Get
                </p>
              </Reveal>
              <RevealGroup className="grid gap-5 sm:grid-cols-3">
                {financeHighlights.map((h) => (
                  <RevealItem key={h.title}>
                    <HighlightCard {...h} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ── Section 4: Leadership ────────────────────────── */}
        <section id="leadership" className="scroll-mt-28 bg-light-green py-24 sm:py-32">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal delay={0.08} className="order-last lg:order-first">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {["Dashboard", "Performance", "Forecasting"].map((label) => (
                    <MockScreen key={label} label={label} />
                  ))}
                </div>
              </Reveal>

              <Reveal className="space-y-5">
                <span className="eyebrow">For Leadership</span>
                <h2 className="font-display text-display-2 font-bold text-dark-green text-balance">
                  Align incentives to business outcomes.
                </h2>
                <p className="text-lead text-slate text-pretty">
                  Connect sales performance, incentive spend, and business results in one view. Monitor attainment trends, identify risks early, and make data-driven decisions before the quarter closes.
                </p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="mb-8 text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                  What You Get
                </p>
              </Reveal>
              <RevealGroup className="grid gap-5 sm:grid-cols-3">
                {leadershipHighlights.map((h) => (
                  <RevealItem key={h.title}>
                    <HighlightCard {...h} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>

        {/* ── Summary Table ────────────────────────────────── */}
        <section className="py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="OVERVIEW"
                title="One platform. Distinct outcomes for every team."
                align="center"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-light-gray shadow-soft">
                {/* Table header */}
                <div className="grid grid-cols-4 border-b border-light-gray bg-light-green/60 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-dark-green/60">
                  <span>Team</span>
                  <span>Highlight 1</span>
                  <span>Highlight 2</span>
                  <span>Highlight 3</span>
                </div>

                {/* Table rows */}
                {summaryRows.map((row, i) => (
                  <a
                    key={row.persona}
                    href={`/teams/${row.persona.toLowerCase()}`}
                    className={[
                      "grid grid-cols-4 items-center px-6 py-5 transition-colors duration-200 hover:bg-light-green/50",
                      i < summaryRows.length - 1 ? "border-b border-light-gray" : "",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <span className="hidden h-1.5 w-1.5 rounded-full bg-green sm:block" />
                      <span className="font-display text-[15px] font-semibold text-dark-green">
                        {row.persona}
                      </span>
                    </span>
                    {row.highlights.map((h) => (
                      <span key={h} className="text-[13.5px] text-slate">
                        {h}
                      </span>
                    ))}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
