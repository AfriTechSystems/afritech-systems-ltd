# Implementation Plan

## 1. Logo Replacement (site-wide)
- Replace `src/assets/afritech-logo-full.png` and `afritech-logo-dark.png` with the new **Official Logo Background.png** (uploaded).
- Update `src/components/site-header.tsx`: increase logo height to `h-14 md:h-16` so it's clearly visible on all devices.
- Update `src/components/site-footer.tsx` to use the same logo at `h-16`.
- Add favicon update using the new logo (`public/favicon.png`).

## 2. Header Navigation Visibility Fix
The nav links currently render invisible against the light blurred header background.
- In `src/components/site-header.tsx`, set nav link text to `text-foreground` / `text-slate-800` with `hover:text-brand`.
- Ensure the floating header has a solid enough background (`bg-background/95`) and visible link colors in both themes.
- Verify "Get a free audit" CTA contrast.

## 3. Alfred AI Chatbot (Replace current AiChatWidget)
- Copy uploaded `Bot-removebg-preview (1).png` to `src/assets/alfred-bot.png` (transparent PNG).
- Rebuild `src/components/ai-chat.tsx`:
  - Floating launcher: transparent bot image (`h-16 w-16`), no circle background, gentle bobbing animation, bottom-right.
  - Popup card: header shows "Alfred — AfriTech AI Sales Assistant", small bot avatar.
  - **Welcome state**: 3 pre-filled quick-question chips (e.g. "What services do you offer?", "How much does a custom ERP cost?", "Can you automate my business?").
  - **Quick-reply chips** rendered after each assistant turn (contextual: "Book a call", "See pricing", "Tell me more", "Talk to a human").
  - Clicking a chip sends it as a user message.
- Update `src/routes/api/chat.ts` system prompt:
  - Persona: "Alfred", AfriTech Systems sales closer.
  - Structured responses (short intro → bullet points → next step CTA).
  - Knowledgeable about company + general tech/business topics, always tying back to AfriTech services.
  - Always end with a conversion nudge (book audit, fill form, email/call).
- Uses existing Lovable AI Gateway (`google/gemini-3-flash-preview`).

## 4. Scroll Progress Widget (bottom-right)
- New `src/components/scroll-progress.tsx`: a fancy circular SVG progress ring with % filled based on scroll position, positioned bottom-right above the chatbot. Click to scroll-to-top. Smooth animations, brand gradient stroke.
- Mount in `src/routes/__root.tsx`.

## 5. Resend Email Integration for Audit Form
- Connect **Resend** connector via `standard_connectors--connect`.
- New server route `src/routes/api/audit-lead.ts` (POST):
  - Validates form payload with Zod.
  - Sends well-structured HTML email via Resend gateway to **enquiry@afritechsystemsltd.com**.
  - Email includes: Industry, Services selected, Name, Company, Email, Phone, Message, timestamp.
- Update `src/components/home/audit-form.tsx` to POST to this endpoint and show success/error toasts.

## 6. Vercel Deployment Fix
The Vercel 404 (`NOT_FOUND` shown in screenshot) is because the template builds for Cloudflare Workers by default.
- Update `vite.config.ts` to set the nitro target to `vercel` (so `nitro` outputs `.vercel/output/`).
- Add `vercel.json` with framework=null, build command `npm run build`, output `.vercel/output`.
- Verify `package.json` build script.
- Publish to Lovable, then user can connect Vercel via git import.

## 7. Mobile/Responsive QA
- Quick pass on header, hero, chatbot, scroll widget at 375px and 865px viewports.

---

## Technical Notes
- All AI chat traffic stays on `/api/chat` server route using existing `ai-gateway.server.ts` helper.
- Resend secret `RESEND_API_KEY` + `LOVABLE_API_KEY` will be auto-provisioned by connector flow.
- Scroll widget uses `requestAnimationFrame` + `scrollY / (scrollHeight - innerHeight)`.
- Alfred chat icon image rendered with `object-contain` and no background, drop-shadow for legibility.

## Files Created/Modified
- `src/assets/afritech-logo-full.png` (replaced)
- `src/assets/alfred-bot.png` (new)
- `public/favicon.png` (replaced)
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/ai-chat.tsx` (rewrite as Alfred)
- `src/components/scroll-progress.tsx` (new)
- `src/routes/__root.tsx`
- `src/routes/api/chat.ts` (new system prompt)
- `src/routes/api/audit-lead.ts` (new)
- `src/components/home/audit-form.tsx`
- `vite.config.ts`, `vercel.json` (new)
