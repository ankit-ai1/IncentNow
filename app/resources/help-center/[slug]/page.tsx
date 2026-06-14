import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/sections/ArticleDetail";
import { getHelpArticle, helpSlugs, helpArticles } from "@/content/help";

export function generateStaticParams() {
  return helpSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getHelpArticle(params.slug);
  if (!article) return {};
  return { title: `${article.title} — IncentNow Help`, description: article.excerpt };
}

export default function HelpArticlePage({ params }: { params: { slug: string } }) {
  const article = getHelpArticle(params.slug);
  if (!article) notFound();

  const related = helpArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(helpArticles.filter((a) => a.category !== article.category))
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({
      href: `/resources/help-center/${a.slug}`,
      title: a.title,
      excerpt: a.excerpt,
      chip: a.category,
    }));

  return (
    <ArticleDetail
      backHref="/resources/help-center"
      backLabel="Back to help center"
      chips={[article.category, article.readTime]}
      title={article.title}
      excerpt={article.excerpt}
      sections={article.content}
      relatedTitle="Related articles"
      related={related}
    />
  );
}
