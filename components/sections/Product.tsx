import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { DashboardMockup } from "../visuals/DashboardMockup";
import { IconVisibility, IconScale, IconWorkflow, IconSpark } from "../ui/icons";

const pillars = [
  { icon: IconSpark, title: "Modern AI-first ICM", body: "Intelligence woven through every incentive workflow, not bolted on." },
  { icon: IconVisibility, title: "Real-time visibility", body: "One source of truth for Sales, Finance, and Leadership — no month-end surprises." },
  { icon: IconScale, title: "Built on ServiceNow", body: "Enterprise scalability and governance inherited from the Now Platform." },
  { icon: IconWorkflow, title: "Unified workflows", body: "Data, automation, reporting, and AI live in one connected system." },
];

export function Product() {
  return (
    <section id="product" className="relative overflow-hidden py-24 sm:py-32">
      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-mesh-lilac opacity-35 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-64 w-64 rounded-full bg-mesh-sage opacity-30 blur-3xl" />

      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.18fr] lg:items-center lg:gap-24">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="MEET INCENTNOW"
                title={<>One platform for incentives, <span className="text-gradient">end to end.</span></>}
                description="IncentIQ unifies incentive data, calculations, and AI on ServiceNow — turning a fragmented, spreadsheet-driven process into a single governed system."
              />
            </Reveal>

            <div className="mt-10 space-y-1">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.07}>
                  <div className="group flex items-start gap-4 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-white hover:shadow-soft">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-wash text-accent-600 ring-1 ring-accent-soft transition-all duration-300 group-hover:bg-accent group-hover:text-canvas group-hover:shadow-soft">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[15.5px] font-semibold tracking-tight text-ink">{p.title}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} y={30}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-mesh-blue/50 via-accent-wash/30 to-mesh-lilac/30 blur-3xl" />
              <DashboardMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
