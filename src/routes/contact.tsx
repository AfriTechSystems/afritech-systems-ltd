import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/home/audit-form";
import { SocialLinks } from "@/components/social-links";
import { CalendlyInline } from "@/components/calendly-inline";
import { BookCallButton } from "@/components/book-call-button";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AfriTech Systems — Lusaka, Zambia" },
      { name: "description", content: "Talk to AfriTech Systems about ERP, school management or industrial automation. Email enquiry@afritechsystemsltd.com or call +260 969 071 139." },
      { property: "og:title", content: "Contact AfriTech Systems" },
      { property: "og:description", content: "Book a free systems audit with AfriTech Systems Limited." },
      { property: "og:url", content: "https://afritechsystemsltd.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://afritechsystemsltd.lovable.app/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.name,
        email: SITE.email,
        telephone: SITE.phones[0],
        url: `https://${SITE.domain}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 1907, MJ Zulu Street, Ibex Hill",
          addressLocality: "Lusaka",
          addressRegion: "Lusaka Province",
          addressCountry: "ZM",
        },
      }),
    }],
  }),
  component: Contact,
});

function Contact() {
  const waLink = `https://wa.me/${SITE.phones[0].replace(/[^\d]/g, "")}`;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Tell us what's slowing your business down. Book a free 30-minute discovery call or send us a message — we reply within one business day."
      />

      {/* Booking + contact details */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-12">
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card/60 p-5 sm:p-7">
            <h2 className="font-display text-2xl font-bold">Visit or reach us</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Office</p>
                  <p className="mt-1 font-semibold leading-snug">{SITE.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block font-semibold hover:text-brand break-all">{SITE.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-1 block font-semibold hover:text-brand">{p}</a>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <BookCallButton label="Book a free discovery call" size="md" className="w-full" />
              <a href="#audit" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-brand hover:text-brand">
                Send a written brief
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-brand hover:text-brand">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Follow us</p>
              <SocialLinks size={36} className="mt-2" />
            </div>
          </div>
        </aside>

        {/* Calendly inline */}
        <div className="mt-6 lg:col-span-3 lg:mt-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">Pick a time</h2>
            <span className="text-xs text-muted-foreground">30 min · Free</span>
          </div>
          <CalendlyInline />
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
          <iframe
            title="AfriTech Systems office location"
            src="https://www.google.com/maps?q=Ibex+Hill,+Lusaka,+Zambia&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full sm:h-96"
          />
        </div>
      </section>

      <AuditForm />
      <Toaster />
    </>
  );
}
