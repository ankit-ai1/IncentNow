import * as React from "react";
import Image from "next/image";
import { BRAND_LOGO_URL } from "@/lib/config";

const NAVY = "#0B1D2D";
const GREEN = "#00A651";

const sizes = {
  sm: { icon: "h-7", imgH: 28 },
  md: { icon: "h-8", imgH: 32 },
  lg: { icon: "h-11", imgH: 44 },
} as const;

export type LogoSize = keyof typeof sizes;

export interface LogoProps {
  size?: LogoSize;
  /** Render only the icon mark without the wordmark. Falls back to SVG. */
  iconOnly?: boolean;
  className?: string;
}

/**
 * SVG icon mark — kept as a resolution-independent vector for contexts that
 * need the standalone mark (iconOnly mode, loading states, etc.).
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
      <path
        fill={NAVY}
        d="M420 151 L428 151 L457 175 L457 356 L451 379 L436 405 L407 429 L373 439 L60 439 L211 270 L219 271 L272 312 L282 312 L419 152 Z"
      />
      <path
        fill={NAVY}
        d="M28 132 L89 132 L96 135 L103 145 L103 359 L37 434 L25 437 L14 425 L13 149 L16 140 L27 133 Z"
      />
      <circle cx="59.5" cy="56.5" r="55" fill={NAVY} />
      <path
        fill={GREEN}
        d="M447 19 L454 19 L458 24 L457 133 L449 136 L421 116 L281 281 L269 282 L210 238 L133 324 L125 332 L122 330 L123 243 L196 161 L211 160 L269 203 L374 80 L344 57 L345 50 L446 20 Z"
      />
    </svg>
  );
}

/**
 * Full IncentIQ logo lockup.
 * Default (iconOnly = false): Cloudinary PNG — crisp on Retina, correct brand
 * artwork, no SVG maintenance needed.
 * iconOnly = true: falls back to the SVG mark so callers that need the
 * standalone icon aren't affected.
 */
export function Logo({ size = "md", iconOnly = false, className = "" }: LogoProps) {
  const s = sizes[size];

  if (iconOnly) {
    return <LogoMark className={`${s.icon} w-auto shrink-0 ${className}`} />;
  }

  return (
    <Image
      src={BRAND_LOGO_URL}
      alt="IncentIQ"
      height={s.imgH}
      width={s.imgH * 4}
      className={`${s.icon} w-auto object-contain ${className}`}
      priority
    />
  );
}

/** @deprecated Use {@link Logo} instead. */
export const IncentIQLogo = Logo;

export default Logo;
