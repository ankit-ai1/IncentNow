import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/sections/ArticleDetail";
import { getGuide, guideSlugs, guides } from "@/content/guides";

export function generateStaticParams() {
  return guideSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return { title: `${guide.title} — IncentNow Guides`, description: guide.excerpt };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const related = guides
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3)
    .map((g) => ({
      href: `/resources/guides/${g.slug}`,
      title: g.title,
      excerpt: g.excerpt,
      chip: g.level,
    }));

  return (
    <ArticleDetail
      backHref="/resources/guides"
      backLabel="Back to guides"
      chips={[guide.level, `${guide.steps} steps`, guide.readTime]}
      title={guide.title}
      excerpt={guide.excerpt}
      sections={guide.content}
      relatedTitle="More guides"
      related={related}
    />
  );
}
