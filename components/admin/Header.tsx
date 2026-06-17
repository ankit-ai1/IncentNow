"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { data: session } = useSession();
  const name     = session?.user?.name ?? "Admin";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-line bg-panel px-6 shadow-[0_1px_4px_rgba(15,27,45,0.04)]">
      {/* Left — title */}
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-[15px] font-bold text-ink">{title}</h1>
        {subtitle && (
          <>
            <span className="text-line">/</span>
            <span className="text-[13px] text-muted">{subtitle}</span>
          </>
        )}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button className="relative rounded-lg p-2 text-muted transition-colors hover:bg-canvas hover:text-ink-2">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-panel" />
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-1.5 transition-all hover:border-line hover:bg-canvas">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-ink text-[11px] font-bold text-canvas ring-1 ring-accent/20">
                {initials}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-[12.5px] font-semibold leading-none text-ink">{name}</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52 rounded-xl border-line bg-panel p-1 shadow-float">
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-[12.5px] font-semibold text-ink">{name}</p>
              <p className="text-[11px] text-muted">{session?.user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-line" />
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2 text-[13px] text-ink-2 focus:bg-canvas focus:text-ink">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4 text-muted" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-line" />
            <DropdownMenuItem
              className="cursor-pointer rounded-lg px-3 py-2 text-[13px] text-red-600 focus:bg-red-50 focus:text-red-600"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
