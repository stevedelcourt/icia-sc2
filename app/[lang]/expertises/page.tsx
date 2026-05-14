'use client'

import { StaggerBlock, AnimatedCard } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'
import { BauhausIcon } from '@/components/BauhausIcon'

export default function ExpertisesPage() {
  const t = useT()

  const expertises = [
    {
      title: t('expertises.competence.1.title'),
      description: t('expertises.competence.1.desc'),
    },
    {
      title: t('expertises.competence.2.title'),
      description: t('expertises.competence.2.desc'),
    },
    {
      title: t('expertises.competence.3.title'),
      description: t('expertises.competence.3.desc'),
    },
    {
      title: t('expertises.competence.4.title'),
      description: t('expertises.competence.4.desc'),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.mariusia.com/expertises',
    name: 'Expertises IA - Marius IA',
    description: 'Audit IA et conformité AI Act, formation et acculturation des équipes, pilotage de la transformation IA, veille et conseil en continu.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
    },
    areaServed: ['FR', 'Europe'],
    serviceType: ['AI Consulting', 'AI Audit', 'AI Training', 'AI Compliance'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section pt-16 bg-secondary">
        <div className="container-mentivis">
          <section>
            <StaggerBlock className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="flex-1">
                <p className="t-caption uppercase tracking-widest mb-4">{t('expertises.label')}</p>
                <h1 className="t-display text-primary leading-tight mb-6 whitespace-pre-line">
                  {t('expertises.title')}
                </h1>
                <p className="t-lead">
                  {t('expertises.subtitle')}
                </p>
              </div>
              <div className="w-full lg:w-48 aspect-square flex-shrink-0 overflow-hidden">
                <BauhausIcon icon="01" />
              </div>
            </StaggerBlock>
          </section>

          <StaggerBlock delay={0.2} className="mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-8">{t('expertises.competences_title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {expertises.map((item, i) => (
                <AnimatedCard
                  key={item.title}
                  delay={i * 0.1}
                  className="p-8 bg-primary rounded-card shadow-card hover:shadow-card-full transition-all duration-300"
                >
                  <h3 className="t-heading text-primary mb-3">{item.title}</h3>
                  <p className="t-caption">{item.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </StaggerBlock>

          <StaggerBlock delay={0.4} className="text-center">
            <LocalizedLink href="/contact" className="btn-pill btn-black">
              {t('expertises.cta')}
              <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedLink>
          </StaggerBlock>
        </div>
      </main>
      <Footer />
    </>
  )
}
