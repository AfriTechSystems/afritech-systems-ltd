import { Code2, LineChart, Wrench, Users } from "lucide-react";
import { SITE } from "@/lib/site";

const PILLARS = [
  { icon: Code2, title: "Engineers", desc: "Full-stack developers who design and ship custom platforms." },
  { icon: Wrench, title: "Systems Architects", desc: "Map your business and turn it into clean, automated workflows." },
  { icon: LineChart, title: "Data & Analytics", desc: "Live dashboards that turn your numbers into clear decisions." },
  { icon: Users, title: "Client Success", desc: "Hands-on training and support so your team adopts the system fast." },
];

export function Architects() {
  return (
    <section id="team" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Our Team</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            A strong team of builders, behind every system.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            AfriTech Systems brings together engineers, analysts and operations specialists.
            Together we design, build and support every project from day one.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-brand/60 hover:shadow-glow"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-8 rounded-xl border border-dashed border-border bg-card/30 p-4 text-center text-xs text-muted-foreground">
          {SITE.pacra}
        </p>
      </div>
    </section>
  );
}
