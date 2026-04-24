import { MetadataRoute } from 'next'

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
    '/actualites',
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
      changeFrequency: path === '' ? 'weekly' : path.startsWith('/actualites') ? 'weekly' : path.startsWith('/mentions') || path.startsWith('/politique') || path.startsWith('/cookies') || path.startsWith('/conditions') ? 'yearly' : 'monthly',
      priority: path === '' ? 1 : ['/entreprises', '/pouvoirs-publics', '/education', '/secteurs-creatifs', '/professions-liberales', '/citoyens'].includes(path) ? 0.9 : ['/diagnostic', '/formations', '/transformation', '/partenaire'].includes(path) ? 0.8 : 0.7,
    }))
  )

  const articlePages = await fetchArticles()
  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articlePages.map((slug) => ({
      url: `${baseUrl}/${locale}/actualites/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticPages, ...articleEntries]
}

async function fetchArticles(): Promise<string[]> {
  const NOTION_KEY = process.env.NOTION_KEY
  const NOTION_DB = process.env.NOTION_DB || '306d314b3ef080d58c4ec5bd85683d73'

  if (!NOTION_KEY) {
    return [
      'roxan-roumegas',
      'mk2-partner',
      'partenariat-universites',
      'ia-et-cybersecurite',
      'formation-intelligence-artificielle',
      'audit-ia',
    ]
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({ page_size: 100 })
    })

    if (!response.ok) return []

    const data = await response.json()
    return data.results
      .map((page: any) => {
        const slugProperty = page.properties?.Slug
        if (slugProperty?.type === 'rich_text' && slugProperty.rich_text?.[0]?.plain_text) {
          return slugProperty.rich_text[0].plain_text
        }
        return page.id?.replace(/-/g, '')
      })
      .filter(Boolean)
  } catch {
    return []
  }
}