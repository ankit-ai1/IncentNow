"use client";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/Primitives";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { CountUpStat } from "@/components/ui/CountUpStat";

// ── data ──────────────────────────────────────────────────────────────────
const stats = [
  { pre: "Improve", value: 10, decimals: 0, suffix: "%", post: "Quota Attainment" },
  { pre: "Improve Payout Accuracy to", value: 99.8, decimals: 1, suffix: "%", post: "" },
  { pre: "Reduce Compensation Administration Effort by", value: 60, decimals: 0, suffix: "%", post: "" },
];

const pairs = [
  { problem: "Disconnected systems",  shift: "Connected workflow"     },
  { problem: "Manual calculations",   shift: "Automated calculations" },
  { problem: "Limited visibility",    shift: "Real-time visibility"   },
  { problem: "Disputes & exceptions", shift: "Built-in governance"    },
  { problem: "Legacy platforms",      shift: "AI-powered insights"    },
];

// ── Framer Motion variant sets ────────────────────────────────────────────
const wrapVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fromLeft = {
  hidden:  { opacity: 0, x: -22 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fromRight = {
  hidden:  { opacity: 0, x: 22  },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeScale = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.3, ease: "easeOut" } },
};

// ── 4-chevron animated connector (desktop) ───────────────────────────────
function ChevronConnector() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <svg
          key={i}
          viewBox="0 0 10 16"
          fill="none"
          style={{ width: 10, height: 16, animationDelay: `${i * 200}ms` }}
          className="motion-safe:animate-chevron-pulse motion-reduce:opacity-40"
        >
          <path
            d="M2 2L8 8L2 14"
            stroke="#00A651"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Vertical static connector (mobile) ───────────────────────────────────
function ConnectorV() {
  return (
    <div aria-hidden className="mx-auto flex h-8 w-4 flex-col items-center">
      <div className="w-px flex-1 bg-gradient-to-b from-slate/20 to-green/40" />
      <svg viewBox="0 0 12 8" fill="none" className="h-2.5 w-2.5 shrink-0">
        <path d="M1 1L6 7L11 1" stroke="#00A651" strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Single pair row ───────────────────────────────────────────────────────
interface PairProps {
  problem: string;
  shift: string;
  featured?: boolean;
  problemNode?: React.ReactNode;
  sheenDelay: string;
}

function PairRow({ problem, shift, featured = false, problemNode, sheenDelay }: PairProps) {
  const pad = featured ? "px-7 py-7 sm:px-8 sm:py-8" : "px-5 py-[1.05rem] sm:px-6";

  return (
    <motion.div
      variants={rowVariants}
      className="group grid w-full items-stretch gap-x-3 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]"
    >
      {/* ── Problem card ─────────────────────────────────────────────── */}
      <motion.div variants={fromLeft} className="min-w-0 h-full">
        <div
          className={[
            "relative overflow-hidden rounded-2xl h-full",
            "bg-white",
            "ring-1 ring-[rgba(220,38,38,0.20)]",
            "shadow-[0_4px_24px_rgba(220,38,38,0.09)]",
            "transition-all duration-300",
            "group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_48px_rgba(220,38,38,0.18)]",
            pad,
          ].join(" ")}
          style={{ borderLeft: "3px solid #E63946" }}
        >
          {featured ? (
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(230,57,70,0.10)]">
                <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5" aria-hidden>
                  <path d="M3 3L7 7M7 3L3 7" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[15px] leading-relaxed text-[#0B1D2D]">
                {problemNode ?? problem}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Muted ×-icon in warm-gray pill */}
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(230,57,70,0.10)] transition-colors duration-300 group-hover:bg-[rgba(230,57,70,0.18)]">
                <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5" aria-hidden>
                  <path d="M3 3L7 7M7 3L3 7" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              {/* Text + hover strikethrough */}
              <div className="relative min-w-0">
                <p className="text-[13.5px] font-medium leading-snug text-[#0B1D2D]">{problem}</p>
                <div
                  aria-hidden
                  className="absolute left-0 top-1/2 h-px w-0 -translate-y-1/2 rounded-full bg-[#b0a59e] motion-safe:transition-[width] motion-safe:duration-500 motion-safe:group-hover:w-full"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Connector ────────────────────────────────────────────────── */}
      <motion.div variants={fadeScale} className="flex items-center justify-center">
        <div className="hidden lg:block"><ChevronConnector /></div>
        <div className="py-0.5 lg:hidden"><ConnectorV /></div>
      </motion.div>

      {/* ── Shift card ───────────────────────────────────────────────── */}
      <motion.div variants={fromRight} className="min-w-0 h-full">
        {/* ring-1 gives the all-sides hairline border; inline borderLeft gives the 3px green accent */}
        <div
          className={[
            "relative overflow-hidden rounded-2xl bg-white h-full",
            "ring-1 ring-[#b8deba]",
            "shadow-[0_4px_24px_rgba(0,166,81,0.09)]",
            "transition-all duration-500",
            "group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_48px_rgba(0,166,81,0.22)]",
            pad,
          ].join(" ")}
          style={{ borderLeft: "3px solid #00A651" }}
        >
          {/* Looping sheen sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-transparent via-white/55 to-transparent motion-safe:animate-sheen-loop"
            style={{ animationDelay: sheenDelay, transform: "skewX(-10deg)" }}
          />
          {/* Soft pulsing green glow underlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl motion-safe:animate-pulse-soft"
            style={{ boxShadow: "inset 0 0 28px rgba(0,166,81,0.055)" }}
          />

          {featured ? (
            <div className="relative flex items-start gap-2.5">
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                fill="none"
                className="mt-0.5 h-4 w-4 shrink-0 text-green"
              >
                <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[15px] font-medium leading-relaxed text-dark-green">{shift}</p>
            </div>
          ) : (
            <div className="relative flex items-center gap-2.5">
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                fill="none"
                className="h-3.5 w-3.5 shrink-0 text-green transition-transform duration-200 group-hover:scale-125"
              >
                <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13.5px] font-semibold leading-snug text-dark-green">{shift}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export function Problem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="problem" className="bg-light-gray py-16 sm:py-20">
      <div className="shell">

        {/* heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            eyebrow="THE PROBLEM"
            title={<>Complex compensation plans become a tax on <span className="text-gradient">sales productivity!!!</span></>}
            description="As sales teams grow, incentive programs become increasingly complex. Spreadsheets multiply, calculations become harder to audit, disputes increase, and administrators spend countless hours managing exceptions instead of driving performance."
          />
        </motion.div>

        {/* lead-in */}
        <motion.p
          className="mt-12 text-[15px] font-semibold text-dark-green"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          A robust Sales Incentive Compensation can help
        </motion.p>

        {/* stats */}
        <RevealGroup className="mt-6 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
          {stats.map((s, i) => (
            <RevealItem key={s.pre}>
              <div className={["px-0 lg:px-9", i !== 0 ? "lg:border-l lg:border-light-gray" : ""].join(" ")}>
                {s.pre && (
                  <p className="mb-1.5 text-[13px] font-semibold text-slate">{s.pre}</p>
                )}
                <p className="text-gradient font-display text-[clamp(3rem,5.4vw,4.5rem)] font-bold leading-none tracking-tight">
                  <CountUpStat value={s.value} decimals={s.decimals} suffix={s.suffix} delay={600 + i * 70} />
                </p>
                {s.post && (
                  <p className="mt-4 text-[15.5px] font-semibold text-dark-green">{s.post}</p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Transformation comparison ─────────────────────────────────── */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-3xl">

            {/* Ambient drifting glow blobs */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -right-20 -top-12 h-80 w-80 rounded-full bg-light-green/55 blur-3xl motion-safe:animate-drift-slow" />
              <div className="absolute -bottom-10 right-28 h-52 w-52 rounded-full bg-green/[0.065] blur-2xl motion-safe:animate-drift" />
            </div>

            {/* Main gradient wash: neutral-left → green-right */}
            <div className="relative rounded-3xl bg-gradient-to-r from-[#eceef0] via-[#f3f5f3] to-light-green/25 p-5 sm:p-7">

              {/* Column labels — desktop only */}
              <motion.div
                className="mb-5 hidden lg:grid lg:grid-cols-[1fr_3.5rem_1fr]"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <p className="eyebrow" style={{ color: "#E63946" }}>THE PROBLEM</p>
                  <div className="mt-2 h-[2px] w-7 rounded-full bg-[#E63946]/40" />
                </div>
                <div />
                <div>
                  <p className="eyebrow">THE SHIFT</p>
                  <div className="mt-2 h-[2px] w-7 rounded-full bg-green" />
                </div>
              </motion.div>

              {/* Staggered pairs */}
              <motion.div
                className="flex flex-col gap-2.5"
                variants={wrapVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* ── Intro (featured) pair ───────────────────────────── */}
                <PairRow
                  problem="20–25% of company revenue is invested in sales compensation. Yet many enterprises still have inefficiencies"
                  shift="IncentIQ turns back-office process into a strategic enterprise capability"
                  featured
                  sheenDelay="0s"
                  problemNode={
                    <>
                      <CountUpStat prefix="20–" value={25} suffix="%" decimals={0} />
                      {" of company revenue is invested in sales compensation. Yet many enterprises still have inefficiencies"}
                    </>
                  }
                />

                {/* ── Five short pairs ────────────────────────────────── */}
                {pairs.map(({ problem, shift }, i) => (
                  <PairRow
                    key={problem}
                    problem={problem}
                    shift={shift}
                    sheenDelay={`${(i + 1) * 0.6}s`}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
