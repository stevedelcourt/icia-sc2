import type { Metadata } from 'next'
import { I18nProvider } from '@/lib/i18n'
import { LangSetter } from '@/components/LangSetter'
import CookieConsentDeferred from '@/components/cookie-consent-deferred'
import { t, type Locale } from '@/generated/content'
import '@/app/globals.css'

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  return {
    metadataBase: new URL('https://iciafrance.com'),
    icons: {
      icon: [
        { url: '/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/favicon_io/favicon.ico', sizes: '48x48' },
      ],
      apple: [
        { url: '/images/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { url: '/images/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/images/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    title: {
      default: t(lang, 'layout.seo.title.default'),
      template: t(lang, 'layout.seo.title.template'),
    },
    description: t(lang, 'layout.seo.description'),
    keywords: t(lang, 'layout.seo.keywords').split(',').map(k => k.trim()),
    authors: [{ name: t(lang, 'layout.seo.author'), url: 'https://iciafrance.com' }],
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
      url: `https://iciafrance.com/${lang}/`,
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
    '@id': 'https://iciafrance.com/#organization',
    name: t(lang, 'layout.ld_json.org.name'),
    alternateName: t(lang, 'layout.ld_json.org.alternate_name'),
    url: 'https://iciafrance.com',
    logo: 'https://iciafrance.com/images/ICIA-logo.svg',
    description: t(lang, 'layout.ld_json.org.description'),
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Europe' },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'AI Education',
      'AI Skills',
      'Digital Inclusion',
      'AI Ethics',
      'AI Governance',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: t(lang, 'layout.ld_json.org.contact_type'),
      email: 'contact@iciafrance.com',
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
        streetAddress: '4 boulevard Jacques Saadé',
        addressLocality: t(lang, 'layout.ld_json.org.location.city'),
        addressRegion: 'Bouches-du-Rhône',
        postalCode: '13002',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '43.313887',
        longitude: '5.366328',
      },
    },
  }

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://iciafrance.com/#website',
    url: 'https://iciafrance.com',
    name: t(lang, 'layout.ld_json.website.name'),
    description: t(lang, 'layout.ld_json.website.description'),
    publisher: { '@id': 'https://iciafrance.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://iciafrance.com/${lang}/contact`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang={lang}>
      <body className="antialiased bg-primary text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XYGJWJ0SQQ" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XYGJWJ0SQQ');` }} />
        <LangSetter lang={lang} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <I18nProvider lang={lang}>
          {children}
        </I18nProvider>
        <CookieConsentDeferred lang={lang} />
      </body>
    </html>
  )
}
