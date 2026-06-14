import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { DemoForm } from "./DemoForm";
import { IconCheck } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Book a demo — IncentNow",
  description:
    "See IncentNow in action. Book a personalised walkthrough of AI-first incentive compensation on ServiceNow.",
};

const proof = [
  "No credit card required",
  "30-minute personalised walkthrough",
  "Live on ServiceNow — see your real environment",
  "Get answers from an ICM specialist",
];

export default function BookDemoPage() {
  return (
    <>
      <Navbar />
      <main className="mesh grain relative min-h-screen overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-mesh-blue opacity-55 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-mesh-lilac opacity-45 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-wash opacity-60 blur-3xl" />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">

            {/* left — headline + proof */}
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">BOOK A DEMO</span>
              <h1 className="mt-4 font-display text-display-1 font-bold text-ink text-balance">
                See IncentNow{" "}
                <span className="text-gradient">in action.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lead text-ink-2 text-pretty">
                Get a personalised walkthrough of how IncentNow transforms sales compensation — live on ServiceNow with your use case in focus.
              </p>

              <ul className="mt-8 space-y-3.5">
                {proof.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-ink-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent shadow-[0_2px_8px_rgba(43,74,127,0.25)]">
                      <IconCheck className="h-3 w-3 text-canvas" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* social proof strip */}
              <div className="mt-10 rounded-2xl border border-line bg-white/70 p-5 backdrop-blur">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">Trusted by revenue teams at</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {["Salesforce", "Workday", "SAP", "HubSpot", "Oracle"].map((name) => (
                    <span key={name} className="font-display text-[15px] font-bold text-ink/30">{name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* right — form */}
            <DemoForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
