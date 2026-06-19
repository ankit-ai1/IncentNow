import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { analystInsights } from "@/content/resources";

const firmDotColor: Record<string, string> = {
  Gartner: "#E8334A",
  Forrester: "#1B6EC2",
  IDC: "#7B2FBE",
  G2: "#FF492C",
  McKinsey: "#1A1A1A",
  Deloitte: "#86BC25",
};

export const metadata: Metadata = {
  title: "Analyst Insights — IncentIQ",
  description:
    "Explore analyst perspectives, market trends, benchmark data, and industry research covering incentive compensation, sales performance management, revenue operations, and AI-driven decision-making.",
};

export default function AnalystInsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="ANALYST INSIGHTS"
          title={<>Research shaping the future of <span className="text-gradient">incentive compensation.</span></>}
          description="Explore analyst perspectives, market trends, benchmark data, and industry research covering incentive compensation, sales performance management, revenue operations, and AI-driven decision-making."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore resources", href: "/resources" }}
        />

        <section className="py-20 sm:py-24">
          <div className="shell">
            {/* Placeholder disclaimer */}
            <Reveal>
              <div className="mb-10 rounded-xl border border-light-gray bg-light-green/40 px-5 py-4">
                <p className="text-[13px] text-slate">
                  <span className="font-semibold text-dark-green">Illustrative content:</span>{" "}
                  The insights below are placeholder examples based on publicly known research themes from these firms. Real analyst reports and findings will replace this content.
                </p>
              </div>
            </Reveal>

            <RevealGroup className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {analystInsights.map((insight) => (
                <RevealItem key={insight.firm + insight.headline}>
                  <article
                    className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
                    style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
                  >
                    <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />
                    <div className="flex flex-1 flex-col p-7">
                      {/* Firm header: colored dot + firm name */}
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: firmDotColor[insight.firm] ?? "#00A651" }}
                          aria-hidden
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#00A651]">
                          {insight.firm}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[15px] font-bold leading-snug text-[#0B1D2D] text-balance">
                        {insight.headline}
                      </h3>
                      <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">
                        {insight.summary}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#E8F5E9] pt-4">
                        <div>
                          <span className="block text-[11px] font-semibold text-[#475569]">{insight.source}</span>
                          <span className="block text-[10px] italic text-[#475569]/60">Illustrative</span>
                        </div>
                        <Link
                          href="#"
                          className="group/cta inline-flex items-center gap-1 text-[12px] font-semibold text-[#00A651] hover:underline"
                        >
                          Read report
                          <span className="transition-transform duration-150 group-hover/cta:translate-x-[2px]">
                            <IconArrow className="h-3.5 w-3.5" />
                          </span>
                        </Link>
                      </div>
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
