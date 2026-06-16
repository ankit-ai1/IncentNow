import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — IncentIQ",
  description: "Insights, guides, and best practices for incentive compensation management on ServiceNow.",
};

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } }, category: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <span className="eyebrow text-accent text-xs">Blog</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">
          Insights & Resources
        </h1>
        <p className="mt-4 text-ink/60 max-w-xl mx-auto">
          Best practices, product updates, and expert perspectives on incentive compensation management.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-ink/40">No posts published yet.</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: (typeof posts)[number]) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="h-full overflow-hidden rounded-2xl border border-line bg-canvas transition-all duration-300 hover:shadow-float hover:-translate-y-0.5">
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-accent/20 via-accent/10 to-sage/20 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-accent/20 select-none">
                      {post.title[0]}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                        {post.category.name}
                      </span>
                    )}
                    {post.readingTime && (
                      <span className="text-xs text-ink/40">{post.readingTime} min read</span>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-ink/60 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-xs text-ink/40">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.author?.name && <span>·</span>}
                    <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
