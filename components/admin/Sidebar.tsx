"use client";

import { useTransition, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Tag,
  FolderOpen,
  Image,
  Settings,
  Users,
  ExternalLink,
  Loader2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/demo-requests", label: "Demo Requests", icon: CalendarCheck },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/tags", label: "Tags", icon: Tag },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear pending when navigation completes
  useEffect(() => {
    if (!isPending) setPendingHref(null);
  }, [isPending]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  function handleNav(href: string) {
    if (pathname === href) return;
    window.dispatchEvent(new Event("nav-start"));
    setPendingHref(href);
    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <Logo size="sm" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          const loading = pendingHref === href && isPending;

          return (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
                active
                  ? "bg-blue-50 text-[#2B4A7F]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#2B4A7F]" />
              ) : (
                <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#2B4A7F]" : "text-gray-400")} />
              )}
              <span>{label}</span>
              {active && !loading && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#2B4A7F]" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>View website</span>
        </Link>
      </div>
    </aside>
  );
}
