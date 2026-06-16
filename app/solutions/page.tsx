import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import {
  IconPerformance, IconStatement, IconWorkflow, IconVisibility, IconCheck, IconArrow,
} from "@/components/ui/icons";

const teams = [
  {
    id: "sales",
    icon: IconPerformance,
    eyebrow: "FOR SALES TEAMS",
    title: "Clarity on every dollar earned",
    body: "Reps see real-time attainment, payout projections, and plain-language answers to “how do I earn more?” — no spreadsheets, no month-end surprises.",
    points: ["Live earnings & quota attainment", "AI assistant for payout questions", "Transparent, itemized statements"],
  },
  {
    id: "finance",
    icon: IconStatement,
    eyebrow: "FOR FINANCE",
    title: "Accurate, auditable payouts",
    body: "Every calculation is governed, versioned, and traceable. Close the comp cycle with confidence and a complete audit trail behind every number.",
    points: ["Full version history & audit trail", "Governed dispute resolution", "Accruals and payout accuracy"],
  },
  {
    id: "revops",
    icon: IconWorkflow,
    eyebrow: "FOR REVOPS",
    title: "Plan design without spreadsheets",
    body: "Model org hierarchy, design tiered plans and accelerators, and deploy changes through a controlled workflow — all in one connected system.",
    points: ["Tiers, accelerators & rules engine", "Org & territory modeling", "Deploy changes with governance"],
  },
  {
    id: "leadership",
    icon: IconVisibility,
    eyebrow: "FOR LEADERSHIP",
    title: "Real-time performance visibility",
    body: "One source of truth across Sales, Finance, and Leadership. Drill from company to team to rep, and forecast attainment before the quarter closes.",
    points: ["Company-to-rep drill-downs", "AI forecasting & anomaly flags", "Aligned, trusted reporting"],
  },
];

export const metadata: Metadata = {
  title: "Solutions — IncentIQ",
  description:
    "One platform, tailored outcomes for Sales, Finance, RevOps, and Leadership — built natively on ServiceNow.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="SOLUTIONS"
          title={<>One platform, <span className="text-gradient">outcomes for every team.</span></>}
          description="IncentIQ gives Sales, Finance, RevOps, and Leadership a shared source of truth for incentive compensation — each with the views and controls they need."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore capabilities", href: "/capabilities" }}
        />

        <section className="bg-mist py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="BY TEAM"
                title={<>Built for everyone who touches comp</>}
                description="The same governed data, surfaced for the way each team works."
              />
            </Reveal>

            <div className="mt-14 space-y-5">
              {teams.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.05}>
                  <article
                    id={t.id}
                    className="card grid scroll-mt-28 gap-8 p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center"
                  >
                    <div>
                      <span className="eyebrow">{t.eyebrow}</span>
                      <h3 className="mt-3 font-display text-display-3 font-bold text-ink">{t.title}</h3>
                      <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">{t.body}</p>
                      <Link
                        href={`/solutions/${t.id}`}
                        className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-accent-600"
                      >
                        Learn more
                        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                    <div className="rounded-2xl bg-accent-wash/60 p-6 ring-1 ring-accent-soft">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-canvas shadow-soft">
                        <t.icon className="h-5 w-5" />
                      </span>
                      <ul className="mt-5 space-y-2.5">
                        {t.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-[13.5px] font-medium text-ink-2">
                            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
