import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollExpandSection } from '@/components/ScrollExpandSection'
import { AnimatedDivider, FadeIn } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'
import { LocalizedLink } from '@/lib/i18n'
import { Picture } from '@/components/Picture'

export default function AProposPage({ params }: { params: { lang: string } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.mariusia.com/a-propos',
    name: 'À propos - Marius IA',
    description: 'Marius IA est l\'institut collectif de l\'IA. Conseil en stratégie IA, conformité AI Act, gouvernance IA pour PME, ETI et organisations françaises.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
      url: 'https://www.mariusia.com',
      logo: 'https://www.mariusia.com/MariusIA-logo.svg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 boulevard Jacques Saadé',
        addressLocality: 'Marseille',
        postalCode: '13002',
        addressCountry: 'FR'
      },
      areaServed: ['Europe', 'France'],
      sameAs: ['https://www.mentivis.com']
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section pt-16 bg-warm">
        <div className="container-mentivis">
          <FadeIn>
            <p className="t-caption uppercase tracking-widest mb-4">{t(params.lang as Locale, 'a_propos.label')}</p>
            <h1 className="t-display text-primary mb-16 whitespace-pre-line">
              {t(params.lang as Locale, 'a_propos.title')}
            </h1>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-20 mb-24">
            <FadeIn delay={0.1}>
              <p className="t-lead mb-8">
                {t(params.lang as Locale, 'a_propos.paragraph.1')}
              </p>
              <p className="t-lead">
                {t(params.lang as Locale, 'a_propos.paragraph.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <div className="flex items-start gap-12 mb-6">
                <img
                  src="/images/MariusIA-logo-grey-monogram.svg"
                  alt="Marius IA"
                  className="h-[70px] w-auto"
                  width="70"
                  height="70"
                />
                <img
                  src="/images/cyber-campus-logo.svg"
                  alt="Campus Cyber.AI"
                  className="h-[50px] md:h-[70px] w-auto"
                  width="150"
                  height="70"
                />
              </div>
              <p className="t-lead">
                {t(params.lang as Locale, 'a_propos.paragraph.3')}
              </p>
            </FadeIn>
          </div>

          <ScrollExpandSection>
            <FadeIn>
              <p className="t-caption uppercase tracking-widest text-white mb-4">{t(params.lang as Locale, 'a_propos.institut.label')}</p>
              <h2 className="t-title text-white mb-8">{t(params.lang as Locale, 'a_propos.institut.title')}</h2>
            </FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn delay={0.1}>
                <p className="t-lead text-white">
                  {t(params.lang as Locale, 'a_propos.institut.paragraph.1')}
                </p>
              </FadeIn>
              <FadeIn delay={0.2} direction="left">
                <h3 className="t-heading text-white mb-4">{t(params.lang as Locale, 'a_propos.institut.mission_title')}</h3>
                <p className="t-lead text-white mb-6">
                  {t(params.lang as Locale, 'a_propos.institut.mission')}
                </p>
                <p className="t-lead text-white">
                  {t(params.lang as Locale, 'a_propos.institut.vision')}
                </p>
              </FadeIn>
            </div>
          </ScrollExpandSection>

          <AnimatedDivider />
          <div className="pt-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <h2 className="t-display text-primary mb-8">
                  <a
                    href="https://campuscyber.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary hover:underline hover:underline-offset-4 transition-colors"
                  >
                    {t(params.lang as Locale, 'a_propos.campus.title')}
                  </a>
                </h2>
                <p className="t-lead">
                  {t(params.lang as Locale, 'a_propos.campus.paragraph')}
                </p>
              </FadeIn>
              <FadeIn delay={0.15} direction="left">
                <Picture
                  src="/images/cybercampus.webp"
                  alt="Campus Cyber.AI"
                  className="w-full md:w-[400px] h-auto object-cover self-start ml-auto rounded-card"
                />
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.1} className="mt-16">
            <LocalizedLink href="/contact" className="btn-pill btn-black">
              {t(params.lang as Locale, 'a_propos.cta')}
              <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedLink>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
