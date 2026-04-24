import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import Script from 'next/script'
import ScrollGradient from '@/components/ScrollGradient'
import SpeedBanner from '@/components/SpeedBanner'
import CookieConsentBanner from '@/components/CookieConsent'
import { t } from '@/generated/content'
import './globals.css'

const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mariusia.com'),
  icons: {
    icon: '/images/favicon_io/favicon.ico',
    apple: '/images/favicon_io/apple-touch-icon.png',
  },
  title: {
    default: t('layout.seo.title.default'),
    template: t('layout.seo.title.template'),
  },
  description: t('layout.seo.description'),
  keywords: t('layout.seo.keywords').split(',').map(k => k.trim()),
  authors: [{ name: t('layout.seo.author'), url: 'https://www.mentivis.com' }],
  creator: t('layout.seo.creator'),
  publisher: t('layout.seo.publisher'),
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
    locale: 'fr_FR',
    url: 'https://www.mariusia.com',
    siteName: t('layout.og.site_name'),
    title: t('layout.og.title'),
    description: t('layout.og.description'),
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: t('layout.og.image.alt'),
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('layout.twitter.title'),
    description: t('layout.twitter.description'),
  },
  alternates: {
    canonical: 'https://www.mariusia.com',
    languages: {
      'fr-FR': 'https://www.mariusia.com',
    },
  },
  verification: {
    google: 'pEdbpM4Yo2aeiF2mUp1KU5sClwLo7xebz1TP1R450S0',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.mariusia.com/#organization',
  name: t('layout.ld_json.org.name'),
  alternateName: t('layout.ld_json.org.alternate_name'),
  url: 'https://www.mariusia.com',
  logo: 'https://www.mariusia.com/images/MariusIA-logo.svg',
  description: t('layout.ld_json.org.description'),
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
    contactType: t('layout.ld_json.org.contact_type'),
    email: 'contact@mariusia.com',
    areaServed: 'FR',
    availableLanguage: [t('layout.ld_json.org.available_language.fr'), t('layout.ld_json.org.available_language.en')],
  },
  parentOrganization: {
    '@type': 'Organization',
    name: t('layout.ld_json.org.parent_name'),
    url: 'https://www.mentivis.com',
  },
  location: {
    '@type': 'Place',
    name: t('layout.ld_json.org.location.name'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: t('layout.ld_json.org.location.city'),
      addressCountry: 'FR',
    },
  },
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.mariusia.com/#website',
  url: 'https://www.mariusia.com',
  name: t('layout.ld_json.website.name'),
  description: t('layout.ld_json.website.description'),
  publisher: { '@id': 'https://www.mariusia.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mariusia.com/contact',
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
      name: t('layout.ld_json.breadcrumb.home'),
      item: 'https://www.mariusia.com',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={workSans.variable}>
      <body className="antialiased bg-transparent text-text" style={{ fontFamily: 'Work Sans, sans-serif' }}>
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
        <ScrollGradient />
        {children}
        <SpeedBanner />
        <CookieConsentBanner />
      </body>
    </html>
  )
}