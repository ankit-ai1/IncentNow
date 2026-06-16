import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Product } from "@/components/sections/Product";
import { AIIntelligence } from "@/components/sections/AIIntelligence";
import { WhyServiceNow } from "@/components/sections/WhyServiceNow";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Platform — IncentIQ",
  description:
    "The IncentIQ platform unifies incentive data, calculations, and AI on ServiceNow — one governed system for the full incentive lifecycle.",
};

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="PLATFORM"
          title={<>One platform for incentives, <span className="text-gradient">end to end.</span></>}
          description="IncentIQ turns a fragmented, spreadsheet-driven process into a single governed system — data, automation, reporting, and AI in one connected platform built natively on ServiceNow."
          primary={{ label: "Book a demo", href: "/book-demo" }}
          secondary={{ label: "See capabilities", href: "/capabilities" }}
        />
        <Product />
        <AIIntelligence />
        <WhyServiceNow />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
