import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND_FAVICON_32, BRAND_FAVICON_180 } from "@/lib/config";

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const display = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.incentnow.ai"),
  icons: {
    icon: BRAND_FAVICON_32,
    shortcut: BRAND_FAVICON_32,
    apple: BRAND_FAVICON_180,
  },
  title: "IncentIQ — AI-First Incentive Compensation Management on ServiceNow",
  description:
    "IncentIQ transforms sales incentives into transparent, intelligent, and automated workflows. An AI-first Incentive Compensation Management platform built natively on ServiceNow for enterprise scale.",
  keywords: [
    "Incentive Compensation Management",
    "ICM",
    "ServiceNow",
    "Sales Compensation",
    "Quota Management",
    "Commission Automation",
    "AI Sales Operations",
  ],
  openGraph: {
    title: "IncentIQ — AI-First Incentive Compensation Management",
    description:
      "Transform sales incentives into transparent, intelligent, and automated workflows powered by ServiceNow.",
    type: "website",
    url: "https://www.incentnow.ai",
    siteName: "IncentIQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${display.variable}`}
    >
      <body className="bg-white font-sans text-dark-green antialiased">
        {children}
      </body>
    </html>
  );
}
