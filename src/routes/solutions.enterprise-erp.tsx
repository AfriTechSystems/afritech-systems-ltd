import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/solutions/enterprise-erp`;

export const Route = createFileRoute("/solutions/enterprise-erp")({
  head: () => ({
    meta: [
      { title: "Custom Enterprise ERP" },
      { name: "description", content: "Custom Enterprise ERP software for African businesses — finance, HR, procurement, inventory and operations in one auditable system you own outright." },
      { property: "og:title", content: "Custom Enterprise ERP — AfriTech Systems" },
      { property: "og:description", content: "Replace fragmented spreadsheets with one auditable ERP — finance, HR, procurement, inventory and operations." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Solutions", url: `${SITE_URL}/solutions` },
      { name: "Custom Enterprise ERP", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Solutions"
      title="Custom Enterprise ERP"
      description="One auditable ERP for finance, HR, procurement, inventory and operations — engineered, deployed and owned by your enterprise."
      intro="We engineer bespoke Enterprise Resource Planning software for African enterprises that have outgrown spreadsheets and off-the-shelf SaaS. Every module is mapped to your real workflows, every line of data is owned by you, and every report is generated in real time."
      capabilities={[
        "Multi-entity, multi-currency general ledger with ZRA-ready reporting",
        "Procure-to-pay automation with approval chains and audit trails",
        "Inventory, warehousing and asset tracking with barcode / RFID",
        "Payroll, leave and HR records with statutory compliance",
        "Executive dashboards with live KPI monitoring",
        "Role-based permissions and full change-history audit logs",
      ]}
      outcomes={[
        { k: "80%", v: "Less manual data entry" },
        { k: "Real-time", v: "Cross-branch consolidation" },
        { k: "0", v: "Recurring per-seat licences" },
        { k: "100%", v: "Source code ownership" },
      ]}
      related={[
        { to: "/solutions/school-management", label: "School ERP Systems", desc: "Academic operations from admissions to alumni." },
        { to: "/solutions/automation-dashboards", label: "Automation & Dashboards", desc: "Live KPIs and automated cross-system workflows." },
        { to: "/industries/manufacturing", label: "For Manufacturing", desc: "Production, quality and inventory tied into one ERP." },
      ]}
    />
  ),
});
