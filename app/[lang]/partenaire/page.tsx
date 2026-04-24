'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider, AnimatedCard } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'

const COLORS = {
  green: { r: 189, g: 245, b: 171 },
  white: { r: 255, g: 255, b: 255 },
}

function interpolateToWhite(progress: number): string {
  const { r, g, b } = COLORS.green
  const { r: r2, g: g2, b: b2 } = COLORS.white
  const eased = 1 - Math.pow(1 - progress, 5)
  const R = Math.round(r + (r2 - r) * eased)
  const G = Math.round(g + (g2 - g) * eased)
  const B = Math.round(b + (b2 - b) * eased)
  return `rgb(${R}, ${G}, ${B})`
}

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

  const heroRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect()
      const heroHeight = hero.offsetHeight
      const maxScroll = heroHeight * 1.5
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const heroBackground = interpolateToWhite(scrollProgress)

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
      <main className="pt-36 pb-24" style={{ backgroundColor: heroBackground }}>
        <div className="max-w-6xl mx-auto px-8">
          <section ref={heroRef}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <LocalizedLink href="/#offres" className="text-base text-gray-400 hover:text-black transition-colors duration-200 mb-10 inline-block">{t('offres.shared.retour')}</LocalizedLink>
          </motion.div>

          <nav className="mb-12 md:mb-16">
            <div className="lg:hidden relative flex items-center">
              <button
                onClick={() => scrollMenu('left')}
                className={`absolute left-0 z-10 transition-opacity flex items-center justify-center ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: '#bdf5ab', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll left"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', background: '#bdf5ab' }}
              >
                {navOffres.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <LocalizedLink
                      key={item.href}
                      href={item.href}
                      className={`whitespace-nowrap px-4 py-3 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'} transition-colors`}
                    >
                      {item.label}
                    </LocalizedLink>
                  )
                })}
              </div>
              <button
                onClick={() => scrollMenu('right')}
                className={`absolute right-0 z-10 transition-opacity flex items-center justify-center ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: '#bdf5ab', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll right"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex gap-6" style={{ background: '#bdf5ab' }}>
              {navOffres.map((item) => {
                const isActive = pathname === item.href
                return (
                  <LocalizedLink
                    key={item.href}
                    href={item.href}
                    className={`px-5 py-3 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'} transition-colors`}
                  >
                    {item.label}
                  </LocalizedLink>
                )
              })}
            </div>
          </nav>

          <div className="mb-20">
            <span className="text-sm tracking-widest text-gray-400 uppercase">{t('offres.partenaire.num')}</span>
            <h1 className="text-4xl md:text-5xl  font-bold text-black mt-3 mb-3">{t('offres.partenaire.title')}</h1>
            <p className="text-xl font-medium text-gray-600">{t('offres.partenaire.subtitle')}</p>
          </div>

          <AnimatedDivider />
          <StaggerBlock delay={0.1} className="pt-14 mb-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-5">{t('offres.partenaire.promesse.title')}</h2>
            <p className="text-2xl text-black max-w-3xl leading-relaxed">{t('offres.partenaire.promesse.body')}</p>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-14 mb-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-10">{t('offres.partenaire.niveaux.title')}</h2>
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
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-3">{t('offres.partenaire.approche.title')}</h2>
            <p className="text-lg text-gray-500">{t('offres.partenaire.approche.body')}</p>
          </StaggerBlock>

          <motion.div className="flex gap-5" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <LocalizedLink href="/contact" className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-white hover:text-black transition-colors duration-200"><span className="md:hidden">{t('offres.shared.cta.contact_mobile')}</span><span className="hidden md:inline">{t('offres.shared.cta.contact')}</span></LocalizedLink>
            <LocalizedLink href="/" className="inline-block px-10 py-4 text-lg text-black border-2 border-gray-200 hover:border-black transition-colors duration-200"><span className="md:hidden">{t('offres.shared.cta.retour_mobile')}</span><span className="hidden md:inline">{t('offres.shared.cta.retour')}</span></LocalizedLink>
          </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
