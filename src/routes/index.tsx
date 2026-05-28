import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import { ThreeSteps } from "@/components/home/three-steps";
import { TransformationCanvas } from "@/components/home/transformation-canvas";
import { CoreEngine } from "@/components/home/core-engine";
import { IndustryMatrix } from "@/components/home/industry-matrix";
import { IndustryBlueprint } from "@/components/home/industry-blueprint";
import { SolutionsSuite } from "@/components/home/solutions-suite";
import { Integrations } from "@/components/home/integrations";
import { GrowthPromise } from "@/components/home/growth-promise";
import { Architects } from "@/components/home/architects";
import { AuditForm } from "@/components/home/audit-form";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriTech Systems — Enterprise Automation in Africa" },
      { name: "description", content: "Turn spreadsheet-heavy operations into automated digital systems. Custom ERP, school management and industrial dashboards for African enterprises." },
      { name: "keywords", content: "Custom Software Development Africa, Process Automation Solutions Zambia, Enterprise Resource Planning Software, School Management Systems, Digital Transformation Services, Corporate Dashboard Systems, Business Intelligence Integration, Spreadsheet Automation Solutions" },
      { property: "og:title", content: "AfriTech Systems — Systems Reimagined" },
      { property: "og:description", content: "Custom ERP, school management, industrial digitization & corporate dashboards. Own your systems — no monthly SaaS fees." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ThreeSteps />
      <TransformationCanvas />
      <CoreEngine />
      <IndustryMatrix />
      <IndustryBlueprint />
      <SolutionsSuite />
      <Integrations />
      <GrowthPromise />
      <Architects />
      <AuditForm />
      <Toaster />
    </>
  );
}
