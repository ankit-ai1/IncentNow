"use client";

import { useState, useCallback, useEffect, useRef, memo } from "react";
import {
  IconData, IconWorkflow, IconScale, IconGovernance, IconPlan, IconOrg,
  IconBusinessUnit, IconVisibility, IconQuota, IconStatement, IconDispute,
  IconAttainment, IconPerformance, IconAnomaly, IconForecast,
  IconAssistant, IconSpark,
  type IconProps,
} from "@/components/ui/icons";
import { SlideCarousel, type CarouselSlide } from "@/components/ui/SlideCarousel";

/* ── Types ───────────────────────────────────────────────────────────── */

type Feature = { icon: (p: IconProps) => JSX.Element; title: string; body: string };
type TabData  = { id: string; label: string; banner: string; features: Feature[]; slides: CarouselSlide[] };

/* ── Tab data ────────────────────────────────────────────────────────── */

const TABS: TabData[] = [
  {
    id: "data-import",
    label: "Data Import",
    banner: "Connect your CRM and ingest data into IncentIQ.",
    features: [
      { icon: IconData,     title: "CRM Integration",     body: "Connect directly to your CRM to ingest sales data into IncentIQ automatically." },
      { icon: IconWorkflow, title: "Flexible Data Models", body: "Define custom data structures that match your organization's data schema." },
      { icon: IconScale,    title: "Metadata Mapping",     body: "Map incoming fields to IncentIQ's data model for accurate, reliable processing." },
    ],
    slides: [
      { file: "01_admin.png",                         caption: "Start in the Admin workspace where you configure and manage your IncentIQ environment." },
      { file: "06_import-data-create-data-model.png", caption: "Create a data model that defines the structure of the data you're importing." },
      { file: "07_import-data-upload-csv.png",        caption: "Upload your source data via CSV from your CRM or existing systems." },
      { file: "08_import-data-preview-records.png",   caption: "Preview imported records to verify the data before committing." },
      { file: "09_import-data-metadata-mapping.png",  caption: "Map metadata fields so imported data aligns with IncentIQ's data model." },
    ],
  },
  {
    id: "fiscal-calendar",
    label: "Fiscal Calendar",
    banner: "Set up your fiscal calendar and periods.",
    features: [
      { icon: IconGovernance, title: "Calendar Configuration", body: "Set up fiscal calendars aligned to your organization's financial year." },
      { icon: IconPlan,       title: "Period Management",      body: "Define and manage fiscal periods with custom display names for clear reporting." },
      { icon: IconOrg,        title: "Multi-Calendar Support", body: "Support multiple fiscal calendars across different business units or regions." },
    ],
    slides: [
      { file: "02_fiscal-calendar-list.png",                      caption: "View and manage all your fiscal calendars in one place." },
      { file: "03_fiscal-calendar-create.png",                    caption: "Create a new fiscal calendar tailored to your organization's financial year." },
      { file: "04_fiscal-periods-display-name-configuration.png", caption: "Configure fiscal period display names for clear, readable reporting." },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    banner: "Build your business unit structure and sales hierarchy.",
    features: [
      { icon: IconBusinessUnit, title: "Business Unit Structure", body: "Model your organization hierarchy with business units, teams, and territories." },
      { icon: IconOrg,          title: "Team Assignments",        body: "Add team members and assign them to the right business units per your sales hierarchy." },
      { icon: IconVisibility,   title: "Hierarchy Visualization", body: "View business unit and team hierarchies in clear, navigable structures." },
    ],
    slides: [
      { file: "10_organization.png",                              caption: "Open the Organization workspace to model your incentive structure." },
      { file: "11_organization-add-business-unit.png",            caption: "Add business units to create your organizational structure." },
      { file: "12_organization-add-team-member.png",              caption: "Add team members and assign them to business units per your sales hierarchy." },
      { file: "13_organization-view-business-unit-hierarchy.png", caption: "Visualize the full business unit hierarchy at a glance." },
      { file: "14_organization-view-team-hierarchy.png",          caption: "Review the team hierarchy and reporting relationships." },
      { file: "15_organization-view-team-directory.png",          caption: "Browse the complete team directory of all participants." },
    ],
  },
  {
    id: "quota-setup",
    label: "Quota",
    banner: "Create, distribute, approve, and assign quotas.",
    features: [
      { icon: IconQuota,      title: "Quota Creation",        body: "Create and define quotas across regions, teams, products, and individual sellers." },
      { icon: IconWorkflow,   title: "Period Distribution",   body: "Distribute quota targets across fiscal periods with flexible allocation controls." },
      { icon: IconGovernance, title: "Approval & Assignment", body: "Route quotas through approval workflows and assign them to the right participants." },
    ],
    slides: [
      { file: "16_quota-list.png",               caption: "See all quotas across your organization in one list view." },
      { file: "17_quota-create-quota.png",       caption: "Create a new quota and define its targets." },
      { file: "18_quota-quota-distribution.png", caption: "Adjust quota distribution across the fiscal periods." },
      { file: "19_quota-quota-approval.png",     caption: "Route the quota through the approval workflow." },
      { file: "20_quota-quota-assignment.png",   caption: "Assign approved quotas to teams and individuals." },
    ],
  },
  {
    id: "incentive-plans",
    label: "Incentive Plan",
    banner: "Design incentive plans with earning and commission rules.",
    features: [
      { icon: IconPlan,       title: "Plan Design",     body: "Create incentive plans with earning rules, commission structures, and accelerators." },
      { icon: IconWorkflow,   title: "Rules Engine",    body: "Configure complex compensation logic through a flexible, governed rules framework." },
      { icon: IconGovernance, title: "Plan Governance", body: "Manage approvals, versioning, and assignment of compensation plans." },
    ],
    slides: [
      { file: "21_incentive-plans-plan-list.png",       caption: "View all incentive plans in a single list." },
      { file: "22_incentive-plans-create-plan.png",     caption: "Create a plan and add its basic information." },
      { file: "23_incentive-plans-create-plan.png",     caption: "Define earning rules that determine how participants earn." },
      { file: "24_incentive-plans-create-plan.png",     caption: "Configure commission rules and calculation logic." },
      { file: "25_incentive-plans-plan-approval.png",   caption: "Send the plan through its approval workflow." },
      { file: "26_incentive-plans-plan-assignment.png", caption: "Assign the approved plan to the relevant participants." },
    ],
  },
  {
    id: "calculations",
    label: "Calculations",
    banner: "Run accurate incentive calculations across your organization.",
    features: [
      { icon: IconWorkflow,   title: "Automated Calculations", body: "Run commission and incentive calculations automatically across all participants and plans." },
      { icon: IconScale,      title: "Audit Trail",            body: "Every calculation is logged and traceable — full transparency for Finance and RevOps." },
      { icon: IconGovernance, title: "Error Detection",        body: "Catch anomalies and errors before payouts are processed with built-in validation rules." },
    ],
    slides: [
      { file: "36_calculations.png",        caption: "Run incentive calculations across your organization with full audit trail and error detection." },
      { file: "37_calculations-detail.png", caption: "Drill into calculation details to verify accuracy and trace every commission result." },
    ],
  },
  {
    id: "statements",
    label: "Incentive Statements",
    banner: "Generate statements, manage disputes, and freeze payouts.",
    features: [
      { icon: IconStatement, title: "Statement Generation", body: "Generate detailed incentive statements that show earnings, attainment, and payout breakdowns." },
      { icon: IconDispute,   title: "Dispute Management",   body: "Allow participants to raise and track disputes through a structured resolution workflow." },
      { icon: IconScale,     title: "Freeze & Payout",      body: "Run the freeze and approval flow to lock statements and process payouts." },
    ],
    slides: [
      { file: "27_statement-incentive-statement-list.png",   caption: "Generate and view the list of incentive statements." },
      { file: "28_statement-incentive-statement-detail.png", caption: "Open a detailed statement to review earnings. From here, participants can raise disputes through the Dispute Management flow, and finance can run the Freeze and Approval flow for payouts." },
    ],
  },
  {
    id: "performance",
    label: "Performance Monitoring",
    banner: "Track attainment and performance in real time.",
    features: [
      { icon: IconAttainment,  title: "Attainment Tracking", body: "Monitor quota attainment in real time across teams, territories, and individuals." },
      { icon: IconPerformance, title: "Performance Graphs",  body: "Visualize performance trends with detailed graphs and drill-down capabilities." },
      { icon: IconAnomaly,     title: "Early Signals",       body: "Identify risks and opportunities before they impact compensation outcomes." },
    ],
    slides: [
      { file: "29_performance-tracking.png",             caption: "Monitor attainment and incentive performance as it happens." },
      { file: "30_performance-tracking-more-graphs.png", caption: "Drill into additional graphs for deeper performance insight." },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    banner: "Get a unified view of incentive performance.",
    features: [
      { icon: IconVisibility,  title: "Executive View",     body: "Get a unified dashboard summarizing incentive performance, attainment, and payout trends." },
      { icon: IconData,        title: "Widget Exploration", body: "Explore configurable widgets covering key metrics across the incentive lifecycle." },
      { icon: IconPerformance, title: "Real-Time Data",     body: "Dashboard data updates in real time so leaders always have current visibility." },
    ],
    slides: [
      { file: "31_dashboard-in-case-you-want-to-use-this.png", caption: "View the executive dashboard summarizing key incentive metrics." },
      { file: "32_dashboard-in-case-you-want-to-use-this.png", caption: "Explore dashboard widgets covering attainment, payouts, and trends." },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    banner: "Turn incentive data into business insight.",
    features: [
      { icon: IconWorkflow,   title: "Operational Reports", body: "Track calculations, disputes, and compensation cycle performance in detail." },
      { icon: IconForecast,   title: "Executive Analytics", body: "Monitor attainment, payouts, and compensation trends at the leadership level." },
      { icon: IconGovernance, title: "Custom Reports",      body: "Create reports tailored to your business and leadership needs." },
    ],
    slides: [
      { file: "35_reports.png", caption: "Build and explore reports and analytics across incentive performance, compensation spend, and organizational effectiveness." },
    ],
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    banner: "Ask anything. Understand everything.",
    features: [
      { icon: IconAssistant, title: "Natural Language Queries",  body: "Ask questions about quotas, earnings, plans, and performance in plain language." },
      { icon: IconSpark,     title: "Intelligent Explanations",  body: "Understand calculations, attainment, and payout drivers instantly." },
      { icon: IconForecast,  title: "Predictive Insights",       body: "Identify risks, opportunities, and likely outcomes before they happen." },
    ],
    slides: [
      { file: "33_ai-assistant.png", caption: "Use the AI Assistant to ask questions about quotas, earnings, plans, and performance in natural language." },
      { file: "34_ai-assistant.png", caption: "Get instant, intelligent explanations and insights across the incentive lifecycle." },
    ],
  },
];

/* ── Feature highlight cards ─────────────────────────────────────────── */

const FeatureCards = memo(function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <article
            key={f.title}
            className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(0,166,81,0.12)] shadow-[0_4px_16px_rgba(15,45,36,0.07),0_1px_3px_rgba(15,45,36,0.05)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-[rgba(0,166,81,0.28)] hover:shadow-[0_8px_28px_rgba(15,45,36,0.10)]"
            style={{ background: "linear-gradient(to bottom, #ffffff, rgba(232,245,233,0.40))" }}
          >
            <div className="h-[3px] w-full bg-[#00A651]" aria-hidden />
            <div className="flex flex-1 flex-col p-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E8F5E9] text-[#00A651] transition-all duration-[250ms] ease-out group-hover/card:bg-[#00A651] group-hover/card:text-white">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <h3 className="mt-5 text-[15px] font-bold leading-snug text-[#0B1D2D]">{f.title}</h3>
              <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">{f.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
});

/* ── Main tour carousel ──────────────────────────────────────────────── */

export function TourCarousel() {
  const [tabIdx, setTabIdx] = useState(0);
  /* Playback lives here, not in the carousel: the carousel remounts on every
     tab change, and the reel has to keep running straight through. */
  const [playing, setPlaying] = useState(false);
  const tab = TABS[tabIdx];

  const switchTab = useCallback((index: number) => {
    setPlaying(false);
    setTabIdx(index);
  }, []);

  /* Last slide of a stage rolls into the next stage, and the final stage
     loops back to the start — so "play" runs the entire tour unattended. */
  const advanceStage = useCallback(() => {
    setTabIdx((i) => (i + 1) % TABS.length);
  }, []);

  /* The hero's "Let's get started" both scrolls here and rolls the tape. */
  useEffect(() => {
    const start = () => setPlaying(true);
    window.addEventListener("incentiq:play-tour", start);
    return () => window.removeEventListener("incentiq:play-tour", start);
  }, []);

  /* Don't keep cycling stages once the viewer is off screen. */
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) setPlaying(false); },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Render ── */
  return (
    <>
      {/* Tour section — one screen: tabs, stage banner, viewer and transport
          all visible together, with the viewer absorbing the leftover height.

          The height is DEFINITE, not a minimum: `flex-1` children only shrink
          when the container's height is resolvable, otherwise the viewer sizes
          to its own content and runs off the bottom of the screen. The budget
          subtracts the fixed navbar so scrolling here from the hero lands the
          whole stage in the visible area below it. */}
      <section
        ref={sectionRef}
        id="tour-section"
        className="flex h-[calc(100svh-72px)] min-h-[580px] scroll-mt-[72px] flex-col overflow-hidden py-3"
      >
        <div className="shell flex min-h-0 flex-1 flex-col">

          {/* ── 1. Tab pills ── */}
          <div
            className="flex shrink-0 justify-center overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            <div
              role="tablist"
              aria-label="Product tour sections"
              className="inline-flex gap-1 rounded-2xl"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,166,81,0.10)",
                boxShadow: "0 4px 16px rgba(15,45,36,0.08)",
                padding: "6px",
              }}
            >
              {TABS.map((t, i) => {
                const isActive = i === tabIdx;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => switchTab(i)}
                    className={[
                      /* Dot sits inline, not stacked — the tab strip's height
                         is height the screenshot below doesn't get. */
                      "relative flex items-center gap-1.5 whitespace-nowrap rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-[#00A651] text-white font-semibold"
                        : "bg-transparent text-[#475569] font-medium hover:bg-[#E8F5E9] hover:text-[#00A651]",
                    ].join(" ")}
                    style={{
                      padding: "5px 13px",
                      fontSize: "12.5px",
                      boxShadow: isActive ? "0 2px 8px rgba(0,166,81,0.25)" : "none",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        display: "block",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: isActive ? "rgba(255,255,255,0.85)" : "transparent",
                        transition: "background 200ms ease",
                        flexShrink: 0,
                      }}
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Tab panel ── */}
          <div
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className="flex min-h-0 flex-1 flex-col"
          >

            {/* ── 2. Screenshot viewer — absorbs the remaining height ──
                The stage heading rides inside the viewer rather than in a
                band above it: the screenshot is height-bound here, so chrome
                above the frame comes straight out of the image. */}
            {/* Keyed on the tab so the carousel resets to step 1, and so the
                whole panel eases in rather than popping. */}
            <div key={tabIdx} className="animate-caption-rise mt-3 min-h-0 flex-1">
              <SlideCarousel
                fill
                slides={tab.slides}
                slug={tab.id}
                eyebrow={`Stage ${tabIdx + 1} / ${TABS.length}`}
                playing={playing}
                onPlayingChange={setPlaying}
                onComplete={advanceStage}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Feature highlight cards — below the fold, scroll to see */}
      <section key={`features-${tab.id}`} className="py-8" style={{ transformStyle: "flat" }}>
        <div className="shell">
          <FeatureCards features={tab.features} />
        </div>
      </section>
    </>
  );
}
