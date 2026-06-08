import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/industries/manufacturing`;

export const Route = createFileRoute("/industries/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing" },
      { name: "description", content: "Production planning, quality control, inventory and machine monitoring for African manufacturers and processors." },
      { property: "og:title", content: "Manufacturing — AfriTech Systems" },
      { property: "og:description", content: "Production, quality and inventory automation for African manufacturers." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Industries", url: `${SITE_URL}/industries` },
      { name: "Manufacturing", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Industries"
      title="Manufacturing"
      description="Production planning, quality control, inventory and machine monitoring for African manufacturers and processors."
      intro="We give plant managers a real-time view of every line, every batch and every input — and give finance a clean handoff into the ERP without the Friday-night spreadsheet."
      capabilities={[
        "Production planning and shop-floor scheduling",
        "Quality control with batch traceability",
        "Raw material and finished-goods inventory",
        "Machine downtime and OEE monitoring",
        "Predictive maintenance alerts",
        "Direct integration with the AfriTech ERP",
      ]}
      outcomes={[
        { k: "Live", v: "Plant-floor visibility" },
        { k: "Less", v: "Unplanned downtime" },
        { k: "Trace", v: "Every batch end-to-end" },
        { k: "Auto", v: "Stock replenishment" },
      ]}
      related={[
        { to: "/solutions/enterprise-erp", label: "Custom Enterprise ERP", desc: "Finance and procurement under one roof." },
        { to: "/solutions/automation-dashboards", label: "Automation & Dashboards", desc: "Plant KPIs in real time." },
        { to: "/industries/logistics", label: "For Logistics", desc: "Move finished goods to market." },
      ]}
    />
  ),
});
