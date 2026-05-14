'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider, AnimatedCard } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'
import { Picture } from '@/components/Picture'

export default function PartenairePage() {
  const t = useT()

  const niveaux = [
    { nom: t('offres.partenaire.niveaux.1.nom'), contenu: [t('offres.partenaire.niveaux.1.1'), t('offres.partenaire.niveaux.1.2'), t('offres.partenaire.niveaux.1.3')] },
    { nom: t('offres.partenaire.niveaux.2.nom'), contenu: [t('offres.partenaire.niveaux.2.1'), t('offres.partenaire.niveaux.2.2'), t('offres.partenaire.niveaux.2.3'), t('offres.partenaire.niveaux.2.4')] },
    { nom: t('offres.partenaire.niveaux.3.nom'), contenu: [t('offres.partenaire.niveaux.3.1'), t('offres.partenaire.niveaux.3.2'), t('offres.partenaire.niveaux.3.3'), t('offres.partenaire.niveaux.3.4')] },
  ]

  const navOffres = [
    { label: t('offres.nav.diagnostic'), href: '/diagnostic' },
    { label: t('offres.nav.formations'), href: '/formations' },
    { label: t('offres.nav.transformation'), href: '/transformation' },
    { label: t('offres.nav.partenaire'), href: '/partenaire' },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

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
    '@id': 'https://www.mariusia.com/partenaire',
    name: 'Partenaire Support Long Terme - Marius IA',
    description: 'Abonnement conseil IA : veille réglementaire, relecture de projets, alertes AI Act. 3 niveaux : Essentiel, Stratégique, Dirigeant.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
    },
    areaServed: ['FR', 'Europe'],
    serviceType: ['AI Consulting', 'Ongoing Support', 'Regulatory Monitoring'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section pt-16 bg-secondary">
        <div className="container-mentivis">
          <section>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <LocalizedLink href="/#offres" className="t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 mb-10 inline-block">{t('offres.shared.retour')}</LocalizedLink>
          </motion.div>

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
              <span className="t-caption uppercase tracking-widest">{t('offres.partenaire.num')}</span>
              <h1 className="t-display text-primary mt-3 mb-3">{t('offres.partenaire.title')}</h1>
              <p className="text-xl font-medium text-gray-600">{t('offres.partenaire.subtitle')}</p>
            </div>
            <div className="w-full lg:w-48 aspect-square flex-shrink-0 overflow-hidden">
              <Picture src="/images/illustrations/04-expert.webp" alt="Partenaire Support Long Terme" className="w-full h-full object-cover" width={192} height={192} />
            </div>
          </div>

          <AnimatedDivider />
          <StaggerBlock delay={0.1} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-5">{t('offres.partenaire.promesse.title')}</h2>
            <p className="t-title text-primary max-w-3xl leading-relaxed">{t('offres.partenaire.promesse.body')}</p>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-10">{t('offres.partenaire.niveaux.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {niveaux.map((niveau, i) => (
                <AnimatedCard 
                  key={niveau.nom} 
                  delay={i * 0.1}
                  className="p-10 transition-colors duration-300"
                >
                  <h3 className="text-xl font-medium text-black mb-4">{niveau.nom}</h3>
                  <ul className="space-y-3">
                    {niveau.contenu.map((item) => (
                      <li key={item} className="text-base text-gray-500 flex items-start gap-3">
                        <span className="text-gray-400">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AnimatedCard>
              ))}
            </div>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.4} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-3">{t('offres.partenaire.approche.title')}</h2>
            <p className="t-lead">{t('offres.partenaire.approche.body')}</p>
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
