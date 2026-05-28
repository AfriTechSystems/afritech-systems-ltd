import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { SITE } from "@/lib/site";

const ENGINES = ["Legacy Excel Workbooks", "Fragmented Local Software", "Manual Paper Operations", "Mixed / Other"] as const;
const METRICS = ["Operational Cost", "Executive Tracking", "Data Accuracy", "Speed of Execution"] as const;

const schema = z.object({
  engine: z.string().min(1, "Select your current engine"),
  metric: z.string().min(1, "Select a metric to optimize"),
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid enterprise email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(32),
});

export function AuditForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ engine: "", metric: "", name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function next() {
    if (step === 0 && !data.engine) return setErrors({ engine: "Select your current engine" });
    if (step === 1 && !data.metric) return setErrors({ metric: "Select a metric to optimize" });
    setErrors({});
    setStep((s) => s + 1);
  }
  function back() { setErrors({}); setStep((s) => Math.max(0, s - 1)); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fe[i.path[0] as string] = i.message; });
      setErrors(fe);
      return;
    }
    setDone(true);
    toast.success("Digital audit request received", { description: "Our systems engineer will reach out within one business day." });
  }

  if (done) {
    return (
      <section id="audit" className="border-t border-border/60 bg-radial-glow py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold">Audit initiated</h2>
          <p className="mt-3 text-muted-foreground">
            Thank you, {data.name.split(" ")[0]}. A systems engineer will reach out to{" "}
            <span className="text-brand">{data.email}</span> within one business day with a
            preliminary digital transformation blueprint.
          </p>
          <a href={`mailto:${SITE.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-brand hover:underline">
            Or email us directly at {SITE.email}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="audit" className="border-t border-border/60 bg-radial-glow py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Initiate Digital Audit</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A conversation, not a contact form</h2>
          <p className="mt-4 text-muted-foreground">
            Three questions. One actionable transformation blueprint, free of charge.
          </p>
        </header>

        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-10 bg-brand" : i < step ? "w-6 bg-brand/60" : "w-6 bg-border"}`}
            />
          ))}
        </div>

        <form onSubmit={submit} className="mt-8 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
          {step === 0 && (
            <Step title="What is your primary operational engine today?">
              <div className="grid gap-3 sm:grid-cols-2">
                {ENGINES.map((opt) => (
                  <RadioCard key={opt} label={opt} checked={data.engine === opt} onSelect={() => setData({ ...data, engine: opt })} />
                ))}
              </div>
              {errors.engine && <p className="mt-3 text-sm text-destructive">{errors.engine}</p>}
            </Step>
          )}

          {step === 1 && (
            <Step title="Which operational metric do you need to optimize instantly?">
              <div className="grid gap-3 sm:grid-cols-2">
                {METRICS.map((opt) => (
                  <RadioCard key={opt} label={opt} checked={data.metric === opt} onSelect={() => setData({ ...data, metric: opt })} />
                ))}
              </div>
              {errors.metric && <p className="mt-3 text-sm text-destructive">{errors.metric}</p>}
            </Step>
          )}

          {step === 2 && (
            <Step title="Where should our systems engineer reach you?">
              <div className="grid gap-4">
                <Field label="Full name" error={errors.name}>
                  <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="field" placeholder="Jane Mubita" autoComplete="name" />
                </Field>
                <Field label="Enterprise email" error={errors.email}>
                  <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="field" placeholder="jane@company.com" autoComplete="email" />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="field" placeholder="+260 ..." autoComplete="tel" />
                </Field>
              </div>
            </Step>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={back} disabled={step === 0} className="rounded-md px-4 py-2 text-sm text-muted-foreground disabled:opacity-40 hover:text-foreground">
              Back
            </button>
            {step < 2 ? (
              <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Initiate audit <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          color: var(--color-foreground);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .field:focus {
          outline: none;
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-brand) 25%, transparent);
        }
      `}</style>
    </section>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function RadioCard({ label, checked, onSelect }: { label: string; checked: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border p-4 text-left text-sm transition-all ${
        checked ? "border-brand bg-brand/10 shadow-glow" : "border-border bg-background hover:border-brand/40"
      }`}
    >
      <span className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span className={`h-4 w-4 rounded-full border-2 ${checked ? "border-brand bg-brand" : "border-border"}`} />
      </span>
    </button>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
