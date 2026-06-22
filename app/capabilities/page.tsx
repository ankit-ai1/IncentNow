import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Benefits } from "@/components/sections/Benefits";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { detailByGroup } from "@/content/detail";
import { ServiceNowLogo } from "@/components/ui/ServiceNowLogo";

export const metadata: Metadata = {
  title: "Capabilities — IncentIQ",
  description:
    "IncentIQ unifies organization management, incentive design, compensation operations, analytics, and AI into a single governed platform built on ServiceNow.",
};

/* ── Shared browser-chrome mock placeholder ──────────────────────── */

function CapMock({ label }: { label: string }) {
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

/* ── Group block data ────────────────────────────────────────────── */

const capGroups = [
  {
    name: "Design",
    items: [
      { label: "Organization", href: "/capabilities/organization-management" },
      { label: "Quota",        href: "/capabilities/quota-management" },
      { label: "Plans",        href: "/capabilities/incentive-plans" },
    ],
  },
  {
    name: "Operate",
    items: [
      { label: "Calculations", href: "/capabilities/calculations" },
      { label: "Statements",   href: "/capabilities/statements" },
      { label: "Data Import",   href: "/capabilities/data-import" },
    ],
  },
  {
    name: "Optimize",
    items: [
      { label: "Performance Tracking", href: "/capabilities/performance-tracking" },
      { label: "Reports",              href: "/capabilities/reports-analytics" },
      { label: "AI Assistant",         href: "/capabilities/ai-assistant" },
    ],
  },
];

/* ── Helper: eyebrow ALL-CAPS -> display name ────────────────────── */

function eyebrowToName(eyebrow: string): string {
  return eyebrow
    .split(" ")
    .map((w) => (w === "&" ? "&" : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function CapabilitiesPage() {
  const caps = detailByGroup.capabilities;

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <PageHero
          eyebrow="CAPABILITIES"
          title={<>Design. Operate. <span className="text-gradient">Optimize.</span></>}
          description={<>IncentIQ unifies organization management, incentive design, compensation operations, analytics, and AI into a single governed platform built on <ServiceNowLogo size="md" /></>}
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore the platform", href: "/platform" }}
        />

        {/* ── 3 Group blocks ── */}
        <section className="bg-light-green py-14 sm:py-16">
          <div className="shell">
            <RevealGroup className="grid gap-6 sm:grid-cols-3">
              {capGroups.map((group) => (
                <RevealItem key={group.name}>
                  <div className="card h-full p-7">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-green">
                      {group.name}
                    </p>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="group/link flex items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium text-dark-green transition-colors hover:bg-light-green hover:text-green"
                          >
                            <span>{item.label}</span>
                            <IconArrow className="h-3.5 w-3.5 text-slate/50 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-green" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── 9 Capability detail sections ── */}
        {caps.map((cap, index) => {
          const isLight = index % 2 === 1;
          const name = eyebrowToName(cap.eyebrow);
          return (
            <section
              key={cap.slug}
              id={cap.slug}
              className={`scroll-mt-24 py-14 sm:py-16${isLight ? " bg-light-green" : ""}`}
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

                    {/* Inline highlights */}
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
                      href={`/capabilities/${cap.slug}`}
                      className="group/cta mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green transition-colors hover:text-dark-green"
                    >
                      Explore {name}
                      <IconArrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </Link>
                  </Reveal>

                  {/* Placeholder */}
                  <Reveal>
                    <CapMock label={cap.images?.[0] ?? name} />
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}

        <Benefits />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
