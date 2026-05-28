import { useState } from "react";
import { Beaker, Building, Factory, GraduationCap, Truck } from "lucide-react";

const INDUSTRIES = [
  {
    id: "pharma",
    icon: Beaker,
    label: "Pharmaceuticals",
    blurb: "Cold-chain tracking, batch traceability and regulator-ready audit trails.",
    flow: ["Manufacturer", "Cold-chain IoT", "AfriTech Core", "Pharmacy POS", "Regulator API"],
  },
  {
    id: "public",
    icon: Building,
    label: "Public Sector / Government",
    blurb: "Citizen services portals, inter-agency workflows and transparent reporting.",
    flow: ["Citizen Portal", "Form Validation", "AfriTech Core", "Agency Routing", "Public Dashboard"],
  },
  {
    id: "logistics",
    icon: Truck,
    label: "Logistics",
    blurb: "Fleet telematics, route optimization and proof-of-delivery automation.",
    flow: ["Fleet GPS", "Dispatch Engine", "AfriTech Core", "Driver App", "Client Portal"],
  },
  {
    id: "manufacturing",
    icon: Factory,
    label: "Commercial Manufacturing",
    blurb: "Shop-floor MES, inventory automation and predictive maintenance triggers.",
    flow: ["PLC / Sensors", "MES Layer", "AfriTech Core", "ERP Sync", "Exec Reports"],
  },
  {
    id: "academia",
    icon: GraduationCap,
    label: "Academic Infrastructure",
    blurb: "Unified school management — admissions to alumni, finance to attendance.",
    flow: ["Admissions", "Timetable Engine", "AfriTech Core", "Parent App", "Finance Sync"],
  },
] as const;

export function IndustryBlueprint() {
  const [activeId, setActiveId] = useState<(typeof INDUSTRIES)[number]["id"]>("pharma");
  const active = INDUSTRIES.find((i) => i.id === activeId)!;
  return (
    <section id="industries" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Cross-Industry Blueprint</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">One automation core. Every industry.</h2>
          <p className="mt-4 text-muted-foreground">
            Click any sector to see exactly where AfriTech automation injects into the
            operational loop — from data ingestion to executive reporting.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {INDUSTRIES.map((i) => {
              const Icon = i.icon;
              const isActive = activeId === i.id;
              return (
                <button
                  key={i.id}
                  onClick={() => setActiveId(i.id)}
                  className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-brand/60 bg-brand/10 shadow-glow"
                      : "border-border bg-card/40 hover:border-brand/40 hover:bg-card"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{i.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{i.blurb}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">Data-flow schematic</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{active.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{active.blurb}</p>

            <div className="mt-8">
              <FlowDiagram nodes={active.flow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-1 min-w-[140px] items-center gap-2">
            <div className={`relative flex-1 rounded-lg border p-3 text-center text-xs font-medium ${
              i === 2
                ? "border-brand bg-brand/15 text-brand shadow-glow"
                : "border-border bg-background"
            }`}>
              {n}
              {i === 2 && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase text-brand-foreground">
                  AfriTech
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <svg width="20" height="12" className="shrink-0 text-brand">
                <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="animate-flow" />
                <polygon points="14,2 20,6 14,10" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Each node represents a real integration point. AfriTech Core orchestrates ingestion,
        validation, business logic, downstream routing and audit logging.
      </p>
    </div>
  );
}
