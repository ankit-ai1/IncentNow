import { supabasePublic } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabasePublic
    .from("posts")
    .select("title, meta_title, meta_description, excerpt, no_index, no_follow, og_title, og_description, og_image, featured_image")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();
  if (!post) return { title: "Post not found" };

  return {
    title: post.meta_title ?? `${post.title} — IncentIQ Blog`,
    description: post.meta_description ?? post.excerpt ?? undefined,
    robots: {
      index: !post.no_index,
      follow: !post.no_follow,
    },
    openGraph: {
      title: post.og_title ?? post.title,
      description: post.og_description ?? post.excerpt ?? undefined,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data: post } = await supabasePublic
    .from("posts")
    .select("*, author:users(name,avatar), category:categories(*), post_tags(tags(id,name))")
    .eq("slug", params.slug)
    .eq("status", "PUBLISHED")
    .single();

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <nav className="mb-8">
        <Link href="/blog" className="text-sm text-green hover:underline">← All Posts</Link>
      </nav>

      {/* Category + meta */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {(() => {
          const cat = Array.isArray(post.category) ? post.category[0] : post.category;
          return cat?.name ? (
            <span className="rounded-full bg-green px-3 py-1 text-[11.5px] font-semibold text-white">
              {cat.name}
            </span>
          ) : null;
        })()}
        {post.reading_time && (
          <span className="text-sm text-dark-green/50">{post.reading_time} min read</span>
        )}
      </div>

      <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-dark-green sm:text-5xl">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="mt-5 text-lg text-dark-green/60 leading-relaxed">{post.excerpt}</p>
      )}

      <div className="my-8 flex items-center gap-3">
        {(() => {
          const author = Array.isArray(post.author) ? post.author[0] : post.author;
          return (
            <>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green to-accent-green flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {author?.name?.[0]?.toUpperCase() ?? "A"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-dark-green">{author?.name ?? "IncentIQ Team"}</p>
                <p className="text-xs text-dark-green/50">{formatDate(post.published_at ?? post.created_at)}</p>
              </div>
            </>
          );
        })()}
      </div>

      {post.featured_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featured_image}
          alt={post.title}
          className="mb-10 w-full rounded-2xl object-cover shadow-float"
          style={{ maxHeight: "480px" }}
        />
      )}

      {/* Blog content */}
      <div
        className="prose prose-lg prose-neutral max-w-none text-dark-green
          prose-headings:font-display prose-headings:font-bold prose-headings:text-dark-green
          prose-a:text-green prose-a:no-underline hover:prose-a:underline
          prose-code:bg-light-gray prose-code:rounded prose-code:px-1 prose-code:py-0.5
          prose-pre:bg-dark-green prose-pre:text-white
          prose-blockquote:border-l-accent prose-blockquote:text-dark-green/70
          prose-img:rounded-xl prose-img:shadow-soft"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {(post.post_tags ?? []).length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {(post.post_tags as { tags: { id: string; name: string } }[]).map(({ tags: tag }) => (
            <span
              key={tag.id}
              className="rounded-full border border-light-gray bg-light-gray px-3 py-1 text-xs text-dark-green/60"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-light-gray bg-gradient-to-br from-light-green/40 to-light-green/20 p-8 text-center">
        <p className="font-display text-2xl font-bold text-dark-green mb-2">Ready to transform your ICM?</p>
        <p className="text-dark-green/60 mb-5">See how IncentIQ automates incentive compensation on ServiceNow.</p>
        <Link
          href="/book-demo"
          style={{ backgroundColor: "#00A651", color: "#FFFFFF" }}
          className="inline-flex items-center rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0F2E24] hover:shadow-[0_10px_28px_rgba(0,166,81,0.30)]"
        >
          Book a demo
        </Link>
      </div>
    </main>
  );
}
