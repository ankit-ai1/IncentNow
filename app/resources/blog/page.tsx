import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { blogPosts } from "@/content/resources";

export const metadata: Metadata = {
  title: "Blog — IncentIQ",
  description:
    "Stay ahead with insights on compensation strategy, incentive design, revenue operations, AI innovation, and enterprise performance management.",
};

const tagColors: Record<string, string> = {
  "AI & Analytics": "bg-light-green text-dark-green",
  "Incentive Ops": "bg-light-green text-dark-green",
  "Plan Design": "bg-light-green text-dark-green",
  "Governance": "bg-light-gray text-navy",
};

function tagStyle(tag: string) {
  return tagColors[tag] ?? "bg-light-green text-dark-green";
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="BLOG"
          title={<>The future of <span className="text-gradient">Incentive Intelligence.</span></>}
          description="Stay ahead with insights on compensation strategy, incentive design, revenue operations, AI innovation, and enterprise performance management."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "Explore resources", href: "/resources" }}
        />

        <section className="py-20 sm:py-24">
          <div className="shell">
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {blogPosts.map((post) => (
                <RevealItem key={post.slug}>
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

                      <h3 className="mt-4 font-display text-[20px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green text-balance">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/resources/blog/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 border-t border-light-gray pt-5 text-[13px] font-semibold text-green transition-all hover:text-dark-green"
                      >
                        Read more
                        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
