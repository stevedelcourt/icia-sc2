'use client'

import { StaggerBlock, AnimatedCard } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'
import Link from 'next/link'

const expertises = [
  {
    title: t('expertises.competence.1.title'),
    description: t('expertises.competence.1.desc')
  },
  {
    title: t('expertises.competence.2.title'),
    description: t('expertises.competence.2.desc')
  },
  {
    title: t('expertises.competence.3.title'),
    description: t('expertises.competence.3.desc')
  },
  {
    title: t('expertises.competence.4.title'),
    description: t('expertises.competence.4.desc')
  },
]

export default function ExpertisesPage() {
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
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-6xl mx-auto px-8">
          <StaggerBlock
            className="flex flex-col md:flex-row items-center gap-8 mb-16"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('expertises.label')}</p>
              <h1 className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6">
                {t('expertises.title').split('\n')[0]}<br className="hidden sm:block" />{t('expertises.title').split('\n')[1]}
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto md:mx-0">
                {t('expertises.subtitle')}
              </p>
            </div>
            <div className="w-full md:w-[400px] flex-shrink-0">
              <img src="/images/worker.webp" alt="Expert" className="w-full h-auto" />
            </div>
          </StaggerBlock>

          <StaggerBlock
            delay={0.2}
            className="mb-16"
          >
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('expertises.competences_title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {expertises.map((item, i) => (
                <AnimatedCard
                  key={item.title}
                  delay={i * 0.1}
                  className="p-8 bg-white hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </StaggerBlock>

          <StaggerBlock
            delay={0.4}
            className="text-center"
          >
            <Link href="/contact" className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-white hover:text-black transition-all duration-200">
              {t('expertises.cta')}
            </Link>
          </StaggerBlock>
        </div>
      </main>
      <Footer />
    </>
  )
}
