import type { MetadataRoute } from 'next'
import { RELEASE_DATE, SITE_URL } from '@/lib/site'

// Dates are when each page's content last changed, not the build time, so a
// redeploy does not tell crawlers that every page is new.
const PAGES: MetadataRoute.Sitemap = [
  { url: '/', lastModified: RELEASE_DATE, changeFrequency: 'weekly', priority: 1 },
  { url: '/download', lastModified: RELEASE_DATE, changeFrequency: 'weekly', priority: 0.9 },
  { url: '/shepherd', lastModified: new Date(Date.UTC(2026, 8, 26)), changeFrequency: 'monthly', priority: 0.8 },
  { url: '/faq', lastModified: new Date(Date.UTC(2026, 8, 25)), changeFrequency: 'monthly', priority: 0.7 },
  { url: '/founder', lastModified: new Date(Date.UTC(2026, 8, 25)), changeFrequency: 'yearly', priority: 0.5 },
  { url: '/security', lastModified: new Date(Date.UTC(2026, 8, 25)), changeFrequency: 'yearly', priority: 0.4 },
  { url: '/terms', lastModified: new Date(Date.UTC(2026, 8, 24)), changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    ...page,
    url: page.url === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.url}`,
  }))
}
