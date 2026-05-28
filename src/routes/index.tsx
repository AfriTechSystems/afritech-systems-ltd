import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import { TransformationCanvas } from "@/components/home/transformation-canvas";
import { CoreEngine } from "@/components/home/core-engine";
import { IndustryBlueprint } from "@/components/home/industry-blueprint";
import { Integrations } from "@/components/home/integrations";
import { Architects } from "@/components/home/architects";
import { AuditForm } from "@/components/home/audit-form";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriTech Systems — Systems Reimagined | Enterprise Automation in Africa" },
      { name: "description", content: "AfriTech Systems Limited delivers enterprise automation, custom ERP systems, automated school management platforms and industrial digitization for African enterprises and global clients." },
      { property: "og:title", content: "AfriTech Systems — Systems Reimagined" },
      { property: "og:description", content: "Custom ERP, school management, industrial digitization & African digital transformation. Headquartered in Lusaka, serving Pan-Africa." },
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
      <TransformationCanvas />
      <CoreEngine />
      <IndustryBlueprint />
      <Integrations />
      <Architects />
      <AuditForm />
      <Toaster />
    </>
  );
}
