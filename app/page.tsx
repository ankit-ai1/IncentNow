import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Product } from "@/components/sections/Product";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyServiceNow } from "@/components/sections/WhyServiceNow";
import { AIIntelligence } from "@/components/sections/AIIntelligence";
import { Benefits } from "@/components/sections/Benefits";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "IncentIQ — AI-First Incentive Compensation on ServiceNow",
  description:
    "IncentIQ transforms sales incentives into transparent, intelligent, and automated workflows. AI-first ICM built natively on ServiceNow.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Product />
        <Capabilities />
        <WhyServiceNow />
        <AIIntelligence />
        <Benefits />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
