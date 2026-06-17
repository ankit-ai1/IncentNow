"use client";

import { useTransition, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Logo";
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Tag,
  FolderOpen,
  ImageIcon,
  Settings,
  Users,
  ExternalLink,
  Loader2,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin",              label: "Dashboard",      icon: LayoutDashboard, exact: true },
  { href: "/admin/demo-requests",label: "Demo Requests",  icon: CalendarCheck },
  { href: "/admin/blog",         label: "Blog Posts",     icon: FileText },
  { href: "/admin/categories",   label: "Categories",     icon: FolderOpen },
  { href: "/admin/tags",         label: "Tags",           icon: Tag },
  { href: "/admin/media",        label: "Media Library",  icon: ImageIcon },
  { href: "/admin/users",        label: "Users",          icon: Users },
  { href: "/admin/settings",     label: "Settings",       icon: Settings },
];

export function Sidebar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => { if (!isPending) setPendingHref(null); }, [isPending]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  function handleNav(href: string) {
    if (pathname === href) return;
    window.dispatchEvent(new Event("nav-start"));
    setPendingHref(href);
    startTransition(() => router.push(href));
  }

  const name     = session?.user?.name ?? "Admin";
  const email    = session?.user?.email ?? "";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <aside className="relative flex h-screen w-[220px] shrink-0 flex-col overflow-hidden border-r border-white/[0.06] bg-[#080F1E]">
      {/* subtle gradient top edge */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Logo */}
      <div className="flex h-[60px] shrink-0 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <LogoMark className="h-7 w-auto" />
        <span className="font-display text-[15px] font-extrabold tracking-tight text-white">
          Incent<span className="text-[#0CA721]">IQ</span>
        </span>
        <span className="ml-auto rounded-md bg-[#0CA721]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0CA721]">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {/* section label */}
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">
          Main menu
        </p>

        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active  = isActive(href, exact);
          const loading = pendingHref === href && isPending;

          return (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-left transition-all duration-150",
                active
                  ? "bg-gradient-to-r from-[#2B4A7F]/40 to-[#2B4A7F]/20 text-white"
                  : "text-white/40 hover:bg-white/[0.05] hover:text-white/75"
              )}
            >
              {/* active left bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#0CA721]" />
              )}

              {loading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/50" />
              ) : (
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? "text-[#7fa8e8]" : "text-white/30 group-hover:text-white/60"
                  )}
                />
              )}

              <span className="flex-1">{label}</span>

              {active && !loading && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/25" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 space-y-1 border-t border-white/[0.06] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/60"
        >
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          View website
        </Link>

        {/* User row */}
        <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2B4A7F] to-[#0A2148] text-[11px] font-bold text-white ring-1 ring-white/10">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white/75">{name}</p>
            <p className="truncate text-[10px] text-white/30">{email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            title="Sign out"
            className="shrink-0 text-white/25 transition-colors hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
