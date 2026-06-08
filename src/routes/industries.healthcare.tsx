import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/industries/healthcare`;

export const Route = createFileRoute("/industries/healthcare")({
  head: () => ({
    meta: [
      { title: "Healthcare & Pharma" },
      { name: "description", content: "Pharmacy, dispensing, stock and compliance automation for hospitals, clinics and pharmaceutical distributors across Africa." },
      { property: "og:title", content: "Healthcare & Pharma — AfriTech Systems" },
      { property: "og:description", content: "Dispensing, inventory, cold-chain and compliance automation for African healthcare." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Industries", url: `${SITE_URL}/industries` },
      { name: "Healthcare & Pharma", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Industries"
      title="Healthcare & Pharma"
      description="Dispensing, inventory, cold-chain and compliance automation for hospitals, clinics and pharmaceutical distributors."
      intro="We build systems that keep medicine moving — from pharmacy point-of-sale and dispensing logs to multi-warehouse stock control and regulator-ready audit trails."
      capabilities={[
        "Pharmacy POS and dispensing with prescription history",
        "Multi-warehouse stock with batch and expiry tracking",
        "Cold-chain monitoring and temperature alerts",
        "Patient records and appointment scheduling",
        "Insurance and NHIMA claim workflows",
        "Regulator-ready audit trails and reports",
      ]}
      outcomes={[
        { k: "0", v: "Expired-stock surprises" },
        { k: "Live", v: "Branch stock visibility" },
        { k: "Faster", v: "Insurance claims" },
        { k: "100%", v: "Audit traceability" },
      ]}
      related={[
        { to: "/solutions/enterprise-erp", label: "Custom Enterprise ERP", desc: "The financial backbone behind clinical ops." },
        { to: "/solutions/automation-dashboards", label: "Automation & Dashboards", desc: "Live clinical and stock KPIs." },
        { to: "/industries/logistics", label: "For Logistics", desc: "Cold-chain distribution beyond the dispensary." },
      ]}
    />
  ),
});
