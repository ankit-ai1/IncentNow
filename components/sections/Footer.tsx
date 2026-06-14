import Link from "next/link";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Unified data model", href: "/platform/unified-data-model" },
      { label: "AI intelligence", href: "/platform/ai-intelligence" },
      { label: "Built on ServiceNow", href: "/why-servicenow" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Sales teams", href: "/solutions/sales" },
      { label: "Finance", href: "/solutions/finance" },
      { label: "RevOps", href: "/solutions/revops" },
      { label: "Leadership", href: "/solutions/leadership" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Help center", href: "/resources/help-center" },
      { label: "All resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Pricing", href: "/pricing" },
      { label: "Why ServiceNow", href: "/why-servicenow" },
      { label: "Book a demo", href: "/book-demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-10 sm:py-14">

        {/* main row: brand left, columns right — horizontal from md */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-20">

          {/* brand — fixed width, stays compact */}
          <div className="w-full md:w-52 lg:w-60 shrink-0">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-canvas">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 16l4-5 3.5 3L20 6" /><path d="M4 20h16" />
                </svg>
              </span>
              <span className="font-display text-[1rem] font-bold tracking-tight text-ink">IncentNow</span>
            </Link>

            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              AI-first ICM built natively on ServiceNow — transparent, intelligent, and automated at enterprise scale.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/incentnow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white text-muted transition-all hover:border-accent/30 hover:text-accent"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/incentnow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white text-muted transition-all hover:border-accent/30 hover:text-accent"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* nav columns — 2×2 on mobile, 4 in a row on md+ */}
          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] leading-snug text-muted transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="divider-x mt-10" />
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-muted">
            © {new Date().getFullYear()} CtrlAltNow Solutions Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-[11.5px] text-muted hover:text-ink">Privacy</Link>
            <Link href="#" className="text-[11.5px] text-muted hover:text-ink">Terms</Link>
            <Link href="#" className="text-[11.5px] text-muted hover:text-ink">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
