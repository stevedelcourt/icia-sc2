import { MetadataRoute } from 'next'
import { getPublicationSlugs } from '@/generated/publications'
import { getActualiteSlugs } from '@/generated/actualites'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://iciafrance.com'

  const locales = ['fr', 'en']
  const paths = [
    '',
    '/programmes',
    '/programme-impact',
    '/gouvernance',
    '/conseil-administration',
    '/devenir-membre',
    '/donations',
    '/partenaires',
    '/icia-territoires',
    '/icia-education',
    '/icia-travail-competences',
    '/mission',
    '/contact',
    '/a-propos',
    '/mentions-legales',
    '/politique-confidentialite',
    '/manifeste',
    '/plan-du-site',
    '/actualites',
    '/cookies',
    '/conditions-utilisation',
  ]

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}/`,
      lastModified: new Date(),
      changeFrequency: path === '/actualites' ? 'daily' : path === '' ? 'weekly' : path.startsWith('/mentions') || path.startsWith('/politique') || path.startsWith('/cookies') || path.startsWith('/conditions') ? 'yearly' : 'monthly',
      priority: path === '' ? 1 : ['/programmes', '/programme-impact', '/gouvernance', '/mission'].includes(path) ? 0.9 : ['/actualites'].includes(path) ? 0.8 : 0.7,
      alternates: {
        languages: {
          'fr-FR': `${baseUrl}/fr${path}/`,
          'en-US': `${baseUrl}/en${path}/`,
          'x-default': `${baseUrl}/fr${path}/`,
        },
      },
    }))
  )

  const publicationEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getPublicationSlugs(locale as 'fr' | 'en').map((slug) => ({
      url: `${baseUrl}/${locale}/publications/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'fr-FR': `${baseUrl}/fr/publications/${slug}/`,
          'en-US': `${baseUrl}/en/publications/${slug}/`,
          'x-default': `${baseUrl}/fr/publications/${slug}/`,
        },
      },
    }))
  )

  const actualiteEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getActualiteSlugs().map((slug) => ({
      url: `${baseUrl}/${locale}/actualites/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'fr-FR': `${baseUrl}/fr/actualites/${slug}/`,
          'en-US': `${baseUrl}/en/actualites/${slug}/`,
          'x-default': `${baseUrl}/fr/actualites/${slug}/`,
        },
      },
    }))
  )

  return [...staticPages, ...publicationEntries, ...actualiteEntries]
}