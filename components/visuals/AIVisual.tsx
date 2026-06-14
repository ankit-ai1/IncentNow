"use client";

import { useReducedMotion } from "framer-motion";
import { IconSpark } from "../ui/icons";

const nodes = [
  { label: "Forecast", angle: -90 },
  { label: "Detect", angle: -18 },
  { label: "Recommend", angle: 54 },
  { label: "Resolve", angle: 126 },
  { label: "Coach", angle: 198 },
];

export function AIVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const radius = 132;

  return (
    <div className={["relative mx-auto aspect-square w-full max-w-[420px]", className].join(" ")}>
      {/* soft glow */}
      <div aria-hidden className="absolute inset-6 rounded-full bg-mesh-blue opacity-50 blur-3xl" />

      {/* concentric rings */}
      <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreg" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#6E8CBE" />
            <stop offset="60%" stopColor="#2B4A7F" />
            <stop offset="100%" stopColor="#1B3360" />
          </radialGradient>
          <linearGradient id="ringline" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B4A7F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2B4A7F" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="180" cy="180" r="170" fill="none" stroke="url(#ringline)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="180" cy="180" r="132" fill="none" stroke="#C9D4E6" strokeWidth="1" />
        <circle cx="180" cy="180" r="92" fill="none" stroke="#D6DEEC" strokeWidth="1" />
      </svg>

      {/* rotating node layer */}
      <div className={["absolute inset-0", reduce ? "" : "animate-orbit"].join(" ")}>
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + (radius / 360) * 100 * Math.cos(rad);
          const y = 50 + (radius / 360) * 100 * Math.sin(rad);
          return (
            <div
              key={n.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
            >
              <span className={["glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink", reduce ? "" : "[animation:orbit_26s_linear_infinite_reverse]"].join(" ")}>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* core */}
      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-canvas shadow-glow" style={{ background: "url(#coreg)" }}>
        <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: "radial-gradient(circle at 50% 38%, #6E8CBE, #2B4A7F 62%, #1B3360)" }}>
          <div className="text-center">
            <IconSpark className="mx-auto h-6 w-6" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider opacity-90">Incent AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
