export type GuideSection = { heading: string; paragraphs: string[] };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  steps: number;
  content: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "icm-buyers-checklist",
    title: "The ICM buyer's checklist",
    excerpt:
      "A field-tested checklist for evaluating incentive compensation platforms — built around governance, not just features.",
    level: "Beginner",
    readTime: "8 min read",
    steps: 5,
    content: [
      {
        heading: "1. Start with governance",
        paragraphs: [
          "Every platform demos well on a clean plan. Pressure-test it instead: ask how it handles multiple business units, mid-cycle quota changes, and an auditor asking how a number was derived.",
          "If governance is an afterthought, the tool will become a liability as you scale.",
        ],
      },
      {
        heading: "2. Demand traceability",
        paragraphs: [
          "Confirm that every payout can be traced to the deal, rule, and rate behind it, and that plan and quota changes carry a complete version history.",
          "Traceability is what turns disputes from arguments into lookups.",
        ],
      },
      {
        heading: "3. Check the data model",
        paragraphs: [
          "Ask where compensation data lives. A platform that sits beside your enterprise stack inherits none of its trust; one built natively on it inherits all of it.",
        ],
      },
      {
        heading: "4. Evaluate the rep experience",
        paragraphs: [
          "Reps adopt what they understand. Look for itemized statements and a plain-language assistant — clarity up front prevents most inbound questions.",
        ],
      },
      {
        heading: "5. Score AI honestly",
        paragraphs: [
          "AI should forecast, explain, and flag — with governance in the loop. Be wary of black-box predictions no one can audit.",
        ],
      },
    ],
  },
  {
    slug: "migrate-off-spreadsheets-in-30-days",
    title: "Migrate off spreadsheets in 30 days",
    excerpt:
      "A pragmatic, low-risk migration plan that gets you to a governed system in a single comp cycle.",
    level: "Intermediate",
    readTime: "7 min read",
    steps: 4,
    content: [
      {
        heading: "Week 1 — Model",
        paragraphs: [
          "Map your org hierarchy and a single representative plan. Don't try to migrate everything at once; one well-chosen pilot proves the pattern.",
        ],
      },
      {
        heading: "Week 2 — Load & validate",
        paragraphs: [
          "Bring in the underlying data and validate calculations against your existing spreadsheet results. Discrepancies here are gold — they reveal hidden assumptions in the old model.",
        ],
      },
      {
        heading: "Week 3 — Parallel run",
        paragraphs: [
          "Run the new system alongside the old for a full cycle. Parallel runs build trust and surface edge cases without any payout risk.",
        ],
      },
      {
        heading: "Week 4 — Cut over",
        paragraphs: [
          "Once the numbers match, cut over and onboard reps to self-serve statements. Thirty days in, a fragile file is replaced by a governed system the team trusts.",
        ],
      },
    ],
  },
  {
    slug: "governance-for-sales-compensation",
    title: "Governance for sales compensation",
    excerpt:
      "The controls that keep payouts trustworthy: approvals, audit trails, access, and versioning.",
    level: "Advanced",
    readTime: "9 min read",
    steps: 4,
    content: [
      {
        heading: "Approvals as a default",
        paragraphs: [
          "Plan and quota changes should move through review and approval, not email. A governed change is one you can explain six months later.",
        ],
      },
      {
        heading: "Audit trails everywhere",
        paragraphs: [
          "Every change to a plan, quota, or payout needs a record of who, what, and when. For compensation, an audit trail isn't optional — it's the product.",
        ],
      },
      {
        heading: "Least-privilege access",
        paragraphs: [
          "Not everyone should see or edit everything. Inherit enterprise access controls so the right people touch the right data.",
        ],
      },
      {
        heading: "Versioned, not overwritten",
        paragraphs: [
          "Mid-cycle adjustments are normal. Versioning makes them safe — you can always reconstruct exactly what a rep was paid against, and why.",
        ],
      },
    ],
  },
  {
    slug: "designing-tiered-incentive-plans",
    title: "Designing tiered incentive plans",
    excerpt:
      "How to build tiers, accelerators, and SPIFs that motivate without becoming a black box.",
    level: "Intermediate",
    readTime: "6 min read",
    steps: 3,
    content: [
      {
        heading: "Anchor on behavior",
        paragraphs: [
          "Each tier should map to a behavior you want more of. If a tier doesn't change what reps do, it's just complexity.",
        ],
      },
      {
        heading: "Keep the next dollar legible",
        paragraphs: [
          "A rep should always be able to see what the next dollar of effort earns. Legibility is what converts a plan into motivation.",
        ],
      },
      {
        heading: "Test before you ship",
        paragraphs: [
          "Model the plan against last quarter's data before rollout. You'll catch perverse incentives and runaway costs while they're still cheap to fix.",
        ],
      },
    ],
  },
  {
    slug: "rolling-out-an-ai-assistant-to-reps",
    title: "Rolling out an AI assistant to reps",
    excerpt:
      "A practical path to giving every rep instant, plan-aware answers — and driving adoption.",
    level: "Beginner",
    readTime: "5 min read",
    steps: 3,
    content: [
      {
        heading: "Ground it in the plan",
        paragraphs: [
          "An assistant is only useful if its answers are grounded in each rep's actual plan and results. Generic responses erode trust fast.",
        ],
      },
      {
        heading: "Launch with real questions",
        paragraphs: [
          "Seed the rollout with the questions reps already ask ops: \"How do I hit top tier?\", \"What's my projected payout?\" Answer those well and adoption follows.",
        ],
      },
      {
        heading: "Measure deflection",
        paragraphs: [
          "Track how many ops questions the assistant deflects. That number is your ROI, and it climbs as reps learn to trust the answers.",
        ],
      },
    ],
  },
  {
    slug: "setting-fair-attainable-quotas",
    title: "Setting fair, attainable quotas",
    excerpt:
      "Calibrate quotas with data — historical attainment, territory potential, and ramp curves.",
    level: "Intermediate",
    readTime: "6 min read",
    steps: 3,
    content: [
      {
        heading: "Use history, not gut",
        paragraphs: [
          "Base quotas on historical attainment and territory potential. Gut-feel numbers either demoralize reps or leave growth on the table.",
        ],
      },
      {
        heading: "Account for ramp",
        paragraphs: [
          "New reps need ramped quotas. Treating a month-three rep like a tenured one guarantees a miss and a morale hit.",
        ],
      },
      {
        heading: "Distribute with governance",
        paragraphs: [
          "Cascade quotas down the org with version history, so mid-cycle adjustments stay auditable instead of chaotic.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guideSlugs(): { slug: string }[] {
  return guides.map((g) => ({ slug: g.slug }));
}
