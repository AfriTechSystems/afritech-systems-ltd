import { getTool } from "@/lib/integrations";

const TOOLS = [
  "n8n", "Zapier", "Make", "Supabase", "PostgreSQL", "Slack",
  "Microsoft 365", "Google Workspace", "Jira", "WhatsApp Business",
  "Twilio", "Stripe", "Paystack", "Flutterwave", "AWS",
  "Cloudflare", "Azure", "Notion", "HubSpot", "Salesforce",
  "Power BI", "Tableau", "MongoDB", "Redis", "Excel",
];

function ToolChip({ name }: { name: string }) {
  const tool = getTool(name);
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background/70 px-4 py-2.5 text-sm font-medium text-foreground/90 backdrop-blur">
      {tool.logo ? (
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          loading="lazy"
          decoding="async"
          className="h-5 w-auto max-w-[28px] rounded-sm object-contain"
        />
      ) : (
        <span
          aria-hidden
          className={`flex h-5 w-5 items-center justify-center rounded-sm text-[9px] font-bold ${tool.swatch ?? "bg-brand/15 text-brand"}`}
        >
          {tool.initials}
        </span>
      )}
      {tool.name}
    </span>
  );
}

export function Integrations() {
  const list = [...TOOLS, ...TOOLS];
  return (
    <section id="integrations" className="border-t border-border/60 bg-card/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Automation Stack</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Plug AfriTech into 500+ integrations</h2>
          <p className="mt-4 text-muted-foreground">
            We orchestrate the tools your enterprise already runs — and the ones you should be running.
          </p>
        </header>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex w-max gap-3 animate-marquee">
          {list.map((name, i) => (
            <ToolChip key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[
          { k: "REST & GraphQL APIs", v: "Connect any modern endpoint with typed contracts." },
          { k: "SOAP & legacy bridges", v: "Wrap legacy systems without disrupting operations." },
          { k: "Event-driven webhooks", v: "Real-time triggers across your enterprise stack." },
        ].map((c) => (
          <div key={c.k} className="rounded-xl border border-border bg-background/60 p-5">
            <p className="font-semibold">{c.k}</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
