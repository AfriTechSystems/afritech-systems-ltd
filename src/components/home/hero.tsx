import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { BookCallButton } from "@/components/book-call-button";

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
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl drop-shadow-sm">
            SYSTEMS <span className="text-gradient-brand">REIMAGINED.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-foreground sm:text-xl">
            We turn manual, spreadsheet-heavy operations into powerful, automated digital systems.
          </p>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Stop wrestling with fragmented workflows and outdated tools. We analyze your unique
            business processes, design custom software solutions and build interactive dashboards
            that run your operations automatically — owned by you, no monthly SaaS fees.
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
          <PipelineVisualizer />
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

function PipelineVisualizer() {
  return (
    <div className="relative aspect-square w-full max-w-xl mx-auto text-foreground">
      <div className="absolute inset-0 rounded-3xl border border-border bg-card/60 backdrop-blur-xl border-glow" />
      <svg viewBox="0 0 500 500" className="relative h-full w-full" aria-label="Legacy pipeline transforming into reimagined automation">
        <defs>
          <linearGradient id="brandG" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-brand-glow)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Legacy Excel grid (left) */}
        <g transform="translate(30,140)" opacity="0.85">
          <rect width="160" height="120" rx="8" fill="var(--color-muted)" stroke="var(--color-border)" />
          <text x="80" y="-8" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.75">Excel / Legacy</text>
          {[0,1,2,3,4].map(r => (
            <g key={r}>
              {[0,1,2,3].map(c => (
                <rect key={c} x={c*40} y={r*24} width="40" height="24" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
              ))}
            </g>
          ))}
        </g>

        {[180, 220, 260].map((y, i) => (
          <path key={i} d={`M200 ${y} Q 280 ${y - 20 + i*10}, 360 230`} fill="none" stroke="url(#brandG)" strokeWidth="2" className="animate-flow" />
        ))}

        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={210 + i*28} cy={230} r="3" fill="var(--color-brand-glow)" filter="url(#glow)">
            <animate attributeName="cx" from="200" to="360" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Central cloud */}
        <g transform="translate(340,170)">
          <rect width="130" height="120" rx="16" fill="var(--color-card)" stroke="url(#brandG)" strokeWidth="1.5" filter="url(#glow)" />
          <rect width="130" height="120" rx="16" fill="none" stroke="url(#brandG)" strokeWidth="1.5" />
          <text x="65" y="50" textAnchor="middle" fontSize="11" fill="var(--color-brand)" fontWeight="600">AfriTech Cloud</text>
          <text x="65" y="68" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.7">Automation Core</text>
          <circle cx="65" cy="92" r="14" fill="none" stroke="url(#brandG)" strokeWidth="1.5">
            <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="92" r="4" fill="var(--color-brand)" />
        </g>

        {[{x:60,y:380,l:"ERP"},{x:200,y:420,l:"Schools"},{x:340,y:400,l:"Logistics"},{x:430,y:360,l:"Reports"}].map((n, i) => (
          <g key={i}>
            <path d={`M405 290 Q ${n.x+20} 340, ${n.x+20} ${n.y}`} fill="none" stroke="url(#brandG)" strokeWidth="1" strokeOpacity="0.5" className="animate-flow" />
            <rect x={n.x} y={n.y} width="80" height="30" rx="6" fill="var(--color-card)" stroke="url(#brandG)" strokeOpacity="0.7" />
            <text x={n.x+40} y={n.y+19} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.9">{n.l}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
