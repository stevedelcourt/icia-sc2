import type { Metadata } from 'next'
import Script from 'next/script'
import ScrollGradient from '@/components/ScrollGradient'
import SpeedBanner from '@/components/SpeedBanner'
import CookieConsentBanner from '@/components/CookieConsent'
import { I18nProvider } from '@/lib/i18n'
import { LangSetter } from '@/components/LangSetter'
import { t, type Locale } from '@/generated/content'

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const baseUrl = 'https://www.mariusia.com'
  const canonical = `${baseUrl}/${lang}/`

  return {
    metadataBase: new URL(baseUrl),
    icons: {
      icon: '/images/favicon_io/favicon.ico',
      apple: '/images/favicon_io/apple-touch-icon.png',
    },
    title: {
      default: t(lang, 'layout.seo.title.default'),
      template: t(lang, 'layout.seo.title.template'),
    },
    description: t(lang, 'layout.seo.description'),
    keywords: t(lang, 'layout.seo.keywords').split(',').map(k => k.trim()),
    authors: [{ name: t(lang, 'layout.seo.author'), url: 'https://www.mentivis.com' }],
    creator: t(lang, 'layout.seo.creator'),
    publisher: t(lang, 'layout.seo.publisher'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      url: canonical,
      siteName: t(lang, 'layout.og.site_name'),
      title: t(lang, 'layout.og.title'),
      description: t(lang, 'layout.og.description'),
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t(lang, 'layout.og.image.alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(lang, 'layout.twitter.title'),
      description: t(lang, 'layout.twitter.description'),
    },
    alternates: {
      canonical,
      languages: {
        'fr-FR': `${baseUrl}/fr/`,
        'en-US': `${baseUrl}/en/`,
      },
    },
    verification: {
      google: 'pEdbpM4Yo2aeiF2mUp1KU5sClwLo7xebz1TP1R450S0',
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.mariusia.com/#organization',
    name: t(lang, 'layout.ld_json.org.name'),
    alternateName: t(lang, 'layout.ld_json.org.alternate_name'),
    url: 'https://www.mariusia.com',
    logo: 'https://www.mariusia.com/images/MariusIA-logo.svg',
    description: t(lang, 'layout.ld_json.org.description'),
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Europe' },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'AI Act',
      'EU AI Regulation',
      'AI Governance',
      'Machine Learning',
      'Change Management',
      'Digital Transformation',
    ],
    serviceType: [
      'AI Strategy Consulting',
      'AI Compliance',
      'AI Training',
      'Digital Transformation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: t(lang, 'layout.ld_json.org.contact_type'),
      email: 'contact@mariusia.com',
      areaServed: 'FR',
      availableLanguage: [t(lang, 'layout.ld_json.org.available_language.fr'), t(lang, 'layout.ld_json.org.available_language.en')],
    },
    parentOrganization: {
      '@type': 'Organization',
      name: t(lang, 'layout.ld_json.org.parent_name'),
      url: 'https://www.mentivis.com',
    },
    location: {
      '@type': 'Place',
      name: t(lang, 'layout.ld_json.org.location.name'),
      address: {
        '@type': 'PostalAddress',
        addressLocality: t(lang, 'layout.ld_json.org.location.city'),
        addressCountry: 'FR',
      },
    },
  }

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.mariusia.com/#website',
    url: 'https://www.mariusia.com',
    name: t(lang, 'layout.ld_json.website.name'),
    description: t(lang, 'layout.ld_json.website.description'),
    publisher: { '@id': 'https://www.mariusia.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.mariusia.com/${lang}/contact`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t(lang, 'layout.ld_json.breadcrumb.home'),
        item: `https://www.mariusia.com/${lang}/`,
      },
    ],
  }

  return (
    <>
      <LangSetter lang={lang} />
      <Script
        type="application/ld+json"
        id="jsonld-organization"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <Script
        type="application/ld+json"
        id="jsonld-website"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <I18nProvider lang={lang}>
        <ScrollGradient />
        {children}
        <SpeedBanner />
        <CookieConsentBanner />
      </I18nProvider>
    </>
  )
}
