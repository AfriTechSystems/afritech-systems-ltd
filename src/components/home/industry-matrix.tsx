import { Pill, GraduationCap, Building2, Landmark, Truck } from "lucide-react";

const ROWS = [
  {
    icon: Pill,
    sector: "Pharmaceuticals & Healthcare",
    replace: "Manual inventory logs, paper prescriptions and unlinked supply rooms.",
    solution:
      "Integrated Pharmacy & Supply Chain Systems — real-time batch tracking, automated expiration alerts and intelligent stock replenishment.",
    value: "Absolute compliance, zero stock-outs and frictionless patient distribution tracking.",
  },
  {
    icon: GraduationCap,
    sector: "Education & Academia",
    replace: "Disconnected student records, manual tuition tracking and physical report-card queues.",
    solution:
      "All-in-One School Management Systems — centralized portals for online grading, automated fee reminders and digital registration.",
    value: "Drastically reduced administrative overhead and seamless parent-school communication.",
  },
  {
    icon: Building2,
    sector: "Enterprise & Holding Companies",
    replace: "Scattered financial ledgers, disconnected department reports and multi-version tracking.",
    solution:
      "Next-Gen Enterprise Resource Planning (ERP) — unified workflows linking HR, asset management and cross-subsidiary financials.",
    value: "One single source of truth for executives, enabling automated, real-time cross-company auditing.",
  },
  {
    icon: Landmark,
    sector: "Government & Public Sector",
    replace: "Massive physical archives, slow paper application routing and untrackable public requests.",
    solution:
      "Secure Citizen Portals & Infrastructure Management — automated citizen registry, trackable application routing and public record digitization.",
    value: "Unmatched institutional transparency, rapid document processing and foolproof secure records.",
  },
  {
    icon: Truck,
    sector: "Logistics & Supply Chain",
    replace: "Paper manifests, manual delivery check-ins and chaotic dispatch coordination.",
    solution:
      "Smart Fleet & Workflow Systems — automated route dispatching, predictive maintenance dashboards and instant electronic proof-of-delivery syncs.",
    value: "Maximized asset utility, lower fuel costs and trackable, real-time shipment transparency.",
  },
];

export function IndustryMatrix() {
  return (
    <section id="industry-matrix" className="border-t border-border/60 bg-radial-glow py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Industry Matrix</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Reimagining global sectors</h2>
          <p className="mt-4 text-muted-foreground">
            Sector-specific automation blueprints engineered for African enterprises and global
            operators. We replace fragmented legacy tooling with intelligent, fully owned digital
            infrastructure — no monthly SaaS fees, no vendor lock-in.
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur">
          <div className="hidden grid-cols-12 gap-4 border-b border-border/60 bg-card/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:grid">
            <div className="col-span-3">Target Industry</div>
            <div className="col-span-3">What We Replace</div>
            <div className="col-span-3">The Reimagined Solution</div>
            <div className="col-span-3">Core Business Value</div>
          </div>
          <ul className="divide-y divide-border/60">
            {ROWS.map((r) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.sector}
                  className="grid gap-3 px-6 py-6 transition-colors hover:bg-accent/30 lg:grid-cols-12 lg:gap-4 lg:py-7"
                >
                  <div className="col-span-3 flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold leading-tight">{r.sector}</h3>
                    </div>
                  </div>
                  <p className="col-span-3 text-sm text-muted-foreground">
                    <span className="lg:hidden text-xs font-semibold uppercase text-muted-foreground/70">Replaces — </span>
                    {r.replace}
                  </p>
                  <p className="col-span-3 text-sm">
                    <span className="lg:hidden text-xs font-semibold uppercase text-brand">Reimagined — </span>
                    {r.solution}
                  </p>
                  <p className="col-span-3 text-sm text-success">
                    <span className="lg:hidden text-xs font-semibold uppercase text-muted-foreground/70">Value — </span>
                    {r.value}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}