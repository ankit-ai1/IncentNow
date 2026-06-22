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
  metadataBase: new URL("https://www.incentiq.ai"),
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IncentIQ",
    "alternateName": "CtrlAltNow",
    "url": "https://incentiq.ai",
    "publisher": {
      "@type": "Organization",
      "name": "CtrlAltNow Solution Inc.",
      "url": "https://incentiq.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://incentiq.ai/brand/incentiq-logo.svg"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://incentiq.ai/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CtrlAltNow",
    "alternateName": "IncentIQ",
    "url": "https://incentiq.ai",
    "sameAs": [
      "https://www.linkedin.com/company/ctrlaltnow/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IncentIQ Site Navigation",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Platform",
        "url": "https://incentiq.ai/platform"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Capabilities",
        "url": "https://incentiq.ai/capabilities"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Product Tour",
        "url": "https://incentiq.ai/product-tour"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact Us",
        "url": "https://incentiq.ai/book-demo"
      }
    ]
  }
];

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white font-sans text-dark-green antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IncentIQ",
              "url": "https://www.incentiq.ai",
              "logo": "https://www.incentiq.ai/favicon-180.png"
            })
          }}
        />
      </body>
    </html>
  );
}
