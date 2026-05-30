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
      {/* In light mode the header background is dark, so show the white/dark logo */}
      <img
        src={logoDark}
        alt={`${SITE.name} logo`}
        className={`block dark:hidden object-contain ${className}`}
      />
      {/* In dark mode the header background is light, so show the colored logo */}
      <img
        src={logoLight}
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
        className="relative mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#0F1B2D]/95 text-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.55)] backdrop-blur-xl dark:border-border dark:bg-background/95 dark:text-foreground"
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
              activeProps={{ className: "text-brand-glow bg-white/10 dark:bg-accent/60" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white dark:text-foreground dark:hover:bg-accent dark:hover:text-brand"
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
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white dark:text-foreground dark:hover:bg-accent dark:hover:text-brand"
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
              activeProps={{ className: "text-brand-glow bg-white/10 dark:bg-accent/60" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white dark:text-foreground dark:hover:bg-accent dark:hover:text-brand"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden dark:border-border dark:text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            className="border-t border-white/10 lg:hidden animate-in slide-in-from-top-2 duration-200 dark:border-border"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-3 py-3">
              {SIMPLE_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-brand-glow bg-white/10 dark:bg-accent" }}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-white/90 hover:bg-white/10 dark:text-foreground dark:hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/articles"
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-brand-glow bg-white/10 dark:bg-accent" }}
                className="rounded-lg px-4 py-3 text-base font-semibold text-white/90 hover:bg-white/10 dark:text-foreground dark:hover:bg-accent"
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
