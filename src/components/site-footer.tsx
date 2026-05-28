import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/afritech-logo.png";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10 object-contain" />
            <span className="font-display text-lg font-bold">
              Afri<span className="text-brand">TECH</span> Systems
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            {SITE.tagline}. Engineering automated enterprise ecosystems, custom ERP systems,
            school management platforms and industrial digitization across Pan-Africa.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{SITE.pacra}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Navigate</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-brand">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/sitemap.xml" className="hover:text-brand">Sitemap</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-brand" />{SITE.location}</li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-brand" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-brand" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-brand">{p}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
