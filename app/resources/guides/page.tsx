import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Guides — IncentNow",
  description:
    "Step-by-step playbooks and best practices for running modern incentive compensation on ServiceNow.",
};

const levelTone: Record<string, string> = {
  Beginner: "bg-sage text-accent-600",
  Intermediate: "bg-accent-wash text-accent-600",
  Advanced: "bg-sand text-accent-600",
};

export default function GuidesIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="GUIDES"
          title={<>Playbooks for <span className="text-gradient">incentive teams.</span></>}
          description="Step-by-step guides and best practices for designing plans, setting quotas, and running incentive compensation with governance built in."
        />

        <section className="py-20 sm:py-24">
          <div className="shell">
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <RevealItem key={g.slug}>
                  <Link href={`/resources/guides/${g.slug}`} className="card group flex h-full flex-col p-7">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${levelTone[g.level]}`}>{g.level}</span>
                      <span className="text-[11.5px] text-muted">{g.steps} steps · {g.readTime}</span>
                    </div>
                    <h3 className="mt-5 font-display text-[19px] font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                      {g.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{g.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[13px] font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                      Read guide
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </Link>
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
