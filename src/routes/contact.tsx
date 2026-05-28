import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/home/audit-form";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AfriTech Systems — Initiate a Digital Audit | Lusaka, Zambia" },
      { name: "description", content: "Speak to an AfriTech systems engineer about ERP, school management or industrial digitization for your enterprise. Email enquiry@afritechsystemsltd.com or call +260 969 071 139." },
      { property: "og:title", content: "Contact AfriTech Systems" },
      { property: "og:description", content: "Initiate a free digital audit with AfriTech Systems Limited." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.name,
        email: SITE.email,
        telephone: SITE.phones[0],
        url: `https://${SITE.domain}`,
        address: { "@type": "PostalAddress", addressLocality: "Lusaka", addressCountry: "ZM" },
      }),
    }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with a systems engineer."
        description="Tell us about your operational bottleneck and we'll respond within one business day with a preliminary transformation blueprint."
      />
      <section className="mx-auto max-w-7xl grid gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          { icon: MapPin, label: "Headquarters", value: SITE.location },
          { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
          { icon: Phone, label: "Phone", value: SITE.phones.join(" · "), href: `tel:${SITE.phones[0].replace(/\s/g, "")}` },
        ].map((c) => {
          const Icon = c.icon;
          const body = (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="mt-1 font-semibold">{c.value}</p>
              </div>
            </>
          );
          return c.href ? (
            <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-brand/50">{body}</a>
          ) : (
            <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5">{body}</div>
          );
        })}
      </section>
      <AuditForm />
      <Toaster />
    </>
  );
}
