import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import { IconArrow } from "@/components/ui/icons";
import { detailByGroup } from "@/content/detail";

export const metadata: Metadata = {
  title: "Platform — IncentIQ",
  description:
    "IncentIQ combines a unified data model, AI-powered intelligence, enterprise governance, and the power of ServiceNow to transform incentive compensation into a connected business capability.",
};

/* ── Image placeholder ───────────────────────────────────────────────── */

function PlatformMock({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-light-gray bg-white shadow-float">
      <div className="flex items-center gap-1.5 border-b border-light-gray px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate/20" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FFB703", opacity: 0.7 }} />
        <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
        <span className="ml-3 text-[11px] font-medium text-slate/60">{label}</span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-light-green" />
          <div className="h-3 w-12 rounded bg-green/20" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[85, 62, 91].map((v, i) => (
            <div key={i} className="rounded-xl bg-light-green/60 p-3 text-center">
              <div className="text-[17px] font-bold text-dark-green">{v}%</div>
              <div className="mx-auto mt-0.5 h-2 w-10 rounded bg-light-green" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[72, 84, 60].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-full rounded bg-light-green/80" style={{ maxWidth: `${w}%` }} />
              <div className="h-2 w-10 shrink-0 rounded bg-green/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pillar summary cards ─────────────────────────────────────────────── */

const pillars = [
  {
    name: "Unified Data Model",
    desc: "One source of truth for plans, quotas, performance, calculations, payouts, and disputes.",
    href: "/platform/unified-data-model",
  },
  {
    name: "AI Intelligence",
    desc: "Embedded AI that explains, predicts, and optimizes compensation outcomes.",
    href: "/platform/ai-intelligence",
  },
  {
    name: "Enterprise Governance",
    desc: "Built-in controls, approvals, versioning, and auditability for every process.",
    href: "/platform/enterprise-governance",
  },
  {
    name: "Built on ServiceNow",
    desc: "Leverage the scalability, security, workflows, and innovation of the ServiceNow platform.",
    href: "/platform/built-on-servicenow",
  },
];

/* ── Positioning table ───────────────────────────────────────────────── */

const tableRows = [
  { pillar: "Unified Data Model", outcome: "One Source of Truth" },
  { pillar: "AI Intelligence", outcome: "Better Decisions" },
  { pillar: "Enterprise Governance", outcome: "Trusted Outcomes" },
  { pillar: "Built on ServiceNow", outcome: "Enterprise Scale" },
];

/* ── Pillar display names (for "Explore X" links) ───────────────────── */

const pillarNames: Record<string, string> = {
  "unified-data-model": "Unified Data Model",
  "ai-intelligence": "AI Intelligence",
  "built-on-servicenow": "Built on ServiceNow",
  "enterprise-governance": "Enterprise Governance",
};

/* ── Page ────────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  const platformPillars = detailByGroup.platform;

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="PLATFORM"
          title={<>The foundation for <span className="text-gradient">Incentive Intelligence.</span></>}
          description="IncentIQ combines a unified data model, AI-powered intelligence, enterprise governance, and the power of ServiceNow to transform incentive compensation into a connected business capability."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "See capabilities", href: "/capabilities" }}
        />

        {/* ── Platform Pillars (horizontal linked cards) ── */}
        <section className="bg-light-green py-14 sm:py-20">
          <div className="shell">
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <RevealItem key={pillar.name}>
                  <Link
                    href={pillar.href}
                    className="card group flex h-full flex-col p-6 transition-all duration-200 hover:border-green hover:shadow-float"
                  >
                    <h3 className="font-display text-[15px] font-semibold text-dark-green group-hover:text-green transition-colors duration-200">
                      {pillar.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">
                      {pillar.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-green">
                      Learn more
                      <IconArrow className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Detailed pillar sections ── */}
        {platformPillars.map((cap, index) => {
          const isLight = index % 2 === 1;
          const displayName = pillarNames[cap.slug] ?? cap.slug;
          return (
            <section
              key={cap.slug}
              id={cap.slug}
              className={`scroll-mt-24 py-16 sm:py-20${isLight ? " bg-light-green" : ""}`}
            >
              <div className="shell">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  {/* Content */}
                  <Reveal>
                    <span className="eyebrow">{cap.eyebrow}</span>
                    <h2 className="mt-3 font-display text-display-2 font-bold text-dark-green text-balance">
                      {cap.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate">{cap.lead}</p>

                    <div className="mt-7 space-y-4">
                      {cap.highlights.map((h) => {
                        const Icon = h.icon;
                        return (
                          <div key={h.title} className="flex items-start gap-3.5">
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-light-green text-green ring-1 ring-light-green">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-[14px] font-semibold text-dark-green">{h.title}</p>
                              <p className="mt-0.5 text-[13px] leading-relaxed text-slate">{h.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Link
                      href={`/platform/${cap.slug}`}
                      className="group/cta mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green transition-colors hover:text-dark-green"
                    >
                      Explore {displayName}
                      <IconArrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </Link>
                  </Reveal>

                  {/* Image placeholder */}
                  <Reveal>
                    <PlatformMock label={cap.images?.[0] ?? displayName} />
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── Positioning table ── */}
        <section className="bg-light-green py-16 sm:py-24">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="PLATFORM"
                title="One Source of Truth. Better Decisions. Trusted Outcomes. Enterprise Scale."
                align="center"
              />
            </Reveal>

            <Reveal>
              <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-light-gray bg-white shadow-float">
                {/* Table header */}
                <div className="grid grid-cols-2 border-b border-light-gray bg-light-green/60 px-6 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                    Platform Pillar
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-green">
                    Business Outcome
                  </span>
                </div>

                {/* Table rows */}
                {tableRows.map((row, i) => (
                  <div
                    key={row.pillar}
                    className={`grid grid-cols-2 px-6 py-4 ${
                      i < tableRows.length - 1 ? "border-b border-light-gray" : ""
                    }`}
                  >
                    <span className="text-[14px] font-semibold text-dark-green">
                      {row.pillar}
                    </span>
                    <span className="text-[14px] font-medium text-slate">
                      {row.outcome}
                    </span>
                  </div>
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
