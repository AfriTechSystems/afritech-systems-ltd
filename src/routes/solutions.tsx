import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, GraduationCap, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const SOLUTIONS = [
  {
    icon: Building2,
    title: "Custom Enterprise Resource Planning (ERP)",
    desc: "Unified finance, HR, procurement, inventory and operations modules engineered for African enterprises — replacing fragmented spreadsheets with a single, auditable source of truth.",
    points: [
      "Multi-entity, multi-currency ledgers with ZRA-compliant reporting",
      "Procure-to-pay automation with approval chains and audit trails",
      "Inventory, warehousing and asset tracking with barcode/RFID",
      "Real-time executive dashboards and KPI monitoring",
    ],
  },
  {
    icon: GraduationCap,
    title: "Automated School Management Platforms",
    desc: "End-to-end academic infrastructure — admissions to alumni — for primary, secondary and tertiary institutions across Pan-Africa.",
    points: [
      "Online admissions, fee invoicing and mobile-money collections",
      "Timetabling, attendance and continuous-assessment grading",
      "Parent and student portals with WhatsApp & SMS notifications",
      "Integrated finance, HR and Ministry of Education reporting",
    ],
  },
  {
    icon: Truck,
    title: "Industrial Logistics & Operations Engine",
    desc: "Fleet, dispatch, warehousing and field-operations automation for logistics, manufacturing and distribution leaders.",
    points: [
      "GPS fleet telematics and live route optimization",
      "Proof-of-delivery, electronic waybills and customer portals",
      "Warehouse management with pick-pack-ship automation",
      "Predictive maintenance and downtime alerts",
    ],
  },
];

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Enterprise Solutions — Custom ERP, School Management, Industrial Logistics | AfriTech Systems" },
      { name: "description", content: "Custom ERP systems, automated school management platforms and industrial logistics engines engineered by AfriTech Systems for enterprises across Africa." },
      { property: "og:title", content: "AfriTech Solutions — ERP, School Management, Industrial Logistics" },
      { property: "og:description", content: "Three core engines, infinite configurations. Built for African enterprises by AfriTech Systems." },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Solutions,
});

function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Three engines. One reimagined operating system."
        description="Every AfriTech deployment combines our three core platforms into a unified digital infrastructure — sized for your sector, branded for your organization, integrated with the tools you already run."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="grid gap-6 rounded-2xl border border-border bg-card/50 p-8 lg:grid-cols-[auto_1fr]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Not sure which engine you need?</h2>
          <p className="mt-2 text-muted-foreground">Initiate a free digital audit and we'll map your operations to the right stack.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow">
            Initiate Digital Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
