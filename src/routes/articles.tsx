import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/page-hero";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles & Insights — AfriTech Systems" },
      { name: "description", content: "Insights on enterprise automation, custom ERP, school management and digital transformation for Pan-African businesses." },
      { property: "og:title", content: "Articles — AfriTech Systems" },
      { property: "og:description", content: "Insights and field notes from our engineering and automation teams." },
      { property: "og:url", content: "https://afritechsystemsltd.lovable.app/articles" },
    ],
    links: [{ rel: "canonical", href: "https://afritechsystemsltd.lovable.app/articles" }],
  }),
  component: ArticlesPage,
});

interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  tags: string[];
  published_at: string | null;
}

function ArticlesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", "published"],
    queryFn: async (): Promise<ArticleSummary[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, cover_url, tags, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ArticleSummary[];
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Articles & field notes."
        description="Practical insights on enterprise automation, ERP, school management and industrial digitization across Africa."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {isLoading && <p className="text-muted-foreground">Loading articles…</p>}
        {error && <p className="text-destructive">Couldn't load articles. Please try again.</p>}
        {data && data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <h2 className="font-display text-2xl font-bold">Articles coming soon</h2>
            <p className="mt-2 text-muted-foreground">Our engineering team is preparing the first set of articles. Check back shortly.</p>
          </div>
        )}
        {data && data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((a) => (
              <Link
                key={a.id}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-glow"
              >
                {a.cover_url ? (
                  <img src={a.cover_url} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
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
                  <h2 className="font-display text-lg font-bold leading-tight text-foreground group-hover:text-brand sm:text-xl">{a.title}</h2>
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
      </section>
    </>
  );
}
