"use client";

import { useState, useEffect } from "react";

export function LegalSidebarNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0% -70% 0%", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Page sections" className="space-y-0.5">
      {sections.map((s, i) => {
        const active = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={[
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
              active
                ? "bg-[#E8F5E9] text-[#00A651]"
                : "text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#0F2E24]",
            ].join(" ")}
          >
            <span
              className={[
                "font-mono text-[11px] tabular-nums transition-colors",
                active ? "text-[#00A651]" : "text-[#CBD5E1]",
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.title}
          </a>
        );
      })}
    </nav>
  );
}
