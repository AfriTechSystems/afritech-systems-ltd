import { createFileRoute } from "@tanstack/react-router";
import { SubPage, breadcrumbJsonLd } from "@/components/sub-page";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}/industries/education`;

export const Route = createFileRoute("/industries/education")({
  head: () => ({
    meta: [
      { title: "Education" },
      { name: "description", content: "School, college and university automation — admissions, fees, grading, attendance and parent portals for African institutions." },
      { property: "og:title", content: "Education — AfriTech Systems" },
      { property: "og:description", content: "Automation for schools, colleges and universities across Pan-Africa." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Industries", url: `${SITE_URL}/industries` },
      { name: "Education", url: URL },
    ])],
  }),
  component: () => (
    <SubPage
      eyebrow="Industries"
      title="Education"
      description="Admissions, fees, grading, attendance and parent portals — automated for schools, colleges and universities."
      intro="Our school management platform replaces paper registers and disconnected spreadsheets with one secure system. Built for the rhythms of African academic terms, fee structures and regulator reporting."
      capabilities={[
        "Online admissions and fee invoicing",
        "Mobile-money and bank-rail fee collections",
        "Continuous-assessment grading and timetabling",
        "Parent and student portals with SMS / WhatsApp",
        "Library, hostel and transport modules",
        "Ministry of Education statutory reporting",
      ]}
      outcomes={[
        { k: "Days", v: "Faster fee reconciliation" },
        { k: "0", v: "Lost grade records" },
        { k: "1", v: "Source of truth" },
        { k: "24/7", v: "Parent visibility" },
      ]}
      related={[
        { to: "/solutions/school-management", label: "School ERP Systems", desc: "The platform behind our education deployments." },
        { to: "/solutions/automation-dashboards", label: "Automation & Dashboards", desc: "Live academic and finance KPIs." },
        { to: "/articles", label: "Articles & Insights", desc: "Lessons from real school rollouts." },
      ]}
    />
  ),
});
