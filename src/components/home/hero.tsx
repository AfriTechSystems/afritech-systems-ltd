import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { BookCallButton } from "@/components/book-call-button";
const heroImageAsset = { url: "/img/hero/hero-collaboration.webp" };

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-glow">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles className="h-3 w-3 text-brand" />
            Pan-African Enterprise Automation Studio
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
            SYSTEMS <span className="text-gradient-brand">REIMAGINED</span>
            <span className="mt-2 block text-2xl font-semibold text-foreground/90 sm:text-3xl md:text-4xl">
              Enterprise Automation for Africa
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-foreground sm:text-xl">
            We turn manual, spreadsheet-heavy operations into powerful, automated digital systems.
          </p>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Stop wrestling with fragmented workflows and outdated tools. We design custom software
            solutions and interactive dashboards that run your operations automatically — owned by
            you, no monthly SaaS fees.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#audit" className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]">
              Reimagine Your System Today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <BookCallButton label="Book a discovery call" variant="outline" size="md" />
            <Link to="/solutions" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-accent">
              Explore Solutions
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: "98%", v: "Manual tasks liquidated" },
              { k: "24/7", v: "System uptime SLA" },
              { k: "10x", v: "Processing acceleration" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-border bg-card/70 p-3">
                <dt className="font-display text-xl sm:text-2xl font-bold text-brand">{s.k}</dt>
                <dd className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-card/40 shadow-glow">
            <img
              src={heroImageAsset.url}
              alt="Hand holding a connected world of devices and apps — AfriTech enterprise automation"
              width={1280}
              height={1024}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-card/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-success backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Live
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
            {[
              { k: "+38%", v: "Throughput" },
              { k: "99.8%", v: "Accuracy" },
              { k: "0", v: "Manual entry" },
            ].map((s) => (
              <div key={s.v} className="rounded-lg border border-border bg-card/90 p-2 backdrop-blur">
                <p className="font-display text-sm font-bold text-brand">{s.k}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
