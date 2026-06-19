import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { guideItems } from "@/content/resources";

export const metadata: Metadata = {
  title: "Guides — IncentIQ",
  description:
    "Explore step-by-step guidance, proven frameworks, and best practices for designing compensation plans, managing quotas, governing payouts, and scaling incentive programs with confidence.",
};

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="GUIDES"
          title={<>Practical playbooks for <span className="text-gradient">incentive operations.</span></>}
          description="Explore step-by-step guidance, proven frameworks, and best practices for designing compensation plans, managing quotas, governing payouts, and scaling incentive programs with confidence."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore resources", href: "/resources" }}
        />

        <section className="py-20 sm:py-24">
          <div className="shell">
            <RevealGroup className="grid items-stretch gap-6 sm:grid-cols-2">
              {guideItems.map((guide) => (
                <RevealItem key={guide.slug}>
                  <article
                    className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
                    style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
                  >
                    <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />
                    <div className="flex flex-1 flex-col p-7">
                      <span className="inline-flex w-fit items-center rounded-full bg-[#E8F5E9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#00A651]">
                        GUIDE
                      </span>
                      <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#0B1D2D]">
                        {guide.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">
                        {guide.excerpt}
                      </p>
                      <Link
                        href={`/resources/guides/${guide.slug}`}
                        className="group/cta mt-6 inline-flex items-center gap-1 border-t border-[#E8F5E9] pt-4 text-[12px] font-semibold text-[#00A651] hover:underline"
                      >
                        {guide.cta}
                        <span className="transition-transform duration-150 group-hover/cta:translate-x-[2px]">
                          <IconArrow className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </div>
                  </article>
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
