import { ArrowRight, TrendingUp } from "lucide-react";
import pharmaAsset from "@/assets/cases/pharmacy-app.jpg.asset.json";
import schoolAsset from "@/assets/cases/school-erp.jpg.asset.json";
import logisticsAsset from "@/assets/cases/logistics-network.jpg.asset.json";

const CASES = [
  {
    img: pharmaAsset.url,
    alt: "Pharmacy mobile app showing medicine delivery, prescription upload and inventory dashboard",
    sector: "Pharma Distribution",
    title: "From stock sheets to a live ERP",
    body: "A regional pharma distributor replaced 14 spreadsheets with one connected system. Stock-outs dropped, orders ship 38% faster.",
    metric: "+38% faster fulfilment",
  },
  {
    img: schoolAsset.url,
    alt: "School ERP software dashboard showing students, teachers, attendance and fee collection analytics",
    sector: "Education",
    title: "A parent portal for 12,000 learners",
    body: "A private school group moved paper records to an online portal. Parents see grades, attendance and fees in real time.",
    metric: "12,000+ learners online",
  },
  {
    img: logisticsAsset.url,
    alt: "Global logistics illustration with truck, ship, plane and train connected around a world map",
    sector: "Logistics SME",
    title: "WhatsApp dispatch → smart routing",
    body: "A logistics firm swapped WhatsApp messages for an automated routing dashboard. Drivers get clear daily runs and live tracking.",
    metric: "−27% fuel cost",
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="border-t border-border/60 bg-card/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Case Studies</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Real businesses. Real change.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A few examples of what happens when we replace manual work with custom systems.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-glow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={c.img}
                  alt={c.alt}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{c.sector}</p>
                <h3 className="mt-2 font-display text-lg font-bold sm:text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                  <TrendingUp className="h-3 w-3" />
                  {c.metric}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#audit"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Start your free audit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
