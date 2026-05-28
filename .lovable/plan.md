
## Goals

Make the site readable on every device, replace the tiny logo+text lockup with the official logo at a confident size, simplify language, add social proof and social links, ship a navigation that feels premium on desktop and mobile, and make sure the whole thing indexes cleanly on Vercel.

## 1. Logos & assets

- Copy `user-uploads://Official_Logo.png` → `src/assets/afritech-logo-full.png` (use as the primary logo on light backgrounds — header, footer, hero, contact).
- Copy `user-uploads://image.png` → `src/assets/afritech-logo-dark.png` (use on dark backgrounds / dark mode).
- Copy the four social icons into `src/assets/social/` (linkedin, facebook, instagram, x).
- Header/footer logo swaps automatically based on `.dark` class.
- Remove the inline "Afri**TECH** Systems" wordmark beside the logo — logo only, sized `h-12 md:h-14` in header, `h-16` in footer, with proper alt text. The official logo already contains the wordmark, so it stays readable.

## 2. Mobile typography reset

- Remove the aggressive 1/3 scale-down in `src/styles.css` (`@media (max-width: 640px)` block).
- Replace with a tasteful responsive scale: base `16px`, headings via Tailwind responsive classes (`text-3xl sm:text-4xl lg:text-6xl`).
- Audit each section component and add `sm:` / `lg:` breakpoints so text fits naturally on 360–414px screens without forced overrides.

## 3. Navigation (desktop + mobile)

- New "floating" header: detached card look — `mx-4 mt-4 rounded-2xl border shadow-xl backdrop-blur` with subtle inner highlight for a 3D feel; sticky on scroll.
- Desktop: replace flat links with shadcn `NavigationMenu` so Solutions / Industries / Integrations open rich dropdowns listing sub-items with icons + one-line descriptions.
- Mobile: replace the current toggle with a shadcn `Sheet` (slide-in drawer) using `Accordion` for the same dropdown groups, large tap targets, icons, and a prominent "Start Free Audit" CTA at the bottom.

## 4. Footer redesign

- Compact horizontal layout: a single row on desktop (logo + short tagline | quick links | contact | social), one stacked block on mobile.
- Remove the long paragraph and PACRA sentence (move PACRA to About page).
- Add social icons row (LinkedIn live, others rendered but `aria-disabled` + tooltip "Coming soon").
- Update address to: *Plot No. 1907, MJ Zulu Street, Ibex Hill, Lusaka, Lusaka Province, Zambia*.

## 5. Multi-step audit form

- Convert `src/components/home/audit-form.tsx` into a 3-step wizard (shadcn `Dialog` + progress bar):
  1. **Quick intro** (skippable): industry, company size — dropdowns.
  2. **What do you need help with** (skippable): checkboxes (ERP, School Mgmt, Automation, Dashboards, Other).
  3. **Contact details** (required): name, company, email, phone, optional message.
- "Skip" button on steps 1–2; "Submit" on step 3. Persist values in local state; show summary before submit.

## 6. Testimonials / case studies section

- New `src/components/home/case-studies.tsx` with 3 generated visuals + short story cards:
  - "Regional Pharma Distributor — manual stock sheets → live ERP, 38% faster fulfilment."
  - "Private School Group — paper records → parent portal, 12k learners onboarded."
  - "Logistics SME — WhatsApp dispatch → automated routing dashboard."
- Generate 3 images via `imagegen` (warehouse dashboard, school portal, logistics map) saved to `src/assets/cases/`.
- Insert between Solutions Suite and Growth Promise on the homepage.

## 7. Plain language pass

- Rewrite copy across home sections, page heroes, and About to use simple words (e.g., "Custom Architecture" → "Built for your business", "Pan-African enterprises" → "Businesses across Africa").
- Replace the "Mwando & Julius" bios in `src/components/home/architects.tsx` (and About page) with a single "Our Team" block emphasising a multi-disciplinary engineering team — no individual names.

## 8. Icons & generated imagery

- Add `lucide-react` icons to every feature/industry/service card (most already have some — fill the gaps).
- Generate hero supporting illustration + one image per industry block (5 images) and one for Contact page header.

## 9. Hero & dashboard animations

- Polish the hero visualizer: cleaner KPI tiles, smoother flow lines, clearer labels ("Orders", "Stock", "Revenue" instead of jargon).
- Add subtle entrance animation (`animate-fade-in`) and a looping "live data" pulse that's easier to parse.

## 10. Contact page

- Redesign as a 2-column desktop layout (info card + form) that collapses to stacked on mobile.
- Info card: address, phones, email, social row, embedded Google Maps iframe for Ibex Hill plot.
- CTAs: "Book a Free Audit" (primary) + "WhatsApp Us" (secondary with `wa.me` link to first phone).

## 11. CTAs across the site

- Add a clear primary CTA at the end of every major section (Hero, Solutions, Industries, Case Studies, Growth Promise): "Start your free audit" → opens the wizard.
- Sticky mobile bottom CTA bar on the homepage.

## 12. SEO & Vercel readiness

- Confirm `public/robots.txt` allows all and references `/sitemap.xml`.
- Sitemap stays as the existing TanStack server route; add the new routes if any.
- Add per-route `head()` titles/descriptions for any page missing one; keep canonical on leaves only.
- Add a `vercel.json` with SPA fallback + cache headers for `/assets/*`, and document the build command (`bun run build`) and output directory in the plan notes. TanStack Start on Vercel: use the `vercel` preset in `vite.config.ts` if not already set.
- Add JSON-LD `LocalBusiness` schema with the new address on the Contact page and `Organization` on root.

## 13. Social links

- LinkedIn: `https://www.linkedin.com/company/afritechsystemsltd/`
- Facebook / Instagram / X: render icons with `aria-disabled`, tooltip "Coming soon", `href="#"` + `onClick` prevented.

## Technical notes

- Files touched: `site-header.tsx`, `site-footer.tsx`, `theme-toggle.tsx` (logo swap), `styles.css` (mobile scale), `audit-form.tsx` (wizard), `architects.tsx`, `hero.tsx`, `home/*` text passes, `routes/contact.tsx`, `routes/about.tsx`, `lib/site.ts` (address + socials).
- New files: `src/components/home/case-studies.tsx`, `src/components/social-links.tsx`, `vercel.json`, assets under `src/assets/social/` and `src/assets/cases/`.
- Uses existing shadcn components: `navigation-menu`, `sheet`, `accordion`, `dialog`, `progress`, `tooltip`.
- No backend changes; the wizard submits via the existing toast confirmation. (We can wire it to Lovable Cloud later if you want real lead capture.)

## Out of scope (ask if you want these)

- Persisting form submissions to a database / email notifications.
- Building an authenticated admin dashboard to view leads.
- A blog / case-study CMS.
