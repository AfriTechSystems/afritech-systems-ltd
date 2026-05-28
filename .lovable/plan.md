# Plan — Content Expansion, Light-Mode Default, Mobile Type Scaling

## 1. Default theme → Light
- `src/components/theme-toggle.tsx`: default `isDark = false`; honour stored preference, otherwise light.
- `src/routes/__root.tsx`: update the pre-hydration script so the `dark` class is added ONLY when `localStorage.theme === "dark"` (currently defaults to dark). Prevents flash.
- Quick visual pass on hero/dashboard SVGs to ensure they read on a light background (tweak a few opacity/stroke tokens via existing semantic CSS variables — no hard-coded colors).

## 2. Hero rewrite (`src/components/home/hero.tsx`)
- New H1: "SYSTEMS REIMAGINED." with subhead "We turn manual, spreadsheet-heavy operations into powerful, automated digital systems."
- New body paragraph from brief.
- Primary CTA "Reimagine Your System Today" → scrolls to `#audit`. Secondary "Explore Solutions" → `/solutions`.
- Keep the existing animated pipeline SVG on the right (it already matches the "spreadsheet → dashboard" metaphor); add a small "LIVE" pill + 3 mini KPI tiles overlay to make it read more like a dashboard.

## 3. New section: "From Complexity to Clarity in Three Steps"
- New component `src/components/home/three-steps.tsx` inserted between Hero and the existing TransformationCanvas.
- Three numbered cards (01 Process Auditing, 02 Custom Architecture, 03 Automation & Dashboards) with icons (lucide: Search, Boxes, LineChart), connecting line on desktop, stacked on mobile.

## 4. New section: "Industry Matrix" (replace text-only table with rich cards)
- New component `src/components/home/industry-matrix.tsx` placed before the existing IndustryBlueprint.
- Five expandable cards (Pharma, Education, Enterprise/Holding, Government, Logistics) each with: what we replace, the reimagined solution, business value — full copy from brief.
- Each card gets a generated sector "mini dashboard" SVG illustration (pure inline SVG using design tokens — no external images, since none were actually attached to the message).

## 5. New section: "Featured Solutions Suite"
- New component `src/components/home/solutions-suite.tsx` after the matrix.
- Three feature blocks (ERP, School Management, Automated Operations & Data Pipelines) with key-feature bullet lists from the brief.
- Also surface the same component on `/solutions` route to enrich that page.

## 6. New section: "Built for Growth, Backed by Performance"
- New component `src/components/home/growth-promise.tsx` before Architects.
- Pull quote ("Systems Reimagined isn't just our tagline…") + 3 trust pillars (Intuitive Visual UX, Bulletproof Data Security, Actionable Business Intelligence).

## 7. Lead-capture form upgrade (`src/components/home/audit-form.tsx`)
- Convert step 3 to a single consolidated form matching the brief:
  - Full Name
  - Company Name / Industry (one combined field, free text)
  - Corporate Email
  - **Dropdown** "Main operational bottleneck": Spreadsheets / Paperwork / Disconnected Apps / Other
  - **Dropdown** "How can we help?": Build custom ERP / School Management / Automation pipeline / Industry-specific platform / Not sure — please advise
  - Optional message textarea
- Keep step 1 (current engine) + step 2 (metric to optimize) as the "guided" intro; add a new copy block above the form: "stop paying monthly SaaS fees — own a custom in-house system."
- Update Zod schema accordingly; keep frontend-only submission (success toast) per current scope.
- New header text "Ready to Eliminate Operational Chaos?" + button label "Request Free Systems Audit".

## 8. Mobile typography reduction (≈ 1/3 smaller on small screens)
- Single source of truth in `src/styles.css`: add a `@media (max-width: 640px)` block that scales root `font-size` and overrides Tailwind heading utility sizes (`h1, h2, h3, .font-display`, etc.) to ~66 % of current. This avoids editing every component.
- Verify hero/section headlines still read well; tighten line-height to compensate.

## 9. SEO / meta touch-ups
- Update `src/routes/index.tsx` `head()` description + keywords meta to include: Custom Software Development Africa, Process Automation Solutions Zambia, ERP Software, School Management Systems, Digital Transformation Services, Corporate Dashboard Systems, Business Intelligence Integration, Spreadsheet Automation Solutions.
- No new routes; canonical stays on leaves only.

## Note on images
Your message references "attached images / image designs I had in mind" but no image files actually came through — only Pinterest search descriptions. I'll generate clean inline-SVG sector illustrations + dashboard mockups using the brand palette so the look stays unified. If you'd rather I generate raster hero/sector images with the image generator (or you re-upload yours), say the word and I'll add that as a follow-up step.

## Out of scope (this round)
- Real form submission backend (still toast-only — Lovable Cloud wiring is the recommended next step after this).
- New routes; this is homepage + `/solutions` content enrichment only.
