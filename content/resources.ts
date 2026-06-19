export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
};

export type GuideItem = {
  slug: string;
  title: string;
  excerpt: string;
  cta: "Read guide" | "Download";
  level: "Beginner" | "Intermediate" | "Advanced";
};

export type AnalystInsight = {
  firm: string;
  source: string;
  headline: string;
  summary: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rethinking-incentive-compensation-ai",
    title: "Rethinking Incentive Compensation in the Age of AI",
    excerpt:
      "How AI-powered intelligence is transforming the way organizations design, administer, and optimize sales compensation programs.",
    date: "June 10, 2025",
    readTime: "6 min read",
    tag: "AI & Analytics",
  },
  {
    slug: "why-spreadsheets-break-at-scale",
    title: "Why Spreadsheets Break at Enterprise Scale",
    excerpt:
      "The hidden costs of managing incentive compensation outside a governed platform — and what organizations lose when data lives in silos.",
    date: "May 22, 2025",
    readTime: "5 min read",
    tag: "Incentive Ops",
  },
  {
    slug: "designing-plans-reps-trust",
    title: "Designing Plans Your Reps Actually Trust",
    excerpt:
      "Transparency and traceability in compensation statements aren't just compliance checkboxes — they're drivers of rep motivation and retention.",
    date: "May 8, 2025",
    readTime: "7 min read",
    tag: "Plan Design",
  },
  {
    slug: "governance-gap-incentive-compensation",
    title: "The Governance Gap in Incentive Compensation",
    excerpt:
      "Finance teams need auditability and version control. Sales ops needs speed. Here's how modern ICM platforms bridge both.",
    date: "April 24, 2025",
    readTime: "5 min read",
    tag: "Governance",
  },
];

export const guideItems: GuideItem[] = [
  {
    slug: "icm-buyers-checklist",
    title: "The ICM Buyer's Checklist",
    excerpt:
      "Evaluate incentive compensation platforms against the criteria that matter most for enterprise deployments.",
    cta: "Read guide",
    level: "Beginner",
  },
  {
    slug: "quota-management-playbook",
    title: "Quota Management Playbook",
    excerpt:
      "A step-by-step framework for allocating, distributing, and adjusting quotas across territories, teams, and fiscal periods.",
    cta: "Read guide",
    level: "Intermediate",
  },
  {
    slug: "governing-sales-compensation-at-scale",
    title: "Governing Sales Compensation at Scale",
    excerpt:
      "How to implement approval frameworks, version control, and audit trails for compensation plans in complex organizations.",
    cta: "Read guide",
    level: "Advanced",
  },
  {
    slug: "migrating-off-spreadsheets",
    title: "Migrating Off Spreadsheets: A 30-Day Plan",
    excerpt:
      "A practical migration guide for organizations transitioning from spreadsheet-based ICM to a governed enterprise platform.",
    cta: "Download",
    level: "Intermediate",
  },
];

export const analystInsights: AnalystInsight[] = [
  {
    firm: "Gartner",
    source: "Gartner, 2024",
    headline:
      "SPM Platforms With AI-Native Capabilities Will Drive 30% Improvement in Forecast Accuracy by 2026",
    summary:
      "Organizations adopting AI-native sales performance management platforms are achieving significant improvements in quota attainment forecasting and compensation spend predictability.",
  },
  {
    firm: "Forrester",
    source: "Forrester, 2024",
    headline: "Incentive Compensation Automation Reduces Commission Errors by Up to 40%",
    summary:
      "Enterprises replacing spreadsheet-based ICM with governed automation platforms report materially lower error rates and faster compensation close cycles.",
  },
  {
    firm: "IDC",
    source: "IDC, 2024",
    headline:
      "ServiceNow-Native ICM Deployments See 50% Faster Time-to-Value Than Standalone Platforms",
    summary:
      "Organizations building incentive compensation management natively on existing enterprise platforms achieve faster adoption and lower total cost of ownership versus point solutions.",
  },
  {
    firm: "G2",
    source: "G2, 2024",
    headline:
      "Compensation Statement Transparency Is the Top Driver of Rep Trust in ICM Tools",
    summary:
      "Based on G2 user data, sales representatives rate statement clarity and earnings explainability as the single most impactful factor in their trust of compensation management tools.",
  },
  {
    firm: "McKinsey",
    source: "McKinsey, 2024",
    headline:
      "AI-Augmented Revenue Operations Teams Outperform Peers by 20–25% on Key Sales Metrics",
    summary:
      "High-performing commercial organizations that embed AI into revenue operations — including incentive design and performance management — create compounding advantages in attainment and retention.",
  },
  {
    firm: "Deloitte",
    source: "Deloitte, 2024",
    headline:
      "62% of CFOs Cite Incentive Compensation Governance as a Priority Enterprise Risk Area",
    summary:
      "Deloitte's annual CFO survey identifies incentive compensation governance, auditability, and control frameworks as increasingly critical priorities as regulatory scrutiny of variable pay intensifies.",
  },
];

/* Firm badge colour map — stays within site palette */
export const firmColors: Record<string, string> = {
  Gartner: "bg-light-green text-dark-green",
  Forrester: "bg-light-gray text-navy",
  IDC: "bg-light-green text-dark-green",
  G2: "bg-light-gray text-navy",
  McKinsey: "bg-light-green text-dark-green",
  Deloitte: "bg-light-gray text-navy",
};

/* Level badge colour map */
export const levelColors: Record<string, string> = {
  Beginner: "bg-light-green text-dark-green",
  Intermediate: "bg-light-green text-dark-green",
  Advanced: "bg-light-gray text-dark-green",
};
