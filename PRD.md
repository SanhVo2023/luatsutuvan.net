# PRD: luatsutuvan.net

## Product Requirements Document

**Project**: luatsutuvan.net -- Primary Consultation Intake Hub
**Company**: CONG TY LUAT APOLO LAWYERS
**Managing Partner**: Luat su Vo Thien Hien (Henry Vo)
**Role in Ecosystem**: #1 Conversion site -- lead capture, consultation booking, Google Ads landing
**Language**: Vietnamese only
**Phase**: Phase 2
**Last Updated**: 2026-04-03

---

## 1. Project Overview

### Purpose

luatsutuvan.net is THE primary lead capture site in Apolo Lawyers' Vietnamese funnel. Its singular mission: convert visitors into consultation leads as fast as possible. Every pixel, every word, every interaction on this site exists to get a visitor to submit a question, book a consultation, or call the office.

This site receives traffic from Google Ads, organic search, and referrals from all other sites in the ecosystem (especially luatsutructuyen.net). It acts as the central intake hub, routing leads to the appropriate practice-area specialists within Apolo Lawyers.

Think of this site as a legal emergency room reception desk: fast triage, clear process, immediate action, and absolute trust.

### Key Differentiator

This is NOT a content site. It does NOT publish authority articles or in-depth legal knowledge. Every page is a landing page. Every section drives toward a form submission, phone call, or Zalo message. Content exists only to build enough trust to trigger action.

### Tech Stack

- Next.js 15 (App Router)
- PayloadCMS v3 (independent instance)
- Supabase PostgreSQL
- Tailwind CSS v4
- GSAP + Framer Motion for animations
- Nano Banana 2 for all non-logo images

### Success Metrics

- Lead submission rate: target 8-15% of all visitors
- Form completion rate: target 65%+
- Phone call click rate: target 5%+ on mobile
- Average time to first interaction: target < 15 seconds
- Google Ads Quality Score: target 8+
- Cost per lead: target reduction of 30% vs. generic landing pages
- 100 indexed SEO content pages within 6 months

---

## 2. Design Direction

### Concept: "Legal Urgent Care"

The design evokes the urgency and trust of a premium medical clinic's intake system. Visitors should feel three things simultaneously: (1) "These people respond FAST," (2) "These people are TRUSTWORTHY," and (3) "I can get help RIGHT NOW." The site combines the immediacy of an emergency hotline with the professionalism of a top-tier law firm.

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary Action | Trust Green | #0D9F6E | Primary CTAs, phone buttons, success states |
| Secondary Action | Confidence Blue | #1E6BB8 | Secondary CTAs, links, form accents |
| Urgency | Bright Orange | #E8792B | Urgency badges, countdown timers, highlights |
| Background | Clean White | #FFFFFF | Page backgrounds |
| Surface | Cool Gray | #F8FAFB | Card backgrounds, form areas |
| Text Primary | Deep Navy | #1A2332 | Headlines, body text |
| Text Secondary | Steel Gray | #64748B | Captions, labels |
| Trust Accent | Gold | #D4A843 | Star ratings, badge accents, premium indicators |
| Alert | Safe Red | #DC3545 | Form errors only (never for marketing urgency) |

### Typography

- **Headlines**: Be Vietnam Pro (Bold/ExtraBold) -- maximum impact, Vietnamese-optimized
- **Body**: Be Vietnam Pro (Regular/Medium) -- clean readability
- **Phone Numbers**: Be Vietnam Pro (Bold, enlarged) -- phone numbers always visually prominent
- **CTA Text**: Be Vietnam Pro (SemiBold, uppercase on buttons)
- **Scale**: Base 18px (larger than typical for readability and trust), modular scale 1.333

### Layout Principles

1. **Above-the-Fold Dominance**: Every landing page shows a form or call button within the first viewport. No scrolling required to take action.
2. **F-Pattern Optimized**: Key trust elements (badges, phone numbers, response time) placed in the natural F-pattern reading path
3. **Whitespace as Trust**: Generous whitespace signals professionalism. No cluttered, desperate-looking layouts.
4. **Mobile-First, Thumb-Zone CTAs**: All primary action buttons fall within the natural thumb zone on mobile devices
5. **Single-Column Forms**: All forms are single-column, maximum 5 fields visible at once, with progressive disclosure for additional fields
6. **Social Proof Proximity**: Trust elements (reviews, badges, lawyer photos) placed adjacent to every form

### Motion & Interaction

- Hero section: Form slides in from right with a confident 0.3s ease-out (GSAP)
- Trust badges: Subtle shimmer animation on scroll-into-view (Framer Motion)
- Phone button: Persistent ring-pulse animation (CSS + GSAP, every 8 seconds)
- Form submission: Satisfying checkmark animation on success (Framer Motion)
- Floating buttons: Smooth slide-in from bottom on scroll (GSAP ScrollTrigger)
- Page transitions: Instant (no decorative transitions -- speed is trust)
- Micro-interactions: Form fields glow green on valid input, immediate validation feedback

### Mobile-First Conversion Design

- Sticky header with phone button (always visible)
- Full-width floating action bar at bottom: "Goi Ngay" + "Gui Cau Hoi"
- Click-to-call phone numbers everywhere
- Swipe-up form panel from floating bar
- Auto-focus first form field on page load (mobile)
- Smart keyboard triggers (tel for phone, email for email fields)
- Reduced form fields on mobile (name + phone + brief question only)

---

## 3. Sitemap & Page Structure

### Primary Navigation

```
/                               -- Homepage (Hero Form + Trust + Practice Area Routing)
/gui-cau-hoi/                   -- Question Submission (Dedicated Form Page)
/dat-lich-tu-van/               -- Book Consultation (Calendar + Form)
/tu-van-theo-linh-vuc/          -- Practice Area Directory
  /tu-van-ly-hon/               -- Divorce Consultation Landing
  /tu-van-dat-dai/              -- Land/Property Consultation Landing
  /tu-van-doanh-nghiep/         -- Business Consultation Landing
  /tu-van-dan-su/               -- Civil Consultation Landing
  /tu-van-hinh-su/              -- Criminal Consultation Landing
  /tu-van-lao-dong/             -- Labor Consultation Landing
  /tu-van-thua-ke/              -- Inheritance Consultation Landing
  /tu-van-hop-dong/             -- Contract Consultation Landing
/quy-trinh-tiep-nhan/          -- Intake Process (Trust-Building)
/faq-tu-van/                   -- FAQ (SEO + Trust)
/ve-chung-toi/                 -- About (Minimal, Links to Apolo main)
/lien-he/                      -- Contact (All Channels)
```

### Landing Pages for Google Ads (~40 pages)

```
/lp/tu-van-luat-su-online/             -- Generic legal consultation
/lp/hoi-luat-su-mien-phi/             -- Free consultation hook
/lp/dat-lich-luat-su-[city]/          -- City-specific (HCM, Hanoi, Da Nang, etc.)
/lp/tu-van-[practice-area]-gap/       -- Urgent practice-area specific
/lp/luat-su-gioi-[practice-area]/     -- "Best lawyer for [area]"
...and 30+ more practice/location combinations
```

### Practice Area Consultation Pages (8 pages)

Each practice area page includes:
- Hero with practice-area-specific headline + inline form
- "Cau hoi thuong gap ve [area]" section (3-5 FAQs)
- "Luat su chuyen mon" section (lawyer credentials, not bios)
- Process steps specific to that practice area
- Trust badges and response time guarantees
- Bottom CTA form (larger, more fields)
- Routing to ecosystem practice-area sites for deeper content

### SEO Content Pages (~45 pages)

Focused on intake-intent keywords:
- "Lam sao de gap luat su" type how-to articles
- "Chi phi tu van luat su" pricing transparency pages
- "Thu tuc [specific legal process]" procedure guides
- Each page is still conversion-optimized with embedded forms

### Utility Pages (7 pages)

```
/cam-on/                        -- Thank You (Post-Submission, with next steps)
/chinh-sach-bao-mat/            -- Privacy Policy
/dieu-khoan-su-dung/            -- Terms of Use
/sitemap.xml                    -- XML Sitemap
/robots.txt                     -- Robots
/404                            -- Custom 404 (with form and phone number)
/lien-he/                       -- Contact
```

### Total Page Count: ~100

- 1 Homepage
- 2 Core conversion pages (gui cau hoi + dat lich)
- 8 Practice area pages
- ~40 Google Ads landing pages
- ~45 SEO content pages
- 5 Utility pages

---

## 4. SEO Strategy

### Primary Keywords

| Keyword | Monthly Search Volume (est.) | Difficulty | Intent |
|---------|------------------------------|------------|--------|
| tu van luat su | 6,600 | High | Transactional |
| hoi luat su online | 3,200 | Medium | Transactional |
| dat lich luat su | 1,400 | Low | Transactional |
| gui cau hoi luat su | 900 | Low | Transactional |
| tu van phap luat mien phi | 4,800 | High | Transactional |
| luat su tu van nhanh | 1,100 | Medium | Transactional |
| tim luat su gioi | 2,200 | Medium | Navigational |
| chi phi tu van luat su | 1,800 | Low | Informational/Transactional |

### On-Page SEO Requirements

- **Title Tag Formula**: `[Action Keyword] -- Phan Hoi Trong 30 Phut | Luat Su Tu Van`
- **Meta Description Formula**: `[Action verb] voi luat su chuyen nghiep ngay hom nay. Phan hoi nhanh trong 30 phut. Mien phi tu van lan dau. Goi 0903 419 479.`
- **H1**: One per page, action-oriented with urgency
- **Schema Markup**: LocalBusiness, FAQPage, LegalService, BreadcrumbList
- **Phone Schema**: `tel:+84903419479` with click-to-call on all phone displays
- **Internal Links**: Every page links to /gui-cau-hoi/ and /dat-lich-tu-van/

### Technical SEO

- Server-side rendering for all pages (critical for Ads landing page speed)
- Prerendered Google Ads landing pages for instant load
- Core Web Vitals: LCP < 1.5s (aggressive target for conversion), FID < 50ms, CLS < 0.02
- AMP consideration for Ads landing pages (evaluate during implementation)
- Structured data for every practice area page
- Dynamic canonical URLs to prevent Ads parameter duplication
- robots.txt: block /lp/ pages from organic index (Ads-only pages)

### Google Ads Landing Page Optimization

- Dedicated /lp/ pages match ad copy exactly
- Message match: Ad headline = Landing page H1
- Single CTA per landing page (no navigation distractions)
- Ads landing pages: stripped header (logo + phone only), no footer navigation
- Form above fold on every Ads page
- Load time budget: < 1.2 seconds on 3G connection

---

## 5. Content Plan for 100 SEO Pages

### Page Type Distribution

| Type | Count | Purpose |
|------|-------|---------|
| Core Conversion Pages | 3 | Homepage, gui cau hoi, dat lich |
| Practice Area Landing | 8 | Consultation by legal area |
| Google Ads Landing | 40 | Paid traffic conversion |
| SEO Intake Content | 42 | Organic traffic capture for intake-intent queries |
| Utility | 7 | Legal, 404, thank-you, etc. |

### SEO Intake Content (42 Articles)

These are NOT knowledge articles. Each is a short (800-1,200 word), conversion-focused page targeting a specific intake-intent keyword. Structure:

```
1. Headline (keyword-rich, action-oriented)
2. Opening paragraph (empathy + urgency, 2-3 sentences)
3. Embedded mini-form (name + phone + brief question)
4. "Tai sao nen [action]" (3-4 trust-building bullet points)
5. Quick FAQ (3 questions, schema-marked)
6. Process steps (3-step visual guide)
7. Full consultation form
8. Phone/Zalo CTA block
```

### Sample Content Titles (20 of 42 SEO Pages)

1. Cach gui cau hoi cho luat su online mien phi
2. Dat lich tu van luat su tai TP.HCM -- Huong dan chi tiet
3. Chi phi tu van luat su la bao nhieu? Bang gia 2026
4. Tu van luat su ly hon -- Quy trinh va chi phi
5. Hoi luat su ve tranh chap dat dai -- Gui cau hoi ngay
6. Tim luat su gioi tai TP.HCM -- 5 tieu chi chon lua
7. Tu van luat doanh nghiep online -- Nhanh va chuyen nghiep
8. Khi nao can thue luat su? 10 tinh huong pho bien
9. Tu van luat lao dong cho nguoi lao dong -- Mien phi lan dau
10. Luat su tu van hop dong -- Kiem tra hop dong cua ban
11. Thu tuc ly hon don phuong -- Can chuan bi gi?
12. Tu van thua ke tai san -- Gui cau hoi cho luat su
13. Luat su hinh su -- Tu van khan cap 24/7
14. Dich vu tu van phap luat doanh nghiep tron goi
15. Hoi dap luat su -- Cac cau hoi thuong gap
16. Tu van tranh chap hop dong -- Phan hoi trong 30 phut
17. Luat su dai dien toa an -- Khi nao can va chi phi
18. Tu van luat dat dai -- So do, quy hoach, tranh chap
19. Dang ky doanh nghiep -- Tu van thu tuc moi nhat
20. Giai quyet tranh chap lao dong -- Huong dan tu A-Z

### Google Ads Landing Pages (40 Pages)

Organized by campaign structure:

**Brand Campaigns (5 pages)**
- /lp/apolo-lawyers-tu-van/
- /lp/luat-su-apolo/
- /lp/apolo-dat-lich/
- /lp/luat-su-henry-vo/
- /lp/cong-ty-luat-apolo/

**Practice Area Campaigns (16 pages)**
- /lp/tu-van-ly-hon-gap/
- /lp/tu-van-dat-dai-gap/
- /lp/tu-van-doanh-nghiep-gap/
- /lp/tu-van-lao-dong-gap/
- /lp/tu-van-hinh-su-gap/
- /lp/tu-van-hop-dong-gap/
- /lp/tu-van-thua-ke-gap/
- /lp/tu-van-dan-su-gap/
- And 8 more specific sub-practice variations

**Location Campaigns (10 pages)**
- /lp/luat-su-quan-1/
- /lp/luat-su-quan-3/
- /lp/luat-su-binh-thanh/
- /lp/luat-su-thu-duc/
- /lp/luat-su-phu-nhuan/
- And 5 more district-specific pages

**Intent Campaigns (9 pages)**
- /lp/hoi-luat-su-mien-phi/
- /lp/tu-van-luat-su-online/
- /lp/dat-lich-gap-luat-su/
- /lp/luat-su-gioi-nhat/
- /lp/tu-van-phap-luat-khan-cap/
- And 4 more high-intent variations

---

## 6. Contact Strategy

### Contact Level: MAXIMUM

This is the ecosystem's primary intake site. Every contact channel is deployed at maximum visibility. The site should feel like it has multiple open doors inviting visitors in.

### Contact Elements

| Element | Implementation | Priority | Placement |
|---------|---------------|----------|-----------|
| Phone Number (Click-to-Call) | Large, bold, always visible | CRITICAL | Header (sticky), floating bar, every page section |
| Zalo Chat | One-click Zalo open | CRITICAL | Floating button, footer, form alternative |
| Consultation Form | Multi-step smart form | CRITICAL | Homepage hero, dedicated page, every landing page |
| Quick Question Form | Minimal 3-field form | CRITICAL | Embedded in every content section |
| Floating Action Bar | Sticky bottom bar | CRITICAL | All pages (mobile and desktop) |
| WhatsApp | Optional secondary | LOW | Footer only |
| Email | contact@apolo.com.vn | MEDIUM | Footer, contact page |
| Office Address | With Google Maps embed | MEDIUM | Contact page, footer |

### Floating Action Bar Specification

```
Desktop:
- Fixed bottom-right corner
- Vertical stack: Phone (green), Zalo (blue), Form (navy)
- Each button: 56px circle with icon + tooltip on hover
- Pulse animation on phone button every 8 seconds

Mobile:
- Fixed bottom bar, full width
- Two buttons side by side: "Goi Ngay 0903 419 479" (green) | "Gui Cau Hoi" (blue)
- Height: 60px, thumb-friendly
- Slight shadow upward for elevation
- Appears after 2 seconds on page
```

### Response Time Guarantees (Displayed on Site)

- "Phan hoi trong 30 phut" badge on all forms
- "Luat su goi lai trong 1 gio" on phone CTA sections
- "Tu van mien phi lan dau" on all primary CTAs
- Time-based urgency: "Luat su dang online" indicator (live during business hours)

### Contact Information

- **Head Office**: 108 Tran Dinh Xu, TP.HCM
- **Branch**: K&M Tower, 33 Ung Van Khiem
- **Phone**: 0903 419 479
- **Email**: contact@apolo.com.vn
- **Zalo**: https://zalo.me/apololawyers

---

## 7. CMS Collections (PayloadCMS v3)

### Collection: Leads

```typescript
{
  slug: 'leads',
  admin: { useAsTitle: 'fullName' },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'question', type: 'textarea', required: true },
    { name: 'practiceArea', type: 'select', options: [
      'ly-hon', 'dat-dai', 'doanh-nghiep', 'dan-su', 'hinh-su', 'lao-dong', 'thua-ke', 'hop-dong', 'khac'
    ]},
    { name: 'urgency', type: 'select', options: ['normal', 'urgent', 'emergency'] },
    { name: 'source', type: 'text' },
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
    { name: 'utmContent', type: 'text' },
    { name: 'landingPage', type: 'text' },
    { name: 'status', type: 'select', options: ['new', 'contacted', 'qualified', 'converted', 'lost'], defaultValue: 'new' },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
    { name: 'notes', type: 'textarea' },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } }
  ]
}
```

### Collection: LandingPages

```typescript
{
  slug: 'landing-pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'pageType', type: 'select', options: ['ads-landing', 'seo-content', 'practice-area'], required: true },
    { name: 'heroHeadline', type: 'text', required: true },
    { name: 'heroSubheadline', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'formHeadline', type: 'text' },
    { name: 'formType', type: 'select', options: ['full', 'quick', 'booking'] },
    { name: 'trustBadges', type: 'array', fields: [
      { name: 'icon', type: 'upload', relationTo: 'media' },
      { name: 'text', type: 'text' }
    ]},
    { name: 'faqItems', type: 'array', fields: [
      { name: 'question', type: 'text' },
      { name: 'answer', type: 'richText' }
    ]},
    { name: 'processSteps', type: 'array', fields: [
      { name: 'stepNumber', type: 'number' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'icon', type: 'upload', relationTo: 'media' }
    ]},
    { name: 'bodyContent', type: 'richText' },
    { name: 'practiceArea', type: 'select', options: [
      'ly-hon', 'dat-dai', 'doanh-nghiep', 'dan-su', 'hinh-su', 'lao-dong', 'thua-ke', 'hop-dong', 'general'
    ]},
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'noIndex', type: 'checkbox', defaultValue: false },
    { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
    { name: 'publishedDate', type: 'date' }
  ]
}
```

### Collection: PracticeAreas

```typescript
{
  slug: 'practice-areas',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'consultationTypes', type: 'array', fields: [
      { name: 'type', type: 'text' },
      { name: 'description', type: 'textarea' }
    ]},
    { name: 'routingUrl', type: 'text' },
    { name: 'order', type: 'number' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' }
  ]
}
```

### Collection: Testimonials

```typescript
{
  slug: 'testimonials',
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'practiceArea', type: 'relationship', relationTo: 'practice-areas' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number' }
  ]
}
```

### Collection: Media

```typescript
{
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 200, height: 200 },
      { name: 'card', width: 600, height: 400 },
      { name: 'hero', width: 1600, height: 700 },
      { name: 'og', width: 1200, height: 630 },
      { name: 'badge', width: 120, height: 120 }
    ]
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'nanoBananaPrompt', type: 'textarea' }
  ]
}
```

### Global: SiteSettings

```typescript
{
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactEmail', type: 'text' },
    { name: 'zaloUrl', type: 'text' },
    { name: 'responseTimeMinutes', type: 'number', defaultValue: 30 },
    { name: 'isLawyerOnline', type: 'checkbox', defaultValue: false },
    { name: 'floatingBarEnabled', type: 'checkbox', defaultValue: true },
    { name: 'googleAdsId', type: 'text' },
    { name: 'analyticsId', type: 'text' },
    { name: 'facebookPixelId', type: 'text' },
    { name: 'footerText', type: 'richText' }
  ]
}
```

---

## 8. AI Image Asset List (Nano Banana 2 Prompts)

### Hero Images

1. **Homepage Hero**
   Prompt: `"Professional Vietnamese lawyer in modern office extending hand toward viewer, warm confident smile, clean modern office with green and blue accents, trust-building composition, bright natural lighting, professional photography style, shallow depth of field"`

2. **Question Submission Page Hero**
   Prompt: `"Close-up of hands typing on a smartphone with a chat bubble appearing above showing a legal question, clean modern aesthetic, green and blue color accents, professional and approachable mood, bright lighting"`

3. **Booking Page Hero**
   Prompt: `"Modern Vietnamese law office reception area with a welcoming receptionist, calendar visible on screen, clean bright interior with green plants, professional warm lighting, trust and accessibility feeling"`

### Practice Area Heroes (8 images)

4. **Divorce Consultation**
   Prompt: `"Compassionate Vietnamese lawyer consulting with a client in a private meeting room, warm but professional atmosphere, documents on table, green and blue interior accents, reassuring body language, professional photography"`

5. **Land/Property Consultation**
   Prompt: `"Vietnamese professional reviewing property documents and a land map at a modern desk, blueprints and certificates visible, natural lighting, green and blue office decor, authoritative but approachable"`

6. **Business Consultation**
   Prompt: `"Vietnamese lawyer and business owner shaking hands in a modern conference room, contract documents on table, corporate professional atmosphere, green and blue accents, confident mood"`

7. **Civil Consultation**
   Prompt: `"Vietnamese lawyer listening attentively to a client explaining their situation, empathetic body language, modern office setting, warm natural lighting, trust-building composition, green accents"`

8. **Criminal Consultation**
   Prompt: `"Serious but reassuring Vietnamese lawyer at desk with legal code books, scales of justice visible, strong confident pose, dark navy and deep green atmosphere, professional urgency"`

9. **Labor Consultation**
   Prompt: `"Vietnamese professional helping a worker review employment documents, modern office setting, supportive atmosphere, green and blue accents, warm lighting, accessibility feeling"`

10. **Inheritance Consultation**
    Prompt: `"Vietnamese family and lawyer discussing documents together at a large table, respectful and caring atmosphere, traditional and modern elements, warm lighting, green accents"`

11. **Contract Consultation**
    Prompt: `"Close-up of a contract document being reviewed with a magnifying glass, Vietnamese lawyer's hands visible, red pen for annotations, clean modern desk, green and blue accents, precision feeling"`

### Trust & UI Elements

12. **Trust Badge: Response Time**
    Prompt: `"Clean minimal icon illustration of a clock with a checkmark, green gradient, professional badge style, white background, flat design, high contrast"`

13. **Trust Badge: Free First Consultation**
    Prompt: `"Clean minimal icon illustration of a shield with a gift/free symbol, blue gradient, professional badge style, white background, flat design"`

14. **Trust Badge: Licensed Lawyers**
    Prompt: `"Clean minimal icon illustration of a certificate/diploma with a star, gold gradient, professional badge style, white background, flat design"`

15. **Process Step Icons (Set of 4)**
    Prompt: `"Set of 4 clean minimal icons: (1) message bubble, (2) phone ringing, (3) handshake, (4) document with checkmark -- green and blue gradient, professional flat design, consistent style, white background"`

16. **Background Pattern**
    Prompt: `"Subtle geometric pattern of interconnected lines forming a legal scales motif, very light green on white, low opacity, professional and modern, suitable for website section background"`

### Google Ads Landing Page Specific

17. **Urgency Banner Background**
    Prompt: `"Abstract gradient background transitioning from deep navy to trust green, subtle light rays from top right, professional and urgent feeling, suitable for text overlay, clean and modern"`

18. **Mobile CTA Background**
    Prompt: `"Clean gradient from confidence blue to trust green, subtle abstract wave pattern, mobile-optimized vertical orientation, professional, suitable for button and text overlay"`

### Social Proof

19. **Client Testimonial Avatars (Set of 8)**
    Prompt: `"Professional headshot-style portrait of a Vietnamese [man/woman] in their [30s/40s/50s], neutral background, warm smile, professional appearance, trust-building, natural lighting"` (Generate 8 variations)

20. **Office Photos**
    Prompt: `"Modern Vietnamese law firm office interior, clean design with green plants, glass meeting rooms, professional but welcoming, natural daylight, contemporary furniture, Saigon cityscape visible through windows"`

---

## 9. Internal Linking Strategy

### Outbound Links (From This Site)

| Target Site | Link Type | Placement | Purpose |
|-------------|-----------|-----------|---------|
| All practice-area sites | Routing links | Practice area pages | Route qualified leads to deeper content |
| apolo.com.vn | Authority link | About page, footer | Main brand reference |
| luatsutructuyen.vn | Knowledge link | FAQ sections | "Tim hieu them" for those not ready to convert |
| luatsutructuyen.net | Scenario link | Practice area pages | "Xem tinh huong tuong tu" for engagement |

### Inbound Links (To This Site)

| Source Site | Link Type | Context |
|-------------|-----------|---------|
| luatsutructuyen.net | Primary CTA | Every scenario article funnels here |
| luatsutructuyen.vn | Consultation CTA | Knowledge articles link here for consultation |
| luatsutuvan.org | Primary CTA | Trust content funnels here |
| All ecosystem sites | Footer/header link | Universal "Tu Van Ngay" link |

### Internal Cross-Linking Rules

1. Homepage links to all 8 practice area pages
2. Every practice area page links to /gui-cau-hoi/ and /dat-lich-tu-van/
3. Every SEO content page has an embedded form (no link needed -- form IS the link)
4. Every Ads landing page has ZERO outbound links (except form submission and phone)
5. FAQ page links to relevant practice area pages
6. Thank-you page links to practice area sites for continued engagement
7. 404 page includes form and phone number (never lose a lead)

### UTM Parameter Handling

All inbound links tracked via:
- `utm_source` -- identifies referring site
- `utm_medium` -- referral, organic, cpc, social
- `utm_campaign` -- campaign name
- `utm_content` -- specific link/CTA identifier

UTM data stored with every lead submission for attribution reporting.

### Breadcrumb Structure

```
Trang chu > [Section] > [Page Title]
Example: Trang chu > Tu van theo linh vuc > Tu van ly hon
```

---

## 10. Conversion Funnel

### Funnel Overview

```
TRAFFIC SOURCES
  |-- Google Ads (40% expected)
  |-- Organic Search (25%)
  |-- Ecosystem Referrals (25%)
  |-- Direct/Social (10%)
    |
    v
LANDING & TRUST (< 5 seconds)
  -- See headline matching their need
  -- See response time guarantee
  -- See phone number / form immediately
    |
    v
MICRO-CONVERSION (< 30 seconds)
  -- Start filling form OR
  -- Click phone number OR
  -- Click Zalo
    |
    v
LEAD SUBMISSION
  -- Complete form OR
  -- Make phone call OR
  -- Send Zalo message
    |
    v
CONFIRMATION & ROUTING
  -- Thank-you page with next steps
  -- Internal notification to intake team
  -- Auto-routing to practice area specialist
```

### Form Optimization Strategy

#### Primary Form (Multi-Step)
```
Step 1: "Ban can tu van ve linh vuc nao?"
  -- Practice area selection (icon grid, 8 options)
  -- Click advances to Step 2

Step 2: "Thong tin lien he cua ban"
  -- Ho ten (required)
  -- So dien thoai (required)
  -- Email (optional)

Step 3: "Mo ta van de cua ban"
  -- Textarea for question (required)
  -- Urgency selector (optional): Binh thuong / Gap / Khan cap
  -- Submit button: "Gui Cau Hoi -- Phan Hoi Trong 30 Phut"
```

#### Quick Form (Inline/Embedded)
```
Single view:
  -- Ho ten | So dien thoai | Cau hoi ngan | [Gui Ngay]
  -- All in one row on desktop, stacked on mobile
```

#### Booking Form
```
Step 1: Practice area selection
Step 2: Date/time picker (available slots from Calendly or custom)
Step 3: Contact info + brief description
Step 4: Confirmation
```

### Conversion Rate Optimization (CRO) Plan

#### A/B Tests (Planned)
1. Form position: Left vs. Right vs. Center on hero
2. CTA copy: "Gui Cau Hoi" vs. "Hoi Luat Su Ngay" vs. "Nhan Tu Van Mien Phi"
3. Trust badge placement: Above form vs. Below form vs. Beside form
4. Phone number size: Standard vs. Extra-large on mobile
5. Floating bar timing: Immediate vs. 2-second delay vs. scroll-triggered

#### Heatmap & Session Recording
- Hotjar or Microsoft Clarity on all pages for first 6 months
- Weekly review of form abandonment patterns
- Monthly CRO report with optimization recommendations

### Lead Routing Logic

```
Lead submitted with practiceArea = "ly-hon"
  --> Notify divorce specialist
  --> Tag lead in CRM
  --> Send auto-confirmation Zalo/SMS

Lead submitted with urgency = "khan-cap"
  --> Immediate phone notification to senior partner
  --> Auto-response: "Luat su se goi lai trong 15 phut"

Lead submitted from utm_source = "luatsutructuyen"
  --> Include scenario context in lead notes
  --> Higher conversion probability flag
```

### Post-Conversion Flow

1. **Immediate**: Thank-you page with:
   - Confirmation message with expected response time
   - "Trong khi cho, tim hieu them" links to ecosystem sites
   - Office location map
   - Phone number (in case of urgency)

2. **Within 5 minutes**: Auto-SMS/Zalo confirming receipt

3. **Within 30 minutes**: Lawyer follow-up call or message

4. **Within 24 hours**: If no response from lead, second follow-up attempt

5. **Within 72 hours**: If still no response, final follow-up with value-add content link

---

## Appendix A: Google Ads Campaign Structure

### Campaign Hierarchy

```
Account: Apolo Lawyers - luatsutuvan.net
  |
  |-- Campaign: Brand
  |     |-- Ad Group: Brand Terms
  |     |-- Ad Group: Lawyer Name Terms
  |
  |-- Campaign: Practice Areas
  |     |-- Ad Group: Ly Hon
  |     |-- Ad Group: Dat Dai
  |     |-- Ad Group: Doanh Nghiep
  |     |-- Ad Group: Dan Su
  |     |-- Ad Group: Hinh Su
  |     |-- Ad Group: Lao Dong
  |     |-- Ad Group: Thua Ke
  |     |-- Ad Group: Hop Dong
  |
  |-- Campaign: Location
  |     |-- Ad Group: Quan 1
  |     |-- Ad Group: Quan 3
  |     |-- Ad Group: Binh Thanh
  |     |-- (etc.)
  |
  |-- Campaign: High Intent
  |     |-- Ad Group: Tu Van Online
  |     |-- Ad Group: Dat Lich
  |     |-- Ad Group: Mien Phi
  |     |-- Ad Group: Khan Cap
```

### Landing Page Assignment Rule

Every Ad Group maps to exactly one /lp/ page with matching message and keywords.

---

## Appendix B: Performance Budget

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 1.5s | Lighthouse |
| FID | < 50ms | Lighthouse |
| CLS | < 0.02 | Lighthouse |
| TTI | < 2.0s | Lighthouse |
| Total Page Weight | < 500KB | Bundlewatch |
| JS Bundle | < 150KB gzipped | Webpack Analyzer |
| Image per page | < 200KB total | Sharp/Next Image |
| Form load time | < 0.5s | Custom metric |
