import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalPageLayout, type LegalSection } from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service — IncentIQ",
  description: "Terms governing your use of the IncentIQ platform and services.",
};

const heroIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const icon = (children: React.ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
);

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: icon(<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />),
    body: "These Terms of Service govern your access to and use of IncentIQ. By accessing the platform on behalf of your organization, you confirm that you have authority to bind your organization to these Terms.",
  },
  {
    id: "use-of-platform",
    title: "Use of Platform",
    icon: icon(<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>),
    body: "IncentIQ is licensed for authorized internal business use only. Use of the platform is subject to the scope defined in your subscription agreement.",
    bullets: [
      "No reverse engineering, decompiling, or disassembling of the platform",
      "No use to develop competing products or services",
      "No unauthorized access to systems, data, or other users' accounts",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: icon(<><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></>),
    body: "IncentIQ and its licensors retain all rights to the platform, software, and algorithms. You retain full ownership of your data.",
    bullets: [
      "Your data is never used to train our models or shared with third parties",
      "Feedback you provide may be used to improve the platform",
    ],
  },
  {
    id: "payment-billing",
    title: "Payment & Billing",
    icon: icon(<><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>),
    body: "Subscription fees are as specified in your order form and are payable in advance. All fees are non-refundable unless expressly stated otherwise.",
    bullets: [
      "Late payments may incur interest as permitted by applicable law",
      "Pricing changes take effect at the start of your next renewal period",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    icon: icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>),
    body: "IncentIQ's total liability is limited to fees paid in the prior 12 months. We are not liable for indirect, incidental, or consequential damages under any circumstances.",
  },
  {
    id: "termination",
    title: "Termination",
    icon: icon(<><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>),
    body: "Either party may terminate with written notice as per your subscription agreement. Your data remains available for export for 30 days following termination, after which it is securely deleted.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPageLayout
          heroIcon={heroIcon}
          title="Terms of Service"
          subtext="Simple, fair terms for enterprise use of the IncentIQ platform."
          date="Last updated: June 2026"
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
