import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";

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
  const [coverAlt, setCoverAlt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);

  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/login", replace: true });
        return;
      }
      // Allow-list aware admin check
      try {
        const { ensureAdminAccess } = await import("@/lib/admin-access.functions");
        const res = await ensureAdminAccess();
        setAuthed(!!res.isAdmin);
        if (!res.isAdmin) return;
      } catch {
        const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
        const ok = (roles ?? []).some((r) => r.role === "admin" || r.role === "editor");
        setAuthed(ok);
        if (!ok) return;
      }
      if (!isNew) {
        const { data: row, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
        if (error) toast.error(error.message);
        if (row) {
          setTitle(row.title);
          setSlug(row.slug);
          setExcerpt(row.excerpt ?? "");
          setBody(row.body_md ?? "");
          setCoverUrl(row.cover_url ?? "");
          setCoverAlt(row.cover_alt ?? "");
          setSeoTitle((row as { seo_title?: string }).seo_title ?? "");
          setSeoDescription((row as { seo_description?: string }).seo_description ?? "");
          setOgImage((row as { og_image?: string }).og_image ?? "");
          setTagsInput((row.tags ?? []).join(", "));
          setPublished(!!row.published);
        }
        setLoading(false);
      }
    })();
  }, [id, isNew, navigate]);

  async function uploadToBucket(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("article-images").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      toast.error(error.message);
      return null;
    }
    const { data } = supabase.storage.from("article-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleCoverFile(file: File) {
    setUploading(true);
    const url = await uploadToBucket(file);
    setUploading(false);
    if (url) {
      setCoverUrl(url);
      if (!ogImage) setOgImage(url);
      toast.success("Cover uploaded");
    }
  }

  async function handleInlineFile(file: File) {
    setUploading(true);
    const url = await uploadToBucket(file);
    setUploading(false);
    if (!url) return;
    const alt = prompt("Alt text for this image (for SEO & accessibility):", "") || "";
    const md = `\n\n![${alt}](${url})\n\n`;
    const el = bodyRef.current;
    if (el) {
      const start = el.selectionStart ?? body.length;
      const end = el.selectionEnd ?? body.length;
      const next = body.slice(0, start) + md + body.slice(end);
      setBody(next);
      requestAnimationFrame(() => {
        el.focus();
        el.selectionStart = el.selectionEnd = start + md.length;
      });
    } else {
      setBody(body + md);
    }
    toast.success("Image inserted");
  }

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
        cover_alt: coverAlt.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        og_image: ogImage.trim() || coverUrl.trim() || null,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
        published: willPublish,
        published_at: willPublish ? new Date().toISOString() : null,
        author_id: userId,
      };
      if (isNew) {
        const { data, error } = await supabase.from("articles").insert(payload).select("id").single();
        if (error) throw error;
        toast.success(willPublish ? "Published" : "Draft saved");
        navigate({ to: "/admin/articles/$id", params: { id: data.id }, replace: true });
      } else {
        const { error } = await supabase.from("articles").update(payload).eq("id", id);
        if (error) throw error;
        toast.success(willPublish ? "Published" : "Saved");
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
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags (comma separated)</span>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="ERP, Automation, Pharma" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</span>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} maxLength={300} placeholder="Short summary shown in lists and SEO." className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </label>

          {/* Cover image */}
          <div className="rounded-xl border border-dashed border-border bg-card/40 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover image</span>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleCoverFile(f);
                  e.target.value = "";
                }}
              />
              <button type="button" onClick={() => coverInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent disabled:opacity-60">
                <Upload className="h-3.5 w-3.5" /> Upload from device
              </button>
              {coverUrl && <a href={coverUrl} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline">View</a>}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://… or upload above" className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
              <input value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Cover alt text (for SEO & screen readers)" className="rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            {coverUrl && (
              <img src={coverUrl} alt={coverAlt || "Cover preview"} className="mt-3 max-h-48 rounded-lg border border-border object-cover" />
            )}
          </div>

          {/* SEO block */}
          <details className="rounded-xl border border-border bg-card/40 p-4" open>
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground">SEO &amp; social preview</summary>
            <div className="mt-3 grid gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground">SEO title <span className="text-[10px]">(≤60 chars; defaults to article title)</span></span>
                <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} maxLength={70} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
                <span className="text-[10px] text-muted-foreground">{seoTitle.length}/60</span>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Meta description <span className="text-[10px]">(≤160 chars; defaults to excerpt)</span></span>
                <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} maxLength={180} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
                <span className="text-[10px] text-muted-foreground">{seoDescription.length}/160</span>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Social share image URL (defaults to cover)</span>
                <input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://…" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </label>
            </div>
          </details>

          {/* Body editor */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
              <button type="button" onClick={() => setTab("write")} className={`rounded-md px-3 py-1 text-sm font-semibold ${tab === "write" ? "bg-background shadow" : "text-muted-foreground"}`}>Write</button>
              <button type="button" onClick={() => setTab("preview")} className={`rounded-md px-3 py-1 text-sm font-semibold ${tab === "preview" ? "bg-background shadow" : "text-muted-foreground"}`}>Preview</button>
            </div>
            <div>
              <input
                ref={inlineInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleInlineFile(f);
                  e.target.value = "";
                }}
              />
              <button type="button" onClick={() => inlineInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent disabled:opacity-60">
                <ImageIcon className="h-3.5 w-3.5" /> Insert image at cursor
              </button>
            </div>
          </div>

          {tab === "write" ? (
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={22}
              placeholder="Write your article in Markdown. Use ## for sections, - for bullets. Insert images with the button above — they'll be uploaded and embedded with alt text."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed"
            />
          ) : (
            <article className="rounded-lg border border-border bg-card/60 px-6 py-5">
              <div className="prose prose-base max-w-none dark:prose-invert prose-img:rounded-xl prose-img:my-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || "*Nothing to preview yet.*"}</ReactMarkdown>
              </div>
            </article>
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
