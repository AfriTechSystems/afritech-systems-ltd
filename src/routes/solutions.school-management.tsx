import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/solutions/school-management`;

export const Route = createFileRoute("/solutions/school-management")({
  head: () => ({
    meta: [
      { title: "School ERP Systems" },
      { name: "description", content: "End-to-end School ERP — admissions, fees, grading, attendance and parent portals — for primary, secondary and tertiary institutions across Africa." },
      { property: "og:title", content: "School ERP Systems — AfriTech Systems" },
      { property: "og:description", content: "Automated school management from admissions to alumni — built for African schools, colleges and universities." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Solutions", url: `${SITE_URL}/solutions` },
      { name: "School ERP Systems", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Solutions"
      title="School ERP Systems"
      description="Automated school management from admissions to alumni — for primary, secondary and tertiary institutions across Pan-Africa."
      intro="Our School ERP platform replaces paper registers, scattered Excel sheets and disconnected portals with a single secure system. Principals see live dashboards, bursars reconcile fees automatically, teachers grade online and parents stay informed by WhatsApp or SMS."
      capabilities={[
        "Online admissions, fee invoicing and mobile-money collections",
        "Timetabling, attendance and continuous-assessment grading",
        "Parent and student portals with WhatsApp & SMS notifications",
        "Integrated finance, HR and Ministry of Education reporting",
        "Library, hostel and transport modules",
        "Role-based access for staff, learners and guardians",
      ]}
      outcomes={[
        { k: "Days", v: "Faster fee reconciliation" },
        { k: "0", v: "Lost grade records" },
        { k: "24/7", v: "Parent portal access" },
        { k: "1", v: "Source of truth" },
      ]}
      related={[
        { to: "/solutions/enterprise-erp", label: "Custom Enterprise ERP", desc: "Finance, HR and operations on one stack." },
        { to: "/industries/education", label: "For Education", desc: "How we deploy across schools, colleges and universities." },
        { to: "/articles", label: "Articles & Insights", desc: "Field notes from our deployments." },
      ]}
    />
  ),
});
