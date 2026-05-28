import { SITE } from "@/lib/site";

const PEOPLE = [
  {
    name: "Mwando Hamwenda",
    role: "Chief Technology Officer (CTO) & Co-Founder",
    focus: "Masterminding architecture layout, automated logic patterns, multi-industry cloud infrastructure and core systems reimagining.",
    initials: "MH",
  },
  {
    name: "Julius Masiwa",
    role: "Chief Financial Officer (CFO) & Co-Founder",
    focus: "Managing strategic capital allocation, fiscal compliance, market expansion metrics and client ROI mapping.",
    initials: "JM",
  },
];

export function Architects() {
  return (
    <section id="leadership" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Architects & Co-Founders</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The technical and financial execution behind AfriTech</h2>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {PEOPLE.map((p) => (
            <article key={p.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 transition-all hover:border-brand/50 hover:shadow-glow">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-glow font-display text-2xl font-bold text-brand-foreground">
                  {p.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-brand">{p.role}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{p.focus}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-dashed border-border bg-card/30 p-4 text-center text-xs text-muted-foreground">
          {SITE.pacra}
        </p>
      </div>
    </section>
  );
}
