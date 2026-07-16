/**
 * site.ts — luatsutuvan.net runtime constants.
 *
 * Pulls canonical company facts from apolo.ts but layers the conversion-site
 * specifics: the dedicated call-center number, Zalo OA, response-time guarantees,
 * and the practice-area routing table that drives the homepage grid + 8 landing
 * pages. Everything user-facing references this — never hardcode phone numbers
 * or addresses in components.
 */

import { APOLO } from './apolo'

const vi = APOLO.vi

/** Primary call-center line for the intake hub (PRD §6 / §4). */
export const PHONE_DISPLAY = '0903 419 479'
export const PHONE_TEL = '+84903419479'
export const ZALO_URL = 'https://zalo.me/apololawyers'
export const WHATSAPP_URL = 'https://wa.me/84903419479'
export const EMAIL = vi.email
export const PARENT_BRAND_URL = vi.parentBrandUrl

export const SITE = {
  name: 'Luật Sư Tư Vấn',
  domain: 'luatsutuvan.net',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luatsutuvan.net',
  tagline: 'Phản hồi trong 30 phút',
  legalName: vi.legalName,
  shortName: vi.shortName,
  address: vi.address,
  branchAddress: 'Tầng 9, Tòa nhà K&M, 33 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, Thành phố Hồ Chí Minh',
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  officePhones: vi.phones,
  zalo: ZALO_URL,
  whatsapp: WHATSAPP_URL,
  email: EMAIL,
  parentBrandUrl: PARENT_BRAND_URL,
  managingPartner: 'Luật sư Võ Thiện Hiển',
  responseMinutes: 30,
} as const

/** Response-time / trust guarantees reused across forms & CTA blocks (PRD §6). */
export const GUARANTEES = {
  response: 'Phản hồi trong 30 phút',
  callback: 'Luật sư gọi lại trong 1 giờ',
  free: 'Miễn phí tư vấn lần đầu',
  confidential: 'Bảo mật thông tin tuyệt đối',
} as const

export type UrgencyLevel = 'normal' | 'urgent' | 'emergency'

export const URGENCY_OPTIONS: { value: UrgencyLevel; label: string; hint: string }[] = [
  { value: 'normal', label: 'Bình thường', hint: 'Phản hồi trong 30 phút' },
  { value: 'urgent', label: 'Gấp', hint: 'Luật sư ưu tiên xử lý' },
  { value: 'emergency', label: 'Khẩn cấp', hint: 'Gọi lại trong 15 phút' },
]

export interface PracticeArea {
  /** slug used in /tu-van-theo-linh-vuc/[area] — kept short & Vietnamese */
  slug: string
  /** lead `practiceArea` enum value (PRD §7 Leads collection) */
  value: string
  name: string
  /** short label for the form chip / icon grid */
  short: string
  /** one-line value prop on the card */
  tagline: string
  /** lucide-react icon name (resolved in PracticeIcon) */
  icon: string
  /** R2 hero image (reused from shared library where it fits) */
  image: string
  /** ecosystem practice-area site this routes qualified leads to */
  routingUrl: string
  routingLabel: string
}

/**
 * 8 practice areas (PRD §3). Images reuse the shared r2 library (MANIFEST.md)
 * where the abstract header fits; the few without a perfect match reuse the
 * closest generic asset rather than burning generation budget.
 */
export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: 'tu-van-ly-hon',
    value: 'ly-hon',
    name: 'Tư vấn Ly hôn',
    short: 'Ly hôn',
    tagline: 'Ly hôn nhanh, chia tài sản & quyền nuôi con đúng luật.',
    icon: 'HeartCrack',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-divorce-fa91a242.webp',
    routingUrl: 'https://luatsulyhon.vn',
    routingLabel: 'Tìm hiểu sâu về luật Hôn nhân & Gia đình',
  },
  {
    slug: 'tu-van-dat-dai',
    value: 'dat-dai',
    name: 'Tư vấn Đất đai',
    short: 'Đất đai',
    tagline: 'Sổ đỏ, quy hoạch, tranh chấp ranh giới & chuyển nhượng.',
    icon: 'Map',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/content/practice-dat-dai-1fbb2b75.webp',
    routingUrl: 'https://luatsudatdai.vn',
    routingLabel: 'Xem chuyên trang Luật Đất đai',
  },
  {
    slug: 'tu-van-doanh-nghiep',
    value: 'doanh-nghiep',
    name: 'Tư vấn Doanh nghiệp',
    short: 'Doanh nghiệp',
    tagline: 'Thành lập, thuế, lao động & pháp chế nội bộ trọn gói.',
    icon: 'Building2',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-business-2487a82f.webp',
    routingUrl: 'https://luatsudoanhnghiep.vn',
    routingLabel: 'Xem chuyên trang Luật Doanh nghiệp',
  },
  {
    slug: 'tu-van-dan-su',
    value: 'dan-su',
    name: 'Tư vấn Dân sự',
    short: 'Dân sự',
    tagline: 'Đòi nợ, bồi thường thiệt hại & tranh chấp dân sự.',
    icon: 'Scale',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-civil-debt-843941c2.webp',
    routingUrl: 'https://luatsudansu.vn',
    routingLabel: 'Xem chuyên trang Luật Dân sự',
  },
  {
    slug: 'tu-van-hinh-su',
    value: 'hinh-su',
    name: 'Tư vấn Hình sự',
    short: 'Hình sự',
    tagline: 'Bào chữa, tại ngoại & bảo vệ quyền lợi 24/7.',
    icon: 'Gavel',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-criminal-e7af4f32.webp',
    routingUrl: 'https://luatsuhinhsu.vn',
    routingLabel: 'Xem chuyên trang Luật Hình sự',
  },
  {
    slug: 'tu-van-lao-dong',
    value: 'lao-dong',
    name: 'Tư vấn Lao động',
    short: 'Lao động',
    tagline: 'Hợp đồng, sa thải trái luật, BHXH & tranh chấp lương.',
    icon: 'Handshake',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-labor-a5eb3b57.webp',
    routingUrl: 'https://luatsulaodong.vn',
    routingLabel: 'Xem chuyên trang Luật Lao động',
  },
  {
    slug: 'tu-van-thua-ke',
    value: 'thua-ke',
    name: 'Tư vấn Thừa kế',
    short: 'Thừa kế',
    tagline: 'Di chúc, phân chia di sản & tranh chấp thừa kế.',
    icon: 'ScrollText',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/content/practice-thua-ke-55c26d13.webp',
    routingUrl: 'https://luatsuthuake.vn',
    routingLabel: 'Xem chuyên trang Luật Thừa kế',
  },
  {
    slug: 'tu-van-hop-dong',
    value: 'hop-dong',
    name: 'Tư vấn Hợp đồng',
    short: 'Hợp đồng',
    tagline: 'Soạn thảo, rà soát & xử lý tranh chấp hợp đồng.',
    icon: 'FileSignature',
    image:
      'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/luatsutuvan.net/blog/blog-contract-825feb5c.webp',
    routingUrl: 'https://luatsuhopdong.vn',
    routingLabel: 'Xem chuyên trang Luật Hợp đồng',
  },
]

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.slug === slug)
}

export function getPracticeAreaByValue(value: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.value === value)
}

/**
 * Site imagery. Hero + section photos are luatsutuvan.net's OWN realistic legal
 * photography (generated via tools/image-generator → R2, indexed in assets.json).
 * A couple of decorative textures still reuse the shared r2-shared pool.
 */
const R2_BASE = 'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev'
export const IMAGES = {
  /** Hero backdrop — real lawyer/client consultation in a modern HCMC office. */
  heroBg: `${R2_BASE}/luatsutuvan.net/hero/hero-consultation-47b06542.webp`,
  /** Alt hero — warm phone consultation. */
  phoneConsult: `${R2_BASE}/luatsutuvan.net/hero/hero-phone-consult-4f0af196.webp`,
  /** Mid-page band — close-up of a contract being reviewed. */
  signing: `${R2_BASE}/luatsutuvan.net/content/section-document-review-7230fd7c.webp`,
  /** Team / office meeting. */
  office: `${R2_BASE}/luatsutuvan.net/content/section-office-meeting-47b64d2b.webp`,
  /** Decorative textures (shared pool). */
  library: `${R2_BASE}/vothienhien.com/background/bg-library-f8675605.webp`,
  marble: `${R2_BASE}/vothienhien.com/background/bg-marble-5a92903f.webp`,
  goldStroke: `${R2_BASE}/vothienhien.com/content/accent-gold-stroke-4de2a341.webp`,
} as const

/** Primary navigation (PRD §3). */
export const NAV_LINKS = [
  { href: '/tu-van-theo-linh-vuc', label: 'Lĩnh vực tư vấn' },
  { href: '/quy-trinh-tiep-nhan', label: 'Quy trình' },
  { href: '/cau-hoi-thuong-gap', label: 'Câu hỏi thường gặp' },
  { href: '/noi-dung-tu-van', label: 'Cẩm nang' },
  { href: '/lien-he', label: 'Liên hệ' },
] as const
