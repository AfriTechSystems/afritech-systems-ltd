import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./site-header";
import { SocialLinks } from "./social-links";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" aria-label={SITE.name} className="inline-flex">
              <Logo className="h-12 w-auto sm:h-14" />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {SITE.tagline}. We build custom systems that replace spreadsheets and manual work.
            </p>
            <SocialLinks size={32} className="mt-4" />
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigate</h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 hover:text-brand">{n.label}</Link>
                </li>
              ))}
              <li><Link to="/sitemap.xml" className="text-foreground/80 hover:text-brand">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</h3>
            <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-muted-foreground">{SITE.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-brand">{p}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
