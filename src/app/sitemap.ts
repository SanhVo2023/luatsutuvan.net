import type { MetadataRoute } from 'next'
import { SITE, PRACTICE_AREAS } from '@/config/site'
import { listBlogPosts } from '@/lib/hub'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url
  const now = new Date()

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'daily' },
    { path: '/gui-cau-hoi', priority: 0.95, freq: 'weekly' },
    { path: '/dat-lich-tu-van', priority: 0.95, freq: 'weekly' },
    { path: '/tu-van-theo-linh-vuc', priority: 0.9, freq: 'weekly' },
    { path: '/quy-trinh-tiep-nhan', priority: 0.7, freq: 'monthly' },
    { path: '/cau-hoi-thuong-gap', priority: 0.7, freq: 'monthly' },
    { path: '/noi-dung-tu-van', priority: 0.8, freq: 'weekly' },
    { path: '/lien-he', priority: 0.7, freq: 'monthly' },
    { path: '/chinh-sach-bao-mat', priority: 0.3, freq: 'yearly' },
    { path: '/dieu-khoan-su-dung', priority: 0.3, freq: 'yearly' },
  ]

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }))

  for (const pa of PRACTICE_AREAS) {
    entries.push({
      url: `${base}/tu-van-theo-linh-vuc/${pa.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  }

  // Blog posts are served from the hub; pull their slugs for the sitemap.
  const { docs } = await listBlogPosts({ limit: 200 })
  for (const a of docs) {
    entries.push({
      url: `${base}/noi-dung-tu-van/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
