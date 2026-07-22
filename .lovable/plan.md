
## 1. Articles — "Read more" opens a full article

Investigate why the article page appears truncated after clicking Read more on the live site, then apply the matching fix. Likely causes and fixes:

- SPA reload: hard-nav to `/articles/:slug` on Vercel may hit the SPA fallback correctly, but the loader's Supabase call runs isomorphically. Move the query into `createServerFn` (public read via the server publishable client) and keep `ensureQueryData` in the loader so the article HTML is present on first paint. Fall back to the browser client only on client transitions.
- Content truncation: article page currently reads `body_md` correctly and pipes to ReactMarkdown, so if the body is short it looks "cut". Add clearer empty-body handling and make the prose container remove the `line-clamp`/`max-h` inherited from Tailwind Typography edge cases (audit classes on the wrapper).
- Verify by opening a published article on the deployed site with Playwright and comparing rendered content length against `body_md` length.

## 2. Article authoring — Author field + short bio

Schema (migration):
- `articles.author_name text`
- `articles.author_title text` (optional role, e.g. "Systems Engineer")
- `articles.author_bio text` (short paragraph, ≤ 400 chars)
- `articles.author_avatar_url text` (optional)

UI:
- `admin.articles.$id.tsx`: add "Author" section (name, title, bio textarea with counter, optional avatar via existing storage uploader).
- `articles.$slug.tsx`: render an "About the author" card at the end of the article with name/title/bio/avatar, plus a byline under the H1 replacing the generic "By AfriTech Systems editorial team".
- Include author in JSON-LD (`Article.author.@type = Person` when present).

## 3. Admin dashboard — full contact submission details

`src/routes/admin.tsx` currently shows Name/Company/Email/Need/Blocker/Message. Expand to show every field the audit/contact form captures:

- Add columns / expandable row for: engine, metric, source, created_at (already there).
- Add a "View" action that opens a side panel or modal with the full record (all lead columns pretty-printed) and a "Copy email" button.
- Extend CSV export to include every column (already close — just confirm headers list matches the table).
- No schema change (leads table already has these fields).

## 4. Performance / Lighthouse fixes (the biggest wins from the report)

Files:

- `src/components/site-header.tsx`: add explicit `width`/`height` on the logo `<img>` (fixes CLS + "images missing width/height"). Resize/replace `afritech-logo-full` with a properly compressed webp (~40 KB) at ~400×400 intrinsic and keep responsive classes.
- `src/components/ai-chat.tsx` (Alfred bot image): replace the 480×520 png with a compressed webp sized ~200×220 and add explicit `width`/`height`. Lighthouse flagged 215 KiB potential savings here.
- `src/components/home/hero.tsx`: keep `fetchpriority="high"` and add a `<link rel="preload" as="image" href="/img/hero/hero-collaboration.webp" fetchpriority="high">` in that route's `head().links`; convert the hero JPG to webp at 1024×820.
- `src/routes/__root.tsx`: swap the Google Fonts `<link rel="stylesheet">` for the non-blocking pattern (`rel="preload" as="style" onload="this.rel='stylesheet'"` + `<noscript>` fallback) and add `&display=swap`. Fixes the 750 ms render-blocking Google Fonts request.
- `vite.config.ts`: add manual chunk split for `react-markdown` + `remark-gfm` so the 289 KB `index-*.js` no longer ships to the home page; article route lazy-loads them.
- `vercel.json`: add response headers — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Content-Security-Policy` (report-only first). Addresses Best-Practices warnings.
- `src/routes/index.tsx`: fix canonical — Lighthouse reported `/` (relative) is invalid; set an absolute `https://afritechsystemsltd.com/` canonical.
- `src/styles.css` / `src/components/home/three-steps.tsx` etc.: bump `--color-brand` foreground contrast on light surfaces so `text-brand` passes WCAG AA on `bg-background` (Lighthouse flagged 20+ contrast failures) — adjust the token, not each usage.

## 5. Verification

- Playwright: open `/articles`, click Read more on a published article, screenshot the full page, and confirm `body_md` renders end-to-end.
- Create a test article with an author name/bio via `/admin/articles/new`, publish, verify byline + author card on the live article.
- Submit an audit form entry, open `/admin`, confirm every field appears in the row and in the detail view.
- Re-run Lighthouse locally (or wait for next scan): expect LCP < 2.5 s, CLS ≈ 0, contrast passing, HSTS/XFO headers present.

## Technical notes

- Only `articles` schema needs migration (author columns). No `leads` schema change.
- The public article read stays under the existing `Anyone can view published articles` policy; adding a server-side fetcher just avoids leaking a Supabase 401 during Vercel SSR when a cold request hits without a session.
- All new images stored under `public/img/` or externalised via `lovable-assets` — no CDN change required.
