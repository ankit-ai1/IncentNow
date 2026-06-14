import { IconData, IconSpark } from "../ui/icons";

const sources = ["CRM", "ERP", "HRMS", "Warehouse"];
const outputs = ["Statements", "Dashboards", "AI agents", "Audit trail"];
const layers = [
  { label: "Unified data model", tag: "Data" },
  { label: "Workflow & approvals", tag: "Process" },
  { label: "Now Assist · GenAI", tag: "AI" },
  { label: "Governance & security", tag: "Trust" },
];

export function ServiceNowFlow() {
  return (
    <div className="glass relative overflow-hidden rounded-xl3 p-5 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-mesh-blue opacity-50 blur-3xl" />

      <div className="relative grid items-stretch gap-5 lg:grid-cols-[0.8fr_1.3fr_0.8fr]">
        {/* sources */}
        <div className="flex flex-col">
          <Label>Source systems</Label>
          <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
            {sources.map((s) => (
              <div key={s} className="flex items-center gap-2.5 rounded-xl border border-line bg-white/80 px-3.5 py-2.5 backdrop-blur">
                <IconData className="h-4 w-4 text-accent-400" />
                <span className="text-[13px] font-medium text-ink">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* connector (desktop) */}
        <ConnectorLeft />

        {/* core */}
        <div className="relative rounded-xl3 border border-accent-soft bg-gradient-to-b from-accent-wash to-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent-600">
              <IconSpark className="h-3.5 w-3.5" /> Now Platform
            </span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-muted">System of record</span>
          </div>
          <div className="flex flex-col gap-2">
            {layers.map((l) => (
              <div key={l.label} className="flex items-center justify-between rounded-xl bg-white px-3.5 py-3 shadow-ring">
                <span className="text-[13px] font-medium text-ink">{l.label}</span>
                <span className="rounded bg-accent-wash px-1.5 py-0.5 text-[10px] font-semibold text-accent-600">{l.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <ConnectorRight />

        {/* outputs */}
        <div className="flex flex-col">
          <Label>Governed outputs</Label>
          <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
            {outputs.map((o) => (
              <div key={o} className="flex items-center gap-2.5 rounded-xl border border-line bg-white/80 px-3.5 py-2.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[13px] font-medium text-ink">{o}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{children}</p>
  );
}

function ConnectorLeft() {
  return (
    <svg aria-hidden className="pointer-events-none absolute left-[26%] top-1/2 hidden h-24 w-[8%] -translate-y-1/2 text-accent/40 lg:block" viewBox="0 0 60 100" fill="none">
      <path d="M0 50 H60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" className="animate-flow-dash" />
    </svg>
  );
}
function ConnectorRight() {
  return (
    <svg aria-hidden className="pointer-events-none absolute right-[26%] top-1/2 hidden h-24 w-[8%] -translate-y-1/2 text-accent/40 lg:block" viewBox="0 0 60 100" fill="none">
      <path d="M0 50 H60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" className="animate-flow-dash" />
    </svg>
  );
}
