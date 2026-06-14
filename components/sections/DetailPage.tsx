import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FinalCTA } from "./FinalCTA";
import { PageHero } from "../ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { IconCheck, IconArrow } from "../ui/icons";
import type { DetailContent } from "@/content/detail";

export function DetailPage({ content }: { content: DetailContent }) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.lead}
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: content.overviewLabel, href: content.overviewHref }}
        />

        <section className="py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="HIGHLIGHTS"
                title="What you get"
                description="The essentials, built into one governed platform on ServiceNow."
              />
            </Reveal>

            <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <RevealItem key={h.title}>
                    <article className="card group flex h-full flex-col p-7">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-wash text-accent-600 ring-1 ring-accent-soft transition-all duration-300 group-hover:bg-accent group-hover:text-canvas group-hover:shadow-soft">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{h.title}</h3>
                      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{h.body}</p>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {/* key points + back CTA */}
            <Reveal>
              <div className="mt-10 overflow-hidden rounded-xl3 border border-line bg-gradient-to-br from-accent-wash/40 via-white to-sage/30">
                <div className="grid lg:grid-cols-[1.3fr_1fr]">
                  <div className="p-8 sm:p-10">
                    <p className="eyebrow mb-5">Key benefits</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {content.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[14px] font-medium text-ink-2">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent">
                            <IconCheck className="h-3 w-3 text-canvas" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-center border-t border-line bg-surface p-8 sm:p-10 lg:border-l lg:border-t-0">
                    <p className="text-[14px] font-medium text-muted">Ready to see more?</p>
                    <h3 className="mt-1.5 font-display text-display-3 font-bold text-ink">{content.overviewLabel}</h3>
                    <Link
                      href={content.overviewHref}
                      className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-semibold text-canvas transition-all hover:bg-accent"
                    >
                      {content.overviewLabel}
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
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
