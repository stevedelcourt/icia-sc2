import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { LocalizedLink } from '@/lib/i18n'
import { getPublications, getPublicationBySlug, getPublicationSlugs, type Locale } from '@/generated/publications'
import { t } from '@/generated/content'
import { Picture } from '@/components/Picture'
import { MarkdownBody } from '@/components/MarkdownBody'

export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en']
  const params: { lang: string; slug: string }[] = []

  for (const lang of locales) {
    const slugs = getPublicationSlugs(lang)
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }

  if (params.length === 0) {
    params.push({ lang: 'fr', slug: '-' })
    params.push({ lang: 'en', slug: '-' })
  }

  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const pub = getPublicationBySlug(params.slug, lang)

  if (!pub) {
    return {
      title: t(lang, 'publications.page.title'),
    }
  }

  const baseUrl = 'https://www.mariusia.com'
  const canonical = `${baseUrl}/${lang}/publications/${params.slug}/`

  return {
    title: `${pub.headline} | ${t(lang, 'layout.seo.title.template').replace('%s', t(lang, 'publications.page.title'))}`,
    description: pub.subheadline,
    keywords: pub.keywords.split(',').map((k) => k.trim()),
    openGraph: {
      type: 'article',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      url: canonical,
      siteName: t(lang, 'layout.og.site_name'),
      title: pub.headline,
      description: pub.subheadline,
      images: [
        {
          url: pub.heroImage ? `/images/publications/${pub.slug}/${pub.heroImage}` : '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: pub.headline,
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        'fr-FR': `${baseUrl}/fr/publications/${params.slug}/`,
        'en-US': `${baseUrl}/en/publications/${params.slug}/`,
        'x-default': `${baseUrl}/fr/publications/${params.slug}/`,
      },
    },
  }
}

const tagColors: Record<string, string> = {
  announcements: 'bg-[#a6a6a6] text-white',
  perspectives: 'bg-[#a6a6a6] text-white',
  'regulatory-insights': 'bg-[#a6a6a6] text-white',
  news: 'bg-[#a6a6a6] text-white',
  'strategy-papers': 'bg-[#a6a6a6] text-white',
}

export default function PublicationDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const pub = getPublicationBySlug(params.slug, lang)

  if (!pub) {
    return (
      <>
        <Header />
        <main className="section pt-16 bg-primary">
          <div className="container-mentivis text-center">
            <h1 className="t-title text-primary mb-4">
              {lang === 'en' ? 'Publication not found' : 'Publication non trouvée'}
            </h1>
            <LocalizedLink href="/publications/" className="t-caption text-tertiary hover:text-primary transition-colors">
              {t(lang, 'publications.detail.back_button')}
            </LocalizedLink>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const tagKey = `publications.tag.${pub.category}`
  const tagLabel = (t as any)(lang, tagKey) || pub.category
  const tagClass = tagColors[pub.category] || 'bg-gray-200 text-gray-700'
  const heroPath = pub.heroImage
    ? `/images/publications/${pub.slug}/${pub.heroImage}`
    : '/images/og-image.png'

  const cards = [
    { title: pub.card1Title, body: pub.card1Body, image: pub.card1Image, link: (pub as any).card1Link, linkLabel: (pub as any).card1LinkLabel },
    { title: pub.card2Title, body: pub.card2Body, image: pub.card2Image, link: (pub as any).card2Link, linkLabel: (pub as any).card2LinkLabel },
    { title: pub.card3Title, body: pub.card3Body, image: pub.card3Image, link: (pub as any).card3Link, linkLabel: (pub as any).card3LinkLabel },
  ].filter((c) => c.title)

  // Get related articles (max 2) from same locale
  const allPubs = getPublications(lang)
  const relatedArticles = pub.relatedSlugs
    .map((s) => allPubs.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 2)

  const wordCount = pub.body.split(/\s+/).filter(Boolean).length

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.mariusia.com/${lang}/publications/${pub.slug}/`,
    headline: pub.headline,
    description: pub.subheadline,
    image: heroPath,
    datePublished: pub.date,
    dateModified: pub.date,
    articleSection: pub.category,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    wordCount,
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
      '@id': `https://www.mariusia.com/${lang}/publications/${pub.slug}/`
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section pt-16 bg-primary">
        <div className="container-mentivis">
          {/* Back link */}
          <FadeIn>
            <LocalizedLink
              href="/publications/"
              className="inline-flex items-center t-caption text-tertiary hover:text-primary transition-colors mb-8"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t(lang, 'publications.detail.back_button')}
            </LocalizedLink>
          </FadeIn>

          {/* Hero image */}
          <FadeIn>
            <div className="w-full aspect-video overflow-hidden bg-secondary mb-8 rounded-card">
              <Picture
                src={heroPath}
                alt={pub.headline}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${tagClass}`}>
                {tagLabel}
              </span>
              <span className="t-caption text-tertiary">
                {t(lang, 'publications.detail.published_on')}{' '}
                {new Date(pub.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.15}>
            <h1 className="t-display text-primary mb-4">
              {pub.headline}
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.2}>
            <p className="t-lead mb-12">
              {pub.subheadline}
            </p>
          </FadeIn>

          {/* Body */}
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <MarkdownBody content={pub.body} />
            </div>
          </FadeIn>

          {/* Optional CTA text button */}
          {pub.ctaText && pub.ctaLink && (
            <FadeIn delay={0.1} className="mt-10 max-w-3xl mx-auto">
              <LocalizedLink
                href={pub.ctaLink}
                className="btn-pill btn-black"
              >
                {pub.ctaText}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </FadeIn>
          )}

          {/* Summary cards — AFTER body */}
          {cards.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16">
              {cards.map((card, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="up">
                  <div className="bg-primary p-8 h-full rounded-card shadow-card flex flex-col">
                    {card.image && (
                      <div className="mb-4">
                        <div className="aspect-video overflow-hidden bg-secondary rounded-card">
                          <Picture
                            src={`/images/publications/${pub.slug}/${card.image}`}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <h3 className="t-heading text-primary mb-3">{card.title}</h3>
                    <p className="t-caption">{card.body}</p>
                    {card.link && (
                      <LocalizedLink
                        href={card.link}
                        className="btn-pill btn-outline-shadow mt-auto pt-6"
                      >
                        {card.linkLabel || (lang === 'en' ? 'Read more' : 'Lire la suite')}
                        <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </LocalizedLink>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          )}

          {/* Related articles — "Lire aussi" */}
          {relatedArticles.length > 0 && (
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="border-t border-border pt-12 mt-8">
                  <h2 className="t-title text-primary mb-8">
                    {t(lang, 'publications.detail.related_title')}
                  </h2>
                  <div className="space-y-8">
                    {relatedArticles.map((related) => (
                      <LocalizedLink
                        key={related!.slug}
                        href={`/publications/${related!.slug}/`}
                        className="block group"
                      >
                        <h3 className="t-heading text-primary group-hover:text-secondary transition-colors duration-200 mb-2">
                          {related!.headline}
                        </h3>
                        <p className="t-caption line-clamp-2">
                          {related!.subheadline}
                        </p>
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Bottom CTA */}
          {pub.link && (
            <FadeIn delay={0.1} className="mt-16">
              <LocalizedLink
                href={pub.link}
                className="btn-pill btn-black"
              >
                {pub.linkLabel || (lang === 'en' ? 'Learn more' : 'En savoir plus')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </FadeIn>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
