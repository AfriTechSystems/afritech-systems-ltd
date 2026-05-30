import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — AfriTech Systems" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin", replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="Sign in" description="Restricted area for AfriTech Systems team members." />
      <section className="mx-auto max-w-md px-4 pb-20 sm:px-6">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card/70 p-6 shadow-glow">
          <div className="mb-5 flex gap-2 rounded-lg bg-muted p-1">
            <button type="button" onClick={() => setMode("signin")} className={`flex-1 rounded-md px-3 py-1.5 text-sm font-semibold ${mode === "signin" ? "bg-background shadow" : "text-muted-foreground"}`}>Sign in</button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 rounded-md px-3 py-1.5 text-sm font-semibold ${mode === "signup" ? "bg-background shadow" : "text-muted-foreground"}`}>Create account</button>
          </div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="you@company.com" autoComplete="email" />
          <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="At least 8 characters" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-glow disabled:opacity-60">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            New admin accounts need to be granted the admin role by an existing admin to access leads & articles.
          </p>
        </form>
      </section>
      <Toaster />
    </>
  );
}
