# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site is

`luatsutuvan.net` — the **PRIMARY lead-capture / intake hub** of the Apolo Vietnamese funnel. VN-only. Its whole job is to take search/Ads traffic, answer an intake-intent question, and convert the visitor into a lead that gets routed to the right practice-area site.

**Architecture reality (read this first — it contradicts the workspace `CLAUDE_TEMPLATE`):** this is a **thin Next.js frontend with NO PayloadCMS, NO database, NO `pg` pool**. `package.json` has zero Payload/Supabase/sharp deps. Do not "regenerate Payload types", "run `npx payload migrate`", or look for collections — none exist here. The stale legacy CLAUDE.md (and the generic per-site template) described an embedded-Payload site; that is not what this is.

There are **two content/data planes**, and only the local one is live:

1. **Live: hardcoded content in `src/content/*`.** Every public page renders from local TypeScript/JSON modules, not from a CMS. This is the source of truth for what ships today.
2. **Dormant: `cms/hub-client.ts`** is a complete, typed HTTP client for the central Content Hub (per `cms/API_CONTRACT.md`). It is **not imported anywhere in `src/`** — it's scaffolding for the eventual migration to the hub model. Don't assume pages fetch from the hub; grep before believing it. If you wire it in, that's a real architecture change — confirm intent first.

Leads have **no local persistence either**: `src/app/api/contact/route.ts` mirrors every submission to a Google Apps Script web app (`CONTACT_HUB_URL`), which writes to the shared "Apolo Contact Submissions" sheet. That sheet is the canonical lead store.

## Commands

```bash
npm install
npm run dev      # Next.js dev on port 3401 (NOT 3000)
npm run build
npm run start    # serves on port 3401
npm run lint     # next lint
```

No test framework is configured. Not a git repository. There are no `payload`/`migrate`/`generate:types`/`seed` scripts despite what older docs imply — `package.json` `scripts` is the authoritative list.

## Content model (the live one)

All under `src/content/`:

- **`seo-articles.ts` + `seo-articles-extra.json`** — ~42 intake-intent SEO pages served at `/noi-dung-tu-van/[slug]`. Bodies are **markdown** (rendered via `src/components/Markdown.tsx` / react-markdown + remark-gfm). ~800–1,200 words each (conversion-focused, NOT the 2,500-word authority rubric). `.slugs_all.json` is the flat slug list. To add an article, append a `SeoArticle` to the array — the dynamic route + sitemap pick it up automatically.
- **`lp-pages.ts`** — Google Ads landing pages served at `/lp/[slug]`. These are **noindex** (enforced in both `robots.ts` disallow `/lp/` AND `pageMeta({ noindex: true })`). Conversion-only, distinct layout (`src/app/lp/layout.tsx`).
- **`practice-content.ts`** — per-practice-area landing copy (hero, why-act bullets, situations, FAQs) for `/tu-van-theo-linh-vuc/[area]`.
- **`faqs.ts`** — shared FAQ items (typed `FaqItem` from `components/FaqAccordion`), surfaced with FAQPage JSON-LD.

## Config layering — never hardcode company facts

- `src/config/apolo.ts` — canonical, shared company facts (legal name, addresses, office phones, parent-brand URLs) for VN + EN.
- `src/config/site.ts` — layers this site's specifics on top: the call-center number (`PHONE_DISPLAY`/`PHONE_TEL`), Zalo/WhatsApp URLs, response-time `GUARANTEES`, `URGENCY_OPTIONS`, `NAV_LINKS`, shared R2 `IMAGES`, and the **`PRACTICE_AREAS` routing table**.

Everything user-facing pulls phone/address/brand from `SITE` (in `site.ts`) — **never inline a phone number or address in a component.**

`PRACTICE_AREAS` is the spine of the site: it drives the homepage grid, the 8 `/tu-van-theo-linh-vuc/[area]` pages, and form pre-selection. Each entry's `routingUrl` is the dedicated practice-area site a qualified lead is routed to (e.g. `ly-hon` → `luatsulyhon.vn`). Lead routing = these URLs.

## Lead flow (no DB)

`submitLead()` (`src/lib/leads.ts`, client) → `POST /api/contact` (route, server) → fire-and-forget mirror to `CONTACT_HUB_URL` (GAS). The route does server-side validation (name ≥2, VN phone regex, question ≥5) and **always returns success to the user even if the GAS mirror fails** — never block the lead on a mirror error. `collectAttribution()` reads UTM params + referrer + landing path from the browser so attribution survives into the sheet. Forms live in `src/components/forms/` (QuickForm, ConsultForm, BookingForm + SuccessState).

## SEO conventions (enforced on every page)

- Use `pageMeta({ title, description, path, noindex?, image? })` from `src/lib/seo.ts` for metadata — it sets self-canonical + OG automatically. Set `noindex: true` for `/lp/*` and `/cam-on`.
- Every page renders a `<JsonLd>` node. `legalServiceLd()` (LegalService+LocalBusiness) is on the root layout; pages add BreadcrumbList and FAQPage where relevant. Builders in `src/lib/seo.ts`.
- `robots.ts` explicitly allows AI crawlers (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Claude-Web, Google-Extended) and disallows `/lp/`, `/cam-on`, `/api/`.
- `sitemap.ts` is generated from the local content modules (not a CMS).

## Images

All images are served from the shared **R2 CDN** (`pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev`), reusing assets from the `vothienhien.com/*` library rather than generating new ones. `next.config.ts` `images.remotePatterns` whitelists **only** that host — any new image host must be added there. `next.config.ts` calls `dns.setDefaultResultOrder('ipv4first')` at the top (ecosystem convention); keep it.

## UI / styling

- Tailwind v4 (config-less, via `@tailwindcss/postcss`) + `@tailwindcss/typography`. No CSS modules, no styled-components. Theme color `#0D9F6E` (trust green); brand token classes like `bg-trust` are defined in `globals.css`.
- Font: `Be_Vietnam_Pro` via `next/font/google` (Vietnamese subset) — `--font-be-vietnam`.
- Animations: GSAP (scroll) + Framer Motion (UI). Reusable wrappers in `src/components/animations/` (ScrollReveal, ParallaxSection, TiltCard, MagneticButton, GradientOrbs, etc.). `MotionConfig reducedMotion="user"` is set at the root.
- `SiteChrome` (Header/Footer/FloatingActions) wraps all routes in the root layout. Server Components by default; mark `'use client'` only where interactivity/motion needs it.

## Routes (VN slugs)

Public, indexed: `/` · `/tu-van-theo-linh-vuc` (+ `/[area]`) · `/noi-dung-tu-van` (+ `/[slug]`) · `/quy-trinh-tiep-nhan` · `/cau-hoi-thuong-gap` · `/gui-cau-hoi` · `/dat-lich-tu-van` · `/lien-he` · `/chinh-sach-bao-mat` · `/dieu-khoan-su-dung`.
Not indexed: `/lp/[slug]` (Ads) · `/cam-on` (post-submit thank-you).

## Ecosystem rules that apply here

- VN-only site → links only to the VN parent brand (`apolo.com.vn`) and to the 8 practice-area conversion sites via `PRACTICE_AREAS[].routingUrl`. Do not link to the EN parent brand.
- Citations must come only from `*.gov.vn` or `vbpl.vn` hosts.
- Contact strategy is **MAXIMUM**: phone, Zalo, WhatsApp (optional), form, and floating action buttons all present.

## Reference docs in this folder

- `PRD.md` — full requirements, design direction, content plan (section numbers like "PRD §3/§5/§7" are referenced throughout the code).
- `BUILDER_BRIEF.md` — kickoff brief.
- `cms/API_CONTRACT.md` + `cms/CMS_INTEGRATION.md` — the hub contract the dormant `hub-client.ts` targets; relevant only if/when this site is migrated onto the central hub.
- `design-refs/` — Stitch hero/landing mockups.

The workspace root `../../../CLAUDE.md` governs cross-site/PM rules and the two-architecture split; when it disagrees with this file about *this* site's stack, this file wins (it reflects the shipped code).
