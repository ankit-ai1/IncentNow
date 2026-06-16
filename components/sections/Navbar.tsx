"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/Primitives";
import { Logo } from "../ui/Logo";
import {
  IconWorkflow, IconScale, IconSpark, IconData,
  IconQuota, IconPlan, IconPerformance, IconStatement, IconDispute, IconAssistant,
  IconVisibility, IconGovernance, IconArrow,
  type IconProps,
} from "../ui/icons";

type MenuItem = {
  label: string;
  desc: string;
  href: string;
  icon: (p: IconProps) => JSX.Element;
};

type NavItem = {
  label: string;
  href: string;
  menu?: {
    heading: string;
    blurb?: string;
    items: MenuItem[];
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
        { icon: IconWorkflow, label: "Platform overview", desc: "One governed system for incentives", href: "/platform" },
        { icon: IconData, label: "Unified data model", desc: "A single source of truth", href: "/platform/unified-data-model" },
        { icon: IconSpark, label: "AI intelligence", desc: "Forecasting, anomalies, coaching", href: "/platform/ai-intelligence" },
        { icon: IconScale, label: "Built on ServiceNow", desc: "Enterprise scale & governance", href: "/why-servicenow" },
      ],
    },
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    menu: {
      heading: "Core capabilities",
      blurb: "Everything incentive operations need, in one place.",
      items: [
        { icon: IconQuota, label: "Quota management", desc: "Set, distribute & adjust quotas", href: "/capabilities/quota-management" },
        { icon: IconPlan, label: "Incentive plans", desc: "Tiers, accelerators & rules", href: "/capabilities/incentive-plans" },
        { icon: IconPerformance, label: "Performance tracking", desc: "Real-time attainment", href: "/capabilities/performance-tracking" },
        { icon: IconStatement, label: "Statements", desc: "Clear, itemized payouts", href: "/capabilities/statements" },
        { icon: IconDispute, label: "Dispute resolution", desc: "Governed investigation flow", href: "/capabilities/dispute-resolution" },
        { icon: IconAssistant, label: "AI assistant", desc: "Instant answers for reps", href: "/capabilities/ai-assistant" },
      ],
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      heading: "Solutions by team",
      blurb: "One platform, tailored outcomes for every stakeholder.",
      items: [
        { icon: IconPerformance, label: "Sales teams", desc: "Clarity on earnings & quota", href: "/solutions/sales" },
        { icon: IconStatement, label: "Finance", desc: "Accurate, auditable payouts", href: "/solutions/finance" },
        { icon: IconWorkflow, label: "RevOps", desc: "Plan design without spreadsheets", href: "/solutions/revops" },
        { icon: IconVisibility, label: "Leadership", desc: "Real-time performance visibility", href: "/solutions/leadership" },
      ],
    },
  },
  {
    label: "Resources",
    href: "/resources",
    menu: {
      heading: "Resources",
      blurb: "Guides, articles, and help to get the most from IncentIQ.",
      items: [
        { icon: IconData, label: "Blog", desc: "Insights on incentive ops", href: "/resources/blog" },
        { icon: IconGovernance, label: "Guides", desc: "Playbooks & best practices", href: "/resources/guides" },
        { icon: IconAssistant, label: "Help center", desc: "Docs & product answers", href: "/resources/help-center" },
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
            ? "glass shadow-[0_2px_16px_rgba(15,27,45,0.08)]"
            : "border border-transparent bg-transparent shadow-none",
        ].join(" ")}
      >
        {/* logo */}
        <Link href="/" aria-label="IncentIQ home">
          <Logo size="md" />
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
                    ? "bg-accent-wash text-accent"
                    : "text-ink-2 hover:bg-black/[0.04] hover:text-ink",
                ].join(" ")}
              >
                {item.label}
                {item.menu ? (
                  <IconChevron
                    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                      activeMenu === item.label ? "rotate-180 opacity-100 text-accent" : ""
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
            href="/book-demo"
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-canvas shadow-[0_2px_10px_rgba(15,27,45,0.18)] transition-all duration-300 hover:bg-accent hover:shadow-[0_6px_20px_rgba(43,74,127,0.3)]"
          >
            Book a demo
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative flex h-3.5 w-5 flex-col justify-between">
            <span className={`h-0.5 w-full bg-ink transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      {open ? (
        <div className="glass mx-auto mt-2 max-w-shell overflow-hidden rounded-2xl p-3 shadow-float md:hidden">
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <div key={item.label}>
                {item.menu ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded((v) => (v === item.label ? null : item.label))
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.88rem] font-semibold text-ink hover:bg-white/80"
                    >
                      {item.label}
                      <IconChevron
                        className={`h-4 w-4 text-muted transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label ? (
                      <div className="mb-1 ml-2 mt-0.5 flex flex-col gap-0.5 border-l-2 border-accent-soft pl-3">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-[13px] font-semibold text-accent hover:bg-white/70"
                        >
                          {item.menu.heading} overview
                        </Link>
                        {item.menu.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-[13px] font-medium text-ink-2 hover:bg-white/70 hover:text-accent"
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
                    className="block rounded-xl px-3 py-2.5 text-[0.88rem] font-semibold text-ink hover:bg-white/80"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* mobile CTA strip */}
            <div className="mt-2 space-y-2 border-t border-line pt-3">
              <Link
                href="/book-demo"
                className="block w-full rounded-xl bg-ink px-4 py-2.5 text-center text-[0.88rem] font-semibold text-canvas"
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

  return (
    <div className="absolute left-0 top-full z-[60] w-[23rem] pt-3">
      <div
        className="animate-menu-in rounded-2xl border border-line p-2 shadow-[0_16px_40px_-8px_rgba(15,27,45,0.24),0_40px_80px_-20px_rgba(15,27,45,0.18)]"
        style={{ backgroundColor: "#ffffff", opacity: 1 }}
      >
        {/* section label */}
        <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent/70">
            {item.label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
        </div>

        <ul className="relative flex flex-col gap-0.5">
          {item.menu.items.map((sub, i) => {
            const active = pathname === sub.href;
            return (
              <li
                key={sub.label + sub.href}
                className="animate-menu-item"
                style={{ animationDelay: `${i * 36 + 40}ms` }}
              >
                <Link
                  href={sub.href}
                  className={[
                    "group/item relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-2.5 transition-all duration-200",
                    active ? "ring-1 ring-accent-soft" : "",
                  ].join(" ")}
                >
                  {/* sliding gradient highlight */}
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-wash via-accent-wash/70 to-transparent transition-opacity duration-250",
                      active ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
                    ].join(" ")}
                  />
                  {/* growing accent bar */}
                  <span
                    aria-hidden
                    className={[
                      "absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-accent to-accent-400 transition-all duration-300",
                      active ? "h-7" : "h-0 group-hover/item:h-7",
                    ].join(" ")}
                  />

                  {/* icon */}
                  <span className={[
                    "relative grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-300",
                    active
                      ? "bg-accent text-canvas"
                      : "bg-accent-wash/60 text-accent-600 group-hover/item:bg-accent group-hover/item:text-canvas",
                  ].join(" ")}>
                    <sub.icon className="h-4 w-4" />
                  </span>

                  {/* heading + description */}
                  <span className="relative flex-1 transition-transform duration-300 group-hover/item:translate-x-0.5">
                    <span
                      className={[
                        "block font-display text-[14px] font-semibold tracking-tight transition-colors duration-200",
                        active ? "text-accent" : "text-ink",
                      ].join(" ")}
                    >
                      {sub.label}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                      {sub.desc}
                    </span>
                  </span>

                  {/* trailing arrow */}
                  <span
                    aria-hidden
                    className={[
                      "relative text-accent/70 transition-all duration-300",
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100",
                    ].join(" ")}
                  >
                    <IconChevron className="h-3.5 w-3.5 -rotate-90" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA footer */}
        <div className="relative mt-1 px-3 pb-1.5 pt-2.5">
          <span className="mb-2.5 block h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          <Link
            href={item.href}
            className="group/cta flex items-center justify-between rounded-lg px-1 py-1 text-[12px] font-semibold text-accent transition-all hover:text-accent-600"
          >
            <span>Explore {item.label.toLowerCase()}</span>
            <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
              <IconChevron className="h-3.5 w-3.5 -rotate-90" />
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

