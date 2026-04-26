import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MarkdownBody } from '@/components/MarkdownBody'
import { FadeIn } from '@/components/ui/FadeIn'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { LocalizedLink } from '@/lib/i18n'
import { getPublications, getPublicationBySlug, getPublicationSlugs, type Locale } from '@/generated/publications'
import { t } from '@/generated/content'

export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en']
  const params: { lang: string; slug: string }[] = []

  for (const lang of locales) {
    const slugs = getPublicationSlugs(lang)
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
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
    },
  }
}

const tagColors: Record<string, string> = {
  announcements: 'bg-gray-100 text-gray-700',
  perspectives: 'bg-gray-100 text-gray-700',
  'regulatory-insights': 'bg-gray-100 text-gray-700',
  news: 'bg-gray-100 text-gray-700',
  'strategy-papers': 'bg-gray-100 text-gray-700',
}

export default function PublicationDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const pub = getPublicationBySlug(params.slug, lang)

  if (!pub) {
    return (
      <>
        <Header />
        <main className="pt-36 pb-24" style={{ backgroundColor: '#f9f7f3' }}>
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h1 className="text-3xl font-bold text-black mb-4">
              {lang === 'en' ? 'Publication not found' : 'Publication non trouvée'}
            </h1>
            <LocalizedLink href="/publications/" className="text-navy hover:underline">
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

  return (
    <>
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f9f7f3' }}>
        <div className="max-w-6xl mx-auto px-8">
          {/* Back link */}
          <FadeIn>
            <LocalizedLink
              href="/publications/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 mb-8"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t(lang, 'publications.detail.back_button')}
            </LocalizedLink>
          </FadeIn>

          {/* Hero image */}
          <FadeIn>
            <div className="w-full aspect-video overflow-hidden bg-gray-100 mb-8">
              <img
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
              <span className="text-sm text-gray-400">
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
            <h1 className="text-3xl md:text-5xl font-bold text-black leading-[1.1] mb-4">
              {pub.headline}
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-12">
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
                className="inline-block text-base font-semibold text-navy hover:text-navy-light underline underline-offset-4 transition-colors duration-200"
              >
                {pub.ctaText}
              </LocalizedLink>
            </FadeIn>
          )}

          {/* Summary cards — AFTER body */}
          {cards.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16">
              {cards.map((card, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="up">
                  <div className="bg-white p-8 h-full">
                    {card.image && (
                      <div className="mb-4">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src={`/images/publications/${pub.slug}/${card.image}`}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-black mb-3">{card.title}</h3>
                    <p className="text-base text-gray-500 leading-relaxed">{card.body}</p>
                    {card.link && (
                      <LocalizedLink
                        href={card.link}
                        className="inline-flex items-center text-sm font-semibold text-navy hover:text-navy-light mt-4 transition-colors duration-200"
                      >
                        {card.linkLabel || (lang === 'en' ? 'Read more' : 'Lire la suite')}
                        <ArrowRight className="w-4 h-4 ml-1" />
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
                <div className="border-t border-gray-200 pt-12 mt-8">
                  <h2 className="text-2xl font-bold text-black mb-8">
                    {t(lang, 'publications.detail.related_title')}
                  </h2>
                  <div className="space-y-8">
                    {relatedArticles.map((related) => (
                      <LocalizedLink
                        key={related!.slug}
                        href={`/publications/${related!.slug}/`}
                        className="block group"
                      >
                        <h3 className="text-xl font-bold text-black group-hover:text-navy transition-colors duration-200 mb-2">
                          {related!.headline}
                        </h3>
                        <p className="text-base text-gray-500 leading-relaxed line-clamp-2">
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
            <FadeIn delay={0.1} className="mt-16 text-center">
              <LocalizedLink
                href={pub.link}
                className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-white hover:text-black transition-all duration-200"
              >
                {pub.linkLabel || (lang === 'en' ? 'Learn more' : 'En savoir plus')}
              </LocalizedLink>
            </FadeIn>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
