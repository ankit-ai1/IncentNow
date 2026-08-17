import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";
import { withLogo } from "@/components/ui/ServiceNowLogo";
import { supabasePublic } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog — IncentIQ",
  description:
    "Stay ahead with insights on compensation strategy, incentive design, revenue operations, AI innovation, and enterprise performance management.",
};

/* Matches the article page, so a post published in the admin panel appears
   here within a minute instead of needing a deploy. */
export const revalidate = 60;

const tagColors: Record<string, string> = {
  "AI & Analytics": "bg-light-green text-dark-green",
  "Incentive Ops": "bg-light-green text-dark-green",
  "Plan Design": "bg-light-green text-dark-green",
  "Governance": "bg-light-gray text-navy",
};

function tagStyle(tag: string) {
  return tagColors[tag] ?? "bg-light-green text-dark-green";
}

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

/* Supabase can type a to-one join as an array; normalise both shapes. */
type CategoryRef = { name?: string | null } | Array<{ name?: string | null }> | null;

function categoryName(category: CategoryRef): string {
  if (!category) return "Insights";
  const first = Array.isArray(category) ? category[0] : category;
  return first?.name ?? "Insights";
}

export default async function BlogPage() {
  /* Reads the same table the admin panel writes to. This listing used to map
     over a hardcoded array in content/resources.ts, so anything published
     from the panel simply never showed up here. */
  const { data } = await supabasePublic
    .from("posts")
    .select("slug, title, excerpt, published_at, reading_time, category:categories(name)")
    .eq("status", "PUBLISHED")
    .order("published_at", { ascending: false });

  const blogPosts = (data ?? []).map((post) => ({
    slug: post.slug as string,
    title: post.title as string,
    excerpt: (post.excerpt as string | null) ?? "",
    date: formatDate(post.published_at as string | null),
    readTime: `${(post.reading_time as number | null) ?? 5} min read`,
    tag: categoryName(post.category as CategoryRef),
  }));

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

        <section className="py-14 sm:py-16">
          <div className="shell">
            {blogPosts.length === 0 && (
              <p className="py-10 text-center text-[14px] text-slate">No posts published yet.</p>
            )}
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
                        {withLogo(post.title, "lg")}
                      </h3>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate">
                        {withLogo(post.excerpt, "sm")}
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
