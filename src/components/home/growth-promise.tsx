import { Eye, ShieldCheck, BarChart3 } from "lucide-react";

const PILLARS = [
  {
    icon: Eye,
    title: "Intuitive Visual UX",
    body: "Designed for quick onboarding so your internal team transitions from old processes to new tools instantly — no months of training, no productivity dip.",
  },
  {
    icon: ShieldCheck,
    title: "Bulletproof Data Security",
    body: "Built following modern cloud infrastructure compliance practices — encrypted at rest and in transit, with role-based access and full audit trails protecting sensitive company records.",
  },
  {
    icon: BarChart3,
    title: "Actionable Business Intelligence",
    body: "Real-time dashboards engineered from the ground up to give managers and executives immediate, visual clarity on the performance indicators that drive revenue.",
  },
];

export function GrowthPromise() {
  return (
    <section className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Built for Growth</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Backed by performance, designed to outpace your growth
          </h2>
        </header>

        <blockquote className="mt-10 rounded-2xl border-l-4 border-brand bg-card/60 p-8 backdrop-blur">
          <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
            "<span className="text-gradient-brand">Systems Reimagined</span> isn't just our tagline
            — it's our operational promise."
          </p>
          <p className="mt-4 text-muted-foreground">
            We don't hand over a system and disappear. Business environments evolve rapidly and
            your technology must outpace that growth. Every AfriTech system is explicitly
            architected to be continuously optimized, scaled and enhanced with smart automation as
            your operation expands.
          </p>
        </blockquote>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:border-brand/50 hover:shadow-glow"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}