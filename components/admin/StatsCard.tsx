import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title:     string;
  value:     string | number;
  subtitle?: string;
  icon:      LucideIcon;
  trend?:    { value: number; label: string };
  color?:    "blue" | "green" | "amber" | "violet";
  className?: string;
}

const COLORS = {
  blue:   { iconBg: "bg-accent-soft",                  iconRing: "ring-accent/10",  icon: "text-accent"   },
  green:  { iconBg: "bg-emerald-50",                   iconRing: "ring-emerald-100",icon: "text-emerald-600" },
  amber:  { iconBg: "bg-amber-50",                     iconRing: "ring-amber-100",  icon: "text-amber-600" },
  violet: { iconBg: "bg-violet-50",                    iconRing: "ring-violet-100", icon: "text-violet-600" },
};

export function StatsCard({
  title, value, subtitle, icon: Icon, trend, color = "blue", className,
}: StatsCardProps) {
  const c = COLORS[color];
  const positive = (trend?.value ?? 0) >= 0;

  return (
    <div className={cn("card p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{title}</p>
          <p className="mt-2 font-display text-3xl font-bold leading-none tracking-tight text-ink">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1.5 text-[12px] text-muted">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] font-semibold",
              positive ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-red-50 text-red-700 ring-1 ring-red-100"
            )}>
              {positive
                ? <TrendingUp  className="h-3.5 w-3.5" />
                : <TrendingDown className="h-3.5 w-3.5" />
              }
              {positive ? "+" : ""}{trend.value}% {trend.label}
            </div>
          )}
        </div>

        <div className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
          c.iconBg, c.iconRing
        )}>
          <Icon className={cn("h-5 w-5", c.icon)} />
        </div>
      </div>
    </div>
  );
}
