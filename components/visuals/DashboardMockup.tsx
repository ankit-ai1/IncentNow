import { IconSpark, IconArrow } from "../ui/icons";

/* smooth area chart path (payout trend) */
const points = [28, 34, 30, 42, 48, 44, 58, 66, 62, 78, 84, 96];

function buildPath(vals: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...vals) * 1.12;
  const stepX = (w - pad * 2) / (vals.length - 1);
  const pts = vals.map((v, i) => [
    pad + i * stepX,
    h - pad - (v / max) * (h - pad * 2),
  ]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return { line: d, area: `${d} L ${w - pad},${h - pad} L ${pad},${h - pad} Z` };
}

const W = 320;
const H = 130;
const path = buildPath(points, W, H);

const RING = 124;
const RC = RING / 2;
const R = 54;
const C = 2 * Math.PI * R;
const pct = 0.93;

export function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl3 border border-line bg-white shadow-float",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas/60 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-canvas">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 16l4-5 3.5 3L20 6" /><path d="M4 20h16" />
            </svg>
          </span>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <span>Incentives</span>
            <span className="text-line">/</span>
            <span className="text-ink">Q3 Overview</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-accent-wash px-2.5 py-1 text-[11px] font-semibold text-accent-600 sm:inline">
            Live
          </span>
          <span className="flex -space-x-1.5">
            {["#6E8CBE", "#D8E4D5", "#EFE5D4"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ background: c }} />
            ))}
          </span>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-5">
        <div className="rounded-xl2 bg-canvas/70 p-5 sm:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Quota attainment
          </p>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative grid place-items-center">
              <svg width={RING} height={RING} viewBox={`0 0 ${RING} ${RING}`} className="-rotate-90">
                <circle cx={RC} cy={RC} r={R} fill="none" stroke="#E4E7E3" strokeWidth="10" />
                <circle
                  cx={RC} cy={RC} r={R} fill="none" stroke="url(#ringg)"
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
                />
                <defs>
                  <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2B4A7F" />
                    <stop offset="100%" stopColor="#6E8CBE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <span className="font-display text-3xl font-bold text-ink">112%</span>
              </div>
            </div>
            <div className="space-y-2.5">
              <Mini label="On plan" value="486" />
              <Mini label="Top tier" value="38%" />
            </div>
          </div>
        </div>

        <div className="rounded-xl2 bg-canvas/70 p-5 sm:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Payout trend
            </p>
            <span className="text-[11px] font-semibold text-accent-600">+18% MoM</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-[152px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2B4A7F" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2B4A7F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={path.area} fill="url(#areag)" />
            <path d={path.line} fill="none" stroke="#2B4A7F" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        <StatTile className="sm:col-span-2" label="Payout processed" value="$4.82M" trend="+18%" />
        <StatTile className="sm:col-span-2" label="Open disputes" value="3" trend="-71%" />
        <StatTile className="sm:col-span-1" label="Cycle time" value="1.2s" trend="fast" />
      </div>

      <div className="mx-6 mb-6 flex items-start gap-3 rounded-xl2 border border-accent-soft bg-accent-wash px-5 py-3.5">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-canvas">
          <IconSpark className="h-4 w-4" />
        </span>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">AI insight</span> &mdash; West region pacing 9% above target. Review accelerator caps before next payout.
        </p>
        <IconArrow className="ml-auto mt-1 h-4 w-4 shrink-0 text-accent" />
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-base font-bold leading-none text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted">{label}</p>
    </div>
  );
}

function StatTile({
  label, value, trend, className = "",
}: {
  label: string; value: string; trend: string; className?: string;
}) {
  return (
    <div className={`rounded-xl2 border border-line bg-white px-5 py-3.5 ${className}`}>
      <p className="text-[11.5px] text-muted">{label}</p>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <span className="font-display text-xl font-bold text-ink">{value}</span>
        <span className="text-[11px] font-semibold text-accent-600">{trend}</span>
      </div>
    </div>
  );
}
