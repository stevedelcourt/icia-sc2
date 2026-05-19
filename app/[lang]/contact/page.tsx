import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactFormClient } from './ContactFormClient'

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://www.iciafrance.com/contact',
    name: 'Contact — ICIA',
    description: "Contactez l'Institut Collectif de l'IA.",
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.iciafrance.com/#organization',
      name: "Institut Collectif de l'IA",
      contactPoint: { '@type': 'ContactPoint', contactType: 'public contact', availableLanguage: ['French', 'English'], areaServed: ['FR', 'Europe'] },
      address: { '@type': 'PostalAddress', streetAddress: '4 boulevard Jacques Saadé', addressLocality: 'Marseille', postalCode: '13002', addressCountry: 'FR' }
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <Suspense fallback={
        <main className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))', minHeight: '60vh' }}>
          <div className="container-mentivis">
            <p className="t-lead">Chargement...</p>
          </div>
        </main>
      }>
        <ContactFormClient />
      </Suspense>
      <Footer />
    </>
  )
}
