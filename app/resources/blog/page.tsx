import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — IncentNow",
  description:
    "Perspectives on incentive operations, sales compensation, plan design, and AI in RevOps — from the team building IncentNow.",
};

const categoryColors: Record<string, string> = {
  "Strategy": "bg-accent-wash text-accent-600",
  "Operations": "bg-sage text-[#3d6b3a]",
  "AI & automation": "bg-sand text-[#7a5a2f]",
  "Technology": "bg-mist text-ink-2",
};

function categoryStyle(cat: string) {
  return categoryColors[cat] ?? "bg-accent-wash text-accent-600";
}

export default function BlogIndexPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="BLOG"
          title={<>Ideas for modern <span className="text-gradient">incentive teams.</span></>}
          description="Perspectives on incentive operations, plan design, governance, and AI in RevOps — written for the people who run sales compensation."
        />

        {/* featured post */}
        <section className="pb-6 pt-12">
          <div className="shell">
            <Reveal>
              <p className="eyebrow mb-6">Featured</p>
              <Link
                href={`/resources/blog/${featured.slug}`}
                className="card group grid gap-0 overflow-hidden lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch"
              >
                {/* thumbnail */}
                <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-[#1a2e55] via-accent to-[#4a78c7] lg:min-h-[320px]">
                  <div aria-hidden className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
                  <div aria-hidden className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-mesh-lilac/20 blur-3xl" />
                  {/* abstract decoration */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-display text-[10rem] font-bold text-white leading-none select-none">01</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11.5px] font-semibold text-white backdrop-blur-sm">
                      Featured · {featured.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-muted">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryStyle(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-line" />
                    <span>{featured.date}</span>
                    <span className="h-1 w-1 rounded-full bg-line" />
                    <span>{featured.readTime}</span>
                  </div>

                  <h2 className="mt-4 font-display text-display-3 font-bold text-ink transition-colors group-hover:text-accent text-balance">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>

                  <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-wash font-display text-[12px] font-bold text-accent-600 ring-1 ring-accent-soft">
                      {initials(featured.author)}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{featured.author}</p>
                      <p className="text-[12px] text-muted">{featured.authorRole}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                      Read article
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* post grid */}
        <section className="pb-24 pt-8 sm:pb-32">
          <div className="shell">
            <Reveal>
              <p className="eyebrow mb-8">All articles</p>
            </Reveal>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, idx) => (
                <RevealItem key={post.slug}>
                  <Link
                    href={`/resources/blog/${post.slug}`}
                    className="card group flex h-full flex-col overflow-hidden"
                  >
                    {/* thumbnail */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: [
                            "linear-gradient(135deg, #1a2e55, #2b4a7f)",
                            "linear-gradient(135deg, #1c3a2a, #2b6b4f)",
                            "linear-gradient(135deg, #3a2210, #7a5a2f)",
                            "linear-gradient(135deg, #1a1e40, #3a3680)",
                            "linear-gradient(135deg, #2a1030, #7a3068)",
                            "linear-gradient(135deg, #0e2a30, #1a6880)",
                            "linear-gradient(135deg, #1a2e55, #4a78c7)",
                            "linear-gradient(135deg, #2a1010, #804030)",
                          ][idx % 8],
                        }}
                      />
                      <div aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/6 blur-2xl" />
                      <div aria-hidden className="absolute -bottom-6 left-4 h-24 w-24 rounded-full bg-white/6 blur-2xl" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/18 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-[11.5px] text-muted">
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-line" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 font-display text-[18px] font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{post.excerpt}</p>
                      <div className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-wash text-[11px] font-bold text-accent-600 ring-1 ring-accent-soft">
                          {initials(post.author)}
                        </span>
                        <span className="text-[12.5px] font-medium text-ink-2">{post.author}</span>
                        <IconArrow className="ml-auto h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                      </div>
                    </div>
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

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
