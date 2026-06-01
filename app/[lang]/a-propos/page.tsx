import { pageMetadata } from '@/lib/seo-metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'
import { LocalizedLink } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, '/a-propos')
}

export default function AProposPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://iciafrance.com/a-propos',
    name: 'À propos, ICIA',
    description: 'L\'Institut Collectif de l\'IA (ICIA) est une association loi 1901 dédiée aux enjeux collectifs de l\'intelligence artificielle.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://iciafrance.com/#organization',
      name: 'Institut Collectif de l\'IA',
      url: 'https://iciafrance.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 boulevard Jacques Saadé',
        addressLocality: 'Marseille',
        postalCode: '13002',
        addressCountry: 'FR'
      },
      areaServed: ['France', 'Europe'],
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section" style={{ backgroundColor: '#ffffff', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <FadeIn>
            <p className="eyebrow">{t(lang, 'a_propos.label')}</p>
            <h1 className="t-display text-primary" style={{ marginBottom: '48px' }}>
              {t(lang, 'a_propos.title')}
            </h1>
          </FadeIn>

            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.body.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.body.3')}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="t-lead" style={{ marginBottom: '64px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.body.4')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                {t(lang, 'a_propos.mission.title')}
              </h2>
              <p className="t-lead" style={{ marginBottom: '48px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.mission.body')}
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                {t(lang, 'a_propos.gouvernance.title')}
              </h2>
              <p className="t-lead" style={{ marginBottom: '48px', maxWidth: '680px' }}>
                {t(lang, 'a_propos.gouvernance.body')}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="t-caption" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                {t(lang, 'a_propos.adresse')}
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div style={{ marginTop: '48px' }}>
                <LocalizedLink href="/contact" className="btn-pill btn-black">
                  {t(lang, 'header.cta')}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </LocalizedLink>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div style={{ marginTop: '64px' }}>
                <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, color: '#000', marginBottom: '12px' }}>
                  {lang === 'fr' ? 'Notre manifeste' : 'Our manifesto'}
                </h3>
                <p className="t-lead" style={{ marginBottom: '20px', maxWidth: '680px' }}>
                  {lang === 'fr'
                    ? "Dix principes qui engagent ce que nous sommes, ce que nous refusons, et ce que nous construisons. L'intelligence artificielle ne peut pas rester la chose de quelques-uns."
                    : 'Ten principles that commit what we are, what we refuse, and what we build. Artificial intelligence cannot remain the domain of the few.'}
                </p>
                <LocalizedLink href="/manifeste" className="btn-pill btn-black">
                  {lang === 'fr' ? 'Lire le manifeste' : 'Read the manifesto'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
              </div>
            </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
