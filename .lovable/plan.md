## Failing SEO findings found

1. **Sitemap needs attention** — scanner saw missing sitemap coverage for `/articles/$slug` plus non-indexable/internal routes like `/admin`, `/login`, `/api/audit-lead`, and `/api/chat`.
2. **Page loads slowly** — published homepage LCP needs optimization, especially the hero image/headline.
3. **Accessibility barriers** — some text has weak contrast against its background.
4. **Heading and image descriptions could be clearer** — homepage H1 should describe Enterprise Automation more explicitly; integration image alt text is too generic.
5. **Titles and descriptions exceed length limits** — integrations title and solutions/integrations/contact descriptions are too long.
6. **Google Search Console is not fully set up** — Search Console connector/verification/sitemap submission still needs completing.

## Implementation plan

### 1. Fix chatbot blank responses on deployed Vercel domain
- Inspect the `/api/chat` route for production deployment compatibility.
- Keep Lovable AI calls server-side, but add deployment-safe diagnostics and user-facing error handling so blank streams become visible failures instead of empty assistant bubbles.
- Change the chat UI so if a streamed assistant message has no text after completion, it shows a helpful error and allows retry.
- Use the stable `google/gemini-2.5-flash` model already chosen, and keep returning a direct AI SDK streaming response.
- Check whether the deployed Vercel environment likely lacks `LOVABLE_API_KEY`; if so, surface a clear “AI is not configured on this deployment” message in the widget instead of a blank response.

### 2. Fix admin portal stuck on “Checking access…”
- Refactor `src/routes/admin.tsx` so auth/admin checking always reaches a final state.
- Add `loading`, `unauthenticated`, `authorized`, `denied`, and `error` states instead of relying on `authed === null` forever.
- Add timeout/error handling around `supabase.auth.getUser()` and `ensureAdminAccess()` so the page cannot hang indefinitely.
- Preserve the noindex metadata for `/admin`.
- If admin access still fails, show the signed-in email and a clear reason rather than endless “Checking access…”.

### 3. Make nav popup and footer white
- Update `src/components/site-header.tsx` so the desktop dropdown popup and mobile drawer are white in both light and dark modes.
- Keep current logo and hamburger sizing.
- Adjust link text/hover styles inside the popup/drawer for strong contrast on white.
- Update `src/components/site-footer.tsx` to use a white/light background in both modes, with readable text and borders.

### 4. Replace homepage hero animation with uploaded hero image
- Upload `hero page.jpg` through Lovable Assets.
- Replace `PipelineVisualizer` in `src/components/home/hero.tsx` with a responsive optimized `<img>` using the uploaded asset.
- Add descriptive alt text, explicit dimensions, `fetchPriority="high"`, eager loading, and a preload link in the homepage route for LCP performance.
- Update the homepage H1 to include the requested SEO descriptor, e.g. “SYSTEMS REIMAGINED — Enterprise Automation for Africa”.

### 5. Replace case-study images with uploaded images
- Upload the attached pharmacy, school ERP, and logistics images through Lovable Assets.
- Update `src/components/home/case-studies.tsx` to use:
  - Pharmacy image for Pharma Distribution
  - School ERP image for Education
  - Logistics image for Logistics SME
- Add descriptive alt text for each image and keep responsive aspect-ratio styling for mobile.

### 6. Make integration icons visible and improve alt text
- Update the logo containers in `src/components/home/integrations.tsx` and `src/routes/integrations.tsx` so JPG logos show on both light/dark backgrounds with a white chip/background where needed.
- Replace generic “logo” alt text with descriptive alt text such as “Slack team communication platform” or “Microsoft Excel spreadsheet integration”.
- Keep lazy loading for non-hero integration images.

### 7. Fix sitemap/indexability without indexing private/API routes
- Keep `/admin` and `/login` blocked/noindexed as requested previously.
- Do **not** add `/api/chat` or `/api/audit-lead` to the sitemap because API endpoints should not be indexed.
- Confirm dynamic article URLs are generated one per published article; if needed, strengthen the sitemap route and mark the stale finding fixed with an explanation.
- Keep public pages indexable: `/`, `/solutions`, `/industries`, `/integrations`, `/articles`, published `/articles/<slug>`, `/about`, `/contact`.
- Update robots/sitemap domain consistently for the live custom domain `https://afritechsystemsltd.com` if that is now the launched primary domain.

### 8. Fix SEO metadata and accessibility findings
- Shorten route metadata:
  - integrations title under 60 characters
  - solutions/integrations/contact descriptions under 160 characters
- Improve low-contrast text where scanner findings point to muted text on light sections, especially footer/nav/card areas being changed.
- Keep single-H1 route structure intact.
- Mark addressed SEO findings as fixed after code changes.

### 9. Semrush/Search Console next step
- Semrush helps with keyword/competitive SEO, but the listed failing setup issue is Google Search Console, not Semrush.
- If the Google Search Console connector is available/connected, proceed with verification/submission; otherwise surface that it must be connected so the sitemap can be submitted and search data tracked.

## Verification
- Check admin page no longer hangs and shows an actionable state.
- Check chat errors are visible on deployed-domain failures instead of blank responses.
- Confirm hero/case-study/integration images render with alt text and responsive sizing.
- Mark fixed SEO findings in the SEO panel and suggest a rescan after publishing.