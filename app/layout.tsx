import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "IncentNow — AI-First Incentive Compensation Management on ServiceNow",
  description:
    "IncentNow transforms sales incentives into transparent, intelligent, and automated workflows. An AI-first Incentive Compensation Management platform built natively on ServiceNow for enterprise scale.",
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
    title: "IncentNow — AI-First Incentive Compensation Management",
    description:
      "Transform sales incentives into transparent, intelligent, and automated workflows powered by ServiceNow.",
    type: "website",
    url: "https://www.incentnow.ai",
    siteName: "IncentNow",
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
      <body className="bg-canvas font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
