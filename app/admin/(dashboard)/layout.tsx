"use client";

import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { NavProgress } from "@/components/admin/NavProgress";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavProgress />
      <div className="flex h-screen overflow-hidden bg-canvas">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </SessionProvider>
  );
}
