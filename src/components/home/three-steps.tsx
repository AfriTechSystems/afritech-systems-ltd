import { Search, Boxes, LineChart } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Process Auditing & Analysis",
    body: "We step inside your business to map exactly how your operations work today — surfacing human error, hidden bottlenecks and the fragmented legacy tools (over-complex Excel sheets, disconnected apps) that quietly slow you down.",
  },
  {
    n: "02",
    icon: Boxes,
    title: "Custom Architecture & System Building",
    body: "No rigid, one-size-fits-all software. Our engineers design completely bespoke digital ecosystems — from advanced ERP networks to field operations management — tailored precisely to your rules, your sector and your team.",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Automation & Dashboard Tracking",
    body: "We bring your data to life. Automated entry, real-time syncs and custom KPI tracking generate executive dashboards that let you monitor operations, track efficiency and spot trends — automatically, around the clock.",
  },
];

export function ThreeSteps() {
  return (
    <section id="how" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">How We Do It</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            From complexity to clarity in three steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, transparent operating workflow — engineered so non-technical executives
            can see exactly how manual chaos becomes automated infrastructure.
          </p>
        </header>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          <div aria-hidden className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.n}
                className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:border-brand/50 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-bold text-brand/70">{s.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}