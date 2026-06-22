import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalPageLayout, type LegalSection } from "@/components/sections/LegalPageLayout";

export const metadata: Metadata = {
  title: "Security — IncentIQ",
  description: "Enterprise-grade security built into every layer of IncentIQ.",
};

const heroIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
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
    body: "Security is a foundational design principle at IncentIQ, not an afterthought. Incentive compensation data is among the most sensitive information an enterprise manages, and we protect every layer with enterprise-grade controls.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: icon(<><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>),
    body: "Deployed on ServiceNow's enterprise cloud — ISO 27001 certified data centres with redundant power, cooling, and network connectivity.",
    bullets: [
      "SOC 2 Type II audited infrastructure with 99.9% uptime SLA",
      "Production environments logically isolated from dev and staging",
    ],
  },
  {
    id: "encryption",
    title: "Encryption",
    icon: icon(<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>),
    body: "All customer data is encrypted at rest and in transit using industry-standard algorithms managed through dedicated key management infrastructure.",
    bullets: [
      "AES-256 at rest via dedicated HSM with automated key rotation",
      "TLS 1.2+ in transit — HTTPS enforced on all endpoints",
    ],
  },
  {
    id: "access-control",
    title: "Access Control",
    icon: icon(<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
    body: "Access to IncentIQ systems is tightly controlled and continuously monitored across all roles and environments.",
    bullets: [
      "Role-based access control (RBAC) with granular permission sets",
      "MFA enforced org-wide with SSO/SAML 2.0 and OIDC support",
      "Least-privilege policy — access auto-revoked on role change",
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: icon(<><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>),
    body: "IncentIQ inherits the compliance posture of the ServiceNow Now Platform and maintains its own programme aligned to international standards.",
    bullets: [
      "SOC 2 Type II audited, ISO 27001 aligned, GDPR and CCPA ready",
      "DPAs and pen test summaries available to enterprise customers under NDA",
    ],
  },
  {
    id: "vulnerability-management",
    title: "Vulnerability Management",
    icon: icon(<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>),
    body: "We operate a continuous vulnerability management programme covering code, infrastructure, and third-party dependencies.",
    bullets: [
      "Automated scanning of application code and container images continuously",
      "Annual third-party penetration tests — critical findings patched within SLA",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPageLayout
          heroIcon={heroIcon}
          title="Security"
          subtext="Enterprise-grade security built into every layer of the IncentIQ platform."
          date="Last updated: June 2026"
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
