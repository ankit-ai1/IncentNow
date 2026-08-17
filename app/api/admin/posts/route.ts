import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase, mapPost } from "@/lib/supabase";
import { blogSchema } from "@/lib/validations/blog";
import { calculateReadingTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search") || "";
  const page  = parseInt(searchParams.get("page")  || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const from  = (page - 1) * limit;
  const to    = from + limit - 1;

  let query = supabase
    .from("posts")
    .select("*, author:users(id,name,avatar), category:categories(*), post_tags(tags(id,name,slug))", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status) query = query.eq("status", status);
  if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: (data ?? []).map(mapPost), total: count ?? 0, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body   = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { tagIds, ...d } = parsed.data;
  const readingTime = calculateReadingTime(d.content);

  /* The editor sends "" for an unset category, and "" is not nullish — so
     `?? null` lets it through to a uuid column, which Postgres rejects with
     22P02. Empty strings have to become real nulls. */
  const categoryId  = d.categoryId  || null;
  const scheduledAt = d.scheduledAt || null;
  /* Stamp a publish date the moment a post goes live; the form has no date
     field, so otherwise a PUBLISHED post carries a null published_at and
     sorts ahead of everything (Postgres orders DESC as NULLS FIRST). */
  const publishedAt = d.publishedAt || (d.status === "PUBLISHED" ? new Date().toISOString() : null);

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title:            d.title,
      slug:             d.slug,
      excerpt:          d.excerpt,
      content:          d.content,
      featured_image:   d.featuredImage,
      status:           d.status,
      published_at:     publishedAt,
      scheduled_at:     scheduledAt,
      meta_title:       d.metaTitle,
      meta_description: d.metaDescription,
      keywords:         d.keywords,
      canonical_url:    d.canonicalUrl,
      og_title:         d.ogTitle,
      og_description:   d.ogDescription,
      og_image:         d.ogImage,
      no_index:         d.noIndex,
      no_follow:        d.noFollow,
      reading_time:     readingTime,
      category_id:      categoryId,
      author_id:        session.user?.id ?? "",
    })
    .select("*, author:users(id,name,avatar), category:categories(*)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Insert tags
  if (tagIds?.length && post) {
    await supabase.from("post_tags").insert(tagIds.map((tag_id) => ({ post_id: post.id, tag_id })));
  }

  return NextResponse.json(mapPost(post), { status: 201 });
}
