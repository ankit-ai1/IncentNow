import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase, mapPost } from "@/lib/supabase";
import { blogSchema } from "@/lib/validations/blog";
import { calculateReadingTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("posts")
    .select("*, author:users(id,name,avatar), category:categories(*), post_tags(tags(id,name,slug))")
    .eq("id", params.id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(mapPost(data));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body   = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { tagIds, ...d } = parsed.data;
  const readingTime = calculateReadingTime(d.content);

  /* The editor sends "" for an unset category, and "" is not nullish — so
     `?? null` lets it through to a uuid column, which Postgres rejects with
     22P02 and the whole update fails. Empty strings have to become nulls. */
  const categoryId  = d.categoryId  || null;
  const scheduledAt = d.scheduledAt || null;

  /* The edit form never loads publishedAt, so it always posts back empty —
     taken literally that would erase the publish date of every post on each
     save. Keep whatever is already stored, and stamp one the first time a
     post is switched to PUBLISHED. */
  const { data: existing } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", params.id)
    .single();

  const publishedAt =
    d.publishedAt ||
    existing?.published_at ||
    (d.status === "PUBLISHED" ? new Date().toISOString() : null);

  const { data: post, error } = await supabase
    .from("posts")
    .update({
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
    })
    .eq("id", params.id)
    .select("*, author:users(id,name,avatar), category:categories(*)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Replace tags
  await supabase.from("post_tags").delete().eq("post_id", params.id);
  if (tagIds?.length) {
    await supabase.from("post_tags").insert(tagIds.map((tag_id) => ({ post_id: params.id, tag_id })));
  }

  return NextResponse.json(mapPost(post));
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
