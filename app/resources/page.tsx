import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import {
  blogPosts, guideItems, analystInsights,
  firmColors, levelColors,
  type BlogPost, type GuideItem, type AnalystInsight,
} from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources — IncentIQ",
  description:
    "Discover thought leadership, analyst research, implementation playbooks, product documentation, and practical resources to help your teams maximize the value of IncentIQ.",
};

/* ── Resource hub overview cards ─────────────────────────────────────── */

const resourceLinks = [
  {
    eyebrow: "BLOG",
    heading: "The future of Incentive Intelligence.",
    body: "Stay ahead with insights on compensation strategy, incentive design, revenue operations, AI innovation, and enterprise performance management.",
    href: "/resources/blog",
    cta: "Explore Blog",
  },
  {
    eyebrow: "GUIDES",
    heading: "Practical playbooks for incentive operations.",
    body: "Explore step-by-step guidance, proven frameworks, and best practices for designing compensation plans, managing quotas, governing payouts, and scaling incentive programs with confidence.",
    href: "/resources/guides",
    cta: "Explore Guides",
  },
  {
    eyebrow: "ANALYST INSIGHTS",
    heading: "Research shaping the future of incentive compensation.",
    body: "Explore analyst perspectives, market trends, benchmark data, and industry research covering incentive compensation, sales performance management, revenue operations, and AI-driven decision-making.",
    href: "/resources/analyst-insights",
    cta: "Explore Analyst Insights",
  },
];

/* ── Tag/badge helpers ────────────────────────────────────────────────── */

const tagColors: Record<string, string> = {
  "AI & Analytics": "bg-light-green text-dark-green",
  "Incentive Ops": "bg-light-green text-dark-green",
  "Plan Design": "bg-light-green text-dark-green",
  "Governance": "bg-light-gray text-navy",
};

function tagStyle(tag: string) {
  return tagColors[tag] ?? "bg-light-green text-dark-green";
}

/* ── Blog cards ───────────────────────────────────────────────────────── */

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-green to-accent-green" />
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagStyle(post.tag)}`}>
            {post.tag}
          </span>
          <span className="text-[11.5px] text-slate">{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-light-gray" />
          <span className="text-[11.5px] text-slate">{post.readTime}</span>
        </div>
        <h3 className="mt-4 font-display text-[19px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green text-balance">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate">{post.excerpt}</p>
        <Link
          href={`/resources/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 border-t border-light-gray pt-4 text-[13px] font-semibold text-green hover:text-dark-green"
        >
          Read more
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/* ── Guide cards ──────────────────────────────────────────────────────── */

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <article className="card group flex h-full flex-col p-7">
      <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${levelColors[guide.level]}`}>
        {guide.level}
      </span>
      <h3 className="mt-4 font-display text-[19px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green text-balance">
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate">{guide.excerpt}</p>
      <Link
        href={`/resources/guides/${guide.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 border-t border-light-gray pt-4 text-[13px] font-semibold text-green hover:text-dark-green"
      >
        {guide.cta}
        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

/* ── Analyst insight cards ────────────────────────────────────────────── */

function AnalystCard({ insight }: { insight: AnalystInsight }) {
  return (
    <article className="card flex h-full flex-col p-7">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${firmColors[insight.firm] ?? "bg-light-green text-dark-green"}`}>
          {insight.firm}
        </span>
        <span className="shrink-0 text-[11px] text-slate">{insight.source}</span>
      </div>
      <h3 className="mt-4 font-display text-[15.5px] font-bold leading-snug text-dark-green text-balance">
        {insight.headline}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">{insight.summary}</p>
      <div className="mt-4 flex items-center justify-between border-t border-light-gray pt-4">
        <span className="text-[10.5px] italic text-slate/60">Illustrative</span>
        <Link
          href="#"
          className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-green hover:text-dark-green"
        >
          Read report
          <IconArrow className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="RESOURCES"
          title={<>Insights, guidance, and best practices for <span className="text-gradient">incentive excellence.</span></>}
          description="Discover thought leadership, analyst research, implementation playbooks, product documentation, and practical resources to help your teams maximize the value of IncentIQ."
          primary={{ label: "Book a demo", href: "/book-demo" }}
        />

        {/* ── 3 Resource hub linked blocks ── */}
        <section className="bg-light-green py-14 sm:py-20">
          <div className="shell">
            <RevealGroup className="grid gap-5 sm:grid-cols-3">
              {resourceLinks.map((r) => (
                <RevealItem key={r.eyebrow}>
                  <Link
                    href={r.href}
                    className="card group flex h-full flex-col p-7 transition-all duration-200 hover:border-green hover:shadow-float"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green">
                      {r.eyebrow}
                    </span>
                    <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green text-balance">
                      {r.heading}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">{r.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-green">
                      {r.cta}
                      <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── BLOG detailed section ── */}
        <section id="blog" className="scroll-mt-24 py-16 sm:py-20">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">BLOG</span>
              <h2 className="mt-3 font-display text-display-2 font-bold text-dark-green text-balance">
                The future of Incentive Intelligence.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
                Stay ahead with insights on compensation strategy, incentive design, revenue operations, AI innovation, and enterprise performance management.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <RevealItem key={post.slug}>
                  <BlogCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <Link
                href="/resources/blog"
                className="group/cta mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green transition-colors hover:text-dark-green"
              >
                Explore Blog
                <IconArrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── GUIDES detailed section ── */}
        <section id="guides" className="scroll-mt-24 bg-light-green py-16 sm:py-20">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">GUIDES</span>
              <h2 className="mt-3 font-display text-display-2 font-bold text-dark-green text-balance">
                Practical playbooks for incentive operations.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
                Explore step-by-step guidance, proven frameworks, and best practices for designing compensation plans, managing quotas, governing payouts, and scaling incentive programs with confidence.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {guideItems.map((guide) => (
                <RevealItem key={guide.slug}>
                  <GuideCard guide={guide} />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <Link
                href="/resources/guides"
                className="group/cta mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green transition-colors hover:text-dark-green"
              >
                Explore Guides
                <IconArrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── ANALYST INSIGHTS detailed section ── */}
        <section id="analyst-insights" className="scroll-mt-24 py-16 sm:py-20">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">ANALYST INSIGHTS</span>
              <h2 className="mt-3 font-display text-display-2 font-bold text-dark-green text-balance">
                Research shaping the future of incentive compensation.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
                Explore analyst perspectives, market trends, benchmark data, and industry research covering incentive compensation, sales performance management, revenue operations, and AI-driven decision-making.
              </p>
            </Reveal>

            {/* Disclaimer */}
            <Reveal>
              <div className="mt-8 rounded-xl border border-light-gray bg-light-green/40 px-5 py-4">
                <p className="text-[13px] text-slate">
                  <span className="font-semibold text-dark-green">Illustrative content:</span>{" "}
                  The insights below are placeholder examples based on publicly known research themes from these firms. Real analyst reports and findings will replace this content.
                </p>
              </div>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {analystInsights.map((insight) => (
                <RevealItem key={insight.firm + insight.source}>
                  <AnalystCard insight={insight} />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal>
              <Link
                href="/resources/analyst-insights"
                className="group/cta mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green transition-colors hover:text-dark-green"
              >
                Explore Analyst Insights
                <IconArrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
