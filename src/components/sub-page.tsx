import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export interface SubPageProps {
  eyebrow: string;
  title: string;          // H1
  description: string;
  intro: string;
  capabilities: string[];
  outcomes: { k: string; v: string }[];
  related: { to: string; label: string; desc: string }[];
}

export function SubPage(props: SubPageProps) {
  return (
    <>
      <PageHero eyebrow={props.eyebrow} title={props.title} description={props.description} />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-muted-foreground">{props.intro}</p>

        <h2 className="mt-12 font-display text-2xl font-bold sm:text-3xl">Core capabilities</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {props.capabilities.map((c) => (
            <li key={c} className="flex items-start gap-2 rounded-xl border border-border bg-card/40 p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl font-bold sm:text-3xl">Outcomes you can measure</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {props.outcomes.map((o) => (
            <div key={o.v} className="rounded-2xl border border-border bg-card/40 p-6 text-center">
              <p className="font-display text-3xl font-bold text-brand">{o.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{o.v}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold sm:text-3xl">Explore related</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.related.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-brand/50"
            >
              <p className="font-semibold group-hover:text-brand">{r.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Ready to scope your build?</h2>
          <p className="mt-2 text-muted-foreground">Book a free digital audit with an AfriTech systems engineer.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow"
          >
            Initiate Digital Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url,
      })),
    }),
  };
}
