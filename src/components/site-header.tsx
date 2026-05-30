import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoLight from "@/assets/afritech-logo-full.png";
import logoDark from "@/assets/afritech-logo-dark.png";
import { NAV_GROUPS, SIMPLE_NAV, SITE } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { BookCallButton } from "./book-call-button";

function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      {/* Light mode header has light bg, so show the full-color logo */}
      <img
        src={logoLight}
        alt={`${SITE.name} logo`}
        className={`block dark:hidden object-contain ${className}`}
      />
      {/* Dark mode header has dark bg, so show the white/inverted logo */}
      <img
        src={logoDark}
        alt={`${SITE.name} logo`}
        className={`hidden dark:block object-contain ${className}`}
      />
    </>
  );
}

export { Logo };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4">
      <header
        className="relative mx-auto max-w-7xl rounded-2xl border border-border bg-background/95 text-foreground shadow-[0_10px_40px_-15px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0F1B2D]/95 dark:text-white dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.55)]"
      >
        <div className="flex h-24 items-center justify-between gap-3 px-3 sm:h-28 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label={SITE.name}>
            <Logo className="h-20 w-auto sm:h-24 md:h-28" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-brand bg-accent dark:bg-white/10 dark:text-brand-glow" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-accent hover:text-brand dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
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
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-accent hover:text-brand dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                {openGroup === group.label && (
                  <div className="absolute left-0 top-full pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="w-80 overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-2xl">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setOpenGroup(null)}
                            className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block font-semibold">{item.label}</span>
                              <span className="block text-xs text-muted-foreground">{item.desc}</span>
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
              activeProps={{ className: "text-brand bg-accent dark:bg-white/10 dark:text-brand-glow" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:bg-accent hover:text-brand dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden dark:border-white/20 dark:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            className="border-t border-border lg:hidden animate-in slide-in-from-top-2 duration-200 dark:border-white/10"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-3 py-3">
              {SIMPLE_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-brand bg-accent dark:bg-white/10 dark:text-brand-glow" }}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-foreground/90 hover:bg-accent dark:text-white/90 dark:hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/articles"
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-brand bg-accent dark:bg-white/10 dark:text-brand-glow" }}
                className="rounded-lg px-4 py-3 text-base font-semibold text-foreground/90 hover:bg-accent dark:text-white/90 dark:hover:bg-white/10"
              >
                Articles
              </Link>
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
