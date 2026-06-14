import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow, IconSpark } from "./icons";

/* ---------------- Pill label ---------------- */

export function Pill({
  children,
  icon = true,
}: {
  children: ReactNode;
  icon?: boolean;
}) {
  return (
    <span className="pill">
      {icon ? (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-canvas shadow-[0_1px_4px_rgba(43,74,127,0.3)]">
          <IconSpark className="h-3 w-3" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  tone = "ink",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      <span
        className={`eyebrow ${tone === "light" ? "text-accent-400" : "text-accent"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-display-2 font-bold text-balance ${
          tone === "light" ? "text-canvas" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-lead text-pretty ${
            tone === "light" ? "text-canvas/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------- Buttons ---------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  withArrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: ButtonProps) {
  const styles: Record<string, string> = {
    primary:
      "bg-ink text-canvas hover:bg-accent shadow-[0_2px_10px_rgba(15,27,45,0.18)] hover:shadow-[0_8px_24px_rgba(43,74,127,0.28)]",
    secondary:
      "bg-white/85 text-ink ring-1 ring-line backdrop-blur hover:ring-accent/40 hover:text-accent shadow-soft",
    ghost: "text-ink hover:text-accent",
  };

  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.92rem] font-semibold transition-all duration-300",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
      {withArrow ? (
        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}
