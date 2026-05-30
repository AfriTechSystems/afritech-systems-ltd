import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft, Save } from "lucide-react";

export const Route = createFileRoute("/admin/articles/$id")({
  head: () => ({
    meta: [
      { title: "Edit Article — Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ArticleEditor,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function ArticleEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        navigate({ to: "/login", replace: true });
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
      const ok = (roles ?? []).some((r) => r.role === "admin" || r.role === "editor");
      setAuthed(ok);
      if (!ok) return;
      if (!isNew) {
        const { data: row, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
        if (error) toast.error(error.message);
        if (row) {
          setTitle(row.title);
          setSlug(row.slug);
          setExcerpt(row.excerpt ?? "");
          setBody(row.body_md ?? "");
          setCoverUrl(row.cover_url ?? "");
          setTagsInput((row.tags ?? []).join(", "));
          setPublished(!!row.published);
        }
        setLoading(false);
      }
    });
  }, [id, isNew, navigate]);

  async function save(publishNow?: boolean) {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      const willPublish = publishNow ?? published;
      const payload = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        body_md: body,
        cover_url: coverUrl.trim() || null,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
        published: willPublish,
        published_at: willPublish ? new Date().toISOString() : null,
        author_id: userId,
      };
      if (isNew) {
        const { data, error } = await supabase.from("articles").insert(payload).select("id").single();
        if (error) throw error;
        toast.success("Article created");
        navigate({ to: "/admin/articles/$id", params: { id: data.id }, replace: true });
      } else {
        const { error } = await supabase.from("articles").update(payload).eq("id", id);
        if (error) throw error;
        toast.success("Saved");
        setPublished(willPublish);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (authed === null || loading) return <div className="px-4 py-20 text-center text-muted-foreground">Loading…</div>;
  if (authed === false) return <div className="px-4 py-20 text-center text-destructive">You don't have permission to edit articles.</div>;

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/admin" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-brand">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to admin
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold">{isNew ? "New article" : "Edit article"}</h1>

        <div className="mt-6 grid gap-4">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (isNew && !slug) setSlug(slugify(e.target.value));
            }}
            placeholder="Article title"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 font-display text-2xl font-bold"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL slug</span>
              <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="my-article" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover image URL (optional)</span>
              <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</span>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} maxLength={300} placeholder="Short summary shown in lists and SEO." className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags (comma separated)</span>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="ERP, Automation, Pharma" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </label>

          <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
            <button type="button" onClick={() => setTab("write")} className={`rounded-md px-3 py-1 text-sm font-semibold ${tab === "write" ? "bg-background shadow" : "text-muted-foreground"}`}>Write</button>
            <button type="button" onClick={() => setTab("preview")} className={`rounded-md px-3 py-1 text-sm font-semibold ${tab === "preview" ? "bg-background shadow" : "text-muted-foreground"}`}>Preview</button>
          </div>

          {tab === "write" ? (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={20}
              placeholder="Write your article in Markdown…"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed"
            />
          ) : (
            <div className="rounded-lg border border-border bg-card/60 px-6 py-5">
              <div className="prose prose-base max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || "*Nothing to preview yet.*"}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-end gap-2 rounded-xl border border-border bg-background/95 p-3 backdrop-blur">
            <label className="mr-auto inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Published
            </label>
            <button onClick={() => save()} disabled={saving} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-60">
              <Save className="h-4 w-4" /> Save draft
            </button>
            <button onClick={() => save(true)} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-glow disabled:opacity-60">
              Save & publish
            </button>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
