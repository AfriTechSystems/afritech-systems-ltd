import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BookCallButton } from "@/components/book-call-button";

interface ArticleFull {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  cover_url: string | null;
  tags: string[];
  published_at: string | null;
}

async function fetchArticle(slug: string): Promise<ArticleFull | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, body_md, cover_url, tags, published_at, published")
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link to="/articles" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-brand">
        <ArrowLeft className="h-3.5 w-3.5" /> All articles
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">{data.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {data.published_at && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(data.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </span>
        )}
        {data.tags?.map((t) => (
          <span key={t} className="rounded-full bg-brand/10 px-2 py-0.5 font-semibold uppercase tracking-wider text-brand">{t}</span>
        ))}
      </div>
      {data.cover_url && (
        <img src={data.cover_url} alt="" className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
      )}
      <div className="prose prose-base mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-brand">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.body_md}</ReactMarkdown>
      </div>

      <aside className="mt-12 rounded-2xl border border-border bg-card/60 p-6 text-center">
        <h2 className="font-display text-xl font-bold">Need a system built for your business?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Talk to our engineering team — free 30-minute discovery call.</p>
        <div className="mt-4 inline-flex">
          <BookCallButton label="Book a discovery call" size="md" />
        </div>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            description: data.excerpt,
            image: data.cover_url ?? undefined,
            datePublished: data.published_at,
            author: { "@type": "Organization", name: "AfriTech Systems Limited" },
            publisher: { "@type": "Organization", name: "AfriTech Systems Limited" },
            mainEntityOfPage: `https://afritechsystemsltd.com/articles/${data.slug}`,
          }),
        }}
      />
    </article>
  );
}
