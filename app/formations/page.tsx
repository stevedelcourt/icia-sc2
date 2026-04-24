'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'

const programmes = [
  { nom: t('offres.formations.catalogue.1.nom'), contenu: t('offres.formations.catalogue.1.contenu'), duree: t('offres.formations.catalogue.1.duree') },
  { nom: t('offres.formations.catalogue.2.nom'), contenu: t('offres.formations.catalogue.2.contenu'), duree: t('offres.formations.catalogue.2.duree') },
  { nom: t('offres.formations.catalogue.3.nom'), contenu: t('offres.formations.catalogue.3.contenu'), duree: t('offres.formations.catalogue.3.duree') },
  { nom: t('offres.formations.catalogue.4.nom'), contenu: t('offres.formations.catalogue.4.contenu'), duree: t('offres.formations.catalogue.4.duree') },
  { nom: t('offres.formations.catalogue.5.nom'), contenu: t('offres.formations.catalogue.5.contenu'), duree: t('offres.formations.catalogue.5.duree') },
  { nom: t('offres.formations.catalogue.6.nom'), contenu: t('offres.formations.catalogue.6.contenu'), duree: t('offres.formations.catalogue.6.duree') },
]

const exemple = {
  contexte: t('offres.formations.exemple.contexte'),
  description: t('offres.formations.exemple.desc'),
  jalons: [
    { phase: "Audit", action: t('offres.formations.exemple.phase.1') },
    { phase: "Co-construction", action: t('offres.formations.exemple.phase.2') },
    { phase: "Formation", action: t('offres.formations.exemple.phase.3') },
    { phase: "Livraison", action: t('offres.formations.exemple.phase.4') },
    { phase: "Accompagnement", action: t('offres.formations.exemple.phase.5') },
  ],
}

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

const navOffres = [
  { label: t('offres.nav.diagnostic'), href: '/diagnostic' },
  { label: t('offres.nav.formations'), href: '/formations' },
  { label: t('offres.nav.transformation'), href: '/transformation' },
  { label: t('offres.nav.partenaire'), href: '/partenaire' },
]

export default function FormationsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const pathname = usePathname()

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
    '@id': 'https://www.mariusia.com/formations',
    name: 'Formations & Acculturation IA - Marius IA',
    description: 'Programmes de formation IA sur mesure par métier. Managers, commerciaux, RH, finance, support client, logistique.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
      url: 'https://www.mariusia.com',
    },
    areaServed: ['FR', 'Europe'],
    serviceType: ['AI Training', 'AI Acculturation', 'Professional Development'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: heroBackground }}>
        <div className="max-w-6xl mx-auto px-8">
          <section ref={heroRef}>
            <StaggerBlock delay={0}>
              <Link href="/#offres" className="text-base text-gray-400 hover:text-black transition-colors duration-200 mb-10 inline-block">{t('offres.shared.retour')}</Link>
            </StaggerBlock>

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
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`whitespace-nowrap px-4 py-3 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'} transition-colors`}
                    >
                      {item.label}
                    </Link>
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
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-5 py-3 text-sm ${isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'} transition-colors`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="mb-20">
            <span className="text-sm tracking-widest text-gray-400 uppercase">{t('offres.formations.num')}</span>
            <h1 className="text-4xl md:text-5xl  font-bold text-black mt-3 mb-3">{t('offres.formations.title')}</h1>
            <p className="text-xl font-medium text-gray-600">{t('offres.formations.subtitle')}</p>
          </div>

          <AnimatedDivider />
          <StaggerBlock delay={0.1} className="pt-14 mb-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-5">{t('offres.formations.promesse.title')}</h2>
            <p className="text-2xl text-black max-w-3xl leading-relaxed">{t('offres.formations.promesse.body')}</p>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-14 mb-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-8">{t('offres.formations.catalogue.title')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-5 pr-6 text-sm tracking-widest text-gray-400 uppercase font-normal">{t('offres.formations.catalogue.header.programme')}</th>
                    <th className="py-5 pr-6 text-sm tracking-widest text-gray-400 uppercase font-normal">{t('offres.formations.catalogue.header.contenu')}</th>
                    <th className="py-5 text-sm tracking-widest text-gray-400 uppercase font-normal">{t('offres.formations.catalogue.header.duree')}</th>
                  </tr>
                </thead>
                <tbody>
                  {programmes.map((p) => (
                    <tr key={p.nom} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-5 pr-6 font-medium text-black">{p.nom}</td>
                      <td className="py-5 pr-6 text-gray-500">{p.contenu}</td>
                      <td className="py-5 text-gray-400">{p.duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.3} className="pt-14 mb-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-6">{t('offres.formations.exemple.title')}</h2>
            <div className="bg-gray-50 p-10">
              <p className="font-medium text-black text-lg mb-3">{exemple.contexte}</p>
              <p className="text-gray-500 mb-8">{exemple.description}</p>
              <ul className="space-y-4">
                {exemple.jalons.map((j) => (
                  <li key={j.phase} className="flex gap-6 text-base">
                    <span className="text-gray-400 font-medium min-w-[120px]">{j.phase}</span>
                    <span className="text-gray-500">{j.action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerBlock>

          <motion.div className="flex gap-5" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Link href="/contact" className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-white hover:text-black transition-colors duration-200"><span className="md:hidden">{t('offres.shared.cta.contact_mobile')}</span><span className="hidden md:inline">{t('offres.shared.cta.contact')}</span></Link>
            <Link href="/" className="inline-block px-10 py-4 text-lg text-black border-2 border-gray-200 hover:border-black transition-colors duration-200"><span className="md:hidden">{t('offres.shared.cta.retour_mobile')}</span><span className="hidden md:inline">{t('offres.shared.cta.retour')}</span></Link>
          </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
