import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/page-hero";
import { Calendar, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles & Insights — AfriTech Systems" },
      { name: "description", content: "Insights on enterprise automation, custom ERP, school management and digital transformation for Pan-African businesses." },
      { property: "og:title", content: "Articles — AfriTech Systems" },
      { property: "og:description", content: "Insights and field notes from our engineering and automation teams." },
      { property: "og:url", content: "https://afritechsystemsltd.com/articles" },
    ],
    links: [{ rel: "canonical", href: "https://afritechsystemsltd.com/articles" }],
  }),
  component: ArticlesPage,
});

interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  cover_alt: string | null;
  tags: string[];
  published_at: string | null;
}

function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", "published"],
    queryFn: async (): Promise<ArticleSummary[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, cover_url, cover_alt, tags, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ArticleSummary[];
    },
  });

  const allTags = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    const list = data ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((a) => {
      const matchesTag = !activeTag || (a.tags ?? []).includes(activeTag);
      const matchesQ = !q || a.title.toLowerCase().includes(q) || (a.excerpt ?? "").toLowerCase().includes(q);
      return matchesTag && matchesQ;
    });
  }, [data, search, activeTag]);

  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Articles & field notes."
        description="Practical insights on enterprise automation, ERP, school management and industrial digitization across Africa."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-full border border-border bg-background pl-10 pr-4 py-2.5 text-sm"
              aria-label="Search articles"
            />
          </div>
          {allTags.length > 0 && (
            <div className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 lg:flex-wrap lg:overflow-visible">
              <button
                onClick={() => setActiveTag(null)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${activeTag === null ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background hover:bg-accent"}`}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t === activeTag ? null : t)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${activeTag === t ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background hover:bg-accent"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading && <p className="text-muted-foreground">Loading articles…</p>}
        {error && <p className="text-destructive">Couldn't load articles. Please try again.</p>}
        {data && data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <h2 className="font-display text-2xl font-bold">Not published yet</h2>
            <p className="mt-2 text-muted-foreground">Our engineering team is preparing the first set of articles. Check back shortly.</p>
          </div>
        )}
        {data && data.length > 0 && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <p className="text-muted-foreground">No articles match your search.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            {featured && (
              <Link
                to="/articles/$slug"
                params={{ slug: featured.slug }}
                className="group mb-10 grid overflow-hidden rounded-3xl border border-border bg-card/70 transition-all hover:border-brand/60 hover:shadow-glow lg:grid-cols-2"
              >
                {featured.cover_url ? (
                  <img src={featured.cover_url} alt={featured.cover_alt ?? ""} className="aspect-[16/9] w-full object-cover lg:aspect-auto lg:h-full" loading="eager" />
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand/15 via-card to-brand-glow/15 lg:aspect-auto lg:h-full" />
                )}
                <div className="flex flex-col gap-3 p-6 sm:p-8">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-foreground">Featured</span>
                    {(featured.tags ?? []).slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">{t}</span>
                    ))}
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-tight text-foreground group-hover:text-brand sm:text-3xl lg:text-4xl">{featured.title}</h2>
                  <p className="text-base text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {featured.published_at ? new Date(featured.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <Link
                    key={a.id}
                    to="/articles/$slug"
                    params={{ slug: a.slug }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-glow"
                  >
                    {a.cover_url ? (
                      <img src={a.cover_url} alt={a.cover_alt ?? ""} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand/15 via-card to-brand-glow/15" />
                    )}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      {a.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">{t}</span>
                          ))}
                        </div>
                      )}
                      <h3 className="font-display text-lg font-bold leading-tight text-foreground group-hover:text-brand sm:text-xl">{a.title}</h3>
                      <p className="line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {a.published_at ? new Date(a.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : ""}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-brand">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
