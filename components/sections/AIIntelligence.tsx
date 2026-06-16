import { SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { AIVisual } from "../visuals/AIVisual";
import {
  IconForecast, IconRecommend, IconAnomaly, IconResolve, IconCoaching, IconAutonomous,
} from "../ui/icons";

const items = [
  { icon: IconForecast, title: "Predictive forecasting", body: "Project attainment and payout exposure before the cycle closes." },
  { icon: IconRecommend, title: "AI recommendations", body: "Surface the plan adjustments most likely to move performance." },
  { icon: IconAnomaly, title: "Anomaly detection", body: "Flag irregular commissions and payouts the moment they appear." },
  { icon: IconResolve, title: "Smart dispute resolution", body: "Match disputes to plan rules and recommend resolutions in seconds." },
  { icon: IconCoaching, title: "Sales coaching insights", body: "Turn performance data into specific, rep-level guidance." },
  { icon: IconAutonomous, title: "Autonomous operations", body: "AI agents run routine incentive tasks end to end, humans in control." },
];

export function AIIntelligence() {
  return (
    <section id="ai" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-mesh-sand opacity-40 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-mesh-blue opacity-30 blur-3xl" />
      <div className="shell">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="AI-FIRST INTELLIGENCE"
            title={<>Intelligence <span className="text-gradient">beyond compensation.</span></>}
            description="IncentIQ uses Now Assist and GenAI to do more than calculate — it forecasts, explains, detects, and acts, with governance always in the loop."
          />
        </Reveal>

        <div className="mt-20 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal y={24}>
            <AIVisual />
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <RevealItem key={it.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink p-6 shadow-soft transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(43,74,127,0.18)]">
                  <div aria-hidden className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-canvas ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-accent group-hover:ring-accent">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 text-[15px] font-semibold text-canvas">{it.title}</h3>
                  <p className="relative mt-1.5 text-[13px] leading-relaxed text-canvas/60">{it.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
