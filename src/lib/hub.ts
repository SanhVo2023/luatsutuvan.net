/**
 * hub.ts — typed HTTP client for the Apolo Content Hub (PayloadCMS REST API).
 *
 * This is the ENTIRE data layer for blog content + site chrome. There is NO
 * Payload, NO pg pool, NO database here — everything is fetched over cached HTTP
 * from the central hub (hub/API_CONTRACT.md is the source of truth) and cached
 * with Next.js ISR. If the hub is unreachable the helpers degrade to typed empty
 * states and log a warning, so the build never crashes on a hub hiccup.
 */

export const REVALIDATE = 3600 // 1 hour ISR

const HUB_API_URL = (process.env.HUB_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')
const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'luatsutuvan.net'

/* ------------------------------------------------------------------ *
 * Response types (per API_CONTRACT.md)
 * ------------------------------------------------------------------ */
export interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export interface SeoMeta {
  title?: string | null
  description?: string | null
  image?: unknown
}

export interface Category {
  id: number
  name: string
  slug: string
  locale?: 'vi' | 'en'
}

export interface Rendition {
  id: number
  title: string
  slug: string
  /** markdown string — render with <Markdown> */
  body: string
  excerpt?: string | null
  heroImageUrl?: string | null
  canonicalUrl?: string | null
  status: 'published' | 'draft' | 'archived'
  contentType?: 'article' | 'blog' | 'news'
  category?: Category | number | null
  tags?: string[] | null
  meta?: SeoMeta | null
  createdAt?: string
  updatedAt?: string
}

export interface NavLink { label: string; href: string }
export interface FooterColumn { heading?: string; links?: NavLink[] }
export interface Navigation {
  logoUrl?: string | null
  headerLinks?: NavLink[]
  headerCta?: { label?: string; href?: string }
  footerColumns?: FooterColumn[]
  footerLegal?: string | null
  socialLinks?: { platform: string; url: string }[]
}
export interface SiteSettings {
  nap?: { legalName?: string; address?: string; phone?: string; email?: string }
  analytics?: { googleAnalyticsId?: string; gtmId?: string }
  defaultOgImageUrl?: string | null
  frontendBaseUrl?: string | null
  socialLinks?: { platform: string; url: string }[]
}

/* ------------------------------------------------------------------ *
 * Low-level fetch helper (degrades gracefully)
 * ------------------------------------------------------------------ */
async function hubFetch<T>(path: string, fallback: T): Promise<T> {
  const url = `${HUB_API_URL}${path}`
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Hub responded ${res.status} for ${path}`)
    return (await res.json()) as T
  } catch (err) {
    console.warn(`[hub] fetch failed for ${url}: ${err instanceof Error ? err.message : String(err)} — fallback`)
    return fallback
  }
}

const emptyList = <T>(): PayloadListResponse<T> => ({
  docs: [], totalDocs: 0, limit: 0, totalPages: 0, page: 1, hasPrevPage: false, hasNextPage: false,
})

function qs(params: Record<string, string | number>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
}

/* ------------------------------------------------------------------ *
 * Public helpers
 * ------------------------------------------------------------------ */

/**
 * List published renditions for this site, optionally filtered by contentType
 * (blog / article / news) and category slug.
 */
export async function listRenditions(opts?: {
  contentType?: 'article' | 'blog' | 'news'
  categorySlug?: string
  limit?: number
  page?: number
  domain?: string
}): Promise<PayloadListResponse<Rendition>> {
  const domain = opts?.domain ?? SITE_DOMAIN
  if (!domain) return emptyList<Rendition>()
  const params: Record<string, string | number> = {
    'where[and][0][site.domain][equals]': domain,
    'where[and][1][status][equals]': 'published',
    depth: 1,
    limit: opts?.limit ?? 100,
    page: opts?.page ?? 1,
    sort: '-updatedAt',
  }
  let i = 2
  if (opts?.contentType) params[`where[and][${i++}][contentType][equals]`] = opts.contentType
  if (opts?.categorySlug) params[`where[and][${i++}][category.slug][equals]`] = opts.categorySlug
  return hubFetch<PayloadListResponse<Rendition>>(`/api/renditions?${qs(params)}`, emptyList<Rendition>())
}

/** Convenience: published blog posts for this site. */
export async function listBlogPosts(opts?: { categorySlug?: string; limit?: number; page?: number }) {
  return listRenditions({ ...opts, contentType: 'blog' })
}

/** Single published rendition by slug for this site. */
export async function getRendition(slug: string, domain: string = SITE_DOMAIN): Promise<Rendition | null> {
  if (!slug || !domain) return null
  const query = qs({
    'where[and][0][site.domain][equals]': domain,
    'where[and][1][slug][equals]': slug,
    'where[and][2][status][equals]': 'published',
    depth: 1,
  })
  const data = await hubFetch<PayloadListResponse<Rendition>>(`/api/renditions?${query}`, emptyList<Rendition>())
  return data.docs[0] ?? null
}

/** Shared blog categories (taxonomy). */
export async function listCategories(locale: 'vi' | 'en' = 'vi'): Promise<Category[]> {
  const data = await hubFetch<PayloadListResponse<Category>>(
    `/api/categories?${qs({ 'where[locale][equals]': locale, limit: 50 })}`,
    emptyList<Category>(),
  )
  return data.docs
}

/** Per-site navigation global (header/footer). */
export async function getNavigation(domain: string = SITE_DOMAIN): Promise<Navigation | null> {
  const data = await hubFetch<PayloadListResponse<Navigation>>(
    `/api/navigation?${qs({ 'where[site.domain][equals]': domain, depth: 1, limit: 1 })}`,
    emptyList<Navigation>(),
  )
  return data.docs[0] ?? null
}

/** Per-site settings global (NAP / analytics / OG). */
export async function getSiteSettings(domain: string = SITE_DOMAIN): Promise<SiteSettings | null> {
  const data = await hubFetch<PayloadListResponse<SiteSettings>>(
    `/api/site-settings?${qs({ 'where[site.domain][equals]': domain, depth: 1, limit: 1 })}`,
    emptyList<SiteSettings>(),
  )
  return data.docs[0] ?? null
}

/** Resolve a category's display name from a rendition's populated/relational field. */
export function categoryName(c?: Category | number | null): string | null {
  if (!c || typeof c === 'number') return null
  return c.name ?? null
}
export function categorySlug(c?: Category | number | null): string | null {
  if (!c || typeof c === 'number') return null
  return c.slug ?? null
}

export { HUB_API_URL, SITE_DOMAIN }
