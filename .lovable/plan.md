## Afri Tech Systems Limited — Website Plan

A high-end, SEO-rich corporate site with the brand's teal/cyan + deep slate palette (from the logo), N8N-inspired dark aesthetic with smooth dark→light theme toggle, and interactive sections that feel like an operating system for enterprise transformation.

### Brand & Theme
- **Primary palette** (from logo): deep slate `#0F1B2D`, brand teal `#2DD4BF` / cyan `#22D3EE`, emerald accent `#10B981`, neutral slate text
- **Default mode**: dark (N8N-style gradient backgrounds with subtle grid + glow). Light mode toggleable via header switch, persisted in localStorage
- All colors as semantic tokens in `src/styles.css` (oklch); no hardcoded colors in components
- Typography: Space Grotesk (headings) + Inter (body)
- Glassmorphism nav (sticky, blurred), hardware-accelerated transitions

### Site Structure (TanStack Router file-based routes)
```
/                  Home (all 6 hero sections from brief)
/solutions         Deep dive: ERP, School Management, Industrial Logistics
/industries        Expanded industry matrix with schematics
/about             Company story + PACRA registration + Mwando & Julius
/integrations     Automation stack logos (n8n, Zapier, Make, Supabase, etc.)
/contact           Full "Initiate Digital Audit" lead form
/sitemap.xml       Dynamic sitemap server route
```
Each route gets its own `head()` with unique title, description, og:title, og:description. `robots.txt` + JSON-LD Organization on root.

### Home Page Sections
1. **Hero** — "Systems Reimagined" H1, subtitle, dual CTAs. Right side: animated SVG showing legacy Excel grid morphing into glowing data packets flowing to a cloud node (pure CSS/SVG, hardware accelerated)
2. **Transformation Canvas** — Tabbed Before/Bottleneck vs After/Automaton with animated metric counters and color shift (red→green)
3. **Core Engine Showcase** — Mock dashboard with left sidebar (ERP / School Mgmt / Industrial Logistics), main panel with animated SVG KPI charts (Tasks Liquidated, Efficiency, Visibility, Uptime)
4. **Industry Blueprint** — Click-to-expand cards (Pharma, Public Sector, Logistics, Manufacturing, Academia) each revealing a micro-schematic data-flow SVG
5. **Integrations Marquee** — Auto-scrolling logo strip of automation tools (n8n, Zapier, Make, Supabase, PostgreSQL, Slack, Microsoft 365, Jira, Google Workspace, WhatsApp Business, Twilio, Stripe) — like the Lovable/N8N integrations section
6. **Architects** — Cards for Mwando Hamwenda (CTO) and Julius Masiwa (CFO) with focus descriptions; PACRA Lusaka footnote
7. **Initiate Digital Audit** — Multi-step form: current engine → metric to optimize → name/email/phone, with validation + focus animations
8. **Footer** — Contact (enquiry@afritechsystemsltd.com, +260 969071139, +260 973655569), Lusaka HQ, Pan-African reach, nav, social, sitemap link

### Theme Toggle
- Sun/moon icon in nav, class-based on `<html>`, no flash on load (ScriptOnce pre-hydration)

### SEO
- Per-route `head()` with keyword-dense titles/descriptions ("Enterprise Automation Zambia", "Custom ERP Africa", "School Management Platform Pan-Africa", "Industrial Digitization", etc.)
- Semantic HTML throughout (header/main/section/article/footer)
- JSON-LD Organization (root) + LocalBusiness/ContactPoint on contact
- Dynamic `/sitemap.xml` server route, `public/robots.txt`
- Relative canonicals (domain to be wired when deployed); og:url uses afritechsystemsltd.com once confirmed

### Technical Details
- TanStack Start with file-based routes under `src/routes/`
- Logo copied to `src/assets/afritech-logo.png`
- Shared `<SiteHeader>` (glass nav + theme toggle) and `<SiteFooter>` in `__root.tsx`
- Form is frontend-only (no backend yet) — submissions trigger a success toast; Lovable Cloud can be enabled later for persistence/email
- All interactive sections use Tailwind transitions + transform/opacity (GPU accelerated)
- Mobile-first responsive, all sections collapse gracefully

### Out of Scope (can add later)
- Actual form submission backend (needs Lovable Cloud + email integration)
- Real OG image generation
- Blog/case studies CMS

Once you approve, I'll build everything in one pass.