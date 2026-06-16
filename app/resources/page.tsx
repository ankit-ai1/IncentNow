import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Primitives";
import { IconData, IconGovernance, IconAssistant, IconArrow } from "@/components/ui/icons";

const groups = [
  {
    id: "blog",
    icon: IconData,
    title: "Blog",
    body: "Perspectives on incentive operations, sales compensation, and AI in RevOps.",
    items: [
      "Why spreadsheets break at enterprise scale",
      "Designing incentive plans reps actually trust",
      "What AI changes about comp forecasting",
    ],
  },
  {
    id: "guides",
    icon: IconGovernance,
    title: "Guides",
    body: "Playbooks and best practices for running modern incentive compensation.",
    items: [
      "The ICM buyer's checklist",
      "Migrating off spreadsheets in 30 days",
      "Governance for sales compensation",
    ],
  },
  {
    id: "help-center",
    icon: IconAssistant,
    title: "Help center",
    body: "Product documentation and answers to get teams up and running fast.",
    items: [
      "Getting started with IncentIQ",
      "Configuring plans & quotas",
      "Managing disputes and statements",
    ],
  },
];

export const metadata: Metadata = {
  title: "Resources — IncentIQ",
  description:
    "Guides, articles, and help to get the most from IncentIQ — AI-first incentive compensation on ServiceNow.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="RESOURCES"
          title={<>Learn, plan, and <span className="text-gradient">get the most from IncentIQ.</span></>}
          description="Articles, playbooks, and product help for teams modernizing incentive compensation on ServiceNow."
          primary={{ label: "Book a demo", href: "/book-demo" }}
        />

        <section className="py-24 sm:py-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="EXPLORE"
                title={<>Everything in one place</>}
                description="Browse by what you need — insights, playbooks, or product answers."
              />
            </Reveal>

            <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
              {groups.map((g) => (
                <RevealItem key={g.id}>
                  <article id={g.id} className="card flex h-full scroll-mt-28 flex-col p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-canvas shadow-soft">
                      <g.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-display-3 font-bold text-ink">{g.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{g.body}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {g.items.map((item) => (
                        <li key={item}>
                          <Link href={`/resources/${g.id}`} className="group flex items-start justify-between gap-3 text-[13.5px] font-medium text-ink-2 hover:text-accent">
                            <span>{item}</span>
                            <IconArrow className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/resources/${g.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-600"
                    >
                      Open {g.title}
                      <IconArrow className="h-4 w-4" />
                    </Link>
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
