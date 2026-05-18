'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { getActualiteBySlug } from '@/generated/actualites'
import { MarkdownBody } from '@/components/MarkdownBody'

export default function ActualiteDetailPage() {
  const params = useParams()
  const lang = (params?.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const slug = params?.slug as string
  const article = getActualiteBySlug(slug)

  if (!article) {
    return (
      <>
        <Header />
        <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))', minHeight: '60vh' }}>
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
              {lang === 'fr' ? 'Article introuvable' : 'Article not found'}
            </h1>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const title = lang === 'en' ? article.titleEn : article.title
  const body = lang === 'en' ? article.bodyEn : article.body
  const formattedDate = new Date(article.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        datePublished: article.date,
        description: lang === 'en' ? article.excerptEn : article.excerpt,
        author: { '@type': 'Organization', name: 'ICIA' },
        publisher: { '@type': 'Organization', name: 'ICIA', logo: { '@type': 'ImageObject', url: 'https://www.iciafrance.com/images/icia-logo-wordmark-noir.svg' } },
      }) }} />
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis" style={{ maxWidth: '720px' }}>
          <FadeIn>
            <p className="eyebrow">{article.category}</p>
            <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>{title}</h1>
            <p className="t-caption" style={{ marginBottom: '32px' }}>
              {formattedDate}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '24px 28px', marginBottom: '40px' }}>
              <p className="t-lead" style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>
                {lang === 'en' ? article.excerptEn : article.excerpt}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="prose" style={{ maxWidth: 'none' }}>
              <MarkdownBody content={body} />
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
