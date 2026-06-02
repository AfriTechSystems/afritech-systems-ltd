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

    const { data: userRes, error: userErr } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (userErr || !userRes.user) {
      console.error("[ensureAdminAccess] user lookup failed", userErr);
      return { isAdmin: false, email: null as string | null, reason: "user-lookup-failed" };
    }
    const email = (userRes.user.email ?? "").toLowerCase().trim();

    const allowList = (process.env.ADMIN_EMAILS ?? "")
      .split(/[,;\s]+/)
      .map((e) => e.toLowerCase().trim())
      .filter(Boolean);

    const isAllowlisted = !!email && allowList.includes(email);
    console.log("[ensureAdminAccess]", { email, isAllowlisted, allowListSize: allowList.length });

    if (isAllowlisted) {
      // Check existing role first to avoid upsert conflict-target issues.
      const { data: existing, error: selErr } = await supabaseAdmin
        .from("user_roles")
        .select("id, role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (selErr) console.error("[ensureAdminAccess] select existing role failed", selErr);

      if (!existing) {
        const { error: insErr } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        if (insErr) console.error("[ensureAdminAccess] insert admin role failed", insErr);
      }
    }

    const { data: roles, error: rolesErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (rolesErr) console.error("[ensureAdminAccess] list roles failed", rolesErr);

    const isAdmin = (roles ?? []).some((r) => r.role === "admin" || r.role === "editor");
    return { isAdmin, email, allowlisted: isAllowlisted };
  });
