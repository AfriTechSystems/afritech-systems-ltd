import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BookCallButton } from "@/components/book-call-button";

interface ArticleFull {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  cover_url: string | null;
  cover_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  tags: string[];
  published_at: string | null;
}

async function fetchArticle(slug: string): Promise<ArticleFull | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, body_md, cover_url, cover_alt, seo_title, seo_description, og_image, tags, published_at, published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data || !data.published) return null;
  return data as ArticleFull;
}

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Article — AfriTech Systems` },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://afritechsystemsltd.com/articles/${params.slug}` },
    ],
    links: [
      { rel: "canonical", href: `https://afritechsystemsltd.com/articles/${params.slug}` },
    ],
  }),
  component: ArticlePage,
});

function readingTime(md: string) {
  const words = (md || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
  });

  if (isLoading) return <div className="mx-auto max-w-3xl px-4 py-20 text-muted-foreground">Loading…</div>;
  if (error) return <div className="mx-auto max-w-3xl px-4 py-20 text-destructive">Couldn't load this article.</div>;
  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <p className="mt-2 text-muted-foreground">It may have been moved or unpublished.</p>
        <Link to="/articles" className="mt-6 inline-flex items-center gap-2 text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to articles
        </Link>
      </div>
    );
  }

  const seoTitle = data.seo_title || `${data.title} — AfriTech Systems`;
  const seoDesc = data.seo_description || data.excerpt || "";
  const ogImg = data.og_image || data.cover_url || undefined;
  const mins = readingTime(data.body_md);

  return (
    <>
      {/* Per-article SEO injected client-side as a safety net (server head set in Route.head) */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      {ogImg && <meta property="og:image" content={ogImg} />}
      {ogImg && <meta name="twitter:image" content={ogImg} />}

      <article className="bg-gradient-to-b from-background via-background to-card/30">
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-border/60 bg-radial-glow">
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <Link to="/articles" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-brand">
              <ArrowLeft className="h-3.5 w-3.5" /> All articles
            </Link>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {(data.tags ?? []).map((t) => (
                <span key={t} className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand">{t}</span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">{data.title}</h1>
            {data.excerpt && <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{data.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {data.published_at && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(data.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {mins} min read
              </span>
              <span>By AfriTech Systems editorial team</span>
            </div>
          </div>
        </header>

        {data.cover_url && (
          <div className="mx-auto -mt-2 max-w-5xl px-4 sm:px-6">
            <img src={data.cover_url} alt={data.cover_alt ?? data.title} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-xl" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="prose prose-base max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl prose-a:text-brand hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-brand prose-blockquote:text-foreground/80 prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.body_md || ""}</ReactMarkdown>
          </div>

          <aside className="mt-14 rounded-3xl border border-border bg-card/70 p-6 text-center sm:p-8">
            <h2 className="font-display text-xl font-bold sm:text-2xl">Need a system built for your business?</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">Talk to our engineering team — free 30-minute discovery call.</p>
            <div className="mt-5 inline-flex">
              <BookCallButton label="Book a discovery call" size="md" />
            </div>
          </aside>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: data.title,
              description: seoDesc,
              image: ogImg,
              datePublished: data.published_at,
              author: { "@type": "Organization", name: "AfriTech Systems Limited" },
              publisher: {
                "@type": "Organization",
                name: "AfriTech Systems Limited",
                logo: { "@type": "ImageObject", url: "https://afritechsystemsltd.com/favicon.png" },
              },
              mainEntityOfPage: `https://afritechsystemsltd.com/articles/${data.slug}`,
            }),
          }}
        />
      </article>
    </>
  );
}
