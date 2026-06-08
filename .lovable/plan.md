## Plan

### 1. SEO hierarchy — create real child routes
Build dedicated route files (each with its own H1, short meta title <25 chars, unique description, og:url, canonical, and BreadcrumbList JSON-LD):

- `src/routes/solutions.enterprise-erp.tsx` — H1 "Custom Enterprise ERP"
- `src/routes/solutions.school-management.tsx` — H1 "School ERP Systems"
- `src/routes/solutions.automation-dashboards.tsx` — H1 "Automation & Dashboards"
- `src/routes/industries.healthcare.tsx` — H1 "Healthcare & Pharma"
- `src/routes/industries.education.tsx` — H1 "Education"
- `src/routes/industries.manufacturing.tsx` — H1 "Manufacturing"
- `src/routes/industries.logistics.tsx` — H1 "Logistics"

Each page reuses existing copy/components and adds an "Internal Anchor Loop" linking back to `/contact`, sibling solutions, and `/articles`.

### 2. Update navigation + sitemap
- `src/lib/site.tsx` — point every `NAV_GROUPS.items[].to` at the new child routes (not the generic landing).
- `src/components/site-header.tsx` — make dropdown labels short (<25 chars), and link the group label itself ("Solutions", "Industries") to the parent page.
- `src/routes/sitemap[.]xml.ts` — add the 7 new URLs.
- Home page (`hero.tsx` / `solutions-suite.tsx` / `industry-matrix.tsx`) — turn flat-text service mentions into contextual `<Link>`s pointing to the new child routes (the "internal anchor loop").

### 3. Enrich Organization JSON-LD in `__root.tsx`
Add `legalName`, `logo` (absolute URL), `slogan: "Systems Reimagined"`, and `sameAs: ["https://www.linkedin.com/company/afritechsystemsltd/"]` to the existing Organization schema. Keep the existing address block.

### 4. Header bar white in BOTH light and dark mode
`src/components/site-header.tsx`: replace the dark navy header background with white (`bg-white text-slate-900`) for both themes; swap to the dark/full-color logo variant on white; adjust hover states, mobile-menu button border, and active-link colors to remain legible on white. Keep dropdown + mobile drawer white (already).

### 5. Fix storage upload "permission denied for function has_role"
The storage role lacks EXECUTE on `public.has_role`. New migration:

```sql
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon, service_role;
```

This lets the storage RLS policy on `article-images` invoke `has_role` so admin/editor uploads succeed.

### 6. Admin portal access on the published custom domain
The dashboard already lists leads (form submissions) and articles — that part works once auth resolves. The published-site lockout is almost certainly because `ADMIN_EMAILS` (and `OPENAI_API_KEY`) aren't set in Vercel env vars, so `ensureAdminAccess` returns "denied". Actions:

- Verify `src/start.ts` registers `attachSupabaseAuth` in `functionMiddleware` (needed for the serverFn auth header). Add it if missing.
- Add a clearer "denied" message showing the allow-list count (already logged) so we can diagnose from the published site.
- Direct DB grant of `admin` role to `hamwendamwando@gmail.com` already in place — confirm row exists.
- **Action required from you**: in Vercel → Environment Variables, set `ADMIN_EMAILS=hamwendamwando@gmail.com` (plus any other admins), `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, then redeploy. Without these the published serverFn can't grant or check admin roles.

### 7. Form submissions visible in admin
Already wired (`leadsQ` in `src/routes/admin.tsx` reads from `public.leads` with admin RLS). It will become visible automatically once #6 succeeds. No code change needed beyond confirming the query is intact.

### Technical notes
- Each new route uses `createFileRoute("/solutions/enterprise-erp")` etc., with `head()` providing `title`, `description`, `og:title`, `og:description`, `og:url`, canonical link, and a `BreadcrumbList` JSON-LD script (Home → Solutions → Enterprise ERP).
- Header color change is purely Tailwind class swaps in `site-header.tsx`; no token changes.
- Storage permission migration is a single `GRANT EXECUTE` — no policy rewrite.
- No edits to auto-generated files (`routeTree.gen.ts`, supabase `client.ts`, etc.).
