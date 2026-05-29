import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoLight from "@/assets/afritech-logo-full.png";
import logoDark from "@/assets/afritech-logo-dark.png";
import { NAV_GROUPS, SIMPLE_NAV, SITE } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src={logoLight}
        alt={`${SITE.name} logo`}
        className={`block dark:hidden object-contain ${className}`}
      />
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
    <div className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <header
        className="relative mx-auto max-w-7xl rounded-2xl border border-border bg-background/95 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        <div className="flex h-20 items-center justify-between gap-4 px-4 sm:h-24 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label={SITE.name}>
            <Logo className="h-14 w-auto sm:h-16 md:h-20" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-brand bg-accent/60" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-brand"
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
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-brand"
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
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Get a free audit
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            className="border-t border-border lg:hidden animate-in slide-in-from-top-2 duration-200"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-3 py-3">
              {SIMPLE_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-brand bg-accent" }}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2 border-t border-border pt-3">
                {NAV_GROUPS.map((g) => (
                  <details key={g.label} className="group rounded-lg border border-border bg-card/60 px-3">
                    <summary className="flex cursor-pointer items-center justify-between py-2.5 text-sm font-semibold text-foreground">
                      {g.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-3 pt-1">
                      {g.items.map((it) => {
                        const Icon = it.icon;
                        return (
                          <Link
                            key={it.label}
                            to={it.to}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-3 rounded-md px-2 py-2 text-sm text-foreground hover:bg-accent"
                          >
                            <Icon className="mt-0.5 h-4 w-4 text-brand" />
                            <span>
                              <span className="block font-medium">{it.label}</span>
                              <span className="block text-xs text-muted-foreground">{it.desc}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow"
              >
                Get a free audit
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
