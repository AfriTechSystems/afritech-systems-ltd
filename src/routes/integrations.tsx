import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Integrations } from "@/components/home/integrations";
import { getTool } from "@/lib/integrations";

const CATEGORIES = [
  { name: "Automation & Workflow", tools: ["n8n", "Zapier", "Make", "Workato", "Power Automate"] },
  { name: "Databases & Cloud", tools: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "AWS", "Azure", "Cloudflare"] },
  { name: "Communication", tools: ["Slack", "Microsoft Teams", "WhatsApp Business", "Twilio", "SendGrid", "Mailgun"] },
  { name: "Productivity", tools: ["Microsoft 365", "Excel", "Google Workspace", "Notion", "Jira", "Confluence", "Asana"] },
  { name: "Payments & Fintech", tools: ["Stripe", "Paystack", "Flutterwave", "MTN MoMo", "Airtel Money", "Zamtel Kwacha"] },
  { name: "Analytics & BI", tools: ["Power BI", "Tableau", "Looker", "Metabase", "PostHog"] },
  { name: "CRM & Sales", tools: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive"] },
  { name: "Compliance & Identity", tools: ["Microsoft Entra ID", "Auth0", "Okta", "OneLogin"] },
];

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Automation Integrations — n8n, Zapier, Supabase & 500+ tools | AfriTech Systems" },
      { name: "description", content: "AfriTech Systems integrates with n8n, Zapier, Make, Supabase, Microsoft 365, Google Workspace, Stripe, Paystack, Flutterwave and 500+ enterprise tools." },
      { property: "og:title", content: "Integrations — AfriTech Systems" },
      { property: "og:description", content: "Plug AfriTech into the automation, data and payments tools your enterprise already runs." },
      { property: "og:url", content: "/integrations" },
    ],
    links: [{ rel: "canonical", href: "/integrations" }],
  }),
  component: IntegrationsPage,
});

function ToolPill({ name }: { name: string }) {
  const tool = getTool(name);
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs">
      {tool.logo ? (
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          loading="lazy"
          decoding="async"
          className="h-4 w-auto max-w-[22px] rounded-sm object-contain"
        />
      ) : (
        <span
          aria-hidden
          className={`flex h-4 w-4 items-center justify-center rounded-sm text-[8px] font-bold ${tool.swatch ?? "bg-brand/15 text-brand"}`}
        >
          {tool.initials}
        </span>
      )}
      {tool.name}
    </li>
  );
}

function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="One automation core. Every tool your enterprise runs."
        description="AfriTech orchestrates the modern enterprise stack — from n8n workflows and Supabase databases to mobile-money rails like MTN MoMo and Airtel Money."
      />
      <Integrations />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold">Categorized stack</h2>
        <p className="mt-2 text-muted-foreground">A non-exhaustive view of the platforms we connect daily.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((c) => (
            <article key={c.name} className="rounded-2xl border border-border bg-card/40 p-6">
              <h3 className="font-display text-lg font-semibold">{c.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.tools.map((name) => <ToolPill key={name} name={name} />)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
