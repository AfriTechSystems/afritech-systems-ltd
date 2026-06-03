import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logoLight from "@/assets/afritech-logo-full.png";
import { SocialLinks } from "./social-links";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" aria-label={SITE.name} className="inline-flex">
              <img
                src={logoLight}
                alt={`${SITE.name} — Enterprise automation Africa`}
                className="h-28 w-auto sm:h-32 object-contain"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              {SITE.tagline}. We build custom systems that replace spreadsheets and manual work.
            </p>
            <SocialLinks size={32} className="mt-4" />
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigate</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-slate-700 hover:text-brand">{n.label}</Link>
                </li>
              ))}
              <li><Link to="/sitemap.xml" className="text-slate-700 hover:text-brand">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</h2>
            <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-slate-600">{SITE.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${SITE.email}`} className="text-slate-700 hover:text-brand">{SITE.email}</a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-slate-700 hover:text-brand">{p}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
