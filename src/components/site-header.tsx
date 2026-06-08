import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoLight from "@/assets/afritech-logo-full.png";
import logoDark from "@/assets/afritech-logo-dark.png";
import { NAV_GROUPS, SIMPLE_NAV, SITE } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { BookCallButton } from "./book-call-button";

function Logo({ className = "" }: { className?: string }) {
  // Header is now white in both themes — always use the full-color logo.
  return (
    <img
      src={logoLight}
      alt={`${SITE.name} logo`}
      className={`block object-contain ${className}`}
    />
  );
}

export { Logo };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4">
      <header
        className="relative mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white/95 text-slate-900 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      >
        <div className="flex h-24 items-center justify-between gap-3 px-3 sm:h-28 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label={SITE.name}>
            <Logo className="h-28 w-auto sm:h-32 md:h-36" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-brand/10 text-brand" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
            {NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Link
                  to={group.to}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Link>
                {openGroup === group.label && (
                  <div className="absolute left-0 top-full pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="w-80 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-2xl text-slate-900">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setOpenGroup(null)}
                            className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-800 transition-colors hover:bg-slate-100"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block font-semibold text-slate-900">{item.label}</span>
                              <span className="block text-xs text-slate-500">{item.desc}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/articles"
              activeProps={{ className: "bg-brand/10 text-brand" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Articles
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <BookCallButton label="Book a call" size="sm" />
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-900 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer — always white for readability */}
        {open && (
          <nav
            className="rounded-b-2xl border-t border-slate-200 bg-white text-slate-900 shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200 dark:border-slate-200 dark:bg-white dark:text-slate-900"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-3 py-3">
              {SIMPLE_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-brand/10 text-brand" }}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100 dark:text-slate-800 dark:hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 px-2">
                <BookCallButton label="Book a discovery call" size="md" className="w-full" />
              </div>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
