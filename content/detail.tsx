import type { ReactNode } from "react";
import {
  IconQuota, IconPlan, IconPerformance, IconStatement, IconAssistant,
  IconForecast, IconAnomaly, IconCoaching, IconData, IconWorkflow,
  IconScale, IconGovernance, IconVisibility, IconSpark, IconTransparency,
  IconAttainment, IconOrg, IconTrust, IconResolve,
  type IconProps,
} from "@/components/ui/icons";
import { ServiceNowLogo } from "@/components/ui/ServiceNowLogo";
import type { CarouselSlide } from "@/components/ui/SlideCarousel";

export type Group = "platform" | "capabilities" | "solutions" | "resources";

export type DetailContent = {
  group: Group;
  slug: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  highlights: { icon: (p: IconProps) => JSX.Element; title: string; body: string }[];
  points: string[];
  overviewHref: string;
  overviewLabel: string;
  highlightsTitle?: string;
  images?: string[];
  slides?: CarouselSlide[];
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
  lead: ReactNode,
  highlights: DetailContent["highlights"],
  points: string[],
  highlightsTitle?: string,
  images?: string[],
  slides?: CarouselSlide[],
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
    slides,
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
    <>Built natively on <ServiceNowLogo size="md" />, IncentIQ inherits the platform capabilities trusted by some of the world&apos;s largest enterprises.</>,
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
    [
      { file: "10_organization.png",                              caption: "Open the Organization workspace to model your incentive structure." },
      { file: "11_organization-add-business-unit.png",            caption: "Add business units to create your organizational structure." },
      { file: "12_organization-add-team-member.png",              caption: "Add team members and assign them to business units." },
      { file: "13_organization-view-business-unit-hierarchy.png", caption: "Visualize the full business unit hierarchy at a glance." },
      { file: "14_organization-view-team-hierarchy.png",          caption: "Review the team hierarchy and reporting relationships." },
      { file: "15_organization-view-team-directory.png",          caption: "Browse the complete team directory of all participants." },
    ],
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
    [
      { file: "16_quota-list.png",               caption: "See all quotas across your organization in one list view." },
      { file: "17_quota-create-quota.png",       caption: "Create a new quota and define its targets." },
      { file: "18_quota-quota-distribution.png", caption: "Adjust quota distribution across fiscal periods." },
      { file: "19_quota-quota-approval.png",     caption: "Route the quota through the approval workflow." },
      { file: "20_quota-quota-assignment.png",   caption: "Assign approved quotas to teams and individuals." },
    ],
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
    [
      { file: "21_incentive-plans-plan-list.png",       caption: "View all incentive plans in a single list." },
      { file: "22_incentive-plans-create-plan.png",     caption: "Create a plan and add its basic information." },
      { file: "23_incentive-plans-create-plan.png",     caption: "Define earning rules that determine how participants earn." },
      { file: "24_incentive-plans-create-plan.png",     caption: "Configure commission rules and calculation logic." },
      { file: "25_incentive-plans-plan-approval.png",   caption: "Send the plan through its approval workflow." },
      { file: "26_incentive-plans-plan-assignment.png", caption: "Assign the approved plan to the relevant participants." },
    ],
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
    [
      { file: "06_import-data-create-data-model.png", caption: "Create a data model that defines the structure of your data." },
      { file: "07_import-data-upload-csv.png",        caption: "Upload source data and begin the calculation process." },
      { file: "08_import-data-preview-records.png",   caption: "Preview and validate records before processing." },
    ],
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
    [
      { file: "27_statement-incentive-statement-list.png",   caption: "Generate and view the list of incentive statements." },
      { file: "28_statement-incentive-statement-detail.png", caption: "Open a detailed statement to review earnings and payouts." },
    ],
  ),
  make(
    "capabilities",
    "data-import",
    "DATA IMPORT",
    <>Connect and ingest your data <span className="text-gradient">with confidence.</span></>,
    "Import data from your CRM and enterprise systems into IncentIQ through a structured, governed data ingestion workflow.",
    [
      { icon: IconData, title: "Flexible Data Models", body: "Define custom data structures that match your organization's source data schema." },
      { icon: IconWorkflow, title: "Metadata Mapping", body: "Map incoming fields to IncentIQ's data model for accurate, reliable processing." },
      { icon: IconGovernance, title: "Governed Ingestion", body: "Validate, preview, and commit data imports with full traceability and control." },
    ],
    [],
    undefined,
    ["Data Model", "Field Mapping", "Import Preview"],
    [
      { file: "01_admin.png",                         caption: "Start in the Admin workspace to configure your environment." },
      { file: "05_look-up-tables.png",                caption: "Set up look-up tables to standardize incoming data values." },
      { file: "06_import-data-create-data-model.png", caption: "Create a data model that defines your import structure." },
      { file: "07_import-data-upload-csv.png",        caption: "Upload your source data via CSV from your CRM." },
      { file: "08_import-data-preview-records.png",   caption: "Preview imported records to verify data before committing." },
      { file: "09_import-data-metadata-mapping.png",  caption: "Map metadata fields to IncentIQ's data model." },
    ],
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
    [
      { file: "29_performance-tracking.png",             caption: "Monitor attainment and incentive performance as it happens." },
      { file: "30_performance-tracking-more-graphs.png", caption: "Drill into additional graphs for deeper performance insight." },
    ],
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
    [
      { file: "35_reports.png",                                    caption: "Build and explore reports across incentive performance and compensation spend." },
      { file: "31_dashboard-in-case-you-want-to-use-this.png",     caption: "Monitor attainment, payouts, and compensation trends." },
    ],
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
    [
      { file: "33_ai-assistant.png", caption: "Ask questions about quotas, earnings, and performance in natural language." },
      { file: "34_ai-assistant.png", caption: "Get instant intelligent explanations across the incentive lifecycle." },
    ],
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
