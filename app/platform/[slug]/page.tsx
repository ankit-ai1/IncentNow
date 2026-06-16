import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/DetailPage";
import { getDetail, slugsFor } from "@/content/detail";

export function generateStaticParams() {
  return slugsFor("platform");
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const content = getDetail("platform", params.slug);
  if (!content) return {};
  const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${name} — Platform — IncentIQ`, description: content.lead };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = getDetail("platform", params.slug);
  if (!content) notFound();
  return <DetailPage content={content} />;
}
