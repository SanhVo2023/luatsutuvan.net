# Builder Brief — luatsutuvan.net

**Site**: luatsutuvan.net — Primary Consultation Intake Hub (Phase 2)
**Language**: Vietnamese only (no EN locale)
**Supabase project**: `zxmdegfnjbvytjnwfhfq` (Project 2 — Apolo Funnel Sites, Singapore region `ap-southeast-1`)
**Schema**: `ltn` — set in `payload.config.ts` `postgresAdapter({ schemaName: 'ltn' })`. **NOT** `tablePrefix` (schema-based separation per Phase 1 reality)
**Audience**: Vietnamese consumers ready (or close to ready) to book a legal consultation. Traffic from Google Ads, organic search, and other ecosystem sites (especially luatsutructuyen.net).

## Role in ecosystem
**THE primary lead capture site.** Every page is a landing page; every section drives toward form submission, phone call, or Zalo message. This is the conversion engine — content exists only to build trust enough to trigger action.

This site is NOT for content depth — that's luatsutuvan.org and luatsutructuyen.net. **Bias toward speed and clarity over comprehensive education.**

## Reading order (do not skip)
1. `./PRD.md` — design direction "Legal Urgent Care", funnel mechanics, CTAs
2. `./CLAUDE.md` — coding conventions
3. `../../shared-assets/BUILDER_AGENT_BRIEF.md` — Standing Authorizations + Design Vocabulary + Image Generation workflow (NEW: self-serve image gen with 50-gen soft cap)
4. `../../shared-assets/PAYLOAD_SETUP_SPEC.md` — canonical Payload config (Session Pooler, schema-based, `@next/env` patch)
5. `../../shared-assets/SUPABASE_CONFIG.md` — your project ref + connection. Use schema-based separation (the table-prefix table in this doc is stale).
6. `../../shared-assets/SITE_BUILD_CHECKLIST.md` — 7-phase build order
7. `../../shared-assets/SITE_BUILD_FEEDBACK.md` — known pitfalls
8. `../../shared-assets/LEXICAL_FORMAT_REFERENCE.md` — for any richText content
9. `../../shared-assets/CONTENT_GENERATION_GUIDE.md` — § Quality Rubric (NEW): even a conversion site has a content quality bar; landing-page copy still needs structure and proof points
10. `../../shared-assets/r2-shared/MANIFEST.md` — reusable assets (check BEFORE generating)
11. `../../shared-assets/design-patterns/README.md` — animation library + icons
12. `./design-refs/` (if present) — hero / form mocks. Match exactly.

## Pre-built scaffold
None. Fresh Next.js project. Follow SITE_BUILD_CHECKLIST.md phase 1.

## Immediate priorities (in order)
1. Initialize Next.js + PayloadCMS scaffold per PAYLOAD_SETUP_SPEC.md §1:
   - `dns.setDefaultResultOrder('ipv4first')`
   - `schemaName: 'ltn'`
   - Lexical editor with full features list
   - Boot-time env guards
   - Apply `@next/env` patch via `patch-package` (see PAYLOAD_SETUP_SPEC.md §7.1)
2. **Pre-flight** before first migrate: PM_INBOX request — confirm no `ltn` schema exists on `zxmdegfnjbvytjnwfhfq` yet.
3. After PM confirms, `npx payload migrate`.
4. Collections per PRD: practice-area landing data, FAQ items, testimonials, contact submissions, lead-magnet PDFs (if any).
5. Build the conversion machine: hero with prominent form, sticky phone CTA, Zalo float (Vietnamese audience appropriate), trust strip, practice-area cards, lawyer credentials, testimonials, FAQ, footer with contact.
6. Lead capture: optimized form on /lien-he + every practice-area landing. Submissions go to local Payload `contact-submissions` AND mirror to `CONTACT_HUB_URL`.
7. Limited but high-quality content: 30-50 SEO landing pages (one per practice-area variant), each at the Quality Rubric bar (2,500-4,000 words). NOT 100 articles — this site's content load is lighter than other Phase 2 sites because it's conversion-first.
8. Image pipeline — reuse from r2-shared/MANIFEST.md heavily; this site doesn't need custom imagery beyond the hero.

## Design direction
"Legal Urgent Care" — combines the urgency of an emergency hotline with the professionalism of a top-tier law firm. Trust Green primary (`#0D9F6E`) for primary actions/phone CTAs. See PRD §2 for full palette, typography, layout patterns.

**Design vocabulary** (mandatory minimums):
- `ScrollReveal` on every section heading
- `StaggerReveal` on practice-area card grid + testimonials
- `MagneticButton` on the **single primary hero CTA** (one per page max)
- `HoverZoom` on practice-area thumbnails
- 4+ patterns total from `shared-assets/design-patterns/animations/`
- Icons via `lucide-react` (Phone, MessageCircle, Calendar, Shield, Scale, etc.) — SVG, NOT raster

## Content quality bar
Even though this is conversion-focused, content meets CONTENT_GENERATION_GUIDE.md § Quality Rubric:
- **2,500-4,000 words** for practice-area landing pages and FAQ-anchor pages
- **5+ inline statutory citations** per main page
- Structured H2/H3
- CTA in every section, but the content between CTAs is substantive (proof of expertise, not filler)

## Image workflow
**Self-serve, soft cap at 50 generations / ~$5 budget.**
- This site needs **less** custom imagery than others. Lean heavily on r2-shared/MANIFEST.md (practice-area icons, decorative accents, backgrounds).
- Site-specific: 1 hero image (the "Urgent Care" feel), maybe 2-3 conversion-focused shots (lawyer answering phone, document signing — likely already in r2-shared).
- Icons are SVG via `lucide-react`. No raster icons.
- **Need raster transparency** for the hero foreground (e.g. lawyer-on-phone cut-out over a colored backdrop)? Toggle `transparent: true` on the entry — image-generator-ui chroma-keys it server-side. See `../../shared-assets/IMAGE_MANIFEST_SCHEMA.md § Transparent Backgrounds`. Do NOT prompt "transparent PNG" directly — Nano Banana 2 fakes that as solid white.

## Contact strategy
**AGGRESSIVE** (different from other sites). Vietnamese audience.
- Sticky phone CTA always visible
- Zalo OA float (Vietnamese-appropriate channel)
- WhatsApp button
- Multiple form entry points (hero, every practice-area page, footer)
- Quick-call CTA in mobile sticky footer
- Form submissions mirror to `CONTACT_HUB_URL` per CONTACT_VI.md § Form Submission Endpoint

This is the only Phase 2 site that uses the AGGRESSIVE contact pattern (Zalo float etc.); the other two are MODERATE.

## Internal linking
- **Receives traffic from**: luatsutructuyen.net (scenario articles → consultation), luatsutuvan.org (trust content → conversion), Google Ads campaigns
- **Sends traffic to**: practice-area sites (luatsudansu.vn etc.) for deeper specialization, vothienhien.com for Managing Partner credibility
- **Sister site**: luatsutuvan.org (mutual cross-links — they answer different stages of the same buyer journey)

## Name / terminology rules
Same as other VN sites: "Luật sư Võ Thiện Hiển", "Luật sư" not "luật gia". F-009 consistency rule applies.

## Exit criteria
Standard 8-task checklist + CONVERSION-SPECIFIC additions:
- Form submission flow tested end-to-end (Payload write + GAS hub mirror)
- Phone CTA dial works on mobile (`tel:+84903419479` link tested)
- Zalo OA link working (`https://zalo.me/apololawyers`)
- Lighthouse score ≥ 90 on conversion-critical pages

## Status reporting
PM_INBOX.md after each milestone. The inbox-watcher hook surfaces updates to the PM session automatically.
