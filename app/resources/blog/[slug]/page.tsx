import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconCheck } from "@/components/ui/icons";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    select: { title: true, metaTitle: true, metaDescription: true, excerpt: true },
  });
  if (!post) return {};
  return {
    title: `${post.metaTitle ?? post.title} — IncentIQ Blog`,
    description: post.metaDescription ?? post.excerpt ?? undefined,
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
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
    },
  });

  if (!post) notFound();

  const related = await prisma.post.findMany({
    where: { status: "PUBLISHED", slug: { not: post.slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { title: true, slug: true, excerpt: true, category: { select: { name: true } } },
  });

  return (
    <>
      <Navbar />
      <main>
        {/* article header */}
        <section className="mesh grain relative overflow-hidden pb-12 pt-32 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-mesh-blue opacity-50 blur-3xl" />
          <div className="shell relative">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-600"
              >
                <IconArrow className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                Back to blog
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] font-medium text-muted">
                {post.category && (
                  <span className="rounded-full bg-accent-wash px-3 py-1 font-semibold text-accent-600">
                    {post.category.name}
                  </span>
                )}
                <span>{formatDate(post.publishedAt)}</span>
                {post.readingTime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-line" />
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>

              <h1 className="mt-5 font-display text-display-1 font-bold text-ink text-balance">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-5 text-lead text-ink-2 text-pretty">{post.excerpt}</p>
              )}

              <div className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white font-display text-sm font-bold text-accent-600 shadow-soft ring-1 ring-line">
                  {initials(post.author.name ?? "A")}
                </span>
                <div className="text-[13.5px]">
                  <p className="font-semibold text-ink">{post.author.name}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* article body */}
        <article className="py-16 sm:py-20">
          <div className="shell">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div
                  className="prose prose-lg max-w-none text-ink-2 [&_h2]:font-display [&_h2]:text-display-3 [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mb-4 [&_h2]:mt-10 [&_p]:mt-4 [&_p]:text-[16.5px] [&_p]:leading-[1.75]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Reveal>

              {/* takeaway callout */}
              <Reveal>
                <div className="mt-12 rounded-xl3 border border-accent-soft bg-accent-wash/60 p-7 sm:p-8">
                  <p className="eyebrow">THE TAKEAWAY</p>
                  <p className="mt-3 flex items-start gap-3 text-[15.5px] leading-relaxed text-ink-2">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    IncentIQ brings incentive data, calculations, and AI into one governed system on ServiceNow — so compensation is transparent, intelligent, and trusted at enterprise scale.
                  </p>
                  <Link
                    href="/book-demo"
                    className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-accent-600"
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
          <section className="border-t border-line bg-surface py-20 sm:py-24">
            <div className="shell">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-display-3 font-bold text-ink">Keep reading</h2>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-accent-600">
                  All articles
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/blog/${r.slug}`} className="card group flex h-full flex-col p-6">
                    {r.category && (
                      <span className="w-fit rounded-full bg-accent-wash px-2.5 py-1 text-[11px] font-semibold text-accent-600">
                        {r.category.name}
                      </span>
                    )}
                    <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-accent">{r.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{r.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent transition-transform group-hover:translate-x-0.5">
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
