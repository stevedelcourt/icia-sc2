import { MetadataRoute } from 'next'
import { getPublicationSlugs } from '@/generated/publications'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mariusia.com'

  const locales = ['fr', 'en']
  const paths = [
    '',
    '/entreprises',
    '/pouvoirs-publics',
    '/education',
    '/secteurs-creatifs',
    '/professions-liberales',
    '/citoyens',
    '/diagnostic',
    '/formations',
    '/transformation',
    '/partenaire',
    '/expertises',
    '/publications',
    '/contact',
    '/a-propos',
    '/mentions-legales',
    '/politique-confidentialite',
    '/cookies',
    '/conditions-utilisation',
  ]

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '/publications' ? 'daily' : path === '' ? 'weekly' : path.startsWith('/mentions') || path.startsWith('/politique') || path.startsWith('/cookies') || path.startsWith('/conditions') ? 'yearly' : 'monthly',
      priority: path === '' ? 1 : ['/entreprises', '/pouvoirs-publics', '/education', '/secteurs-creatifs', '/professions-liberales', '/citoyens'].includes(path) ? 0.9 : ['/diagnostic', '/formations', '/transformation', '/partenaire', '/publications'].includes(path) ? 0.8 : 0.7,
    }))
  )

  const publicationEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getPublicationSlugs(locale as 'fr' | 'en').map((slug) => ({
      url: `${baseUrl}/${locale}/publications/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticPages, ...publicationEntries]
}