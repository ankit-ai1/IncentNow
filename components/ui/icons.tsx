import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---- Capability + benefit icons (line style, 24x24 grid) ---- */

export function IconOrg(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="9" y="3" width="6" height="5" rx="1.2" />
      <rect x="3" y="15" width="6" height="5" rx="1.2" />
      <rect x="15" y="15" width="6" height="5" rx="1.2" />
      <path d="M12 8v3M12 11H6v4M12 11h6v4" />
    </svg>
  );
}

export function IconBusinessUnit(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 20h18" />
      <rect x="4" y="9" width="6" height="11" rx="1" />
      <rect x="14" y="5" width="6" height="15" rx="1" />
      <path d="M6.5 12.5h1M6.5 15.5h1M16.5 8.5h1M16.5 11.5h1M16.5 14.5h1" />
    </svg>
  );
}

export function IconQuota(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 17l5-5 3.5 3.5L21 7" />
      <path d="M21 7v4M21 7h-4" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function IconPlan(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconPerformance(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 4v16h16" />
      <path d="M7 15l3-4 3 2 4-6" />
      <circle cx="7" cy="15" r="1" />
      <circle cx="10" cy="11" r="1" />
      <circle cx="13" cy="13" r="1" />
      <circle cx="17" cy="7" r="1" />
    </svg>
  );
}

export function IconStatement(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M8.5 13h7M8.5 16.5h4" />
      <path d="M9 9.5h2" />
    </svg>
  );
}

export function IconDispute(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3 21l1.4-5.7A8.5 8.5 0 1 1 21 12Z" />
      <path d="M12 8v4M12 15.5h.01" />
    </svg>
  );
}

export function IconAssistant(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 7V4M9 12h.01M15 12h.01" />
      <path d="M9 16c.9.7 2 .9 3 .9s2.1-.2 3-.9" />
      <path d="M2 12v2M22 12v2" />
    </svg>
  );
}

/* ---- ServiceNow pillars ---- */

export function IconGovernance(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l8 3v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />
      <path d="M9 11.5l2 2 4-4" />
    </svg>
  );
}

export function IconSecurity(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2.5" />
    </svg>
  );
}

export function IconWorkflow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="6" height="5" rx="1.2" />
      <rect x="15" y="15" width="6" height="5" rx="1.2" />
      <path d="M6 9v3a2 2 0 0 0 2 2h7" />
      <path d="M15 17.5h-3" />
    </svg>
  );
}

export function IconScale(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20h16" />
      <rect x="4" y="13" width="4" height="7" rx="0.8" />
      <rect x="10" y="8" width="4" height="12" rx="0.8" />
      <rect x="16" y="4" width="4" height="16" rx="0.8" />
    </svg>
  );
}

export function IconData(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

export function IconLowCode(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
      <path d="M13 6l-2 12" />
    </svg>
  );
}

/* ---- AI intelligence icons ---- */

export function IconForecast(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 16l4-4 3 2 4-6 5 4" />
      <path d="M4 20h16" />
      <path d="M11 7.5h.01M7 5.5h.01M16 4.5h.01" strokeWidth={2} />
    </svg>
  );
}

export function IconRecommend(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2H14.5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function IconAnomaly(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 14h4l2-7 3 14 2.5-9 1.5 2h5" />
    </svg>
  );
}

export function IconResolve(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M21 5l-9 9-3-3" />
    </svg>
  );
}

export function IconCoaching(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M12 8l1.4-1.4M12 8l-1.4-1.4" strokeWidth={1.2} />
    </svg>
  );
}

export function IconAutonomous(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
    </svg>
  );
}

/* ---- Benefit icons ---- */

export function IconSpeed(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21a8 8 0 1 0-8-8" />
      <path d="M4 13H2M5 8L3.5 6.5" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="13" r="1" />
    </svg>
  );
}

export function IconTrust(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 2.5V11c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V5.5L12 3Z" />
      <path d="M12 8v4l2.5 1.5" />
    </svg>
  );
}

export function IconTransparency(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function IconWorkload(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 7h14M5 12h14M5 17h9" />
      <path d="M19 15l2.5 2.5L19 20" />
    </svg>
  );
}

export function IconAttainment(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="11" r="7" />
      <circle cx="12" cy="11" r="3.2" />
      <path d="M12 11l4-4" />
      <path d="M12 11v.01" strokeWidth={2.4} />
    </svg>
  );
}

export function IconVisibility(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 14l2.5-3 2 2 2.5-4 2 3" />
      <path d="M3 21h18" />
    </svg>
  );
}

/* ---- Utility / nav icons ---- */

export function IconArrow(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

export function IconSpark(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
    </svg>
  );
}
