import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/sections/DetailPage";
import { getDetail, slugsFor } from "@/content/detail";

export function generateStaticParams() {
  return slugsFor("capabilities");
}

const metadataOverrides: Record<string, Metadata> = {
  "quota-management": {
    title: "Quota Management Software | ServiceNow ICM App",
    description:
      "Manage sales quotas with ease using the ServiceNow ICM App. Automate quota planning, tracking, and performance management.",
  },
  "organization-management": {
    title: "Commission Automation Software | Commission Tracking",
    description:
      "Automate commission calculations, track payouts accurately, and eliminate manual errors with powerful commission automation software.",
  },
  "incentive-plans": {
    title: "AI Incentive Compensation Management | Sales Performance",
    description:
      "Leverage AI-powered incentive compensation management to optimize sales performance, automate rewards, and drive better outcomes.",
  },
  "performance-tracking": {
    title: "ServiceNow Bonus Management | Enterprise HR Bonuses",
    description:
      "Simplify enterprise bonus management with ServiceNow. Automate HR bonus calculations, approvals, and payouts with full transparency.",
  },
  "data-import": {
    title: "ServiceNow Incentive Compensation Solution | IncentIQ",
    description:
      "Transform incentive compensation with IncentIQ on ServiceNow. Automate incentive plans, improve accuracy, and enhance performance.",
  },
  "ai-assistant": {
    title: "IncentIQ AI Assistant | Incentive Compensation Management",
    description:
      "Manage incentive compensation efficiently with IncentIQ AI. Automate calculations, track performance, and simplify administration.",
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (metadataOverrides[params.slug]) return metadataOverrides[params.slug];
  const content = getDetail("capabilities", params.slug);
  if (!content) return {};
  const name = content.eyebrow
    .split(" ")
    .map((w) => (w === "&" ? "&" : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
  return { title: `${name} — IncentIQ`, description: content.lead as string };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = getDetail("capabilities", params.slug);
  if (!content) notFound();
  return <DetailPage content={content} />;
}
