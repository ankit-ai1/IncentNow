import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamPage, type TeamPageProps, type MockVariant } from "@/components/sections/TeamPage";
import {
  IconAttainment, IconAssistant, IconTrust,
  IconPlan, IconOrg, IconGovernance,
  IconResolve,
  IconVisibility, IconForecast, IconAnomaly,
} from "@/components/ui/icons";

/* ── Per-team content ─────────────────────────────────── */

type TeamEntry = TeamPageProps & { meta: { title: string; description: string } };

const teams: Record<string, TeamEntry> = {
  sales: {
    meta: {
      title: "Sales Teams — IncentIQ",
      description: "Real-time visibility into attainment, commissions, and payouts. AI-powered answers on earnings and next-best actions.",
    },
    eyebrow: "FOR SALES TEAMS",
    title: <>Turn performance into <span className="text-gradient">predictable earnings.</span></>,
    body: "Reps gain real-time visibility into attainment, commissions, bonuses, and payouts—along with intelligent insights that help them understand what’s driving earnings and what to do next.",
    highlightsTitle: "What Sales Teams Gain",
    highlights: [
      {
        icon: IconAttainment,
        title: "Know What You’ve Earned",
        body: "Real-time visibility into attainment, commissions, and projected payouts.",
      },
      {
        icon: IconAssistant,
        title: "Ask Anything",
        body: "AI-powered answers on quotas, earnings, accelerators, and next-best actions.",
      },
      {
        icon: IconTrust,
        title: "Trust Every Payout",
        body: "Transparent, itemized statements that explain every dollar earned.",
      },
    ],
    mockups: ["statement", "performance", "ai-chat"] as [MockVariant, MockVariant, MockVariant],
  },

  revops: {
    meta: {
      title: "RevOps — IncentIQ",
      description: "Design compensation plans, model org hierarchies, and deploy changes with full governance — all in one platform.",
    },
    eyebrow: "FOR REVOPS",
    title: <>Design incentives <span className="text-gradient">with confidence.</span></>,
    body: "Model territories, hierarchies, quotas, accelerators, and compensation plans in a single governed platform. Launch changes faster, reduce operational complexity, and maintain complete control at scale.",
    highlightsTitle: "What You Get",
    highlights: [
      {
        icon: IconPlan,
        title: "Intelligent Plan Management",
        body: "Design tiers, accelerators, SPIFs, bonuses, and incentive rules in a centralized rules engine.",
      },
      {
        icon: IconOrg,
        title: "Unified Organizational Structure",
        body: "Model hierarchies, territories, quota ownership, and reporting relationships in one connected platform.",
      },
      {
        icon: IconGovernance,
        title: "Governed Plan Deployment",
        body: "Roll out compensation changes with approvals, versioning, audit trails, and enterprise-grade controls.",
      },
    ],
    mockups: ["plan-design", "org-tree", "quota-dist"] as [MockVariant, MockVariant, MockVariant],
  },

  finance: {
    meta: {
      title: "Finance — IncentIQ",
      description: "Every calculation governed, versioned, and fully traceable. Control comp expense and maintain a complete audit trail.",
    },
    eyebrow: "FOR FINANCE",
    title: <>Control costs <span className="text-gradient">with confidence.</span></>,
    body: "Every calculation is governed, versioned, and fully traceable. IncentIQ helps finance teams manage compensation expense, accelerate close cycles, and maintain a complete audit trail behind every payout.",
    highlightsTitle: "What You Get",
    highlights: [
      {
        icon: IconGovernance,
        title: "Complete Auditability",
        body: "Track every calculation, rule change, approval, and adjustment with full version history and traceability.",
      },
      {
        icon: IconResolve,
        title: "Controlled Exception Management",
        body: "Resolve disputes, exceptions, and payout inquiries through governed workflows with clear accountability.",
      },
      {
        icon: IconTrust,
        title: "Trusted Financial Accuracy",
        body: "Ensure accurate accruals, predictable compensation expenses, and confidence in every payout.",
      },
    ],
    mockups: ["accruals", "audit-log", "payout-calc"] as [MockVariant, MockVariant, MockVariant],
  },

  leadership: {
    meta: {
      title: "Leadership — IncentIQ",
      description: "Connect performance, incentive spend, and results in one view. Forecast attainment and spot risks before the quarter closes.",
    },
    eyebrow: "FOR LEADERSHIP",
    title: <>Align incentives <span className="text-gradient">to business outcomes.</span></>,
    body: "Connect sales performance, incentive spend, and business results in one view. Monitor attainment trends, identify risks early, and make data-driven decisions before the quarter closes.",
    highlightsTitle: "What You Get",
    highlights: [
      {
        icon: IconVisibility,
        title: "Unified Performance Visibility",
        body: "Track attainment, compensation, and performance from company to team to rep.",
      },
      {
        icon: IconForecast,
        title: "Predictive Forecasting",
        body: "See where performance and incentive spend are likely to land before the quarter closes.",
      },
      {
        icon: IconAnomaly,
        title: "Intelligent Anomaly Detection",
        body: "Identify payout exceptions, unusual trends, and emerging risks before they impact the business.",
      },
    ],
    mockups: ["kpi-grid", "team-perf", "forecast"] as [MockVariant, MockVariant, MockVariant],
  },
};

/* ── Next.js route exports ────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(teams).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const team = teams[params.slug];
  if (!team) return {};
  return { title: team.meta.title, description: team.meta.description };
}

export default function TeamDetailPage({ params }: { params: { slug: string } }) {
  const team = teams[params.slug];
  if (!team) notFound();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { meta, ...props } = team;
  return <TeamPage {...props} />;
}
