import { SectionHeading, Button } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import {
  IconSpeed, IconTrust, IconTransparency, IconWorkload, IconAttainment, IconVisibility,
} from "../ui/icons";

const benefits = [
  { icon: IconSpeed, title: "Faster incentive processing", body: "Compress multi-day pay cycles into automated runs that finish in minutes." },
  { icon: IconTrust, title: "Increased sales trust", body: "Reps see exactly how they're paid, so plans drive motivation, not doubt." },
  { icon: IconTransparency, title: "Better payout transparency", body: "Itemized, explainable statements replace black-box commission math." },
  { icon: IconWorkload, title: "Reduced operational workload", body: "Automation lifts the manual burden off Sales Ops and Finance." },
  { icon: IconAttainment, title: "Improved quota attainment", body: "Clear targets and AI guidance help more reps consistently hit quota." },
  { icon: IconVisibility, title: "Real-time visibility", body: "Sales, Finance, and Leadership share one live view of performance." },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-surface py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="ENTERPRISE BENEFITS"
              title={<>Built for modern <span className="text-gradient">revenue organizations.</span></>}
              description="Combine AI, analytics, and automation into a unified sales performance platform — and feel the difference across every team that touches compensation."
            />
            <div className="mt-8 hidden lg:block">
              <Button href="/book-demo" variant="primary" withArrow>See it on your data</Button>
            </div>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2">
            {benefits.map((b, i) => (
              <RevealItem key={b.title}>
                <div
                  className={[
                    "group h-full px-0 py-8 transition-colors duration-300 sm:px-9",
                    "border-line",
                    i % 2 === 0 ? "sm:border-r" : "",
                    i < benefits.length - 2 ? "border-b" : "",
                    i === benefits.length - 2 || i === benefits.length - 1 ? "max-sm:border-b last:max-sm:border-b-0" : "",
                  ].join(" ")}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-accent shadow-soft ring-1 ring-line transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-canvas group-hover:shadow-float">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[17.5px] font-semibold tracking-tight text-ink">{b.title}</h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
