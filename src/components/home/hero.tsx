import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-glow">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-brand" />
            Pan-African Enterprise Automation Studio
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Systems <span className="text-gradient-brand">Reimagined</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            We analyze legacy operational bottlenecks and engineer fluid, fully automated
            enterprise ecosystems. Transition from manual workflows to intelligent digital
            infrastructure — custom ERP, school management platforms, industrial digitization
            and bespoke automation built for African enterprises.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]">
              Consult with a Systems Engineer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-accent">
              Explore the Core Engine
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "98%", v: "Manual tasks liquidated" },
              { k: "24/7", v: "System uptime SLA" },
              { k: "10x", v: "Processing acceleration" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-border bg-card/40 p-3">
                <dt className="font-display text-2xl font-bold text-brand">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PipelineVisualizer />
      </div>
    </section>
  );
}

function PipelineVisualizer() {
  return (
    <div className="relative aspect-square w-full max-w-xl mx-auto">
      <div className="absolute inset-0 rounded-3xl border border-border bg-card/40 backdrop-blur-xl border-glow" />
      <svg viewBox="0 0 500 500" className="relative h-full w-full" aria-label="Legacy pipeline transforming into reimagined automation">
        <defs>
          <linearGradient id="brandG" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 190)" />
            <stop offset="100%" stopColor="oklch(0.7 0.17 160)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Legacy Excel grid (left) */}
        <g transform="translate(30,140)" opacity="0.55">
          <rect width="160" height="120" rx="8" fill="oklch(0.3 0.02 245)" stroke="oklch(0.5 0.02 245)" />
          <text x="80" y="-8" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">Excel / Legacy</text>
          {[0,1,2,3,4].map(r => (
            <g key={r}>
              {[0,1,2,3].map(c => (
                <rect key={c} x={c*40} y={r*24} width="40" height="24" fill="none" stroke="oklch(0.5 0.02 245)" strokeWidth="0.5" />
              ))}
            </g>
          ))}
        </g>

        {/* Flow streams */}
        {[180, 220, 260].map((y, i) => (
          <path key={i} d={`M200 ${y} Q 280 ${y - 20 + i*10}, 360 230`} fill="none" stroke="url(#brandG)" strokeWidth="2" className="animate-flow" />
        ))}

        {/* Data packets */}
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={210 + i*28} cy={230} r="3" fill="oklch(0.85 0.18 185)" filter="url(#glow)">
            <animate attributeName="cx" from="200" to="360" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i*0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Central cloud */}
        <g transform="translate(340,170)">
          <rect width="130" height="120" rx="16" fill="oklch(0.25 0.05 200)" stroke="url(#brandG)" strokeWidth="1.5" filter="url(#glow)" />
          <rect width="130" height="120" rx="16" fill="none" stroke="url(#brandG)" strokeWidth="1.5" />
          <text x="65" y="50" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.18 185)" fontWeight="600">AfriTech Cloud</text>
          <text x="65" y="68" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.6">Automation Core</text>
          <circle cx="65" cy="92" r="14" fill="none" stroke="url(#brandG)" strokeWidth="1.5">
            <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="92" r="4" fill="oklch(0.85 0.18 185)" />
        </g>

        {/* Downstream nodes */}
        {[{x:60,y:380,l:"ERP"},{x:200,y:420,l:"Schools"},{x:340,y:400,l:"Logistics"},{x:430,y:360,l:"Reports"}].map((n, i) => (
          <g key={i}>
            <path d={`M405 290 Q ${n.x+20} 340, ${n.x+20} ${n.y}`} fill="none" stroke="url(#brandG)" strokeWidth="1" strokeOpacity="0.5" className="animate-flow" />
            <rect x={n.x} y={n.y} width="80" height="30" rx="6" fill="oklch(0.22 0.03 245)" stroke="url(#brandG)" strokeOpacity="0.6" />
            <text x={n.x+40} y={n.y+19} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.85">{n.l}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
