import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { PageHero } from "@/components/page-hero";
import { LogOut, Mail, FileText, Plus, ExternalLink, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AfriTech Systems" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  bottleneck: string;
  help: string;
  engine: string;
  metric: string;
  message: string;
  source: string;
  created_at: string;
}

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"leads" | "articles">("leads");
  const [authed, setAuthed] = useState<null | { userId: string; email: string }>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/login", replace: true });
        return;
      }
      setAuthed({ userId: data.user.id, email: data.user.email ?? "" });
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      const adminOrEditor = (roles ?? []).some((r) => r.role === "admin" || r.role === "editor");
      setIsAdmin(adminOrEditor);
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => check());
    return () => subscription.unsubscribe();
  }, [navigate]);

  const leadsQ = useQuery({
    queryKey: ["admin", "leads"],
    enabled: !!isAdmin,
    queryFn: async (): Promise<Lead[]> => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  const articlesQ = useQuery({
    queryKey: ["admin", "articles"],
    enabled: !!isAdmin,
    queryFn: async (): Promise<ArticleRow[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, published, published_at, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ArticleRow[];
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  async function togglePublish(a: ArticleRow) {
    const next = !a.published;
    const { error } = await supabase
      .from("articles")
      .update({ published: next, published_at: next ? new Date().toISOString() : null })
      .eq("id", a.id);
    if (error) toast.error(error.message);
    else {
      toast.success(next ? "Published" : "Unpublished");
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
    }
  }

  async function deleteArticle(a: ArticleRow) {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", a.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
    }
  }

  async function deleteLead(l: Lead) {
    if (!confirm(`Delete lead from ${l.name}?`)) return;
    const { error } = await supabase.from("leads").delete().eq("id", l.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "leads"] });
    }
  }

  function exportLeadsCsv(leads: Lead[]) {
    const headers = ["created_at", "name", "company", "email", "bottleneck", "help", "engine", "metric", "message", "source"];
    const rows = leads.map((l) =>
      headers.map((h) => `"${String((l as unknown as Record<string, unknown>)[h] ?? "").replace(/"/g, '""')}"`).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afritech-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) return <div className="px-4 py-20 text-center text-muted-foreground">Checking access…</div>;

  if (isAdmin === false) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Access pending</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You're signed in as <strong>{authed.email}</strong> but don't yet have admin or editor access.
          Ask an existing admin to grant you a role.
        </p>
        <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="AfriTech Control Centre" description={`Signed in as ${authed.email}`} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 rounded-lg bg-muted p-1">
            <button onClick={() => setTab("leads")} className={`inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold ${tab === "leads" ? "bg-background shadow" : "text-muted-foreground"}`}>
              <Mail className="h-4 w-4" /> Leads ({leadsQ.data?.length ?? 0})
            </button>
            <button onClick={() => setTab("articles")} className={`inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold ${tab === "articles" ? "bg-background shadow" : "text-muted-foreground"}`}>
              <FileText className="h-4 w-4" /> Articles ({articlesQ.data?.length ?? 0})
            </button>
          </div>
          <div className="flex gap-2">
            {tab === "leads" && leadsQ.data && leadsQ.data.length > 0 && (
              <button onClick={() => exportLeadsCsv(leadsQ.data!)} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                Export CSV
              </button>
            )}
            {tab === "articles" && (
              <Link to="/admin/articles/$id" params={{ id: "new" }} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-glow">
                <Plus className="h-4 w-4" /> New article
              </Link>
            )}
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-6">
          {tab === "leads" && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
              {leadsQ.isLoading && <p className="p-6 text-muted-foreground">Loading leads…</p>}
              {leadsQ.data && leadsQ.data.length === 0 && (
                <p className="p-10 text-center text-sm text-muted-foreground">No leads yet. Submissions from the audit form will appear here.</p>
              )}
              {leadsQ.data && leadsQ.data.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">When</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Wants</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsQ.data.map((l) => (
                        <tr key={l.id} className="border-t border-border align-top">
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                            {new Date(l.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                          </td>
                          <td className="px-4 py-3 font-medium">{l.name}</td>
                          <td className="px-4 py-3">{l.company}</td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${l.email}`} className="text-brand hover:underline">{l.email}</a>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <div><strong>Need:</strong> {l.help}</div>
                            {l.bottleneck && <div><strong>Blocker:</strong> {l.bottleneck}</div>}
                            {l.message && <div className="mt-1 max-w-md text-muted-foreground">{l.message}</div>}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => deleteLead(l)} className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === "articles" && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
              {articlesQ.isLoading && <p className="p-6 text-muted-foreground">Loading articles…</p>}
              {articlesQ.data && articlesQ.data.length === 0 && (
                <p className="p-10 text-center text-sm text-muted-foreground">No articles yet. Create your first one.</p>
              )}
              {articlesQ.data && articlesQ.data.length > 0 && (
                <ul className="divide-y divide-border">
                  {articlesQ.data.map((a) => (
                    <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{a.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${a.published ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                            {a.published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">/{a.slug} · updated {new Date(a.updated_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {a.published && (
                          <Link to="/articles/$slug" params={{ slug: a.slug }} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">
                            View <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                        <button onClick={() => togglePublish(a)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">
                          {a.published ? "Unpublish" : "Publish"}
                        </button>
                        <Link to="/admin/articles/$id" params={{ id: a.id }} className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground">Edit</Link>
                        <button onClick={() => deleteArticle(a)} className="rounded-full border border-destructive/40 px-2 py-1.5 text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
      <Toaster />
    </>
  );
}
