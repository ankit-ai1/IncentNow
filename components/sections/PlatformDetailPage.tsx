import { Button, SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FinalCTA } from "./FinalCTA";
import type { DetailContent } from "@/content/detail";

/* ── Screenshot placeholder ──────────────────────────────────────────── */

function MockPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-light-gray bg-white shadow-float">
      <div className="flex items-center gap-1.5 border-b border-light-gray px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E9534F", opacity: 0.65 }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FFB703", opacity: 0.65 }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#00A651", opacity: 0.65 }} />
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
        <div className="mt-4 space-y-2">
          {[90, 55, 75].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-full rounded bg-light-green/50" style={{ maxWidth: `${w}%` }} />
              <div className="h-2 w-8 shrink-0 rounded bg-green/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PlatformDetailPage ──────────────────────────────────────────────── */

export function PlatformDetailPage({ content }: { content: DetailContent }) {
  const highlightsTitle = content.highlightsTitle ?? "What you get";
  const imgLabel = content.images?.[0] ?? "Screenshot";

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero: text left, image placeholder right ── */}
        <section className="mesh grain relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          {/* ambient orbs */}
          <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-teal opacity-40 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-light-gray opacity-45 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-light-green opacity-60 blur-3xl" />

          <div className="shell relative">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {/* Left: eyebrow, heading, sub-headline, buttons */}
              <div>
                <span className="eyebrow">{content.eyebrow}</span>
                <h1 className="mt-4 font-display text-display-1 font-bold text-dark-green text-balance">
                  {content.title}
                </h1>
                <p className="mt-5 max-w-xl text-lead text-navy text-pretty">{content.lead}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="/book-demo" variant="primary">Book a demo</Button>
                  <Button href={content.overviewHref} variant="secondary">
                    {content.overviewLabel}
                  </Button>
                </div>
              </div>

              {/* Right: image/screenshot placeholder */}
              <Reveal delay={0.1} className="hidden sm:block">
                <MockPlaceholder label={imgLabel} />
              </Reveal>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-light-gray/60 to-transparent" />
        </section>

        {/* ── Highlights ── */}
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
              {content.highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <RevealItem key={h.title}>
                    <article
                      className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
                      style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
                    >
                      <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />
                      <div className="flex flex-1 flex-col p-7">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E8F5E9] text-[#00A651] transition-all duration-[250ms] ease-out group-hover/card:bg-[#00A651] group-hover/card:text-white">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#0B1D2D]">{h.title}</h3>
                        <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">{h.body}</p>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
