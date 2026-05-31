import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Auto-grants the `admin` role to any signed-in user whose email is
 * present in the ADMIN_EMAILS secret (comma-separated, case-insensitive).
 * Falls back to existing user_roles entries.
 */
export const ensureAdminAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    // Pull user email from auth (admin API)
    const { data: userRes, error: userErr } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (userErr || !userRes.user) {
      return { isAdmin: false, email: null as string | null, reason: "user-lookup-failed" };
    }
    const email = (userRes.user.email ?? "").toLowerCase().trim();

    const allowList = (process.env.ADMIN_EMAILS ?? "")
      .split(/[,;\s]+/)
      .map((e) => e.toLowerCase().trim())
      .filter(Boolean);

    const isAllowlisted = email && allowList.includes(email);

    if (isAllowlisted) {
      // Upsert admin role (idempotent via unique constraint user_id+role)
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
    }

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const isAdmin = (roles ?? []).some((r) => r.role === "admin" || r.role === "editor");
    return { isAdmin, email, allowlisted: isAllowlisted };
  });
