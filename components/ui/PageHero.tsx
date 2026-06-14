import type { ReactNode } from "react";
import { Button } from "./Primitives";

export function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mesh grain relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-mesh-blue opacity-55 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-mesh-lilac opacity-45 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-accent-wash opacity-60 blur-3xl" />

      <div className="shell relative">
        <div className="max-w-4xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 font-display text-display-1 font-bold text-ink text-balance">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-ink-2 text-pretty">{description}</p>

          {primary || secondary ? (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {primary ? (
                <Button href={primary.href} variant="primary">
                  {primary.label}
                </Button>
              ) : null}
              {secondary ? (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line/60 to-transparent" />
    </section>
  );
}
