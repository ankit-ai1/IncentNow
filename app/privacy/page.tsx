import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalPageLayout, type LegalSection } from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — IncentIQ",
  description: "How IncentIQ collects, uses, and protects your information.",
};

const heroIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const icon = (path: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={path} />
  </svg>
);

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: icon("M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
    body: "This Privacy Policy explains how CtrlAltNow Solution Inc. (“IncentIQ”) collects, uses, and protects information when you use our incentive compensation management platform. By using IncentIQ, you agree to the practices described here.",
  },
  {
    id: "data-collection",
    title: "Data Collection",
    icon: icon("M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M8 11h8M8 15h5"),
    body: "We collect information you provide directly and data generated through your use of the platform.",
    bullets: [
      "Account details such as name, email address, and job title",
      "Usage data and platform interactions for reliability and performance",
      "No advertising data is ever collected or used",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How We Use It",
    icon: icon("M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"),
    body: "Your data is used solely to operate the platform and provide you with the best possible service.",
    bullets: [
      "Authenticate users and process incentive calculations",
      "Send essential service communications and security alerts",
      "Improve platform performance and develop new features",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: icon("M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 0v10m0 0l7.07-7.07M12 12L4.93 4.93"),
    body: "We use only strictly necessary cookies to operate the platform. No third-party trackers, ad pixels, or cross-site profiling are used.",
    bullets: [
      "Session management and authentication tokens",
      "No advertising or marketing cookies of any kind",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: icon("M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"),
    body: "You have the right to access, correct, export, or delete your personal data at any time.",
    bullets: [
      "Access — request a copy of the information we hold about you",
      "Correction — ask us to fix inaccurate or incomplete data",
      "Deletion — request permanent removal of your personal data",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPageLayout
          heroIcon={heroIcon}
          title="Privacy Policy"
          subtext="We're committed to protecting your data and ensuring full transparency in how we use it."
          date="Last updated: June 2026"
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
