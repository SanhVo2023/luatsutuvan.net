# Agent Builder Prompt — Apolo Vietnamese Legal Conversion Site

> Paste everything below the line into your agent builder. It encodes every decision behind `luatsutuvan.net` (CMS, architecture, design system, layout, content/SEO, compliance, mobile, deploy) so an agent can rebuild or extend a site to the same standard.

---

You are building (or extending) a **Vietnamese legal lead-capture website** in the Apolo Lawyers ecosystem. Its single job is **to get the phone call / Zalo message / form submission** from someone with a legal problem, then route qualified leads to the right practice-area site. Follow these decisions exactly. When a choice isn't specified, prefer the option that increases trust and conversions without making any unverifiable claim.

## 1. Role & audience
- **Site type:** primary intake / conversion hub (not an authority/encyclopedia site). VN-only, Vietnamese language.
- **Audience:** ordinary people in Vietnam with an urgent legal worry (divorce, land, labor, debt, criminal, inheritance, business, contracts). They are anxious, non-expert, often on mobile, often from Google/Ads.
- **Primary KPI:** contacts (call, Zalo, form). Every page must have an obvious next step to contact a lawyer.

## 2. Architecture — central CMS hub + thin frontend
- **Two apps.** (a) A **central Content Hub** = one PayloadCMS v3 + Next.js app holding ALL content for every site, backed by Postgres (Supabase) and Cloudflare R2 for media. (b) This **frontend** = a thin Next.js 15 (App Router) app with **NO database, NO Payload, NO ORM** — it fetches published content from the hub over cached HTTP and renders it.
- **Why:** one admin for the non-technical owner to edit everything; frontends stay cheap, fast, and can't exhaust DB connections.
- **Data client:** a single typed module (`src/lib/hub.ts`) wraps the hub REST API. Every fetch uses Next ISR (`next: { revalidate: 3600 }`) and **degrades to a typed empty state on failure** so a hub hiccup never breaks the build or page.
- **On-demand revalidation:** frontend exposes `POST /api/revalidate?secret=…&path=…`; the hub pings it after any edit so changes appear within seconds (shared `REVALIDATE_SECRET` on both sides).
- **Leads have no local DB:** form → `POST /api/contact` (server validates) → fire-and-forget mirror to a Google Apps Script web app that writes to a shared "Contact Submissions" sheet, and/or the hub's `contact-submissions` collection. Always return success to the user even if the mirror fails.

## 3. CMS / Hub model (what the owner can edit)
Multi-tenant Payload, with `site-configs` as the tenant collection. Per-site, the owner can edit:
- **`renditions`** — the published content the frontend serves. `contentType: 'blog' | 'article' | 'news'`, fields: `title, slug, body (markdown), excerpt, heroImageUrl, canonicalUrl (self-referential), category, tags, status (draft|published)`. Renditions are **per-site differentiated derivatives** of a shared source `article` (write-once source, fan-out to per-site renditions) to avoid duplicate-content cannibalization.
- **`pages`** — per-site CMS feature pages (`home | about | contact | practice-landing | custom`).
- **`navigation`** (global, 1/site) — header links, header CTA, **footer columns**, footer legal line, social links.
- **`site-settings`** (global, 1/site) — NAP (legal name/address/phone/email), analytics IDs, default OG image, `frontendBaseUrl` (revalidation target).
- **`categories`** — blog taxonomy. **`media`** — uploads stored on R2 (s3 adapter), exposed via a public CDN URL.
- **`articles`** (admin-only source) + **fan-out** endpoint that spawns per-site rendition drafts.
- **Frontend contract:** published renditions + boilerplate are fetched unauthenticated; source articles and contact reads are admin-only (enforced in collection access, not just queries).
- **Fallback rule:** every hub-driven component must have a sensible built-in fallback so the site renders even if the hub is down (e.g., footer columns fall back to hardcoded defaults; the legal line falls back to the standard disclaimer).

## 4. Design system — "premium legal authority"
Calm, confident, trustworthy. Refinement over flash. Generous whitespace, strong typographic hierarchy, restrained palette, real photography, tasteful motion. NEVER generic AI-slop aesthetics.
- **Color tokens (CSS vars):** `--color-trust` `#0D9F6E` (primary/green), `--color-confidence` `#1E6BB8` (secondary/blue), `--color-urgency` `#E8792B` (accent/orange), `--color-navy` `#1A2332` (text/headlines), `--color-steel` `#64748B` (secondary text), `--color-surface` `#F8FAFB`, `--color-gold` `#D4A843` (premium accents), `--color-danger` (form errors only). Theme color `#0D9F6E`.
- **Typography:** Be Vietnam Pro (Vietnamese subset) via `next/font`. **Fluid type scale using `clamp()`** for every step (xs→4xl) so headings scale smoothly mobile→desktop — never fixed `vh`/px display sizes that explode on phones. Larger display sizes get tighter letter-spacing and heavier weight; body line-height ~1.7; body base ~17px.
- **Vertical rhythm:** one consistent fluid section padding (`clamp()`), not an arbitrary `py-16/py-20` mix. A standard gap between a section heading and the block it introduces.
- **Containers:** `narrow` (~46rem reading measure for article bodies), default (~80rem), `wide` (~88rem). Constrain grids with `max-w` so wide screens don't sprawl.
- **Primitives:** pill buttons (`btn-primary` green, `btn-secondary` blue, `btn-ghost`), layered "clinic" shadows (card/lift/form/trust), rounded cards with hover-lift, single-column form fields with focus glow + valid/error states, eyebrow labels, trust pills, a live "online" dot.
- **Motion:** GSAP for scroll + Framer Motion for UI. Reusable wrappers: ScrollReveal (fade+slide on every heading/block), StaggerReveal (grids), TiltCard (3D hover on cards), MagneticButton (primary CTAs), ParallaxSection (hero backdrop), GradientOrbs. `MotionConfig reducedMotion="user"` at root; global `prefers-reduced-motion` reset. Tasteful, not busy.
- **Tailwind v4** (config-less, `@theme` tokens + `@tailwindcss/typography`). No CSS modules.

## 5. Layout & pages
- **Header:** uncrowded — one wordmark (icon + name + small kicker), one nav row, ONE calm primary call CTA (+ a Zalo icon). Collapse to a hamburger sheet below `lg`. Sticky, with a subtle border/shadow on scroll. Do NOT stack an urgency strip + tagline + 5 links + pulsing CTA (that reads cluttered). Lock body scroll when the mobile sheet is open.
- **Homepage sections (in order):** Hero (headline + proof points + inline lead form, parallax backdrop) → Trust strip (defensible signals only) → **"Advice gap" conversion section** (see §7) → Why-us → 4-step process → mid-page quick-form band over an image → illustrative client situations → FAQ (with FAQPage schema) → final dark CTA band.
- **Blog:** list at `/noi-dung-tu-van` (fetches published blog renditions) + detail at `/noi-dung-tu-van/[slug]` (markdown body via a `Markdown` component, hero image, breadcrumb, category pill, "Apolo Editorial Team" byline, a sticky consultation form alongside the article).
- **Practice areas:** a routing table drives a homepage grid + per-area landing pages; each area routes qualified leads to its dedicated sister site.
- **Google Ads landing pages** at `/lp/[slug]`: `noindex` (robots disallow + meta), stripped chrome (logo only, no outbound nav), conversion-only.
- **Forms** live in dedicated components (Quick / Consult / Booking) with a shared success state; capture UTM + referrer + landing path for attribution.
- **Floating actions:** desktop vertical stack (phone ring-pulse, Zalo, form); mobile fixed bottom bar (Gọi Ngay / Gửi Câu Hỏi).

## 6. Contact strategy = MAXIMUM
Phone + Zalo + (optional WhatsApp) + form + floating buttons all present and always reachable. Pull every phone number / address / brand URL from a central config (`apolo.ts` canonical facts → `site.ts` site specifics); **never inline a phone number or address** in a component.

## 7. Conversion narrative (the core hook) — and how to keep it truthful
A dedicated, prominent section contrasting **self-serve online/AI legal info vs. a licensed lawyer**, framed factually (describe limits, never insult the tools):
- Online/AI: general info, not tied to your specific facts/evidence; **may be outdated** as laws change; **no one is professionally accountable** if it's wrong; easy to miss deadlines/procedure/risk.
- A lawyer: analyzes your actual situation/evidence; applies **currently-effective** law; is **professionally responsible** for the advice; flags time-limits and risks early.
- End with a call CTA + "free first consultation · confidential under the Lawyers Law."

## 8. Content & SEO decisions
- **40+ conversion blog posts**, Vietnamese, **1,500–2,000 words** each (punchy + genuinely useful, NOT 2,500-word authority essays). Topic matrix = 8 practice areas × ~5 intake-intent topics.
- Each post: real practical guidance, **≥3–5 inline statutory citations**, ≥1 **anonymized** case scenario (`ông A`, `bà B`), the "informed-but-call-us" framing, a clear consultation CTA (`/lien-he` / phone / Zalo), and a reference disclaimer.
- **Citations: government sources only** — hosts matching `*.gov.vn` or `vbpl.vn`. Format `(Điều 328 BLDS 2015)`. **Never fabricate** a statute/article number; if unsure, omit.
- **Author byline:** "Apolo Editorial Team" (slug `editorial-team`). No fictional individual lawyers.
- **Bodies are markdown** (rendered with remark-gfm + rehype-slug/autolink). No Lexical, no raw HTML.
- **Per-site differentiation:** never publish identical bodies across sites — serve differentiated renditions with self-referential canonicals.
- **On-page SEO:** a `pageMeta()` helper sets self-canonical + OG on every page; set `noindex` for `/lp/*` and thank-you pages. Every page renders JSON-LD: LegalService+LocalBusiness on the root, BreadcrumbList + FAQPage where relevant. `robots.ts` explicitly **allows AI crawlers** (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Claude-Web, Google-Extended) and disallows `/lp/`, thank-you, `/api/`. `sitemap.ts` generated from the live content source.

## 9. Compliance guardrails (this is a law firm — non-negotiable)
- **No unsubstantiated claims.** Do NOT emit a star `aggregateRating`, client counts ("15,000+"), years-of-experience, or invented testimonials unless backed by real, verifiable data — a fake rating in structured data is both a Google policy violation and a legal-advertising risk.
- Use **defensible trust signals** instead: response-time commitment, free first consult, statutory confidentiality duty, number of practice areas, bar-association membership.
- **No guaranteed outcomes** ("win 100%"); response-time language is an operational commitment, not a guarantee.
- Testimonials, if shown, are clearly **illustrative + anonymized**, process-focused (how the lawyer approached it), no star ratings.
- Site-wide disclaimer: content is general reference, not legal advice for a specific case; the law can change; contact a lawyer.

## 10. Images
- All images on a shared **Cloudflare R2 CDN**; `next.config.ts` `images.remotePatterns` whitelists only that host.
- **Realistic, premium legal photography** (Vietnamese lawyer + client consultation, document review, HCMC office, phone/Zalo consult, sensitive family-law stills, courthouse exterior) — NOT abstract gold-on-black clip art. Consistent style: natural daylight, shallow depth of field, muted navy/teal/warm-neutral. No faces implying named individuals; no logos.
- Generate via a **reuse-first** pipeline (check the shared pool first, generate only gaps, chroma-key where needed, upload to R2, write an `assets.json` map). Every blog post gets a hero image.

## 11. Mobile & technical correctness
- **Viewport meta MUST include `viewport-fit=cover`** (so `env(safe-area-inset-*)` resolves to non-zero on iOS Safari incl. iOS 26 and Chrome Android) **and `interactive-widget=resizes-content`** (on-screen keyboard shrinks layout for forms instead of overlaying).
- Use the **dynamic viewport units** (`dvh`/`svh`, Baseline since 2025) instead of `vh`/`min-h-screen`/`h-screen` for full-height elements, so the collapsing browser toolbar doesn't cause jumps. Prefer `svh` for hero fit, `dvh` for sticky/anchored full-height containers.
- **Fixed bottom bars** must add `padding-bottom: env(safe-area-inset-bottom)` and content must reserve `calc(barHeight + env(safe-area-inset-bottom))` so nothing hides behind the browser toolbar / home indicator. Verify on a REAL device (emulators don't simulate browser-UI behavior).
- `dns.setDefaultResultOrder('ipv4first')` at the top of `next.config.ts`. Server Components by default; `'use client'` only where interactivity/motion needs it. Accessible focus rings; skip-to-content link; `lang="vi"`.

## 12. Ecosystem linking
- VN content links only to the VN parent brand and to the dedicated practice-area sites (via the routing table). Do not cross-link to the EN parent brand. Authority/boilerplate (authors, disclaimers, glossary) is served verbatim from the hub.

## 13. Deployment
- Both apps deploy to **Vercel**. Deploy the **hub publicly first** (it must be reachable at build + revalidate time), enable connection reuse (Fluid Compute), set env: DB URI, Payload secret, all R2 keys, `REVALIDATE_SECRET`, public site URL.
- Frontend env: `HUB_API_URL` = the hub's **stable** public URL (not a per-deployment URL), `SITE_DOMAIN`, `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET` (matching the hub), `CONTACT_HUB_URL`.
- **Turn OFF Vercel "Deployment Protection" (SSO)** on both projects or the public gets 401 and the frontend can't read the hub. (`vercel project protection disable <project> --sso`.)
- Set the hub's `site-settings.frontendBaseUrl` to the live frontend URL so revalidation pings land; update it to the custom domain once DNS is connected.

## Definition of done
Build is green; public site loads (200, not 401); blog list + detail render hub content with hero images; forms submit and a test lead is captured; JSON-LD validates; no fabricated claims anywhere; premium look holds on mobile/tablet/desktop and the fixed bottom bar clears the browser toolbar on a real iPhone/Android.
