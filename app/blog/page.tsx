import { supabasePublic } from "@/lib/supabase";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — IncentIQ",
  description: "Insights, guides, and best practices for incentive compensation management on ServiceNow.",
};

export const revalidate = 60;

export default async function BlogListPage() {
  const { data } = await supabasePublic
    .from("posts")
    .select("id, title, slug, excerpt, featured_image, published_at, reading_time, author:users(name), category:categories(name)")
    .eq("status", "PUBLISHED")
    .order("published_at", { ascending: false });
  const posts = data ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <span className="eyebrow text-green text-xs">Blog</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-dark-green">
          Insights & Resources
        </h1>
        <p className="mt-4 text-dark-green/60 max-w-xl mx-auto">
          Best practices, product updates, and expert perspectives on incentive compensation management.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-dark-green/40">No posts published yet.</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: (typeof posts)[number]) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="h-full overflow-hidden rounded-2xl border border-light-gray bg-white transition-all duration-300 hover:shadow-float hover:-translate-y-0.5">
                {post.featured_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-green/20 via-green/10 to-light-green/60 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-green/20 select-none">
                      {post.title[0]}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span className="rounded-full bg-green/10 px-2.5 py-0.5 text-[11px] font-semibold text-green">
                        {post.category.name}
                      </span>
                    )}
                    {post.reading_time && (
                      <span className="text-xs text-dark-green/40">{post.reading_time} min read</span>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-bold leading-snug text-dark-green group-hover:text-green transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-dark-green/60 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-xs text-dark-green/40">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.author?.name && <span>·</span>}
                    <span>{formatDate(post.published_at ?? post.created_at)}</span>
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
