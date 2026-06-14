import { Button } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { IconCheck, IconSpark } from "../ui/icons";

const assurances = ["Native to ServiceNow", "Enterprise governance", "AI-first by design", "No spreadsheets"];

export function FinalCTA() {
  return (
    <section id="demo" className="px-[var(--shell-px)] py-24 sm:py-32">
      <div className="mx-auto max-w-shell-wide">
        <Reveal>
          <div className="mesh grain relative overflow-hidden rounded-xl4 border border-white/60 px-7 py-20 text-center shadow-[0_24px_80px_rgba(15,27,45,0.14),0_4px_16px_rgba(15,27,45,0.06)] sm:px-16 sm:py-32">
            {/* ambient glow blobs */}
            <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-mesh-blue opacity-70 blur-[80px]" />
            <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-mesh-lilac opacity-70 blur-[80px]" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-wash opacity-80 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              {/* badge */}
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-soft bg-white/80 px-4 py-1.5 text-[12px] font-semibold text-accent shadow-soft backdrop-blur">
                  <IconSpark className="h-3.5 w-3.5" />
                  AI-first incentive compensation
                </span>
              </div>

              <h2 className="font-display text-display-1 font-bold text-ink text-balance">
                Build trust. Improve performance.{" "}
                <span className="text-gradient">Automate incentives.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-ink-2 text-pretty">
                See how IncentNow turns sales compensation into a transparent, intelligent, governed workflow — built natively on ServiceNow.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <Button href="/book-demo" variant="primary" className="px-7 py-3.5 text-base">
                  Request a demo
                </Button>
                <Button href="/platform" variant="secondary" className="px-7 py-3.5 text-base">
                  Explore the platform
                </Button>
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {assurances.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-[13px] font-medium text-ink-2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-accent">
                      <IconCheck className="h-2.5 w-2.5 text-canvas" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
