import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/solutions/automation-dashboards`;

export const Route = createFileRoute("/solutions/automation-dashboards")({
  head: () => ({
    meta: [
      { title: "Automation & Dashboards" },
      { name: "description", content: "Automated workflows and live executive dashboards. Eliminate manual reporting, unify your data and trigger actions across every system you run." },
      { property: "og:title", content: "Automation & Dashboards — AfriTech Systems" },
      { property: "og:description", content: "Live KPIs, automated workflows and cross-system pipelines for African enterprises." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Solutions", url: `${SITE_URL}/solutions` },
      { name: "Automation & Dashboards", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Solutions"
      title="Automation & Dashboards"
      description="Replace manual reports and repetitive copy-paste with automated workflows and live executive dashboards."
      intro="We engineer the connective tissue between the tools you already run — accounting software, CRMs, spreadsheets, payment gateways and field apps — and give leadership a single live dashboard for every KPI that matters."
      capabilities={[
        "Real-time executive KPI dashboards",
        "Automated cross-system data pipelines",
        "Scheduled reports delivered by email or WhatsApp",
        "Alerting on stock-outs, SLA breaches and revenue dips",
        "Custom integrations with Hubspot, Stripe, Slack, n8n and more",
        "Predictive analytics on operations and finance data",
      ]}
      outcomes={[
        { k: "Hours", v: "Saved weekly on reporting" },
        { k: "Live", v: "KPI visibility" },
        { k: "1 click", v: "Board-ready exports" },
        { k: "Any", v: "Tool integrated" },
      ]}
      related={[
        { to: "/solutions/enterprise-erp", label: "Custom Enterprise ERP", desc: "The source of truth dashboards plug into." },
        { to: "/integrations", label: "Integrations", desc: "Tools we natively connect with." },
        { to: "/industries/logistics", label: "For Logistics", desc: "Fleet, routing and dispatch dashboards." },
      ]}
    />
  ),
});
