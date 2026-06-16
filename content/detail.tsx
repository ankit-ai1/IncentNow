import type { ReactNode } from "react";
import {
  IconQuota, IconPlan, IconPerformance, IconStatement, IconDispute, IconAssistant,
  IconForecast, IconAnomaly, IconCoaching, IconRecommend, IconData, IconWorkflow,
  IconScale, IconGovernance, IconVisibility, IconSpark, IconTransparency, IconTrust,
  IconAttainment, IconResolve, IconOrg,
  type IconProps,
} from "@/components/ui/icons";

export type Group = "platform" | "capabilities" | "solutions" | "resources";

export type DetailContent = {
  group: Group;
  slug: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  highlights: { icon: (p: IconProps) => JSX.Element; title: string; body: string }[];
  points: string[];
  overviewHref: string;
  overviewLabel: string;
};

const groupOverview: Record<Group, { href: string; label: string }> = {
  platform: { href: "/platform", label: "Platform overview" },
  capabilities: { href: "/capabilities", label: "All capabilities" },
  solutions: { href: "/solutions", label: "All solutions" },
  resources: { href: "/resources", label: "All resources" },
};

function make(
  group: Group,
  slug: string,
  eyebrow: string,
  title: ReactNode,
  lead: string,
  highlights: DetailContent["highlights"],
  points: string[],
): DetailContent {
  return {
    group,
    slug,
    eyebrow,
    title,
    lead,
    highlights,
    points,
    overviewHref: groupOverview[group].href,
    overviewLabel: groupOverview[group].label,
  };
}

/* ----------------------------- PLATFORM ----------------------------- */

const platform: DetailContent[] = [
  make(
    "platform",
    "unified-data-model",
    "PLATFORM",
    <>Unified data model — <span className="text-gradient">one source of truth.</span></>,
    "Bring incentive data, calculations, and reporting into a single governed model on ServiceNow, so Sales, Finance, and Leadership all work from the same numbers.",
    [
      { icon: IconData, title: "One connected dataset", body: "Org, quotas, plans, results, and payouts live together — no exports, no reconciliation." },
      { icon: IconWorkflow, title: "Governed by design", body: "Every change is versioned and auditable, inherited from the Now Platform." },
      { icon: IconVisibility, title: "Shared visibility", body: "The same trusted data, surfaced for the way each team works." },
    ],
    ["No spreadsheet exports or manual merges", "Full version history on every record", "Real-time consistency across teams"],
  ),
  make(
    "platform",
    "ai-intelligence",
    "PLATFORM",
    <>AI intelligence, <span className="text-gradient">woven through every workflow.</span></>,
    "Forecasting, anomaly detection, and coaching are built into IncentIQ — not bolted on — so insight arrives where decisions are made.",
    [
      { icon: IconForecast, title: "Attainment forecasting", body: "See where reps and teams will land before the quarter closes." },
      { icon: IconAnomaly, title: "Anomaly detection", body: "Flag payout outliers and data issues before they reach a statement." },
      { icon: IconCoaching, title: "Coaching & next best action", body: "Guide reps to the highest-impact deals for their plan." },
    ],
    ["Plain-language answers for reps", "Proactive flags for finance", "Forecasts leadership can trust"],
  ),
];

/* --------------------------- CAPABILITIES --------------------------- */

const capabilities: DetailContent[] = [
  make(
    "capabilities",
    "quota-management",
    "CAPABILITY",
    <>Quota management <span className="text-gradient">with full auditability.</span></>,
    "Set, distribute, and adjust quotas across your org with complete version history — every change traceable from team to individual rep.",
    [
      { icon: IconQuota, title: "Flexible distribution", body: "Cascade quotas down the hierarchy or set them by territory and role." },
      { icon: IconGovernance, title: "Versioned changes", body: "Adjust mid-cycle with a full audit trail of who changed what, and when." },
      { icon: IconOrg, title: "Org-aware", body: "Quotas map to your modeled hierarchy, territories, and reporting lines." },
    ],
    ["Mid-cycle adjustments without chaos", "Complete change history", "Team-to-rep drill-down"],
  ),
  make(
    "capabilities",
    "incentive-plans",
    "CAPABILITY",
    <>Incentive plans, <span className="text-gradient">deployed without spreadsheets.</span></>,
    "Design tiered plans, accelerators, and rules in a visual builder, then deploy them through a governed workflow — no spreadsheets, no shadow logic.",
    [
      { icon: IconPlan, title: "Tiers & accelerators", body: "Model multipliers, thresholds, and SPIFs with a rules engine." },
      { icon: IconWorkflow, title: "Governed deployment", body: "Roll out plan changes through review and approval, not email." },
      { icon: IconScale, title: "Multi-plan at scale", body: "Run distinct structures per business unit with central governance." },
    ],
    ["Visual plan builder", "Reusable rules and components", "Controlled rollout"],
  ),
  make(
    "capabilities",
    "performance-tracking",
    "CAPABILITY",
    <>Performance tracking <span className="text-gradient">in real time.</span></>,
    "Track attainment as results land, with drill-downs from company to team to individual rep — no month-end surprises.",
    [
      { icon: IconPerformance, title: "Live attainment", body: "Progress against quota updates continuously, not at close." },
      { icon: IconAttainment, title: "Drill-downs", body: "Move from company to team to rep in a click." },
      { icon: IconVisibility, title: "Shared dashboards", body: "One view aligned across Sales, Finance, and Leadership." },
    ],
    ["Continuous, real-time updates", "Company-to-rep visibility", "No reconciliation at month end"],
  ),
  make(
    "capabilities",
    "statements",
    "CAPABILITY",
    <>Statements reps <span className="text-gradient">trust at a glance.</span></>,
    "Generate clear, itemized payout statements that show exactly how every dollar was earned — building trust and cutting inbound questions.",
    [
      { icon: IconStatement, title: "Itemized payouts", body: "Every line traces back to the deal, rule, and rate behind it." },
      { icon: IconTransparency, title: "Full transparency", body: "Reps see the why behind each number, not just a total." },
      { icon: IconTrust, title: "Fewer disputes", body: "Clarity up front means far fewer questions at payout time." },
    ],
    ["Line-level traceability", "Self-serve clarity for reps", "Lower dispute volume"],
  ),
  make(
    "capabilities",
    "dispute-resolution",
    "CAPABILITY",
    <>Dispute resolution <span className="text-gradient">through a governed flow.</span></>,
    "Route, investigate, and resolve payout disputes through a controlled workflow — with a complete record of every decision.",
    [
      { icon: IconDispute, title: "Structured intake", body: "Reps raise disputes in context, with the relevant data attached." },
      { icon: IconResolve, title: "Investigate & resolve", body: "Route to the right owner and track to closure with SLAs." },
      { icon: IconGovernance, title: "Auditable record", body: "Every dispute and decision is logged for finance and compliance." },
    ],
    ["In-context dispute intake", "Ownership and SLAs", "Complete audit trail"],
  ),
  make(
    "capabilities",
    "ai-assistant",
    "CAPABILITY",
    <>An AI assistant <span className="text-gradient">for every rep.</span></>,
    "Reps get instant, plain-language answers on earnings, quota, and the next best payout — without pinging ops.",
    [
      { icon: IconAssistant, title: "Ask anything", body: "“How do I hit top tier?” gets an answer grounded in their plan." },
      { icon: IconRecommend, title: "Next best action", body: "Surface the deals that move attainment the most." },
      { icon: IconSpark, title: "Always on", body: "Self-serve answers around the clock, with zero ops overhead." },
    ],
    ["Plain-language earnings answers", "Plan-aware recommendations", "Fewer questions to ops"],
  ),
];

/* ----------------------------- SOLUTIONS ---------------------------- */

const solutions: DetailContent[] = [
  make(
    "solutions",
    "sales",
    "FOR SALES TEAMS",
    <>Clarity on <span className="text-gradient">every dollar earned.</span></>,
    "Reps see real-time attainment, payout projections, and plain-language answers to “how do I earn more?” — no spreadsheets, no month-end surprises.",
    [
      { icon: IconPerformance, title: "Live earnings", body: "Real-time attainment and payout projections." },
      { icon: IconAssistant, title: "AI assistant", body: "Instant answers on quota, earnings, and next best deal." },
      { icon: IconStatement, title: "Clear statements", body: "Itemized payouts reps can trust at a glance." },
    ],
    ["Live earnings & quota attainment", "AI assistant for payout questions", "Transparent, itemized statements"],
  ),
  make(
    "solutions",
    "finance",
    "FOR FINANCE",
    <>Accurate, <span className="text-gradient">auditable payouts.</span></>,
    "Every calculation is governed, versioned, and traceable. Close the comp cycle with confidence and a complete audit trail behind every number.",
    [
      { icon: IconGovernance, title: "Audit trail", body: "Full version history on every calculation and change." },
      { icon: IconResolve, title: "Governed disputes", body: "Resolve exceptions through a controlled workflow." },
      { icon: IconTrust, title: "Payout accuracy", body: "Confidence in accruals and every paid dollar." },
    ],
    ["Full version history & audit trail", "Governed dispute resolution", "Accruals and payout accuracy"],
  ),
  make(
    "solutions",
    "revops",
    "FOR REVOPS",
    <>Plan design <span className="text-gradient">without spreadsheets.</span></>,
    "Model org hierarchy, design tiered plans and accelerators, and deploy changes through a controlled workflow — all in one connected system.",
    [
      { icon: IconPlan, title: "Rules engine", body: "Tiers, accelerators, and SPIFs without shadow logic." },
      { icon: IconOrg, title: "Org modeling", body: "Hierarchy, territories, and reporting lines in one place." },
      { icon: IconWorkflow, title: "Governed rollout", body: "Deploy plan changes with review and approval." },
    ],
    ["Tiers, accelerators & rules engine", "Org & territory modeling", "Deploy changes with governance"],
  ),
  make(
    "solutions",
    "leadership",
    "FOR LEADERSHIP",
    <>Real-time <span className="text-gradient">performance visibility.</span></>,
    "One source of truth across Sales, Finance, and Leadership. Drill from company to team to rep, and forecast attainment before the quarter closes.",
    [
      { icon: IconVisibility, title: "Drill-downs", body: "Company-to-rep visibility in a click." },
      { icon: IconForecast, title: "Forecasting", body: "See where the quarter will land, early." },
      { icon: IconAnomaly, title: "Anomaly flags", body: "Catch issues before they hit a statement." },
    ],
    ["Company-to-rep drill-downs", "AI forecasting & anomaly flags", "Aligned, trusted reporting"],
  ),
];

/* ----------------------------- RESOURCES ---------------------------- */
/* Resources now have their own dedicated pages:
   /resources/blog, /resources/guides, /resources/help-center (each with detail routes). */

const resources: DetailContent[] = [];

/* ------------------------------ EXPORTS ----------------------------- */

export const detailByGroup: Record<Group, DetailContent[]> = {
  platform,
  capabilities,
  solutions,
  resources,
};

export function getDetail(group: Group, slug: string): DetailContent | undefined {
  return detailByGroup[group].find((d) => d.slug === slug);
}

export function slugsFor(group: Group): { slug: string }[] {
  return detailByGroup[group].map((d) => ({ slug: d.slug }));
}
