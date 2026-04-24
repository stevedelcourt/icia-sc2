import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Section } from '@/components/ui/Section'
import { FadeIn } from '@/components/ui/FadeIn'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { t, type Locale } from '@/generated/content'
import fs from 'fs'
import path from 'path'

export const dynamicParams = true

function getLocalImageUrl(slug: string, imageUrl: string): string {
  if (!imageUrl || !slug) return imageUrl
  
  try {
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const ext = path.extname(new URL(imageUrl).pathname) || '.jpg'
    const localPath = `/articles/${cleanSlug}${ext}`
    const fullPath = path.join(process.cwd(), 'public', localPath)
    
    if (fs.existsSync(fullPath)) {
      return localPath
    }
  } catch {}
  
  return imageUrl
}

export async function generateStaticParams() {
  const NOTION_KEY = process.env.NOTION_KEY
  const NOTION_DB = process.env.NOTION_DB || '306d314b3ef080d58c4ec5bd85683d73'
  
  if (!NOTION_KEY) return []

  const notion = {
    baseUrl: 'https://api.notion.com/v1',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    }
  }

  try {
    const query: any = { page_size: 100 }
    const response = await fetch(`${notion.baseUrl}/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify(query)
    })
    if (!response.ok) return []
    const data = await response.json()
    if (!data.results) return []

    const getRichText = (prop: any) => {
      if (!prop) return ''
      if (prop.rich_text && prop.rich_text.length > 0) {
        return prop.rich_text.map((t: any) => t.plain_text).join('')
      }
      if (prop.title && prop.title.length > 0) {
        return prop.title.map((t: any) => t.plain_text).join('')
      }
      return ''
    }

    return data.results.map((page: any) => ({
      slug: getRichText(page.properties.Slug)
    })).filter((p: any) => p.slug)
  } catch {
    return []
  }
}

const NOTION_KEY = process.env.NOTION_KEY
const NOTION_DB = process.env.NOTION_DB || '306d314b3ef080d58c4ec5bd85683d73'

async function getArticles() {
  if (!NOTION_KEY) return []
  
  const notion = {
    baseUrl: 'https://api.notion.com/v1',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    }
  }

  try {
    const query: any = { 
      page_size: 100,
      sorts: [{ property: 'Date', direction: 'descending' }]
    }
    
    const response = await fetch(`${notion.baseUrl}/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify(query),
      next: { revalidate: 60 }
    })

    if (!response.ok) return []
    
    const data = await response.json()
    if (!data.results) return []

    const getImageUrl = (prop: any) => {
      if (!prop) return ''
      if (prop.url) return prop.url
      if (prop.files && prop.files.length > 0) {
        const file = prop.files[0]
        if (file.file) return file.file.url
        if (file.external) return file.external.url
      }
      return ''
    }

    const getRichText = (prop: any) => {
      if (!prop) return ''
      if (prop.rich_text && prop.rich_text.length > 0) {
        return prop.rich_text.map((t: any) => t.plain_text).join('')
      }
      if (prop.title && prop.title.length > 0) {
        return prop.title.map((t: any) => t.plain_text).join('')
      }
      return ''
    }

    const getPageContent = async (pageId: string) => {
      try {
        const contentRes = await fetch(`${notion.baseUrl}/blocks/${pageId}/children`, {
          headers: notion.headers,
          next: { revalidate: 60 }
        })
        if (!contentRes.ok) return ''
        const contentData = await contentRes.json()
        if (!contentData.results) return ''
        
        return contentData.results.map((block: any) => {
          if (block.type === 'paragraph') {
            return block.paragraph.rich_text.map((t: any) => t.plain_text).join('')
          }
          if (block.type === 'heading_1') {
            return '# ' + block.heading_1.rich_text.map((t: any) => t.plain_text).join('')
          }
          if (block.type === 'heading_2') {
            return '## ' + block.heading_2.rich_text.map((t: any) => t.plain_text).join('')
          }
          if (block.type === 'heading_3') {
            return '### ' + block.heading_3.rich_text.map((t: any) => t.plain_text).join('')
          }
          if (block.type === 'bulleted_list_item') {
            return '• ' + block.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join('')
          }
          if (block.type === 'numbered_list_item') {
            return '1. ' + block.numbered_list_item.rich_text.map((t: any) => t.plain_text).join('')
          }
          return ''
        }).filter(Boolean).join('\n\n')
      } catch {
        return ''
      }
    }

    const articles = await Promise.all(data.results.map(async (page: any) => {
      const props = page.properties
      const content = await getPageContent(page.id)
      const slug = getRichText(props.Slug)
      const imageUrl = getImageUrl(props.Image) || getImageUrl(props.Media) || ''
      return {
        slug,
        title: getRichText(props.Titre),
        excerpt: getRichText(props.Excerpt),
        category: props.Category?.select?.name || '',
        date: props.Date?.date?.start || '',
        image: getLocalImageUrl(slug, imageUrl),
        articleField: getRichText(props.Article),
        content: content
      }
    }))

    return articles.filter((a: any) => a.slug)
  } catch {
    return []
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params
  const allArticles = await getArticles()
  
  const sortedArticles = allArticles
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const article = sortedArticles.find((a: any) => a.slug === slug)
  
  const currentIndex = sortedArticles.findIndex((a: any) => a.slug === slug)
  
  const prevArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null
  const nextArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null

  if (!article) {
    return (
      <>
        <Header />
        <main id="main-content">
          <Section className="pt-40 pb-24">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className=" text-h1 mb-6">{t(lang as Locale, 'actualites.article.non_trouve')}</h1>
              <p className="text-text-muted mb-8">{t(lang as Locale, 'actualites.article.inexistant')}</p>
              <Link href="/actualites" className="text-accent hover:text-accent-hover underline">
                {t(lang as Locale, 'actualites.article.retour')}
              </Link>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    )
  }

  const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `https://www.mariusia.com/actualites/${article.slug}`,
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.date,
      dateModified: article.date,
      author: {
        '@type': 'Organization',
        name: 'Marius IA',
        url: 'https://www.mariusia.com'
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.mariusia.com/#organization'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.mariusia.com/actualites/${article.slug}`
      }
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <Header />
      <main id="main-content">
        <Section className="pt-32 pb-12">
          <FadeIn>
            <article className="max-w-3xl mx-auto">
              <Link href="/actualites" className="text-sm text-text-muted hover:text-accent mb-6 inline-block">
                {t(lang as Locale, 'actualites.article.retour_liste')}
              </Link>
              
              {article.image && (
                <div className="relative w-full aspect-square md:aspect-video lg:aspect-[16/9] mb-8">
                  <OptimizedImage 
                    src={article.image} 
                    alt={article.title} 
                    className="object-cover rounded-lg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </div>
              )}
              
              <h1 className=" text-2xl md:text-h1 mb-6 text-accent">{article.title}</h1>
              
              <div className="prose max-w-none mb-12">
                <p className="text-text-muted text-lg leading-relaxed mb-6">{article.excerpt}</p>
                {article.articleField && (
                  <div className="whitespace-pre-wrap text-text-muted">{article.articleField}</div>
                )}
                {article.content && (
                  <div className="whitespace-pre-wrap text-text-muted mt-6">{article.content}</div>
                )}
              </div>

              <div className="flex justify-between border-t border-border pt-8">
                {prevArticle ? (
                  <Link href={`/actualites/${prevArticle.slug}`} className="text-left">
                    <span className="text-sm text-text-muted">{t(lang as Locale, 'actualites.article.precedent')}</span>
                    <p className="text-accent hover:underline">{prevArticle.title}</p>
                  </Link>
                ) : <div />}
                
                {nextArticle ? (
                  <Link href={`/actualites/${nextArticle.slug}`} className="text-right">
                    <span className="text-sm text-text-muted">{t(lang as Locale, 'actualites.article.suivant')}</span>
                    <p className="text-accent hover:underline">{nextArticle.title}</p>
                  </Link>
                ) : <div />}
              </div>
            </article>
          </FadeIn>
        </Section>
      </main>
      <Footer />
    </>
  )
}
