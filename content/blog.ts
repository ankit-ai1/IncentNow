export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // human readable
  readTime: string;
  author: string;
  authorRole: string;
  content: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-spreadsheets-break-at-scale",
    title: "Why spreadsheets break at enterprise scale",
    excerpt:
      "Spreadsheets feel free until the first disputed payout. Here's where they quietly fail as headcount, plans, and rules multiply.",
    category: "Incentive Ops",
    date: "May 28, 2026",
    readTime: "6 min read",
    author: "Priya Nair",
    authorRole: "Head of RevOps Strategy",
    content: [
      {
        heading: "The hidden cost of \"free\"",
        paragraphs: [
          "Every incentive program starts simple: a few reps, one plan, a single spreadsheet. It works — until it doesn't. The moment a second business unit, a mid-cycle quota change, or a disputed payout enters the picture, that spreadsheet becomes the most expensive tool in the company.",
          "The cost isn't the license. It's the hours Sales Ops spend reconciling formulas, the trust reps lose when a number looks wrong, and the audit risk Finance inherits when no one can explain how a payout was calculated.",
        ],
      },
      {
        heading: "Three failure points",
        paragraphs: [
          "First, version sprawl. When plans live in files, every change spawns a copy. Within a quarter, no one is sure which version is authoritative.",
          "Second, no audit trail. A spreadsheet can tell you the current value of a cell, but not who changed it, when, or why. That's fatal for compensation, where every dollar must be explainable.",
          "Third, no real-time visibility. By the time numbers are consolidated, the quarter is already over — and the chance to coach a rep toward quota is gone.",
        ],
      },
      {
        heading: "What good looks like",
        paragraphs: [
          "A modern incentive system treats compensation as governed data, not as a file. Plans are versioned, every calculation is traceable, and results update in real time so Sales, Finance, and Leadership work from one source of truth.",
          "That's the shift IncentIQ makes — moving incentives onto the Now Platform, where governance and scale come standard.",
        ],
      },
    ],
  },
  {
    slug: "designing-incentive-plans-reps-trust",
    title: "Designing incentive plans reps actually trust",
    excerpt:
      "The best comp plan is the one a rep can explain back to you. A field guide to clarity, fairness, and motivation.",
    category: "Plan Design",
    date: "May 19, 2026",
    readTime: "7 min read",
    author: "Marcus Bell",
    authorRole: "Principal Comp Consultant",
    content: [
      {
        heading: "Trust is the real KPI",
        paragraphs: [
          "A plan can be mathematically perfect and still fail. If reps don't understand how they're paid, the plan stops driving behavior and starts driving doubt. Trust — not complexity — is what turns a comp plan into a motivator.",
          "The test is simple: can a rep explain their own plan back to you in two sentences? If not, the plan is working against you.",
        ],
      },
      {
        heading: "Simplicity beats cleverness",
        paragraphs: [
          "Every accelerator, cap, and exception you add is a place where trust can leak. Start with the simplest structure that aligns reps with the outcomes you care about, then add nuance only where it clearly changes behavior.",
          "When you do add tiers or SPIFs, make them legible. A rep should be able to see, at any moment, exactly what the next dollar of effort earns them.",
        ],
      },
      {
        heading: "Show the math",
        paragraphs: [
          "Transparency is the cheapest trust you can buy. Itemized statements that trace every payout back to the deal, rule, and rate behind it eliminate the black box — and most disputes with it.",
          "Pair that with an assistant reps can ask \"how do I hit top tier?\" and the plan starts coaching itself.",
        ],
      },
    ],
  },
  {
    slug: "ai-changes-comp-forecasting",
    title: "What AI changes about compensation forecasting",
    excerpt:
      "Forecasting attainment used to be a spreadsheet guess. AI turns it into a continuously updated, explainable projection.",
    category: "AI & Analytics",
    date: "May 11, 2026",
    readTime: "5 min read",
    author: "Dr. Lena Hoffmann",
    authorRole: "Lead Data Scientist",
    content: [
      {
        heading: "From snapshot to signal",
        paragraphs: [
          "Traditional forecasting is a snapshot: someone pulls numbers at month-end and extrapolates. By the time the forecast exists, it's already stale.",
          "AI changes the cadence. Attainment and payout exposure update continuously as deals move, so leadership sees where the quarter is heading while there's still time to act.",
        ],
      },
      {
        heading: "Explainability matters",
        paragraphs: [
          "A forecast no one trusts is just noise. The value of embedded AI isn't only accuracy — it's that every projection can be traced to the data and assumptions behind it.",
          "That governance-first approach is what makes AI safe for compensation, where being wrong has real financial consequences.",
        ],
      },
    ],
  },
  {
    slug: "servicenow-as-the-comp-platform",
    title: "Why ServiceNow is the right foundation for ICM",
    excerpt:
      "Incentive compensation is a governance problem as much as a math problem. That's exactly what the Now Platform is built for.",
    category: "Platform",
    date: "Apr 30, 2026",
    readTime: "6 min read",
    author: "Arjun Mehta",
    authorRole: "Solutions Architect",
    content: [
      {
        heading: "Comp is a workflow problem",
        paragraphs: [
          "Calculating a payout is the easy part. The hard part is everything around it: approvals, disputes, audit trails, access controls, and integration with the rest of the enterprise.",
          "Those are workflow and governance problems — precisely the domain the Now Platform was built to solve.",
        ],
      },
      {
        heading: "Inherited, not bolted on",
        paragraphs: [
          "Building natively on ServiceNow means incentives inherit enterprise security, governance, and scale by default. There's no separate integration layer to maintain, and no data silo to reconcile.",
          "The result is that compensation earns the same trust as the rest of the enterprise stack — because it runs on the same foundation.",
        ],
      },
    ],
  },
  {
    slug: "cutting-payout-disputes",
    title: "A practical playbook for cutting payout disputes",
    excerpt:
      "Disputes are a symptom, not the disease. Fix the upstream causes and watch the queue shrink.",
    category: "Incentive Ops",
    date: "Apr 22, 2026",
    readTime: "5 min read",
    author: "Sofia Romano",
    authorRole: "Sales Ops Manager",
    content: [
      {
        heading: "Why disputes happen",
        paragraphs: [
          "Most payout disputes trace back to two causes: a rep can't see how a number was derived, or the data behind it was wrong. Both are preventable.",
          "Chasing disputes after the fact is expensive. Removing their causes is far cheaper.",
        ],
      },
      {
        heading: "The upstream fixes",
        paragraphs: [
          "Itemized, explainable statements kill the \"I don't understand this number\" dispute. Real-time visibility catches data issues before they reach a statement.",
          "For the disputes that remain, a governed workflow — structured intake, clear ownership, and SLAs — turns a chaotic inbox into a tracked, auditable process.",
        ],
      },
    ],
  },
  {
    slug: "real-time-visibility-revenue-teams",
    title: "Real-time visibility is the new baseline for revenue teams",
    excerpt:
      "When Sales, Finance, and Leadership share one live view, alignment stops being a meeting and starts being a default.",
    category: "Analytics",
    date: "Apr 14, 2026",
    readTime: "4 min read",
    author: "Tom Whitfield",
    authorRole: "VP Revenue Operations",
    content: [
      {
        heading: "The cost of lag",
        paragraphs: [
          "When every team works from its own export, alignment is a negotiation over whose numbers are right. That lag costs deals, trust, and time.",
          "Real-time, shared data removes the negotiation. There's one number, and everyone is looking at it.",
        ],
      },
      {
        heading: "Drill-downs build confidence",
        paragraphs: [
          "Visibility isn't just a dashboard — it's the ability to move from company to team to individual rep in a click, and to trust what you find at every level.",
          "That confidence is what lets leadership forecast early and coach precisely.",
        ],
      },
    ],
  },
  {
    slug: "quota-setting-without-guesswork",
    title: "Quota setting without the guesswork",
    excerpt:
      "Good quotas balance ambition and attainability. Here's how to set them with data instead of gut feel.",
    category: "Plan Design",
    date: "Apr 3, 2026",
    readTime: "6 min read",
    author: "Marcus Bell",
    authorRole: "Principal Comp Consultant",
    content: [
      {
        heading: "The attainability problem",
        paragraphs: [
          "If only one in four reps hits quota, the quota isn't motivating — it's demoralizing. But set it too low and you leave growth on the table. The art is calibration.",
          "Calibration needs data: historical attainment, territory potential, and ramp curves, all in one place.",
        ],
      },
      {
        heading: "Distribute with governance",
        paragraphs: [
          "Setting the number is half the job. Cascading it down the org — by role, territory, and reporting line — with full version history is the other half.",
          "When quota changes are governed and auditable, mid-cycle adjustments stop being chaos and start being routine.",
        ],
      },
    ],
  },
  {
    slug: "the-icm-buyers-checklist",
    title: "The ICM buyer's checklist",
    excerpt:
      "Evaluating incentive compensation platforms? These are the questions that separate a tool from a system.",
    category: "Buying Guide",
    date: "Mar 25, 2026",
    readTime: "8 min read",
    author: "Priya Nair",
    authorRole: "Head of RevOps Strategy",
    content: [
      {
        heading: "Beyond the demo",
        paragraphs: [
          "Every ICM platform demos well on a clean plan. The real question is how it behaves under enterprise conditions: multiple business units, mid-cycle changes, and an auditor asking how a number was derived.",
          "Build your evaluation around governance, not features.",
        ],
      },
      {
        heading: "Questions that matter",
        paragraphs: [
          "Can every payout be traced to its source? Is there a complete audit trail on plan and quota changes? How does the platform handle disputes, and does that workflow leave a record?",
          "Finally: does it live inside your enterprise platform, or beside it? Where compensation data lives determines how much trust it can earn.",
        ],
      },
    ],
  },
  {
    slug: "migrating-off-spreadsheets-in-30-days",
    title: "Migrating off spreadsheets in 30 days",
    excerpt:
      "A pragmatic, low-risk migration plan that gets you to a governed system in a single cycle.",
    category: "How-To",
    date: "Mar 17, 2026",
    readTime: "7 min read",
    author: "Sofia Romano",
    authorRole: "Sales Ops Manager",
    content: [
      {
        heading: "Start with one plan",
        paragraphs: [
          "You don't have to migrate everything at once. Pick one representative plan, model it in the new system, and run it in parallel for a cycle. Parallel runs build confidence and surface edge cases safely.",
          "Once the numbers match, you've proven the model — and the rest follows the same pattern.",
        ],
      },
      {
        heading: "A week-by-week shape",
        paragraphs: [
          "Week one: model the org and the pilot plan. Week two: load data and validate calculations. Week three: parallel run and reconcile. Week four: cut over and onboard reps to self-serve statements.",
          "Thirty days in, you've replaced a fragile file with a governed system — and the team trusts it because they watched it prove itself.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function blogSlugs(): { slug: string }[] {
  return posts.map((p) => ({ slug: p.slug }));
}
