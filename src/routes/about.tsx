import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Architects } from "@/components/home/architects";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AfriTech Systems — Lusaka, Zambia" },
      { name: "description", content: "PACRA-registered Zambian automation studio building custom ERP, school management and industrial systems for Pan-African enterprises." },
      { property: "og:title", content: "About — AfriTech Systems Limited" },
      { property: "og:description", content: "Pan-African enterprise automation studio headquartered in Lusaka, Zambia." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About AfriTech Systems"
        title="A Pan-African automation studio engineered in Lusaka."
        description="We are a team of systems engineers, financial strategists and operations specialists rebuilding how African enterprises run — replacing legacy bottlenecks with intelligent, audit-grade digital infrastructure."
      />
      <section className="mx-auto max-w-7xl grid gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="space-y-4 text-muted-foreground">
          <h2 className="font-display text-3xl font-bold text-foreground">Our mission</h2>
          <p>
            AfriTech Systems Limited exists to liquidate the operational tax that legacy
            workflows impose on African enterprises. Every Excel workbook, every duplicate
            data-entry, every blind executive decision is an opportunity to engineer something
            better.
          </p>
          <p>
            We design and deploy custom enterprise platforms — ERP systems, school management
            cores, industrial logistics engines and bespoke automation — built around your
            operations, branded for your organization and integrated with the tools your team
            already trusts.
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground pt-4">Our reach</h2>
          <p>{SITE.reach}</p>
        </article>
        <aside className="rounded-2xl border border-border bg-card/60 p-8">
          <h2 className="font-display text-2xl font-bold">Registration & credentials</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="text-muted-foreground">Registered name</dt><dd className="font-semibold">{SITE.name}</dd></div>
            <div><dt className="text-muted-foreground">Registry</dt><dd className="font-semibold">Patents and Companies Registration Agency (PACRA)</dd></div>
            <div><dt className="text-muted-foreground">Headquarters</dt><dd className="font-semibold">{SITE.location}</dd></div>
            <div><dt className="text-muted-foreground">Domain</dt><dd className="font-semibold">{SITE.domain}</dd></div>
            <div><dt className="text-muted-foreground">Email</dt><dd className="font-semibold">{SITE.email}</dd></div>
            <div><dt className="text-muted-foreground">Phone</dt><dd className="font-semibold">{SITE.phones.join(" · ")}</dd></div>
          </dl>
        </aside>
      </section>
      <Architects />
    </>
  );
}
