/**
 * seo.ts — JSON-LD builders + metadata helpers (PRD §4 / §5).
 * LocalBusiness / LegalService / FAQPage / BreadcrumbList, all self-canonical.
 */

import type { Metadata } from 'next'
import { SITE, PHONE_TEL, EMAIL } from '@/config/site'

export function absUrl(path = '/'): string {
  return new URL(path, SITE.url).toString()
}

/** Standard page metadata with self-canonical + OG. */
export function pageMeta(opts: {
  title: string
  description: string
  path: string
  noindex?: boolean
  image?: string
}): Metadata {
  const canonical = absUrl(opts.path)
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    robots: opts.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE.name,
      locale: 'vi_VN',
      type: 'website',
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
  }
}

/** LegalService + LocalBusiness combined node — used on home + landing pages. */
export function legalServiceLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': absUrl('/#organization'),
    name: SITE.shortName,
    alternateName: SITE.name,
    url: SITE.url,
    telephone: PHONE_TEL,
    email: EMAIL,
    image: SITE.url + '/og-default.png',
    priceRange: 'Miễn phí tư vấn lần đầu',
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '108 Trần Đình Xu',
      addressLocality: 'Phường Cầu Ông Lãnh',
      addressRegion: 'Thành phố Hồ Chí Minh',
      addressCountry: 'VN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    // NOTE: no aggregateRating — we will not emit a star rating in structured
    // data unless it is backed by real, verifiable reviews. Emitting a
    // fabricated rating is both a Google rich-results policy violation and a
    // legal-advertising risk for a law firm.
    sameAs: [SITE.parentBrandUrl],
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  }
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}
