# Implementation Plan

## 1. Nav popup (mobile + desktop)
File: `src/components/site-header.tsx`
- Reduce header height: `h-28 sm:h-32` → `h-20 sm:h-24` (logo + hamburger sizes unchanged: `h-32 sm:h-36 md:h-40`).
- Invert colors on the **popup card only** (header wrapper):
  - Light mode → dark shady blue bg + light text: `bg-[#0F1B2D] text-white border-white/10`
  - Dark mode → light/greyish bg + dark text: `dark:bg-slate-100 dark:text-slate-900 dark:border-slate-300`
- Update child link/button hover classes to match (swap `hover:bg-accent` for `hover:bg-white/10` on light, `dark:hover:bg-slate-200`).
- Logo: swap which logo shows so the visible one contrasts the new bg (light mode → dark bg → use `logoDark` white version; dark mode → light bg → use `logoLight` color version).
- Mobile drawer + desktop dropdown popover inherit the same palette.

## 2. Integration logos with alt text
- Upload the 8 provided JPGs (n8n, Excel, Google Workspace, HubSpot, Salesforce, Slack, Stripe, Notion) via `lovable-assets` from `/mnt/user-uploads/` to `src/assets/integrations/*.asset.json`.
- For tools without supplied logos (Zapier, Make, Supabase, PostgreSQL, Microsoft 365, Jira, WhatsApp, Twilio, Paystack, Flutterwave, AWS, Cloudflare, Azure, Power BI, Tableau, MongoDB, Redis) generate small clean SVG-style mark icons via `imagegen` (transparent PNG, ~256px, "on a clean white background") in batch.
- Refactor `src/components/home/integrations.tsx`: replace the colored dot with a sized `<img src={logo} alt="<Tool> logo" className="h-5 w-auto object-contain" />`; chip becomes `gap-2 px-4 py-2.5` so logos sit neatly. Add `loading="lazy"` + `decoding="async"`.
- Refactor `src/routes/integrations.tsx` category cards to render each tool as a pill: `<img className="h-4 w-auto" alt=… />` + name.

## 3. Admin allow-list fix
- `ADMIN_EMAILS` secret is set to `hamwendamwando@gmail.com` (verified). The failure is the upsert call: in `src/lib/admin-access.functions.ts` the upsert relies on `onConflict: "user_id,role"`. Some schema variants list role as enum; the unique index may not be named exactly that. Make it bulletproof:
  - First `select` existing role; only insert if missing (no upsert collision risk).
  - Add explicit logging + return `reason` on failure paths.
- Defensive: trim BOM/whitespace and compare lowercased — already done.
- Verify `admin.tsx` flow still re-runs on `onAuthStateChange` (it does).

## 4. Alfred chatbot fix + rebrand
File: `src/components/ai-chat.tsx` + `src/routes/api/chat.ts`
- Rename label "AfriTech Sales · Online" → "AfriTech Assistant · Online"; aria-label "Chat with Alfred" stays; small chip "Ask Alfred" stays.
- Ensure message text color always contrasts: `bg-muted text-foreground` already correct, but add explicit `text-slate-900 dark:text-slate-100` fallback on assistant bubble to avoid prose plugin overriding to a near-invisible color in some themes.
- Fix empty-response: current handler returns `toUIMessageStreamResponse({ originalMessages })`. Drop the `originalMessages` option (it can produce empty stream when the client transport doesn't expect echoed history) and return `result.toUIMessageStreamResponse()` directly. Keep model `google/gemini-2.5-flash`.
- Add inline actionable chips that DEEP-LINK: rewire FOLLOWUP_CHIPS to actual `<Link>` (Book → opens Calendly modal via BookCallButton, Pricing → `/solutions#pricing`, Case studies → `/#case-studies`, Talk to human → `mailto:enquiry@…`). Render as styled rounded buttons with brand colors.
- Mobile: widen popup to `w-[94vw] max-w-[400px]`, increase input height `h-10 text-base` so typing is comfortable; ScrollArea uses `max-h-[60vh]`.
- System prompt: append rule "When suggesting an action, end with a bracketed tag like [book], [pricing], [cases], [contact] so the UI can render a button." Then in `ai-chat.tsx`, parse trailing tags from assistant text and render matching action buttons under the bubble.

## 5. Card icons across the site → "drawing" style
- Replace inline lucide icons inside feature cards (`solutions-suite.tsx`, `core-engine.tsx`, `industry-blueprint.tsx`, `three-steps.tsx`, `growth-promise.tsx`, etc.) with `lucide-react` icons rendered inside a soft circular badge: `bg-brand/10 text-brand ring-1 ring-brand/20 rounded-2xl p-3` and `strokeWidth={1.5}` for a hand-drawn feel. Add subtle `transition group-hover:scale-105`. No new dependencies; no animation libs. Keep payload tiny so performance stays good.

## 6. SEO / indexing
- `sitemap.xml.ts`: BASE_URL is `https://afritechsystemsltd.com` but the live site is `https://afritechsystemsltd.lovable.app` (custom domain not yet active per project URLs). Switch BASE_URL to `https://afritechsystemsltd.lovable.app` so Google's canonical/sitemap actually match the served host (fixes "Page with redirect").
- Update `public/robots.txt` Sitemap directive to the same host.
- Per-route `head()`: replace any hard-coded absolute canonical/og:url pointing to `afritechsystemsltd.com` with relative paths (`/about`, `/contact`, …) so they resolve to whichever host serves them. Keep `noindex,nofollow` on `/admin*` and `/login`.

## 7. Verification
- Visual: load `/`, `/integrations`, `/admin`, open chat — confirm bg colors flip per theme, logos render with alt text, Alfred replies.
- Functional: sign in as `hamwendamwando@gmail.com` → expect admin panel (not "Access pending").
- Log check: `stack_modern--server-function-logs` after one chat round to confirm 200 stream.

No DB migrations needed. No new npm deps.
