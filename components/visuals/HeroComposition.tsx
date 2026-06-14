"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";
import { IconCheck, IconResolve, IconForecast } from "../ui/icons";

export function HeroComposition() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-[1200px]">
      {/* gradient orbs behind */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-16 -top-10 -bottom-16 -z-10">
        <div className="absolute left-[6%] top-[12%] h-56 w-56 rounded-full bg-mesh-blue blur-3xl opacity-70" />
        <div className="absolute right-[4%] top-[4%] h-52 w-52 rounded-full bg-mesh-lilac blur-3xl opacity-60" />
        <div className="absolute bottom-[2%] left-[40%] h-60 w-60 rounded-full bg-mesh-sage blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative"
      >
        <DashboardMockup />
      </motion.div>

      {/* floating glass card — top left */}
      <FloatCard
        className="absolute -left-4 top-16 hidden w-[236px] sm:block lg:-left-28"
        delay={0.55}
        icon={<IconCheck className="h-4 w-4" />}
        title="Commission run complete"
        sub="486 reps · 0 errors · 1.2s"
        accent="#2B4A7F"
      />

      {/* floating glass card — bottom right */}
      <FloatCard
        className="absolute -right-4 bottom-20 hidden w-[224px] sm:block lg:-right-28"
        delay={0.75}
        icon={<IconResolve className="h-4 w-4" />}
        title="Dispute auto-resolved"
        sub="Matched to plan rule"
        accent="#3E7C59"
      />

      {/* forecast pill — top right */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.95 }}
        className="glass absolute -right-2 -top-6 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 md:flex lg:-right-10"
      >
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent text-canvas">
          <IconForecast className="h-4 w-4" />
        </span>
        <div className="pr-1">
          <p className="text-[11px] font-medium text-muted">Forecast attainment</p>
          <p className="font-display text-sm font-bold text-ink">118% · Q4</p>
        </div>
      </motion.div>
    </div>
  );
}

function FloatCard({
  className = "", delay, icon, title, sub, accent,
}: {
  className?: string;
  delay: number;
  icon: React.ReactNode;
  title: string;
  sub: string;
  accent: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={["glass rounded-2xl p-3.5", reduce ? "" : "animate-drift", className].join(" ")}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-white" style={{ background: accent }}>
          {icon}
        </span>
        <div>
          <p className="text-[12.5px] font-semibold leading-tight text-ink">{title}</p>
          <p className="mt-0.5 text-[11px] text-muted">{sub}</p>
        </div>
      </div>
    </motion.div>
  );
}
