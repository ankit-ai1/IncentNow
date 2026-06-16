import * as React from "react";

/**
 * Brand colors sampled directly from the original IncentIQ artwork.
 *   navy  = the "i", the chart base/mountain and the "Incent" wordmark
 *   green = the upward trend arrow and the "IQ" wordmark
 */
const NAVY = "#0A2148";
const GREEN = "#0CA721";

const sizes = {
  sm: { icon: "h-7", text: "text-[1.35rem]", gap: "gap-1.5" },
  md: { icon: "h-8", text: "text-[1.55rem]", gap: "gap-2" },
  lg: { icon: "h-11", text: "text-[2.1rem]", gap: "gap-2.5" },
} as const;

export type LogoSize = keyof typeof sizes;

export interface LogoProps {
  /** Preset size of the lockup. */
  size?: LogoSize;
  /** Render only the icon mark, without the "IncentIQ" wordmark. */
  iconOnly?: boolean;
  /** Extra classes applied to the outer wrapper. */
  className?: string;
}

/**
 * The IncentIQ icon mark — pure SVG, redrawn vector-for-vector from the
 * original brand artwork. Resolution independent, so it stays razor sharp on
 * Retina / 4K displays at any size. The geometry below was traced from the
 * source logo: the navy lowercase "i" (dot + diagonally-cut stem), a navy
 * two-peak chart "mountain" with a rounded base, and the green upward trend
 * arrow that rises over it.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 462 442"
      className={className}
      role="img"
      aria-label="IncentIQ"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Navy chart base / mountain — small foreground peak, taller back peak,
          rounded bottom-right corner sitting on the baseline. */}
      <path
        fill={NAVY}
        d="M420 151 L428 151 L457 175 L457 356 L451 379 L436 405 L407 429 L373 439 L60 439 L211 270 L219 271 L272 312 L282 312 L419 152 Z"
      />
      {/* Navy "i" stem — rounded top, foot cut on the same diagonal as the
          mountain's left slope, leaving the thin white gap of the original. */}
      <path
        fill={NAVY}
        d="M28 132 L89 132 L96 135 L103 145 L103 359 L37 434 L25 437 L14 425 L13 149 L16 140 L27 133 Z"
      />
      {/* Navy "i" dot. */}
      <circle cx="59.5" cy="56.5" r="55" fill={NAVY} />
      {/* Green upward trend arrow — rises from the lower left, dips into a
          valley, then shoots up to the barbed arrowhead at the top right. */}
      <path
        fill={GREEN}
        d="M447 19 L454 19 L458 24 L457 133 L449 136 L421 116 L281 281 L269 282 L210 238 L133 324 L125 332 L122 330 L123 243 L196 161 L211 160 L269 203 L374 80 L344 57 L345 50 L446 20 Z"
      />
    </svg>
  );
}

/**
 * Full IncentIQ logo lockup: the icon mark followed by the "IncentIQ"
 * wordmark ("Incent" in navy, "IQ" in green). Responsive and self-scaling —
 * the icon size drives the wordmark size so the proportions of the original
 * always hold.
 */
export function Logo({ size = "md", iconOnly = false, className = "" }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <LogoMark className={`${s.icon} w-auto shrink-0`} />
      {!iconOnly && (
        <span
          className={`font-display ${s.text} font-extrabold leading-none tracking-[-0.02em] select-none`}
          aria-hidden="true"
        >
          <span style={{ color: NAVY }}>Incent</span>
          <span style={{ color: GREEN }}>IQ</span>
        </span>
      )}
    </span>
  );
}

/** @deprecated Use {@link Logo} instead. Retained so older imports keep working. */
export const IncentIQLogo = Logo;

export default Logo;
