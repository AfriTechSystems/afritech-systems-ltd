import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(255),
  bottleneck: z.string().trim().min(1).max(120),
  help: z.string().trim().min(1).max(160),
  engine: z.string().trim().max(120).optional().default(""),
  metric: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(d: z.infer<typeof LeadSchema>) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 12px;background:#f6fafb;font-weight:600;color:#0f1b2d;width:200px;border-bottom:1px solid #e5eef0">${label}</td><td style="padding:8px 12px;color:#1f2937;border-bottom:1px solid #e5eef0">${escape(value)}</td></tr>`
      : "";
  return `<!doctype html>
<html><body style="margin:0;background:#f3f7f9;font-family:'Inter',Arial,sans-serif;color:#0f1b2d">
  <div style="max-width:640px;margin:0 auto;padding:24px">
    <div style="background:linear-gradient(135deg,#16a3a3,#34d4c8);padding:24px 28px;border-radius:14px 14px 0 0;color:#fff">
      <h1 style="margin:0;font-size:20px;font-weight:700">🚀 New Audit Request — AfriTech Systems</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:.92">A prospect just submitted the free systems audit form.</p>
    </div>
    <div style="background:#fff;border:1px solid #e5eef0;border-top:none;border-radius:0 0 14px 14px;padding:20px 28px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Full Name", d.name)}
        ${row("Company / Industry", d.company)}
        ${row("Email", d.email)}
        ${row("Main Bottleneck", d.bottleneck)}
        ${row("Wants Help With", d.help)}
        ${row("Current Operational Engine", d.engine)}
        ${row("Metric to Optimize", d.metric)}
        ${row("Notes", d.message)}
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#6b7785">
        Submitted ${new Date().toUTCString()} via afritechsystemsltd.com
      </p>
    </div>
  </div>
</body></html>`;
}

export const Route = createFileRoute("/api/audit-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = LeadSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Validation failed", details: parsed.error.issues },
            { status: 400 },
          );
        }
        const data = parsed.data;

        // 1) Persist lead in the database (admin client bypasses RLS but the table itself accepts public inserts)
        try {
          const { error: insErr } = await supabaseAdmin.from("leads").insert({
            name: data.name,
            company: data.company,
            email: data.email,
            bottleneck: data.bottleneck,
            help: data.help,
            engine: data.engine,
            metric: data.metric,
            message: data.message,
            source: "audit_form",
          });
          if (insErr) console.error("lead insert failed", insErr);
        } catch (e) {
          console.error("lead insert exception", e);
        }

        // 2) Send email (best-effort)
        const lovableKey = process.env.LOVABLE_API_KEY;
        const resendKey = process.env.RESEND_API_KEY;
        if (lovableKey && resendKey) {
          try {
            const res = await fetch(`${GATEWAY_URL}/emails`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lovableKey}`,
                "X-Connection-Api-Key": resendKey,
              },
              body: JSON.stringify({
                from: "AfriTech Website <onboarding@resend.dev>",
                to: ["enquiry@afritechsystemsltd.com"],
                reply_to: data.email,
                subject: `New Audit Request — ${data.company} (${data.name})`,
                html: buildHtml(data),
              }),
            });
            if (!res.ok) {
              const t = await res.text().catch(() => "");
              console.error("Resend send failed", res.status, t);
            }
          } catch (e) {
            console.error("Resend exception", e);
          }
        }

        return Response.json({ ok: true });
      },
    },
  },
});
