"use client";

import { useState, useEffect, type ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  icon: ReactNode;
  body: string;
  bullets?: string[];
};

type Props = {
  heroIcon: ReactNode;
  title: string;
  subtext: string;
  date: string;
  sections: LegalSection[];
};

export function LegalPageLayout({ heroIcon, title, subtext, date, sections }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-15% 0% -65% 0%", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Hero */}
      <div
        className="mesh grain relative py-16 text-center"
        style={{ background: "linear-gradient(135deg, #E8F5E9 0%, #ffffff 50%, #f0faf4 100%)" }}
      >
        <div className="shell">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5E9]">
            {heroIcon}
          </div>
          <h1
            className="mt-5 font-display font-bold text-[#0F2E24]"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[17px] leading-relaxed text-[#475569]">
            {subtext}
          </p>
          <p className="mt-4 text-[12.5px] text-[#475569]">{date}</p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#F8FAFC] py-14">
        <div className="shell">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
                  <p className="mb-3 px-1 text-[10.5px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    Quick Navigation
                  </p>
                  <nav className="space-y-0.5">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={[
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-all",
                          activeId === s.id
                            ? "bg-[#E8F5E9] font-semibold text-[#00A651]"
                            : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F2E24]",
                        ].join(" ")}
                      >
                        {activeId === s.id && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A651]" />
                        )}
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Sections */}
              <div className="rounded-xl border border-[#F1F5F9] bg-white p-8 shadow-sm">
                {sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    className={[
                      "scroll-mt-28",
                      i < sections.length - 1 ? "mb-8 border-b border-[#F1F5F9] pb-8" : "",
                    ].join(" ")}
                  >
                    {/* Section header */}
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5E9]">
                        {s.icon}
                      </div>
                      <h2 className="text-[18px] font-bold text-[#0F2E24]">{s.title}</h2>
                    </div>

                    {/* Body */}
                    <p className="text-[15px] leading-[1.8] text-[#475569]">{s.body}</p>

                    {/* Bullets */}
                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {s.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-[15px] text-[#475569]">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A651]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
