import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconCheck } from "@/components/ui/icons";
import { supabasePublic } from "@/lib/supabase";
import { ServiceNowLogo } from "@/components/ui/ServiceNowLogo";
import { TableOfContents, type TocHeading } from "@/components/blog/TableOfContents";
import { blogPosts } from "@/content/resources";

export const revalidate = 60;

const staticArticleBySlug: Record<string, { title: string; excerpt: string; date: string; readTime: string; tag: string; image: string; content: string }> = {
  "icm-vs-crm-why-your-crm-cant-replace-a-dedicated-compensation-platform": {
    title: "ICM vs CRM: Why Your CRM Can't Replace a Dedicated Compensation Platform",
    excerpt:
      "CRMs can track deals, but they can't govern compensation logic, auditability, and dispute resolution at the scale modern sales teams require.",
    date: "August 12, 2026",
    readTime: "5 min read",
    tag: "ICM vs CRM",
    image: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786549891/1_rukrcb.jpg",
    content: `
      <h2>Where CRMs Fall Short on Commission Calculations</h2>
      <h3>No Real Audit Trail</h3>
      <p>CRMs log activity, not compensation logic. When a payout is questioned, there’s no built-in record of which rule fired, when a plan changed, or who approved an exception — leaving finance and RevOps reconstructing history manually from emails and spreadsheet versions.</p>
      <h3>Formulas Break Under Complexity</h3>
      <p>Tiered rates, accelerators, splits, and clawbacks quickly outgrow CRM formula fields. Every plan change becomes an engineering request, and one broken formula can silently mispay an entire team for a full cycle before anyone notices.</p>
      <h3>No Separation Between Deal Data and Comp Logic</h3>
      <p>When commission rules live inside CRM fields, updating a deal record can unintentionally change a payout — blurring the line between “what happened” and “what someone gets paid for it.”</p>
      <h2>What a Dedicated ICM Platform Adds</h2>
      <h3>Purpose-Built Calculation Engines</h3>
      <p>ICM platforms are designed around compensation logic from day one — supporting complex tiers, multi-rep splits, and retroactive adjustments without custom code or engineering tickets.</p>
      <h3>Transparent Dispute Resolution</h3>
      <p>Reps get itemized statements showing exactly how a number was calculated, and disputes route through a documented workflow instead of a Slack thread nobody can find three months later.</p>
      <h2>CRM and ICM Are Better Together</h2>
      <p>Your CRM should remain the system of record for deals — but compensation logic belongs in a platform purpose-built for it. Integrating rather than overloading your CRM keeps both systems doing what they do best, and gives finance a defensible audit trail come SOX season.</p>
      <h2>Conclusion</h2>
      <p>A CRM can tell you a deal closed. It can't tell you — with confidence and an audit trail — what that deal is worth to the rep who closed it. As comp plans grow more sophisticated, the cost of stretching a CRM past its limits shows up in disputes, errors, and lost rep trust. A dedicated ICM platform closes that gap and gives every team, from sales to finance, a single source of truth.</p>
      <p><strong>Keywords to add:</strong> ICM vs CRM, Sales Incentive Compensation Software</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fallback = staticArticleBySlug[params.slug];
  const { data: post } = await supabasePublic
    .from("posts")
    .select("title, meta_title, meta_description, excerpt")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();
  if (post) {
    return {
      title: `${post.meta_title ?? post.title} — IncentIQ Blog`,
      description: post.meta_description ?? post.excerpt ?? undefined,
    };
  }
  if (!fallback) return {};
  return {
    title: `${fallback.title} — IncentIQ Blog`,
    description: fallback.excerpt,
  };
}

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function highlightTitle(title: string) {
  const words = title.trim().split(" ");
  if (words.length <= 2) return title;
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  return (
    <>
      {lead}{" "}
      <span className="text-gradient">{tail}</span>
    </>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Tags every <h2> in the raw content HTML with a stable id and returns them for the TOC. Text is untouched. */
function tagHeadings(html: string): { html: string; headings: TocHeading[] } {
  const seen = new Map<string, number>();
  const headings: TocHeading[] = [];

  const tagged = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || `section-${headings.length + 1}`;
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    headings.push({ id, text });
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  return { html: tagged, headings };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const fallback = staticArticleBySlug[params.slug];
  const { data: post } = await supabasePublic
    .from("posts")
    .select("*, author:users(name), category:categories(name)")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();

  const fallbackPost = post ?? {
    id: params.slug,
    slug: params.slug,
    title: fallback?.title ?? "",
    excerpt: fallback?.excerpt ?? "",
    content: fallback?.content ?? "",
    featured_image: fallback?.image ?? "",
    published_at: fallback ? new Date(fallback.date) : null,
    reading_time: Number((fallback?.readTime ?? "5 min read").match(/\d+/)?.[0] ?? 5),
    author: { name: "IncentIQ Editorial" },
    category: { name: fallback?.tag ?? "ICM vs CRM" },
  };

  const effectivePost = post ?? fallbackPost;

  if (!effectivePost.title) notFound();

  let related: Array<{ title: string; slug: string; excerpt: string; category?: { name?: string } | Array<{ name?: string }> }> = [];
  if (post) {
    const { data: relatedData } = await supabasePublic
      .from("posts")
      .select("title, slug, excerpt, category:categories(name)")
      .eq("status", "PUBLISHED")
      .neq("slug", post.slug)
      .order("published_at", { ascending: false })
      .limit(3);
    related = relatedData ?? [];
  } else {
    related = blogPosts
      .filter((item) => item.slug !== params.slug)
      .slice(0, 3)
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        category: { name: item.tag },
      }));
  }

  const contentHtml = post ? tagHeadings(post.content).html : tagHeadings(fallbackPost.content).html;
  const headings = post ? tagHeadings(post.content).headings : tagHeadings(fallbackPost.content).headings;

  return (
    <>
      <Navbar />
      <main>
        {/* article header */}
        <section className="mesh grain relative overflow-hidden pb-12 pt-32 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-teal opacity-50 blur-3xl" />
          <div className="shell relative">
            <div className="max-w-3xl">
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-green hover:text-dark-green"
              >
                <IconArrow className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                Back to blog
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-slate">
                {(() => {
                  const cat = Array.isArray(effectivePost.category) ? effectivePost.category[0] : effectivePost.category;
                  return cat?.name ? (
                    <span className="rounded-full bg-light-green px-3 py-1 text-[12px] font-semibold text-green">
                      {cat.name}
                    </span>
                  ) : null;
                })()}
                <span>{formatDate(effectivePost.published_at)}</span>
                {effectivePost.reading_time && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-light-gray" />
                    <span>{effectivePost.reading_time} min read</span>
                  </>
                )}
              </div>

              <h1 className="mt-5 text-balance font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-dark-green">
                {highlightTitle(effectivePost.title)}
              </h1>
              {effectivePost.excerpt && (
                <p className="mt-5 max-w-2xl text-[18px] leading-[1.6] text-slate text-pretty">{effectivePost.excerpt}</p>
              )}
            </div>

            {effectivePost.featured_image && (
              <div
                className="mt-8 mx-auto rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(15,45,36,0.12)]"
                style={{ maxWidth: "760px", width: "100%" }}
              >
                <Image
                  src={effectivePost.featured_image}
                  alt={effectivePost.title}
                  width={1200}
                  height={630}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* article body */}
        <article className="py-14 sm:py-16">
          <div className="shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
              <TableOfContents headings={headings} />

              <div className="max-w-2xl">
                <Reveal>
                  <div
                    className="prose prose-lg max-w-none [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:border-l-[3px] [&_h2]:border-green [&_h2]:pl-4 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-dark-green [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-[1.2rem] [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-dark-green [&_p]:mt-4 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-slate [&>*:first-child]:mt-0"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </Reveal>

                {/* takeaway callout */}
                <Reveal>
                  <div
                    className="mt-12 rounded-2xl p-8 text-white"
                    style={{ background: "linear-gradient(135deg, #0F2E24 0%, rgba(0,166,81,0.8) 100%)" }}
                  >
                    <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="eyebrow text-white/70">The takeaway</p>
                        <p className="mt-3 flex items-start gap-3 text-[15.5px] leading-relaxed text-white">
                          <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                          IncentIQ brings incentive data, calculations, and AI into one governed system on <ServiceNowLogo size="md" /> — so compensation is transparent, intelligent, and trusted at enterprise scale.
                        </p>
                      </div>
                      <Link
                        href="/book-demo"
                        className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-green transition-colors hover:bg-light-green"
                      >
                        Book a demo
                        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </article>

        {/* related posts */}
        {related.length > 0 && (
          <section className="border-t border-light-gray bg-light-gray py-14 sm:py-16">
            <div className="shell">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-[22px] font-bold text-dark-green">Keep reading</h2>
                <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green hover:text-dark-green">
                  All articles
                  <IconArrow className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/resources/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-green/[0.12] bg-white p-6 shadow-[0_4px_16px_rgba(15,45,36,0.07)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    {(() => {
                      const rCat = Array.isArray(r.category) ? r.category[0] : r.category;
                      return rCat?.name ? (
                        <span className="w-fit rounded-full bg-light-green px-3 py-1 text-[12px] font-semibold text-green">
                          {rCat.name}
                        </span>
                      ) : null;
                    })()}
                    <h3 className="mt-4 text-[16px] font-bold leading-snug text-navy transition-colors group-hover:text-green">{r.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate">{r.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-green transition-transform group-hover:translate-x-0.5">
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
