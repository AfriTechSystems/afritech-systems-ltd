import { Building2, GraduationCap, Workflow, CheckCircle2 } from "lucide-react";

const SUITE = [
  {
    icon: Building2,
    title: "Enterprise Resource Planning (ERP) Systems",
    body: "Streamline every moving part of your business under a single dashboard. Our custom ERP solutions tie together human resources, vendor logs, procurement pathways and operational data into one intelligent ecosystem.",
    features: [
      "Automated multi-department approval flows",
      "Secure role-based permissions & audit logs",
      "Immediate accounting & cash-flow updates",
      "Cross-subsidiary consolidation in real time",
    ],
  },
  {
    icon: GraduationCap,
    title: "Intelligent School Management Portals",
    body: "Bring your entire institution into the digital age. This solution removes administrative friction for principals, bursars, teachers and parents alike.",
    features: [
      "Automated fee invoicing & mobile-money collections",
      "Immediate online grading & progress portals",
      "Automated attendance & timetabling",
      "Direct parent communication channels",
    ],
  },
  {
    icon: Workflow,
    title: "Automated Operations & Data Pipelines",
    body: "If your team spends hours shifting data from one app to another, or manually compiling weekly reports, this system acts as your permanent digital assistant.",
    features: [
      "Automatic report generation & distribution",
      "Automated cross-database synchronization",
      "Real-time operational KPI alerts",
      "Custom integrations with the tools you already use",
    ],
  },
];

export function SolutionsSuite() {
  return (
    <section id="solutions-suite" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Featured Solutions Suite</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Flagship enterprise capabilities</h2>
          <p className="mt-4 text-muted-foreground">
            Three production-grade engines, infinitely configurable to your sector. You own the
            system outright — no recurring SaaS subscriptions, no per-seat licensing, no surprises.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SUITE.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:border-brand/50 hover:shadow-glow"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                <ul className="mt-5 space-y-2 border-t border-border/60 pt-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}