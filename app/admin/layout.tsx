import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IncentIQ Admin",
  description: "Admin dashboard for IncentIQ",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
