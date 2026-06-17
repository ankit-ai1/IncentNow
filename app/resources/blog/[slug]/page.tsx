import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconCheck } from "@/components/ui/icons";
import { supabasePublic } from "@/lib/supabase";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await supabasePublic
    .from("posts")
    .select("title, meta_title, meta_description, excerpt")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();
  if (!post) return {};
  return {
    title: `${post.meta_title ?? post.title} — IncentIQ Blog`,
    description: post.meta_description ?? post.excerpt ?? undefined,
  };
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabasePublic
    .from("posts")
    .select("*, author:users(name), category:categories(name)")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();

  if (!post) notFound();

  const { data: relatedData } = await supabasePublic
    .from("posts")
    .select("title, slug, excerpt, category:categories(name)")
    .eq("status", "PUBLISHED")
    .neq("slug", post.slug)
    .order("published_at", { ascending: false })
    .limit(3);
  const related = relatedData ?? [];

  return (
    <>
      <Navbar />
      <main>
        {/* article header */}
        <section className="mesh grain relative overflow-hidden pb-12 pt-32 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-teal opacity-50 blur-3xl" />
          <div className="shell relative">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-green hover:text-dark-green"
              >
                <IconArrow className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                Back to blog
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] font-medium text-slate">
                {(() => {
                  const cat = Array.isArray(post.category) ? post.category[0] : post.category;
                  return cat?.name ? (
                    <span className="rounded-full bg-light-green px-3 py-1 font-semibold text-dark-green">
                      {cat.name}
                    </span>
                  ) : null;
                })()}
                <span>{formatDate(post.published_at)}</span>
                {post.reading_time && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-light-gray" />
                    <span>{post.reading_time} min read</span>
                  </>
                )}
              </div>

              <h1 className="mt-5 font-display text-display-1 font-bold text-dark-green text-balance">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-5 text-lead text-navy text-pretty">{post.excerpt}</p>
              )}

              {(() => {
                const author = Array.isArray(post.author) ? post.author[0] : post.author;
                return (
                  <div className="mt-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white font-display text-sm font-bold text-dark-green shadow-soft ring-1 ring-light-gray">
                      {initials(author?.name ?? "A")}
                    </span>
                    <div className="text-[13.5px]">
                      <p className="font-semibold text-dark-green">{author?.name}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* article body */}
        <article className="py-16 sm:py-20">
          <div className="shell">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div
                  className="prose prose-lg max-w-none text-navy [&_h2]:font-display [&_h2]:text-display-3 [&_h2]:font-bold [&_h2]:text-dark-green [&_h2]:mb-4 [&_h2]:mt-10 [&_p]:mt-4 [&_p]:text-[16.5px] [&_p]:leading-[1.75]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Reveal>

              {/* takeaway callout */}
              <Reveal>
                <div className="mt-12 rounded-xl3 border border-light-green bg-light-green/60 p-7 sm:p-8">
                  <p className="eyebrow">THE TAKEAWAY</p>
                  <p className="mt-3 flex items-start gap-3 text-[15.5px] leading-relaxed text-navy">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                    IncentIQ brings incentive data, calculations, and AI into one governed system on ServiceNow — so compensation is transparent, intelligent, and trusted at enterprise scale.
                  </p>
                  <Link
                    href="/book-demo"
                    className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green hover:text-dark-green"
                  >
                    Book a demo
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </article>

        {/* related posts */}
        {related.length > 0 && (
          <section className="border-t border-light-gray bg-light-gray py-20 sm:py-24">
            <div className="shell">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-display-3 font-bold text-dark-green">Keep reading</h2>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green hover:text-dark-green">
                  All articles
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/blog/${r.slug}`} className="card group flex h-full flex-col p-6">
                    {(() => {
                      const rCat = Array.isArray(r.category) ? r.category[0] : r.category;
                      return rCat?.name ? (
                        <span className="w-fit rounded-full bg-light-green px-2.5 py-1 text-[11px] font-semibold text-dark-green">
                          {rCat.name}
                        </span>
                      ) : null;
                    })()}
                    <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-dark-green transition-colors group-hover:text-green">{r.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate">{r.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-green transition-transform group-hover:translate-x-0.5">
                      Read article
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
