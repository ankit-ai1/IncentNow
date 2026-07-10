import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformDetailPage } from "@/components/sections/PlatformDetailPage";
import { getDetail, slugsFor } from "@/content/detail";

export function generateStaticParams() {
  return slugsFor("platform");
}

const metadataOverrides: Record<string, Metadata> = {
  "unified-data-model": {
    title: "Enterprise Incentive Management | Sales Performance Software",
    description:
      "Streamline incentive programs with enterprise incentive management software. Automate payouts, and boost sales productivity.",
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (metadataOverrides[params.slug]) return metadataOverrides[params.slug];
  const content = getDetail("platform", params.slug);
  if (!content) return {};
  const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${name} — Platform — IncentIQ`, description: content.lead as string };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = getDetail("platform", params.slug);
  if (!content) notFound();
  return <PlatformDetailPage content={content} />;
}
