import { Button, Pill } from "../ui/Primitives";
import { HeroComposition } from "../visuals/HeroComposition";
import { IconCheck } from "../ui/icons";
import { ServiceNowLogo, withLogo } from "../ui/ServiceNowLogo";

const features = ["Quota management", "Commission automation", "Dispute resolution", "AI assistant"];

const logos = [
  "Salesforce", "ServiceNow", "Workday", "NetSuite", "SAP", "HubSpot",
  "Microsoft", "Oracle", "Zuora", "Gong",
];

export function Hero() {
  return (
    <section id="top" className="mesh grain relative overflow-hidden pb-28 pt-36 sm:pb-32 sm:pt-44">
      <div className="shell-wide relative">
        {/* copy */}
        <div className="mx-auto text-center">
          <div className="flex justify-center">
            <Pill>Built natively on <ServiceNowLogo size="sm" /></Pill>
          </div>

          <h1
            className="mt-8 font-display font-bold text-dark-green leading-[1.08] sm:leading-[0.96]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.04em" }}
          >
            Incentive<br />
            <span className="sm:whitespace-nowrap">Compensation, Reimagined</span><br />
            for the <span className="text-gradient">AI Era.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lead text-navy text-pretty">
            Move beyond spreadsheets and legacy commission tools. IncentIQ delivers intelligent automation, real-time visibility, and enterprise-scale incentive management built on <ServiceNowLogo size="md" />.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Button href="/book-demo" variant="primary" className="px-7 py-3.5 text-base">
              Book a demo
            </Button>
            <Button href="/product-tour" variant="secondary" className="px-7 py-3.5 text-base">
              Product Tour
            </Button>
            <Button href="#product" variant="secondary" className="px-7 py-3.5 text-base">
              Explore platform
            </Button>
          </div>

          {/* feature pills */}
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-[13.5px] font-medium text-navy">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-green">
                  <IconCheck className="h-2.5 w-2.5 text-white" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* layered product composition */}
        <div className="relative mt-20 sm:mt-24">
          <HeroComposition />
        </div>

        {/* trust strip */}
        <div className="mt-24 sm:mt-28">
          <div className="divider-x mb-8" />
          <p className="text-center text-[11.5px] font-bold uppercase tracking-[0.18em] text-slate/70">
            Integrates with your enterprise stack
          </p>
          <div className="mask-fade-x mt-7 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-0">
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="flex items-center">
                  <span className="whitespace-nowrap px-8 font-display text-[1.1rem] font-bold tracking-tight text-dark-green/30 transition-colors hover:text-dark-green/55">
                    {withLogo(l, "sm")}
                  </span>
                  {i % logos.length !== logos.length - 1 ? (
                    <span className="h-1 w-1 shrink-0 rounded-full bg-dark-green/12" />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          <div className="divider-x mt-8" />
        </div>
      </div>
    </section>
  );
}
