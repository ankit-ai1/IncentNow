import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WhyServiceNow } from "@/components/sections/WhyServiceNow";
import { Benefits } from "@/components/sections/Benefits";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Why ServiceNow — IncentIQ",
  description:
    "IncentIQ is built natively on ServiceNow, inheriting enterprise scalability, governance, and security from the Now Platform.",
};

export default function WhyServiceNowPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="WHY SERVICENOW"
          title={<>Enterprise scale, <span className="text-gradient">inherited by design.</span></>}
          description="By building natively on ServiceNow, IncentIQ inherits the governance, security, and scalability of the Now Platform — no bolt-on integrations, no data silos."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "See the platform", href: "/platform" }}
        />
        <WhyServiceNow />
        <Benefits />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
