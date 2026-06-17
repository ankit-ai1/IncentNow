"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, FileText, ImageIcon, Users, ArrowRight, Sparkles } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { Header } from "@/components/admin/Header";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

interface Stats {
  totalDemoRequests: number;
  newDemoRequests:   number;
  totalPosts:        number;
  publishedPosts:    number;
  totalMedia:        number;
  recentDemos: Array<{
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    company:   string;
    status:    string;
    createdAt: string;
  }>;
}

const STATUS_STYLES: Record<string, string> = {
  NEW:       "bg-accent-wash text-accent border-accent/15",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
  QUALIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SCHEDULED: "bg-violet-50 text-violet-700 border-violet-200",
  CLOSED:    "bg-surface text-muted border-line",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setStats(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Dashboard" />

      <div className="flex-1 p-6 space-y-6">

        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-[#1b3a6e] to-accent p-6 text-canvas shadow-float">
          {/* decorative orbs */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-accent-400/20 blur-2xl" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-canvas/50" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-canvas/50">{today}</span>
              </div>
              <h2 className="font-display text-xl font-bold text-canvas">Good to see you 👋</h2>
              <p className="mt-1 text-sm text-canvas/60">
                {loading
                  ? "Loading your workspace…"
                  : `${stats?.newDemoRequests ?? 0} new demo request${stats?.newDemoRequests !== 1 ? "s" : ""} waiting for your attention.`
                }
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/admin/demo-requests"
                className="flex items-center gap-1.5 rounded-full bg-canvas/10 px-4 py-2 text-[13px] font-semibold text-canvas/80 ring-1 ring-canvas/15 backdrop-blur-sm transition-all hover:bg-canvas/15 hover:text-canvas"
              >
                View requests <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard
            title="Demo Requests"
            value={loading ? "—" : (stats?.totalDemoRequests ?? 0)}
            subtitle={`${stats?.newDemoRequests ?? 0} new`}
            icon={CalendarCheck}
            color="blue"
          />
          <StatsCard
            title="Blog Posts"
            value={loading ? "—" : (stats?.totalPosts ?? 0)}
            subtitle={`${stats?.publishedPosts ?? 0} published`}
            icon={FileText}
            color="green"
          />
          <StatsCard
            title="Media Files"
            value={loading ? "—" : (stats?.totalMedia ?? 0)}
            icon={ImageIcon}
            color="amber"
          />
          <StatsCard
            title="Team Members"
            value="1"
            subtitle="Admin users"
            icon={Users}
            color="violet"
          />
        </div>

        {/* Recent demo requests */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <div>
              <h2 className="text-[13.5px] font-bold text-ink">Recent Demo Requests</h2>
              <p className="mt-0.5 text-[11.5px] text-muted">Latest inbound requests from the book-demo form</p>
            </div>
            <Link
              href="/admin/demo-requests"
              className="flex items-center gap-1 text-[12.5px] font-semibold text-accent transition-colors hover:text-accent-600"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading && (
            <div className="py-12 text-center text-sm text-muted">Loading…</div>
          )}
          {!loading && !stats?.recentDemos?.length && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted">No demo requests yet.</p>
              <p className="mt-1 text-xs text-muted/60">They'll appear here once someone submits the form.</p>
            </div>
          )}

          {stats?.recentDemos.map((req) => (
            <Link
              key={req.id}
              href={`/admin/demo-requests/${req.id}`}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-canvas border-b border-line/60 last:border-0"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent ring-1 ring-accent/10">
                  {req.firstName[0]}{req.lastName[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink truncate">
                    {req.firstName} {req.lastName}
                  </p>
                  <p className="text-[11.5px] text-muted truncate">{req.company} · {req.email}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex shrink-0 items-center gap-3 ml-4">
                <span className="hidden text-[11.5px] text-muted sm:block">
                  {formatDateTime(req.createdAt)}
                </span>
                <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[req.status] ?? "bg-surface text-muted border-line"}`}>
                  {req.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
