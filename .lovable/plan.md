## 1. Mobile typography & logo

- Remove the aggressive `html { font-size: 11px }` override in `src/styles.css` and replace with a milder `13px` baseline at ≤640px, `14.5px` at 641–768px, so hero/title/subtitle sizes return close to original but stay readable on small screens.
- Tune Hero (`src/components/home/hero.tsx`) and `PageHero` mobile classes (e.g. `text-4xl` headings, `text-base` subtitles on small screens) so they look prominent again.
- Logo: bump mobile size from `h-20` → `h-28` (`sm:h-28 md:h-32`) in `site-header.tsx`. Footer logo unchanged.

## 2. Navigation polish

- Reorder nav so **Articles comes after Integrations** in `src/lib/site.tsx` (`SIMPLE_NAV`, `NAV_GROUPS`) and `site-header.tsx`. Order: Home · Solutions · Industries · Integrations · Articles · About · Contact.
- Keep current light/dark inverted color scheme (already correct).

## 3. Chatbot fix

- Diagnose: `useChat` with new `@ai-sdk/react` requires the server route to match the transport's UI message stream contract. Current code uses `result.toUIMessageStreamResponse({ originalMessages })` but the wrapped response from `withLovableAiGatewayRunIdHeader` may not preserve the streaming `Content-Type` / SSE headers properly, causing the client to silently get an empty response.
- Fix `src/routes/api/chat.ts`:
  - Validate messages, return the AI SDK UI message stream response directly (without the run-id wrapper for streaming) using the canonical pattern from the knowledge file.
  - Add try/catch with a meaningful error response so failures surface in the UI.
- Add visible error rendering in `ai-chat.tsx` (`error` from `useChat`) so future failures aren't silent.

## 4. Remove scroll widget

- Delete `src/components/scroll-progress.tsx` import + render from `src/routes/__root.tsx`. Keep only `AiChatWidget` in the bottom-right.

## 5. Admin access via Cloud secret allowlist

- Add a new secret `ADMIN_EMAILS` (comma-separated list, e.g. `hamwendamwando@gmail.com,owner@afritechsystemsltd.com`). Request via the secrets tool.
- Add a server function `ensureAdminAccess` (`src/lib/admin-access.functions.ts`) using `requireSupabaseAuth`. It reads the signed-in user's email, checks against `process.env.ADMIN_EMAILS`, and if matched, upserts an `admin` row into `public.user_roles` for that user via `supabaseAdmin`. Returns `{ isAdmin: boolean }`.
- Update `src/routes/admin.tsx` and `src/routes/admin.articles.$id.tsx` to:
  1. On mount, call `ensureAdminAccess()` first.
  2. Then re-check `user_roles`.
  3. Only show "Access pending" if neither secret nor DB role matches.
- This means anyone signed in with an email in `ADMIN_EMAILS` is auto-granted admin on first visit — no SQL needed.

## 6. Article publishing — full feature set

### 6a. Storage bucket for article images (migration)

- Create public storage bucket `article-images`.
- RLS: anyone can read; only authenticated users with admin/editor role can insert/update/delete (using `has_role`).

### 6b. Image upload + markdown image insertion in editor

- Update `src/routes/admin.articles.$id.tsx`:
  - Add an **"Upload cover image"** button next to the cover URL field — uploads selected file to `article-images/covers/{uuid}.{ext}`, returns public URL, sets `coverUrl`.
  - Add an **"Insert image"** toolbar button above the markdown textarea — opens a small dialog asking for: file, alt text, optional caption. On confirm: upload to `article-images/inline/{uuid}.{ext}` and insert `![alt](url "caption")` markdown at the current cursor position (or end of body).
  - Add an **SEO panel** (collapsible) below tags: SEO title (max 60), SEO description (max 160), OG image URL (defaults to cover). Stored as new columns `seo_title`, `seo_description`, `og_image` (migration adds them; defaults null).
  - Live character counters on title/excerpt/SEO fields.

### 6c. Articles index (`src/routes/articles.tsx`)

- Fetch published articles from Supabase (already happens). If empty, render a clean empty state: "No articles published yet — check back soon." (with brand iconography).
- Add a **search input** + **tag filter chips** (derived from union of all tags). Mobile: filters collapse into a `Sheet` triggered by a "Filter" button so the layout stays clean.
- Card grid: cover image, tag pills, title, excerpt, "Read more →", date.

### 6d. Article detail (`src/routes/articles.$slug.tsx`)

- Professional reading layout: max-w-3xl, large display heading, cover hero image, author/date row, tag pills, reading-time estimate, prose-styled markdown body with `react-markdown` + `remark-gfm` (already installed). Images render full-width with captions from markdown title syntax.
- Inject JSON-LD `Article` schema, per-route `head()` using `seo_title`/`seo_description`/`og_image` fields when present (falling back to title/excerpt/cover).
- Sticky "Back to Articles" + "Share" buttons. Related articles strip at bottom (3 latest from same tag).

### 6e. RLS verification

- Existing policies on `articles` (admin/editor insert/update via `has_role`) plus the new admin-by-email auto-grant in §5 mean publishing works as soon as the user signs in with an allowlisted email — no manual SQL ever again.

## 7. SEO & sitemap for afritechsystemsltd.com

Google can't index the site because:
- `sitemap.xml` and canonicals point to the `*.lovable.app` host, not the custom domain.
- `robots.txt` advertises the wrong sitemap host.

Fixes:
- `src/routes/sitemap[.]xml.ts`: change `BASE_URL` to `https://afritechsystemsltd.com`.
- `public/robots.txt`: update `Sitemap:` directive to `https://afritechsystemsltd.com/sitemap.xml`. Keep `Disallow: /admin`, `Disallow: /login`.
- Add per-route absolute `canonical` + `og:url` pointing to `https://afritechsystemsltd.com{path}` in every route's `head()` (root + each page). Replace the lovable.app preview image with a stable public asset (use one of the brand logos in `public/`).
- Add `meta robots noindex,nofollow` to `/admin`, `/admin/articles/$id`, `/login` (already present on admin — verify and add to login).
- Confirm sitemap dynamically lists all published articles (already done).
- Update `src/routes/__root.tsx` head defaults to use the custom domain.

## 8. Verification

- Build the site, then in preview: open chatbot and confirm a streamed response renders; open `/admin` while signed in as `hamwendamwando@gmail.com` and confirm auto-grant works; create + upload image + publish an article; visit `/articles` and `/articles/{slug}`; curl `/sitemap.xml` and `/robots.txt` to confirm they reference `afritechsystemsltd.com`.

## Technical notes

- Migration adds: `articles.seo_title text`, `articles.seo_description text`, `articles.og_image text`; storage bucket `article-images` with public read + role-gated write policies.
- New secret: `ADMIN_EMAILS` (comma-separated).
- No changes to `client.ts`, `client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`, `types.ts`, or `supabase/config.toml`.
- Stack stays TanStack Start; no edge functions added.
