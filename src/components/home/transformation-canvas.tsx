import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Database, Gauge, Sparkles } from "lucide-react";

const TABS = [
  {
    id: "before",
    label: "The Bottleneck",
    tone: "destructive",
    metrics: [
      { icon: AlertTriangle, k: "47%", v: "Data accuracy" },
      { icon: Clock, k: "12 hrs", v: "Avg report cycle" },
      { icon: Database, k: "8", v: "Fragmented sheets" },
      { icon: Gauge, k: "Low", v: "Executive visibility" },
    ],
    points: [
      "Excel-driven reporting with siloed versions",
      "Manual data re-entry across departments",
      "No real-time KPI visibility for leadership",
      "Human error accumulating at every handoff",
    ],
  },
  {
    id: "after",
    label: "The Automaton",
    tone: "success",
    metrics: [
      { icon: CheckCircle2, k: "99.8%", v: "Data accuracy" },
      { icon: Clock, k: "Real-time", v: "Reporting cycle" },
      { icon: Database, k: "1", v: "Unified source of truth" },
      { icon: Sparkles, k: "Live", v: "Executive dashboards" },
    ],
    points: [
      "Unified cloud database with audit-grade logging",
      "Zero manual data entry — automated pipelines",
      "Role-based dashboards across every department",
      "Triggered alerts, approvals and AI-assisted ops",
    ],
  },
] as const;

export function TransformationCanvas() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("before");
  const current = TABS.find((t) => t.id === active)!;
  const isAfter = active === "after";

  return (
    <section id="transformation" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">The Transformation Canvas</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">From manual chaos to automated clarity</h2>
          <p className="mt-4 text-muted-foreground">
            Toggle the canvas and watch the same operational block shift from fragmented legacy
            workflows into a fully orchestrated digital pipeline.
          </p>
        </header>

        <div className="mt-10 inline-flex rounded-full border border-border bg-card p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                active === t.id
                  ? "bg-brand text-brand-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={`mt-8 grid gap-6 rounded-2xl border p-6 transition-all duration-500 sm:p-8 lg:grid-cols-2 ${
          isAfter
            ? "border-success/40 bg-success/5"
            : "border-destructive/40 bg-destructive/5"
        }`}>
          <ul className="space-y-3">
            {current.points.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/60 p-4">
                <span className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ${isAfter ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                  {isAfter ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                </span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3">
            {current.metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.v} className="rounded-xl border border-border bg-card/80 p-5">
                  <Icon className={`h-5 w-5 ${isAfter ? "text-success" : "text-destructive"}`} />
                  <p className="mt-3 font-display text-2xl font-bold">{m.k}</p>
                  <p className="text-xs text-muted-foreground">{m.v}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
