import { useState } from "react";
import { Activity, Building2, GraduationCap, Truck, Zap } from "lucide-react";

const MODULES = [
  {
    id: "erp",
    label: "Enterprise Resource Planning",
    icon: Building2,
    kpis: [
      { label: "Manual Tasks Liquidated", value: 1284, max: 1400, unit: "" },
      { label: "Processing Efficiency", value: 96, max: 100, unit: "%" },
      { label: "Operational Visibility", value: 88, max: 100, unit: "%" },
      { label: "System Uptime", value: 99.97, max: 100, unit: "%" },
    ],
  },
  {
    id: "school",
    label: "School Management Core",
    icon: GraduationCap,
    kpis: [
      { label: "Auto-graded Assessments", value: 3420, max: 4000, unit: "" },
      { label: "Fee Collection Rate", value: 94, max: 100, unit: "%" },
      { label: "Attendance Visibility", value: 99, max: 100, unit: "%" },
      { label: "Parent Engagement", value: 87, max: 100, unit: "%" },
    ],
  },
  {
    id: "logistics",
    label: "Industrial Logistics Engine",
    icon: Truck,
    kpis: [
      { label: "Shipments Tracked", value: 8721, max: 9000, unit: "" },
      { label: "On-time Delivery", value: 97.4, max: 100, unit: "%" },
      { label: "Fleet Utilization", value: 91, max: 100, unit: "%" },
      { label: "System Uptime", value: 99.99, max: 100, unit: "%" },
    ],
  },
] as const;

export function CoreEngine() {
  const [activeId, setActiveId] = useState<(typeof MODULES)[number]["id"]>("erp");
  const active = MODULES.find((m) => m.id === activeId)!;

  return (
    <section id="engine" className="relative border-t border-border/60 bg-card/30 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">The Core Engine</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Live preview of your reimagined operating system</h2>
          <p className="mt-4 text-muted-foreground">
            Every AfriTech deployment ships with a unified control surface — switch between
            ERP, school management and industrial logistics to see real KPIs render in real time.
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            </div>
            <div className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
              afritechsystemsltd.com / console
            </div>
            <div className="flex items-center gap-1.5 text-xs text-success">
              <Activity className="h-3 w-3" /> Live
            </div>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-border bg-card/40 p-3 lg:border-b-0 lg:border-r">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Systems</p>
              <ul className="space-y-1">
                {MODULES.map((m) => {
                  const Icon = m.icon;
                  const isActive = activeId === m.id;
                  return (
                    <li key={m.id}>
                      <button
                        onClick={() => setActiveId(m.id)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          isActive ? "bg-brand/15 text-brand" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="truncate">{m.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 rounded-lg border border-border bg-background/60 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold"><Zap className="h-3.5 w-3.5 text-brand" />Automation status</div>
                <p className="mt-2 text-[11px] text-muted-foreground">14 workflows executing • 0 failures</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-brand to-success animate-pulse-stream" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{active.label}</h3>
                <div className="hidden gap-1 text-xs text-muted-foreground sm:flex">
                  <span className="rounded-md border border-border px-2 py-1">Today</span>
                  <span className="rounded-md border border-border px-2 py-1">7d</span>
                  <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-brand">30d</span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {active.kpis.map((k) => (
                  <KpiCard key={k.label} {...k} />
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Throughput last 24h</p>
                  <p className="text-xs text-muted-foreground">Auto-refresh • {active.label}</p>
                </div>
                <Sparkline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-brand/50">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">
        {value.toLocaleString()}<span className="text-base text-muted-foreground">{unit}</span>
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-glow transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Sparkline() {
  const pts = [22, 30, 26, 38, 34, 48, 42, 56, 52, 68, 64, 78, 72, 88, 82, 94];
  const w = 600, h = 90, max = 100;
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - (p / max) * h;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 190)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 190)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path d={path} fill="none" stroke="oklch(0.78 0.16 190)" strokeWidth="2" />
    </svg>
  );
}
