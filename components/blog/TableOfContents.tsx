"use client";

import { useEffect, useState } from "react";

export type TocHeading = { id: string; text: string };

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0% -70% 0%", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate">In this article</p>
        <nav aria-label="Article sections" className="mt-4 space-y-1 border-l border-light-gray">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={[
                  "-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-snug transition-colors",
                  active
                    ? "border-green font-semibold text-green"
                    : "border-transparent text-slate hover:text-green",
                ].join(" ")}
              >
                {h.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
