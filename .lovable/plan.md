## Plan — AfriTech Systems refresh

### 1. Deployment fix (Vercel + Lovable preview)
- The "Publish or update your Lovable project for it to appear here" screen means the project hasn't been (re)published since the latest changes — not a code error. After the changes below land I'll prompt you to Publish.
- Verify `vercel.json` + `vite.vercel.config.ts` are still correct; confirm `/sitemap.xml` route is registered (it currently exists but the route segment name `sitemap[.]xml.ts` may not be picked up by the gen tree in production — I'll re-check the generated route tree and rename if needed).

### 2. Branding & header/footer
- Logo: increase to ~2× current (header `h-32 md:h-36`, footer `h-32`). Constrain width so it stays balanced.
- Header background: dark surface in light mode (slate-900) with light text; light surface in dark mode with dark text. Keep blur + rounded chrome.
- Ensure single nav text color token used: `bg-foreground/95` + `text-background` style inversion via dedicated header tokens.

### 3. Hero visibility
- Replace the hero overlay so headline/sub-headline are always readable in light mode (add a darker gradient scrim + drop shadow on text). Ensure SVG/illustration sits beneath text.

### 4. Mobile sizing (polish, not 1/3)
- Re-tune base type scale and section paddings for `< sm` breakpoints across hero, growth-promise, industry-matrix, solutions-suite, three-steps, case-studies, contact.
- Cards: reduce padding (`p-4 sm:p-6`), tighter gaps, single-column where appropriate.
- Chat popup mobile: shrink panel width to `w-[88vw] max-w-sm`, reduce launcher and message font sizes, cap height at `70vh`.

### 5. Alfred chatbot quality
- Update system prompt: short structured answers (2–4 sentences or 3–5 bullets), NO markdown asterisks, prefer `-` bullets and plain bold only when rendered.
- Render messages with `react-markdown` so any markdown that does come through renders properly (no raw `**`).
- Keep quick-reply chips; trim default greeting.

### 6. Calendly integration
- Add `react-calendly` (lightweight) for `PopupModal`/`PopupButton`.
- New `<BookCallButton/>` component used on Home hero, Solutions, Industries, Integrations, About, and footer CTA strip — opens Calendly modal (`https://calendly.com/afritech-systemsltd/30min`).
- Contact page: replace map-area top with `<InlineWidget url=...>` (full calendar embedded, responsive `min-h-[700px] sm:min-h-[780px]`), keep address + form below.

### 7. Sitemap & SEO
- Confirm `/sitemap.xml` route resolves on Vercel (rename to `sitemap.xml.ts` with bracket escape if needed, regenerate route tree).
- Extend sitemap with `/articles` and dynamic `/articles/$slug` entries pulled from DB.
- Add `<link rel="canonical">` and per-route og tags on the new article routes.
- Add JSON-LD `Article` schema on article pages and `BlogPosting` list on `/articles`.

### 8. Articles + Admin panel (Lovable Cloud)
Enable Lovable Cloud, then:

Schema (migration):
- `articles` table: `id uuid pk`, `slug text unique`, `title text`, `excerpt text`, `body_md text`, `cover_url text`, `tags text[]`, `published bool default false`, `published_at timestamptz`, `author_id uuid`, timestamps. RLS: public read where `published = true`; authenticated admin full CRUD via `has_role(uid, 'admin')`.
- `leads` table: capture audit-form submissions (mirror current email payload) + `created_at`. RLS: admin read; service role insert.
- `app_role` enum + `user_roles` + `has_role()` function per role guidelines.

Public routes:
- `/articles` — list published posts (cards, search, tags).
- `/articles/$slug` — render markdown article with SEO meta + JSON-LD.

Admin (gated under `_authenticated` + admin role):
- `/admin` — dashboard: lead list (filter/search/export CSV), article list with publish/unpublish.
- `/admin/articles/new` and `/admin/articles/$id` — markdown editor (textarea + preview), cover image upload to Supabase Storage.
- `/login` — email+password sign-in (Google optional, off by default).

Server functions: `listArticles`, `getArticle`, `upsertArticle`, `deleteArticle`, `listLeads`, all protected by `requireSupabaseAuth` + role check.

Audit form: also INSERT into `leads` table (in addition to current Resend email) so admin can review submissions.

### 9. Verification
- Build runs clean; `/sitemap.xml`, `/articles`, `/articles/sample`, `/admin` reachable.
- Mobile screenshot at 390px shows readable hero, balanced cards, compact chat.
- Calendly popup opens from a CTA and is fully visible at 390px width.
- Alfred returns a short, clean, bulleted answer with no `**` artifacts.

### Out of scope (ask before doing)
- Google Analytics / Search Console wiring (will document after deploy; needs your GA4 ID).
- Migrating existing static social/footer copy.

### Technical notes
- New deps: `react-calendly`, `react-markdown`, `remark-gfm`.
- Light-mode header inversion via new CSS tokens `--header-bg`, `--header-fg`.
- All schema work via migration; data ops via insert tool.
- Admin role seeded for your account once you sign up the first time (I'll add a one-shot SQL snippet you run).
