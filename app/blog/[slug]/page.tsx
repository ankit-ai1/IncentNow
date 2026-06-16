import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findFirst({ where: { slug: params.slug, status: "PUBLISHED" } });
  if (!post) return { title: "Post not found" };

  return {
    title: post.metaTitle ?? `${post.title} — IncentIQ Blog`,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    robots: {
      index: !post.noIndex,
      follow: !post.noFollow,
    },
    openGraph: {
      title: post.ogTitle ?? post.title,
      description: post.ogDescription ?? post.excerpt ?? undefined,
      images: post.ogImage ? [post.ogImage] : post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findFirst({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: { author: { select: { name: true, avatar: true } }, category: true, tags: { include: { tag: true } } },
  });

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <nav className="mb-8">
        <Link href="/blog" className="text-sm text-accent hover:underline">← All Posts</Link>
      </nav>

      {/* Category + meta */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {post.category && (
          <span className="rounded-full bg-accent px-3 py-1 text-[11.5px] font-semibold text-canvas">
            {post.category.name}
          </span>
        )}
        {post.readingTime && (
          <span className="text-sm text-ink/50">{post.readingTime} min read</span>
        )}
      </div>

      <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="mt-5 text-lg text-ink/60 leading-relaxed">{post.excerpt}</p>
      )}

      <div className="my-8 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-[#4a78c7] flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {post.author?.name?.[0]?.toUpperCase() ?? "A"}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{post.author?.name ?? "IncentIQ Team"}</p>
          <p className="text-xs text-ink/50">{formatDate(post.publishedAt ?? post.createdAt)}</p>
        </div>
      </div>

      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage}
          alt={post.title}
          className="mb-10 w-full rounded-2xl object-cover shadow-float"
          style={{ maxHeight: "480px" }}
        />
      )}

      {/* Blog content */}
      <div
        className="prose prose-lg prose-neutral max-w-none text-ink
          prose-headings:font-display prose-headings:font-bold prose-headings:text-ink
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-code:bg-surface prose-code:rounded prose-code:px-1 prose-code:py-0.5
          prose-pre:bg-ink prose-pre:text-canvas
          prose-blockquote:border-l-accent prose-blockquote:text-ink/70
          prose-img:rounded-xl prose-img:shadow-soft"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map(({ tag }: { tag: { id: string; name: string } }) => (
            <span
              key={tag.id}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink/60"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-line bg-gradient-to-br from-accent-wash/40 to-sage/20 p-8 text-center">
        <p className="font-display text-2xl font-bold text-ink mb-2">Ready to transform your ICM?</p>
        <p className="text-ink/60 mb-5">See how IncentIQ automates incentive compensation on ServiceNow.</p>
        <Link
          href="/book-demo"
          className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-all hover:bg-accent hover:shadow-[0_6px_20px_rgba(43,74,127,0.3)]"
        >
          Book a demo
        </Link>
      </div>
    </main>
  );
}
