import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FinalCTA } from "./FinalCTA";
import { PageHero } from "../ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { IconArrow } from "../ui/icons";
import type { DetailContent } from "@/content/detail";
import { ServiceNowLogo } from "../ui/ServiceNowLogo";
import { SlideCarousel } from "../ui/SlideCarousel";

/* ── Detail page ─────────────────────────────────────────────────────── */

export function DetailPage({ content }: { content: DetailContent }) {
  const highlightsTitle = content.highlightsTitle ?? "What you get";

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

        <section className="py-14 sm:py-16">
          <div className="shell">
            {/* Screenshot carousel */}
            {content.slides && content.slides.length > 0 ? (
              <Reveal>
                <div className="mb-8">
                  <SlideCarousel slides={content.slides} slug={content.slug} />
                </div>
              </Reveal>
            ) : null}

            <Reveal>
              <SectionHeading
                eyebrow="HIGHLIGHTS"
                title={highlightsTitle}
                description={<>The essentials, built into one governed platform on <ServiceNowLogo size="md" />.</>}
              />
            </Reveal>

            <RevealGroup className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
