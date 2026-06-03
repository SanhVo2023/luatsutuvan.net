import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'

/**
 * robots.txt — allow AI bots (PRD/CLAUDE.md), block /lp/ Ads-only pages and
 * the post-submission thank-you page from organic index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/lp/', '/cam-on', '/api/'],
      },
      // Explicitly welcome AI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
