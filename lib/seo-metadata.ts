import type { Metadata } from 'next'

const baseUrl = 'https://www.iciafrance.com'

export function pageMetadata(lang: string, pagePath: string, options?: {
  title?: string
  description?: string
}): Metadata {
  const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`
  const path = normalizedPath === '/' ? '' : normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`
  const url = `${baseUrl}/${lang}${path}`

  return {
    ...(options?.title ? { title: options.title } : {}),
    ...(options?.description ? { description: options.description } : {}),
    alternates: {
      canonical: url,
      languages: {
        'fr-FR': `${baseUrl}/fr${path}`,
        'en-US': `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}/fr${path}`,
      },
    },
  }
}
