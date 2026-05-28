import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { IndustryBlueprint } from "@/components/home/industry-blueprint";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Pharma, Public Sector, Logistics & More" },
      { name: "description", content: "Sector-specific automation for pharmaceuticals, public sector, logistics, manufacturing and academia across Pan-Africa." },
      { property: "og:title", content: "Industries — AfriTech Systems" },
      { property: "og:description", content: "Sector-specific automation blueprints engineered for African enterprises." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector-specific automation, agnostic core engine"
        description="From pharmaceutical cold-chain to government citizen services, our automation core injects intelligence into the operational loops that matter most to your sector."
      />
      <IndustryBlueprint />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "5", v: "Core industries served" },
            { k: "Pan-Africa", v: "Geographic reach" },
            { k: "ZRA / PACRA", v: "Compliance ready" },
            { k: "24/7", v: "Monitored operations" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card/40 p-6 text-center">
              <p className="font-display text-3xl font-bold text-brand">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
