import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { supabasePublic } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog — IncentIQ",
  description:
    "Perspectives on incentive operations, sales compensation, plan design, and AI in RevOps — from the team building IncentIQ.",
};

const categoryColors: Record<string, string> = {
  "Incentive Ops": "bg-light-green text-dark-green",
  "Plan Design": "bg-light-green text-dark-green",
  "AI & Analytics": "bg-light-gray text-navy",
  "Platform": "bg-light-green text-navy",
  "Analytics": "bg-light-green text-dark-green",
  "Buying Guide": "bg-light-gray text-navy",
  "How-To": "bg-light-green text-dark-green",
};

function categoryStyle(cat: string) {
  return categoryColors[cat] ?? "bg-light-green text-dark-green";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogIndexPage() {
  const { data } = await supabasePublic
    .from("posts")
    .select("id, title, slug, excerpt, published_at, reading_time, author:users(name), category:categories(name)")
    .eq("status", "PUBLISHED")
    .order("published_at", { ascending: false });
  const posts = data ?? [];

  if (!posts.length) {
    return (
      <>
        <Navbar />
        <main>
          <PageHero
            eyebrow="BLOG"
            title={<>Ideas for modern <span className="text-gradient">incentive teams.</span></>}
            description="Perspectives on incentive operations, plan design, governance, and AI in RevOps — written for the people who run sales compensation."
          />
          <div className="shell py-24 text-center text-slate">No posts published yet.</div>
        </main>
        <Footer />
      </>
    );
  }

  const [featured, ...rest] = posts;
  const featuredCat = (Array.isArray(featured.category) ? featured.category[0] : featured.category)?.name ?? "";
  const featuredAuthor = Array.isArray(featured.author) ? featured.author[0] : featured.author;

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
                <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-[#0F2E24] via-green to-accent-green lg:min-h-[320px]">
                  <div aria-hidden className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
                  <div aria-hidden className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-light-gray/20 blur-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-display text-[10rem] font-bold text-white leading-none select-none">01</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11.5px] font-semibold text-white backdrop-blur-sm">
                      Featured · {featuredCat}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryStyle(featuredCat)}`}>
                      {featuredCat}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-light-gray" />
                    <span>{formatDate(featured.published_at)}</span>
                    {featured.reading_time && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-light-gray" />
                        <span>{featured.reading_time} min read</span>
                      </>
                    )}
                  </div>

                  <h2 className="mt-4 font-display text-display-3 font-bold text-dark-green transition-colors group-hover:text-green text-balance">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-slate">{featured.excerpt}</p>

                  <div className="mt-7 flex items-center gap-3 border-t border-light-gray pt-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-light-green font-display text-[12px] font-bold text-dark-green ring-1 ring-light-green">
                      {initials(featuredAuthor?.name ?? "A")}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-dark-green">{featuredAuthor?.name}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-green transition-transform group-hover:translate-x-0.5">
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
              {rest.map((post, idx) => {
                const cat = (Array.isArray(post.category) ? post.category[0] : post.category)?.name ?? "";
                const postAuthor = Array.isArray(post.author) ? post.author[0] : post.author;
                return (
                  <RevealItem key={post.slug}>
                    <Link
                      href={`/resources/blog/${post.slug}`}
                      className="card group flex h-full flex-col overflow-hidden"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: [
                              "linear-gradient(135deg, #0F2E24, #00A651)",
                              "linear-gradient(135deg, #0B1D2D, #00A651)",
                              "linear-gradient(135deg, #0F2E24, #00BFA5)",
                              "linear-gradient(135deg, #0B1D2D, #00BFA5)",
                              "linear-gradient(135deg, #0B1D2D, #7ED321)",
                              "linear-gradient(135deg, #475569, #0B1D2D)",
                              "linear-gradient(135deg, #0F2E24, #7ED321)",
                              "linear-gradient(135deg, #0F2E24, #475569)",
                            ][idx % 8],
                          }}
                        />
                        <div aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/6 blur-2xl" />
                        <div aria-hidden className="absolute -bottom-6 left-4 h-24 w-24 rounded-full bg-white/6 blur-2xl" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/18 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                          {cat}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2 text-[11.5px] text-slate">
                          <span>{formatDate(post.published_at)}</span>
                          {post.reading_time && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-light-gray" />
                              <span>{post.reading_time} min read</span>
                            </>
                          )}
                        </div>
                        <h3 className="mt-3 font-display text-[18px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate">{post.excerpt}</p>
                        <div className="mt-5 flex items-center gap-2.5 border-t border-light-gray pt-4">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-light-green text-[11px] font-bold text-dark-green ring-1 ring-light-green">
                            {initials(postAuthor?.name ?? "A")}
                          </span>
                          <span className="text-[12.5px] font-medium text-navy">{postAuthor?.name}</span>
                          <IconArrow className="ml-auto h-4 w-4 text-slate transition-all group-hover:translate-x-0.5 group-hover:text-green" />
                        </div>
                      </div>
                    </Link>
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
