'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { CounterNumber } from '@/components/CounterNumber'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'
import { Picture } from '@/components/Picture'

export default function DiagnosticPage() {
  const t = useT()

  const livrables = [
    'offres.diagnostic.contenu.1',
    'offres.diagnostic.contenu.2',
    'offres.diagnostic.contenu.3',
    'offres.diagnostic.contenu.4',
    'offres.diagnostic.contenu.5',
    'offres.diagnostic.contenu.6',
  ] as const

  const exemple = {
    contexte: t('offres.diagnostic.exemple.contexte'),
    description: t('offres.diagnostic.exemple.desc'),
    jalons: [
      { phase: "J1-J3", action: t('offres.diagnostic.exemple.phase.1') },
      { phase: "J4-J10", action: t('offres.diagnostic.exemple.phase.2') },
      { phase: "J11-J15", action: t('offres.diagnostic.exemple.phase.3') },
      { phase: "J15-J18", action: t('offres.diagnostic.exemple.phase.4') },
      { phase: "J20", action: t('offres.diagnostic.exemple.phase.5') },
    ],
  }

  const navOffres = [
    { label: t('offres.nav.diagnostic'), href: '/diagnostic' },
    { label: t('offres.nav.formations'), href: '/formations' },
    { label: t('offres.nav.transformation'), href: '/transformation' },
    { label: t('offres.nav.partenaire'), href: '/partenaire' },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 10)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }

    updateScrollButtons()
    container.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      container.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scrollMenu = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.7
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.mariusia.com/diagnostic',
    name: 'Diagnostic IA & AI Act - Marius IA',
    description: 'Cartographie des usages IA, analyse des risques réglementaires AI Act, feuille de route 12 mois. Duration 4-6 semaines.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
      url: 'https://www.mariusia.com',
    },
    areaServed: ['FR', 'Europe'],
    serviceType: ['AI Audit', 'AI Compliance', 'AI Strategy'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Diagnostic IA',
      description: 'Porte d\'entrée universelle pour comprendre votre positionnement IA',
      url: 'https://www.mariusia.com/diagnostic',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que l\'AI Act et quand entre-t-il en vigueur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'AI Act (Règlement européen sur l\'intelligence artificielle) entre pleinement en vigueur en août 2026. Il impose des obligations spécifiques aux organisations utilisant des systèmes IA, notamment pour les systèmes dits "à haut risque" couvrant la santé, la justice, l\'éducation, l\'emploi, les services financiers et les administrations publiques.'
        }
      },
      {
        '@type': 'Question',
        name: 'Combien de temps dure un diagnostic IA ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un diagnostic IA complet dure généralement 4 à 6 semaines. Il inclut la cartographie des usages, l\'analyse des risques réglementaires, l\'identification des cas d\'usage prioritaires et une feuille de route sur 12 mois.'
        }
      },
      {
        '@type': 'Question',
        name: 'À qui s\'adresse le diagnostic IA ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le diagnostic IA s\'adresse à toutes les organisations françaises et européennes confrontées à l\'adoption de l\'IA : PME, ETI, écoles, administrations, collectivités, industries créatives et professions libérales. Il est particulièrement recommandé avant toute transformation majeure.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pourquoi faire appel à un conseil indépendant ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Marius IA n\'est lié à aucun éditeur ou intégrateur. Cette indépendance garantit que nos recommandations servent uniquement vos intérêts, sans conflit d\'intérêt. Vous gardez la maîtrise de vos choix technologiques et de vos prestataires.'
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main className="section pt-16 bg-secondary">
        <div className="container-mentivis">
          <section>
            <StaggerBlock delay={0}>
              <LocalizedLink href="/#offres" className="t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 mb-10 inline-block">{t('offres.shared.retour')}</LocalizedLink>
            </StaggerBlock>

            <nav className="mb-12 md:mb-16">
              <div className="lg:hidden relative flex items-center">
                <button
                  onClick={() => scrollMenu('left')}
                  className={`absolute left-0 z-10 transition-opacity flex items-center justify-center ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ background: 'var(--bg-warm)', width: '32px', height: '32px', padding: 0 }}
                  aria-label="Scroll left"
                >
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div
                  ref={scrollRef}
                  className="flex gap-6 overflow-x-auto"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', background: 'var(--bg-warm)' }}
                >
                  {navOffres.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <LocalizedLink
                        key={item.href}
                        href={item.href}
                        className={`whitespace-nowrap px-4 py-3 ${isActive ? 't-nav text-primary' : 't-nav text-tertiary hover:text-primary hover:underline hover:underline-offset-4'} transition-colors`}
                      >
                        {item.label}
                      </LocalizedLink>
                    )
                  })}
                </div>
                <button
                  onClick={() => scrollMenu('right')}
                  className={`absolute right-0 z-10 transition-opacity flex items-center justify-center ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ background: 'var(--bg-warm)', width: '32px', height: '32px', padding: 0 }}
                  aria-label="Scroll right"
                >
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:flex gap-6 bg-warm">
                {navOffres.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <LocalizedLink
                      key={item.href}
                      href={item.href}
                      className={`px-5 py-3 ${isActive ? 't-nav text-primary' : 't-nav text-tertiary hover:text-primary hover:underline hover:underline-offset-4'} transition-colors`}
                    >
                      {item.label}
                    </LocalizedLink>
                  )
                })}
              </div>
            </nav>

            <div className="mb-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="t-caption uppercase tracking-widest">{t('offres.diagnostic.num')}</span>
                <h1 className="t-display text-primary mt-3 mb-3">{t('offres.diagnostic.title')}</h1>
                <p className="text-xl font-medium text-gray-600">{t('offres.diagnostic.subtitle')}</p>
              </div>
              <div className="w-full lg:w-48 aspect-square flex-shrink-0 overflow-hidden">
                <Picture src="/images/illustrations/01- ia.webp" alt="Diagnostic IA" className="w-full h-full object-cover" width={192} height={192} />
              </div>
            </div>

            <AnimatedDivider />
            <StaggerBlock delay={0.1} className="pt-14 mb-16">
              <h2 className="t-caption uppercase tracking-widest mb-5">{t('offres.diagnostic.promesse.title')}</h2>
              <p className="t-title text-primary max-w-3xl leading-relaxed">
                {(() => {
                  const [before, after] = t('offres.diagnostic.promesse.body').split('{duree}')
                  return (
                    <>
                      {before}
                      <CounterNumber target={4} suffix=" à 6 semaines" />
                      {after}
                    </>
                  )
                })()}
              </p>
            </StaggerBlock>

            <AnimatedDivider />
            <StaggerBlock delay={0.2} className="pt-14 mb-16">
              <h2 className="t-caption uppercase tracking-widest mb-8">{t('offres.diagnostic.contenu.title')}</h2>
              <ul className="space-y-5">
                {livrables.map((item, i) => (
                  <li key={item} className="flex items-start gap-5 text-black text-lg">
                    <span className="text-gray-400 mt-1">-</span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </StaggerBlock>

            <AnimatedDivider />
            <StaggerBlock delay={0.3} className="pt-14 mb-16">
              <h2 className="t-caption uppercase tracking-widest mb-6">{t('offres.diagnostic.exemple.title')}</h2>
              <div className="bg-gray-50 p-10">
                <p className="font-medium text-black text-lg mb-3">{exemple.contexte}</p>
                <p className="t-lead mb-8">{exemple.description}</p>
                <ul className="space-y-4">
                  {exemple.jalons.map((j) => (
                    <li key={j.phase} className="flex gap-6 text-base">
                      <span className="text-gray-400 font-medium min-w-[60px]">{j.phase}</span>
                      <span className="text-gray-500">{j.action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerBlock>

            <AnimatedDivider />
            <StaggerBlock delay={0.4} className="pt-14 mb-16">
              <h2 className="t-caption uppercase tracking-widest mb-3">{t('offres.diagnostic.levier.title')}</h2>
              <p className="t-lead">
                {(() => {
                  const [beforeAnnee, rest] = t('offres.diagnostic.levier.body').split('{annee}')
                  const [beforeMontant, afterMontant] = rest.split('{montant}')
                  return (
                    <>
                      {beforeAnnee}
                      <CounterNumber target={2026} />
                      {beforeMontant}
                      <CounterNumber target={1500} prefix="" suffix="" />
                      {afterMontant}
                    </>
                  )
                })()}
              </p>
            </StaggerBlock>

            <motion.div className="flex gap-5" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t('offres.shared.cta.contact')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
              <LocalizedLink href="/" className="btn-pill btn-warm">{t('offres.shared.cta.retour')}</LocalizedLink>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
