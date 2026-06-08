import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/industries/logistics`;

export const Route = createFileRoute("/industries/logistics")({
  head: () => ({
    meta: [
      { title: "Logistics" },
      { name: "description", content: "Fleet telematics, routing, dispatch, proof-of-delivery and warehouse automation for African logistics operators." },
      { property: "og:title", content: "Logistics — AfriTech Systems" },
      { property: "og:description", content: "Fleet, routing, dispatch and warehouse automation for African logistics." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Industries", url: `${SITE_URL}/industries` },
      { name: "Logistics", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Industries"
      title="Logistics"
      description="Fleet telematics, routing, dispatch, proof-of-delivery and warehouse automation for African logistics operators."
      intro="From last-mile dispatch to multi-warehouse distribution, we build the operational backbone that keeps freight moving and customers informed."
      capabilities={[
        "GPS fleet telematics and live route optimization",
        "Electronic proof-of-delivery and waybills",
        "Customer tracking portals with notifications",
        "Warehouse pick-pack-ship automation",
        "Predictive maintenance for vehicles and assets",
        "Driver scoring and fuel-burn analytics",
      ]}
      outcomes={[
        { k: "Live", v: "Fleet visibility" },
        { k: "Lower", v: "Fuel & downtime cost" },
        { k: "Faster", v: "Customer SLA" },
        { k: "Paperless", v: "Delivery proof" },
      ]}
      related={[
        { to: "/solutions/automation-dashboards", label: "Automation & Dashboards", desc: "Dispatch and SLA KPIs in real time." },
        { to: "/solutions/enterprise-erp", label: "Custom Enterprise ERP", desc: "Finance and billing for logistics ops." },
        { to: "/industries/manufacturing", label: "For Manufacturing", desc: "Move finished goods to market." },
      ]}
    />
  ),
});
