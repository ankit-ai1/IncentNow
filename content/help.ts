export type HelpSection = { heading: string; paragraphs: string[] };

export type HelpArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Getting started" | "Plans & quotas" | "Payouts & disputes" | "Administration";
  readTime: string;
  content: HelpSection[];
};

export const helpArticles: HelpArticle[] = [
  {
    slug: "getting-started-with-incentnow",
    title: "Getting started with IncentNow",
    excerpt: "Stand up your workspace, model your org, and launch your first incentive plan.",
    category: "Getting started",
    readTime: "4 min read",
    content: [
      {
        heading: "Set up your workspace",
        paragraphs: [
          "IncentNow runs natively on ServiceNow, so your workspace inherits your existing identity, roles, and access controls. An admin enables the application and assigns the incentive roles.",
        ],
      },
      {
        heading: "Model your organization",
        paragraphs: [
          "Start by modeling your org hierarchy — roles, territories, and reporting lines. This becomes the backbone every plan and quota maps to.",
        ],
      },
      {
        heading: "Launch a first plan",
        paragraphs: [
          "Create a simple plan, attach a quota, and run it for a small group. Once the numbers look right, expand to the full team.",
        ],
      },
    ],
  },
  {
    slug: "inviting-and-managing-users",
    title: "Inviting and managing users",
    excerpt: "Add teammates, assign roles, and control who can view or edit compensation data.",
    category: "Getting started",
    readTime: "3 min read",
    content: [
      {
        heading: "Assign the right role",
        paragraphs: [
          "IncentNow uses least-privilege roles: reps see their own data, managers see their teams, and admins configure plans. Assign roles from the user settings panel.",
        ],
      },
      {
        heading: "Access follows the platform",
        paragraphs: [
          "Because access controls are inherited from the Now Platform, you manage permissions in one place rather than maintaining a separate list.",
        ],
      },
    ],
  },
  {
    slug: "configuring-incentive-plans",
    title: "Configuring incentive plans",
    excerpt: "Build tiers, accelerators, and rules in the visual plan builder.",
    category: "Plans & quotas",
    readTime: "6 min read",
    content: [
      {
        heading: "Open the plan builder",
        paragraphs: [
          "The visual builder lets you assemble plans from reusable components — rates, tiers, accelerators, and SPIFs — without writing formulas in a spreadsheet.",
        ],
      },
      {
        heading: "Deploy through review",
        paragraphs: [
          "Plan changes move through a governed approval workflow. Nothing reaches a payout without a recorded review, which keeps the audit trail complete.",
        ],
      },
    ],
  },
  {
    slug: "managing-quotas",
    title: "Managing quotas",
    excerpt: "Set, distribute, and adjust quotas with full version history.",
    category: "Plans & quotas",
    readTime: "5 min read",
    content: [
      {
        heading: "Distribute down the hierarchy",
        paragraphs: [
          "Set a target at any level and cascade it down by role and territory. The system keeps every distribution mapped to your org model.",
        ],
      },
      {
        heading: "Adjust mid-cycle safely",
        paragraphs: [
          "Quota changes are versioned. You can adjust mid-cycle and still reconstruct exactly what each rep was measured against at any point in time.",
        ],
      },
    ],
  },
  {
    slug: "understanding-payout-statements",
    title: "Understanding payout statements",
    excerpt: "Read itemized statements and see how every dollar was earned.",
    category: "Payouts & disputes",
    readTime: "4 min read",
    content: [
      {
        heading: "Every line is traceable",
        paragraphs: [
          "Each line on a statement traces back to the deal, rule, and rate that produced it. Reps can self-serve the \"why\" behind any number.",
        ],
      },
      {
        heading: "Export and share",
        paragraphs: [
          "Statements can be exported for records or shared directly with reps, who see the same trusted view leadership does.",
        ],
      },
    ],
  },
  {
    slug: "raising-and-resolving-disputes",
    title: "Raising and resolving disputes",
    excerpt: "Submit a dispute in context and track it to resolution through a governed flow.",
    category: "Payouts & disputes",
    readTime: "5 min read",
    content: [
      {
        heading: "Raise in context",
        paragraphs: [
          "Reps raise disputes directly from the statement line in question, with the relevant data attached automatically. No back-and-forth email needed.",
        ],
      },
      {
        heading: "Route, resolve, record",
        paragraphs: [
          "Disputes route to the right owner with an SLA, and every decision is logged for finance and compliance — turning a chaotic inbox into a tracked process.",
        ],
      },
    ],
  },
  {
    slug: "integrations-and-data-sources",
    title: "Integrations and data sources",
    excerpt: "Connect CRM, ERP, HRMS, and data warehouses to keep incentive data current.",
    category: "Administration",
    readTime: "5 min read",
    content: [
      {
        heading: "Connect your systems",
        paragraphs: [
          "IncentNow connects to CRM, ERP, HRMS, and warehouses through the Now Platform's integration layer, so results flow in without manual exports.",
        ],
      },
      {
        heading: "One source of truth",
        paragraphs: [
          "Because data lands in a single governed model, Sales, Finance, and Leadership work from the same numbers in real time.",
        ],
      },
    ],
  },
  {
    slug: "security-and-compliance",
    title: "Security and compliance",
    excerpt: "How IncentNow inherits enterprise-grade security and governance from ServiceNow.",
    category: "Administration",
    readTime: "4 min read",
    content: [
      {
        heading: "Inherited by design",
        paragraphs: [
          "Security, access controls, and compliance posture are inherited from the Now Platform. There's no separate system to harden or audit.",
        ],
      },
      {
        heading: "Governed end to end",
        paragraphs: [
          "From approvals to audit trails, governance is native to every workflow — so compensation earns the same trust as the rest of the enterprise.",
        ],
      },
    ],
  },
];

export const helpCategories = [
  "Getting started",
  "Plans & quotas",
  "Payouts & disputes",
  "Administration",
] as const;

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug);
}

export function helpSlugs(): { slug: string }[] {
  return helpArticles.map((a) => ({ slug: a.slug }));
}
