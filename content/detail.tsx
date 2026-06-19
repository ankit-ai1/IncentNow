import type { ReactNode } from "react";
import {
  IconQuota, IconPlan, IconPerformance, IconStatement, IconAssistant,
  IconForecast, IconAnomaly, IconCoaching, IconData, IconWorkflow,
  IconScale, IconGovernance, IconVisibility, IconSpark, IconTransparency,
  IconAttainment, IconOrg, IconTrust, IconResolve,
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
  highlightsTitle?: string;
  images?: string[];
};

const groupOverview: Record<Group, { href: string; label: string }> = {
  platform: { href: "/platform", label: "Platform overview" },
  capabilities: { href: "/capabilities", label: "All capabilities" },
  solutions: { href: "/teams", label: "All teams" },
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
  highlightsTitle?: string,
  images?: string[],
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
    highlightsTitle,
    images,
  };
}

/* ----------------------------- PLATFORM ----------------------------- */

const platform: DetailContent[] = [
  make(
    "platform",
    "unified-data-model",
    "UNIFIED DATA MODEL",
    <>One source of truth for <span className="text-gradient">incentive compensation.</span></>,
    "Eliminate disconnected spreadsheets and fragmented systems with a unified data foundation that connects every aspect of incentive management.",
    [
      { icon: IconData, title: "Connected Business Objects", body: "Quotas, plans, territories, participants, performance, payouts, and disputes operate from a single data model." },
      { icon: IconWorkflow, title: "End-to-End Traceability", body: "Follow every calculation and payout back to its originating data and business rules." },
      { icon: IconVisibility, title: "Real-Time Consistency", body: "Keep Sales, Finance, RevOps, and Leadership aligned with shared data and metrics." },
    ],
    [],
    undefined,
    ["Unified Data Model"],
  ),
  make(
    "platform",
    "ai-intelligence",
    "AI INTELLIGENCE",
    <>AI that <span className="text-gradient">understands incentives.</span></>,
    "Move beyond automation with embedded intelligence that helps users understand earnings, predict outcomes, and make better decisions.",
    [
      { icon: IconAssistant, title: "Conversational Assistant", body: "Ask questions about quotas, attainment, commissions, and payouts in natural language." },
      { icon: IconForecast, title: "Predictive Insights", body: "Forecast attainment, compensation spend, and performance outcomes before they happen." },
      { icon: IconSpark, title: "Intelligent Recommendations", body: "Identify anomalies, optimize plans, and surface opportunities to improve incentive effectiveness." },
    ],
    [],
    undefined,
    ["AI Intelligence"],
  ),
  make(
    "platform",
    "built-on-servicenow",
    "BUILT ON SERVICENOW",
    <>Enterprise-ready <span className="text-gradient">from day one.</span></>,
    "Built natively on ServiceNow, IncentIQ inherits the platform capabilities trusted by some of the world's largest enterprises.",
    [
      { icon: IconWorkflow, title: "Workflow Automation", body: "Automate approvals, exceptions, disputes, and operational processes through configurable workflows." },
      { icon: IconScale, title: "Enterprise Scale", body: "Support global organizations, complex compensation structures, and large transaction volumes." },
      { icon: IconGovernance, title: "Platform Extensibility", body: "Integrate with enterprise systems and extend IncentIQ to meet evolving business requirements." },
    ],
    [],
    undefined,
    ["Built on ServiceNow"],
  ),
  make(
    "platform",
    "enterprise-governance",
    "ENTERPRISE GOVERNANCE",
    <>Governance built into <span className="text-gradient">every process.</span></>,
    "Ensure transparency, compliance, and accountability across the entire incentive lifecycle with controls designed for enterprise environments.",
    [
      { icon: IconGovernance, title: "Version Control", body: "Track every plan, rule, quota, and organizational change with complete history." },
      { icon: IconWorkflow, title: "Approval Frameworks", body: "Control compensation changes through governed review and approval workflows." },
      { icon: IconTrust, title: "Audit Readiness", body: "Maintain full traceability for calculations, payouts, disputes, and policy changes." },
    ],
    [],
    undefined,
    ["Enterprise Governance"],
  ),
];

/* --------------------------- CAPABILITIES --------------------------- */

const capabilities: DetailContent[] = [
  make(
    "capabilities",
    "organization-management",
    "ORGANIZATION MANAGEMENT",
    <>Model your incentive organization <span className="text-gradient">with confidence.</span></>,
    "Manage hierarchies, territories, reporting relationships, and participant assignments from a single source of truth that adapts as your business evolves.",
    [
      { icon: IconOrg, title: "Unified Hierarchies", body: "Model managers, teams, territories, and reporting structures in one connected system." },
      { icon: IconWorkflow, title: "Dynamic Assignments", body: "Align participants, territories, and compensation ownership with organizational changes." },
      { icon: IconGovernance, title: "Governed Change Management", body: "Track, approve, and audit every organizational update with full version control." },
    ],
    [],
    undefined,
    ["Hierarchy View", "Territory Map", "Participant Assignment"],
  ),
  make(
    "capabilities",
    "quota-management",
    "QUOTA MANAGEMENT",
    <>Align targets <span className="text-gradient">with business goals.</span></>,
    "Create, distribute, and manage quotas across territories, teams, and individuals while maintaining transparency and accountability.",
    [
      { icon: IconQuota, title: "Flexible Quota Allocation", body: "Assign quotas across regions, teams, products, and sellers." },
      { icon: IconWorkflow, title: "Quota Distribution", body: "Distribute quota across fiscal periods." },
      { icon: IconAttainment, title: "Attainment Visibility", body: "Monitor progress against targets in real time." },
    ],
    [],
    undefined,
    ["Quota Allocation", "Distribution Summary", "Attainment Tracker"],
  ),
  make(
    "capabilities",
    "incentive-plans",
    "INCENTIVE PLANS",
    <>Design incentives <span className="text-gradient">that drive performance.</span></>,
    "Build compensation plans that align seller behaviour with business objectives using a flexible and governed rules framework.",
    [
      { icon: IconPlan, title: "Flexible Plan Design", body: "Configure commissions, bonuses, SPIFs, splits, and accelerators without custom code." },
      { icon: IconWorkflow, title: "Rules Engine", body: "Support complex compensation logic through configurable rules and calculations." },
      { icon: IconGovernance, title: "Plan Governance", body: "Control approvals, versioning, and rollout of compensation plans." },
    ],
    [],
    undefined,
    ["Plan Builder", "Rules Engine", "Deployment Log"],
  ),
  make(
    "capabilities",
    "calculations",
    "CALCULATIONS",
    <>Automate compensation <span className="text-gradient">with precision.</span></>,
    "Calculate commissions and incentives accurately at scale while maintaining complete traceability behind every result.",
    [
      { icon: IconWorkflow, title: "Automated Processing", body: "Eliminate manual calculations and spreadsheet-driven workflows." },
      { icon: IconData, title: "Calculation Traceability", body: "Understand exactly how every payout was calculated." },
      { icon: IconScale, title: "Enterprise Scale", body: "Process large compensation volumes quickly and accurately." },
    ],
    [],
    undefined,
    ["Calculation Run", "Trace View", "Processing Summary"],
  ),
  make(
    "capabilities",
    "statements",
    "STATEMENTS",
    <>Make every payout <span className="text-gradient">understandable.</span></>,
    "Deliver transparent compensation statements that help sellers understand earnings and reduce payout disputes.",
    [
      { icon: IconPerformance, title: "Real-Time Earnings", body: "Provide visibility into earnings before payouts occur." },
      { icon: IconStatement, title: "Itemized Statements", body: "Break down attainment, commissions, bonuses, and adjustments." },
      { icon: IconTransparency, title: "Self-Service Access", body: "Give participants secure access to compensation information anytime." },
    ],
    [],
    undefined,
    ["Statement Preview", "Earnings Detail", "Self-Service Portal"],
  ),
  make(
    "capabilities",
    "dispute-resolution",
    "DISPUTE RESOLUTION",
    <>Resolve compensation questions <span className="text-gradient">faster.</span></>,
    "Manage disputes, exceptions, and inquiries through a structured workflow that improves accountability and reduces operational effort.",
    [
      { icon: IconWorkflow, title: "Structured Workflows", body: "Route disputes through governed review and approval processes." },
      { icon: IconStatement, title: "Full Context", body: "Access calculations, statements, and supporting data in one place." },
      { icon: IconGovernance, title: "Audit Trail", body: "Maintain complete visibility into every dispute and resolution." },
    ],
    [],
    undefined,
    ["Dispute Intake", "Review Workflow", "Resolution Log"],
  ),
  make(
    "capabilities",
    "performance-tracking",
    "PERFORMANCE TRACKING",
    <>Track performance <span className="text-gradient">as it happens.</span></>,
    "Monitor attainment, incentive performance, and compensation outcomes with real-time visibility across the organization.",
    [
      { icon: IconAttainment, title: "Attainment Monitoring", body: "Track progress against quotas and targets continuously." },
      { icon: IconPerformance, title: "Performance Insights", body: "Identify trends, risks, and opportunities early." },
      { icon: IconVisibility, title: "Drill-Down Analysis", body: "Move from company-level metrics to individual performance details." },
    ],
    [],
    undefined,
    ["Attainment Dashboard", "Team Performance", "Rep Drill-Down"],
  ),
  make(
    "capabilities",
    "reports-analytics",
    "REPORTS & ANALYTICS",
    <>Turn compensation data <span className="text-gradient">into business insight.</span></>,
    "Analyse incentive performance, compensation spend, and organizational effectiveness through configurable dashboards and reports.",
    [
      { icon: IconVisibility, title: "Executive Dashboard", body: "Monitor attainment, payouts, and compensation trends." },
      { icon: IconData, title: "Operational Reporting", body: "Track calculations, disputes, and compensation cycle performance." },
      { icon: IconSpark, title: "Custom Analytics", body: "Create reports tailored to business and leadership needs." },
    ],
    [],
    undefined,
    ["Executive Dashboard", "Operational Report", "Custom Analytics"],
  ),
  make(
    "capabilities",
    "ai-assistant",
    "AI ASSISTANT",
    <>Ask anything. <span className="text-gradient">Understand everything.</span></>,
    "Leverage AI to answer compensation questions, explain earnings, forecast outcomes, and surface actionable insights across the incentive lifecycle.",
    [
      { icon: IconAssistant, title: "Natural Language Queries", body: "Ask questions about quotas, earnings, plans, and performance." },
      { icon: IconSpark, title: "Intelligent Explanations", body: "Understand calculations, attainment, and payout drivers instantly." },
      { icon: IconForecast, title: "Predictive Insights", body: "Identify risks, opportunities, and likely outcomes before they happen." },
    ],
    [],
    undefined,
    ["Natural Language Query", "AI Explanation", "Predictive Forecast"],
  ),
];

/* ----------------------------- SOLUTIONS ---------------------------- */

const solutions: DetailContent[] = [
  make(
    "solutions",
    "sales",
    "FOR SALES TEAMS",
    <>Turn performance into <span className="text-gradient">predictable earnings.</span></>,
    "Reps gain real-time visibility into attainment, commissions, bonuses, and payouts—along with intelligent insights that help them understand what's driving earnings and what to do next.",
    [
      { icon: IconAttainment, title: "Know What You've Earned", body: "Real-time visibility into attainment, commissions, and projected payouts." },
      { icon: IconAssistant, title: "Ask Anything", body: "AI-powered answers on quotas, earnings, accelerators, and next-best actions." },
      { icon: IconTrust, title: "Trust Every Payout", body: "Transparent, itemized statements that explain every dollar earned." },
    ],
    [],
    "What Sales Teams Gain",
    ["Statement", "Performance", "AI Assistant Conversation"],
  ),
  make(
    "solutions",
    "finance",
    "FOR FINANCE",
    <>Control costs <span className="text-gradient">with confidence.</span></>,
    "Every calculation is governed, versioned, and fully traceable. IncentIQ helps finance teams manage compensation expense, accelerate close cycles, and maintain a complete audit trail behind every payout.",
    [
      { icon: IconGovernance, title: "Complete Auditability", body: "Track every calculation, rule change, approval, and adjustment with full version history and traceability." },
      { icon: IconResolve, title: "Controlled Exception Management", body: "Resolve disputes, exceptions, and payout inquiries through governed workflows with clear accountability." },
      { icon: IconTrust, title: "Trusted Financial Accuracy", body: "Ensure accurate accruals, predictable compensation expenses, and confidence in every payout." },
    ],
    [],
    "What You Get",
    ["Accruals", "Audit Trail", "Payouts"],
  ),
  make(
    "solutions",
    "revops",
    "FOR REVOPS",
    <>Design incentives <span className="text-gradient">with confidence.</span></>,
    "Model territories, hierarchies, quotas, accelerators, and compensation plans in a single governed platform. Launch changes faster, reduce operational complexity, and maintain complete control at scale.",
    [
      { icon: IconPlan, title: "Intelligent Plan Management", body: "Design tiers, accelerators, SPIFs, bonuses, and incentive rules in a centralized rules engine." },
      { icon: IconOrg, title: "Unified Organizational Structure", body: "Model hierarchies, territories, quota ownership, and reporting relationships in one connected platform." },
      { icon: IconWorkflow, title: "Governed Plan Deployment", body: "Roll out compensation changes with approvals, versioning, audit trails, and enterprise-grade controls." },
    ],
    [],
    "What You Get",
    ["Plan Design", "Org Mgmt.", "Quota Mgmt."],
  ),
  make(
    "solutions",
    "leadership",
    "FOR LEADERSHIP",
    <>Align incentives <span className="text-gradient">to business outcomes.</span></>,
    "Connect sales performance, incentive spend, and business results in one view. Monitor attainment trends, identify risks early, and make data-driven decisions before the quarter closes.",
    [
      { icon: IconVisibility, title: "Unified Performance Visibility", body: "Track attainment, compensation, and performance from company to team to rep." },
      { icon: IconForecast, title: "Predictive Forecasting", body: "See where performance and incentive spend are likely to land before the quarter closes." },
      { icon: IconAnomaly, title: "Intelligent Anomaly Detection", body: "Identify payout exceptions, unusual trends, and emerging risks before they impact the business." },
    ],
    [],
    "What You Get",
    ["Dashboard", "Performance", "Forecasting"],
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
