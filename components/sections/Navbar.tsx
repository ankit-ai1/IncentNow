"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/Primitives";
import { LogoMark } from "../ui/Logo";
import {
  IconWorkflow, IconScale, IconSpark, IconData,
  IconQuota, IconPlan, IconPerformance, IconStatement, IconDispute, IconAssistant,
  IconVisibility, IconGovernance, IconArrow, IconOrg,
  type IconProps,
} from "../ui/icons";

type MenuItem = {
  label: string;
  desc: string;
  href: string;
  icon: (p: IconProps) => JSX.Element;
};

type NavGroup = {
  label: string;
  items: MenuItem[];
};

type NavItem = {
  label: string;
  href: string;
  menu?: {
    heading: string;
    blurb?: string;
    items?: MenuItem[];
    groups?: NavGroup[];
  };
};

const nav: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    menu: {
      heading: "The IncentIQ platform",
      blurb: "AI-first incentive compensation, built natively on ServiceNow.",
      items: [
        { icon: IconData, label: "Unified Data Model", desc: "One source of truth for all incentive data", href: "/platform/unified-data-model" },
        { icon: IconSpark, label: "AI Intelligence", desc: "AI that explains, predicts, and optimizes", href: "/platform/ai-intelligence" },
        { icon: IconScale, label: "Built on ServiceNow", desc: "Enterprise-ready from day one", href: "/platform/built-on-servicenow" },
        { icon: IconGovernance, label: "Enterprise Governance", desc: "Controls, approvals, and audit readiness", href: "/platform/enterprise-governance" },
      ],
    },
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    menu: {
      heading: "Capabilities",
      groups: [
        {
          label: "Design",
          items: [
            { icon: IconOrg, label: "Organization", desc: "Hierarchies & participant assignments", href: "/capabilities/organization-management" },
            { icon: IconQuota, label: "Quotas", desc: "Set, distribute & adjust quotas", href: "/capabilities/quota-management" },
            { icon: IconPlan, label: "Plans", desc: "Design incentive plans & rules", href: "/capabilities/incentive-plans" },
          ],
        },
        {
          label: "Operate",
          items: [
            { icon: IconScale, label: "Calculations", desc: "Automated & traceable processing", href: "/capabilities/calculations" },
            { icon: IconStatement, label: "Statements", desc: "Clear, itemised payouts", href: "/capabilities/statements" },
            { icon: IconDispute, label: "Disputes", desc: "Governed investigation flow", href: "/capabilities/dispute-resolution" },
          ],
        },
        {
          label: "Optimize",
          items: [
            { icon: IconPerformance, label: "Performance Tracking", desc: "Real-time attainment tracking", href: "/capabilities/performance-tracking" },
            { icon: IconVisibility, label: "Reports", desc: "Dashboards & analytics", href: "/capabilities/reports-analytics" },
            { icon: IconAssistant, label: "AI Assistant", desc: "Instant answers for reps", href: "/capabilities/ai-assistant" },
          ],
        },
      ],
    },
  },
  {
    label: "Teams",
    href: "/teams",
    menu: {
      heading: "Teams",
      blurb: "One platform, distinct outcomes for every team.",
      items: [
        { icon: IconPerformance, label: "Sales", desc: "Real-time earnings & AI guidance", href: "/teams/sales" },
        { icon: IconWorkflow, label: "RevOps", desc: "Plan design & governed deployment", href: "/teams/revops" },
        { icon: IconStatement, label: "Finance", desc: "Auditability & accurate payouts", href: "/teams/finance" },
        { icon: IconVisibility, label: "Leadership", desc: "Performance visibility & forecasting", href: "/teams/leadership" },
      ],
    },
  },
  {
    label: "Resources",
    href: "/resources",
    menu: {
      heading: "Resources",
      blurb: "Thought leadership, analyst insights, and practical guidance for incentive excellence.",
      items: [
        { icon: IconData, label: "Blog", desc: "Insights on compensation strategy & AI", href: "/resources/blog" },
        { icon: IconGovernance, label: "Guides", desc: "Playbooks & best practices", href: "/resources/guides" },
        { icon: IconVisibility, label: "Analyst Insights", desc: "Research, benchmarks & market trends", href: "/resources/analyst-insights" },
      ],
    },
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[var(--shell-px)] pt-3 sm:pt-4">
      <nav
        onMouseLeave={() => setActiveMenu(null)}
        className={[
          "relative mx-auto flex h-14 max-w-shell items-center justify-between rounded-full pl-4 pr-2 transition-all duration-300",
          scrolled || activeMenu
            ? "glass shadow-[0_2px_16px_rgba(11,29,45,0.08)]"
            : "border border-transparent bg-transparent shadow-none",
        ].join(" ")}
      >
        {/* logo */}
        <Link href="/" aria-label="IncentIQ home" className="inline-flex items-center gap-2">
          <LogoMark className="h-8 w-auto shrink-0" />
          <span
            className="font-display text-[1.55rem] font-extrabold leading-none tracking-[-0.02em] select-none"
            aria-hidden="true"
          >
            <span style={{ color: "#0B1D2D" }}>Incent</span>
            <span style={{ color: "#00A651" }}>IQ</span>
          </span>
        </Link>

        {/* desktop nav */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.menu ? item.label : null)}
            >
              <Link
                href={item.href}
                className={[
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.88rem] font-semibold transition-all duration-200",
                  isActive(item.href) || activeMenu === item.label
                    ? "bg-light-green text-green"
                    : "text-navy hover:bg-black/[0.04] hover:text-dark-green",
                ].join(" ")}
              >
                {item.label}
                {item.menu ? (
                  <IconChevron
                    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                      activeMenu === item.label ? "rotate-180 opacity-100 text-green" : ""
                    }`}
                  />
                ) : null}
              </Link>

              {item.menu && activeMenu === item.label ? (
                <MegaMenu item={item} />
              ) : null}
            </li>
          ))}
        </ul>

        {/* desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/product-tour"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[0.85rem] font-semibold text-navy border border-light-gray shadow-soft transition-all duration-300 hover:bg-light-green hover:text-green hover:border-green"
          >
            Product Tour
          </Link>
          <Link
            href="/book-demo"
            style={{ backgroundColor: "#00A651", color: "#FFFFFF" }}
            className="inline-flex items-center rounded-full bg-[#00A651] px-5 py-2.5 text-[0.85rem] font-semibold text-white shadow-[0_2px_10px_rgba(15,46,36,0.18)] transition-all duration-300 hover:bg-[#0F2E24] hover:shadow-[0_10px_28px_rgba(0,166,81,0.30)]"
          >
            Book a demo
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-light-gray md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative flex h-3.5 w-5 flex-col justify-between">
            <span className={`h-0.5 w-full bg-dark-green transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full bg-dark-green transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-dark-green transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      {open ? (
        <div className="glass mx-auto mt-2 max-w-shell overflow-hidden rounded-2xl p-3 shadow-float md:hidden">
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => {
              // Flatten groups into a single list for mobile
              const mobileItems: MenuItem[] = item.menu
                ? item.menu.groups
                  ? item.menu.groups.flatMap((g) => g.items)
                  : (item.menu.items ?? [])
                : [];

              return (
                <div key={item.label}>
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded((v) => (v === item.label ? null : item.label))
                        }
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.88rem] font-semibold text-dark-green hover:bg-white/80"
                      >
                        {item.label}
                        <IconChevron
                          className={`h-4 w-4 text-slate transition-transform duration-200 ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileExpanded === item.label ? (
                        <div className="mb-1 ml-2 mt-0.5 flex flex-col gap-0.5 border-l-2 border-light-green pl-3">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-[13px] font-semibold text-green hover:bg-white/70"
                          >
                            {item.menu.heading} overview
                          </Link>
                          {mobileItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2 text-[13px] font-medium text-navy hover:bg-white/70 hover:text-green"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-[0.88rem] font-semibold text-dark-green hover:bg-white/80"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* mobile CTA strip */}
            <div className="mt-2 space-y-2 border-t border-light-gray pt-3">
              <Link
                href="/product-tour"
                className="block w-full rounded-xl bg-white px-4 py-2.5 text-center text-[0.88rem] font-semibold text-navy border border-light-gray transition-colors hover:bg-light-green hover:text-green hover:border-green"
              >
                Product Tour
              </Link>
              <Link
                href="/book-demo"
                style={{ backgroundColor: "#00A651", color: "#FFFFFF" }}
                className="block w-full rounded-xl bg-[#00A651] px-4 py-2.5 text-center text-[0.88rem] font-semibold text-white transition-colors hover:bg-[#0F2E24]"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MegaMenu({ item }: { item: NavItem }) {
  const pathname = usePathname();
  if (!item.menu) return null;

  const isGrouped = !!item.menu.groups;
  const itemCount = item.menu.items?.length ?? 0;
  // Capabilities gets wider card for 2-col layout; Resources/Teams are narrower
  const dropdownWidth = isGrouped ? "660px" : itemCount <= 3 ? "280px" : "300px";

  function SubItem({ sub }: { sub: MenuItem }) {
    const active =
      pathname === sub.href || (sub.href !== "/" && pathname.startsWith(sub.href));
    return (
      <li>
        <Link
          href={sub.href}
          className={[
            "group/item flex items-center gap-2.5 rounded-lg px-[10px] py-2 transition-all duration-150",
            active ? "bg-[#E8F5E9]" : "hover:bg-[#E8F5E9]",
          ].join(" ")}
        >
          {/* 28×28 icon */}
          <span
            className={[
              "grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-all duration-150",
              active
                ? "bg-[#00A651]"
                : "bg-[#E8F5E9] group-hover/item:bg-[#00A651]",
            ].join(" ")}
          >
            <sub.icon
              className={[
                "h-3.5 w-3.5 transition-colors duration-150",
                active ? "text-white" : "text-[#00A651] group-hover/item:text-white",
              ].join(" ")}
            />
          </span>

          {/* label + desc */}
          <span className="min-w-0 flex-1">
            <span
              className={[
                "block text-[13px] font-semibold leading-tight transition-colors duration-150",
                active
                  ? "text-[#00A651]"
                  : "text-[#0B1D2D] group-hover/item:text-[#00A651]",
              ].join(" ")}
            >
              {sub.label}
            </span>
            <span className="mt-px block text-[11px] leading-snug text-[#475569]">
              {sub.desc}
            </span>
          </span>
        </Link>
      </li>
    );
  }

  function GroupCol({ group }: { group: NavGroup }) {
    return (
      <div>
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#00A651]">
          {group.label}
        </p>
        <ul className="flex flex-col gap-px">
          {group.items.map((sub) => (
            <SubItem key={sub.label + sub.href} sub={sub} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full z-[60] pt-2.5" style={{ width: dropdownWidth }}>
      <div
        className="animate-menu-in rounded-2xl p-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0,166,81,0.08)",
          boxShadow: "0 8px 24px rgba(15,45,36,0.10)",
        }}
      >
        {/* Section label + divider */}
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#00A651]">
            {item.label}
          </p>
          <div className="mt-1.5 h-px bg-[#E8F5E9]" />
        </div>

        {isGrouped && item.menu.groups ? (
          /* Capabilities — 3-column: DESIGN | OPERATE | OPTIMIZE */
          <div className="grid grid-cols-3 gap-x-3">
            {item.menu.groups.map((g) => (
              <GroupCol key={g.label} group={g} />
            ))}
          </div>
        ) : (
          /* Platform / Teams / Resources — single column */
          <ul className="flex flex-col gap-px">
            {(item.menu.items ?? []).map((sub) => (
              <SubItem key={sub.label + sub.href} sub={sub} />
            ))}
          </ul>
        )}

        {/* Explore footer */}
        <div className="mt-3 border-t border-[#E8F5E9] pt-2.5">
          <Link
            href={item.href}
            className="group/cta flex w-full items-center justify-between rounded-lg px-[10px] py-1.5 text-[12px] font-semibold text-[#00A651] transition-all duration-150 hover:bg-[#E8F5E9]"
          >
            <span>Explore {item.label.toLowerCase()}</span>
            <span className="transition-transform duration-150 group-hover/cta:translate-x-[2px]">
              <IconChevron className="h-3 w-3 -rotate-90" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
