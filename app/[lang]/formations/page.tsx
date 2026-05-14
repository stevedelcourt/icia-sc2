'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'
import { Picture } from '@/components/Picture'

export default function FormationsPage() {
  const t = useT()

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
              <span className="t-caption uppercase tracking-widest">{t('offres.formations.num')}</span>
              <h1 className="t-display text-primary mt-3 mb-3">{t('offres.formations.title')}</h1>
              <p className="text-xl font-medium text-gray-600">{t('offres.formations.subtitle')}</p>
            </div>
            <div className="w-full lg:w-48 aspect-square flex-shrink-0 overflow-hidden">
              <Picture src="/images/illustrations/02-equipe.webp" alt="Formations IA" className="w-full h-full object-cover" width={192} height={192} />
            </div>
          </div>

          <AnimatedDivider />
          <StaggerBlock delay={0.1} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-5">{t('offres.formations.promesse.title')}</h2>
            <p className="t-title text-primary max-w-3xl leading-relaxed">{t('offres.formations.promesse.body')}</p>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-8">{t('offres.formations.catalogue.title')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-5 pr-6 t-caption uppercase tracking-widest font-normal">{t('offres.formations.catalogue.header.programme')}</th>
                    <th className="py-5 pr-6 t-caption uppercase tracking-widest font-normal">{t('offres.formations.catalogue.header.contenu')}</th>
                    <th className="py-5 t-caption uppercase tracking-widest font-normal">{t('offres.formations.catalogue.header.duree')}</th>
                  </tr>
                </thead>
                <tbody>
                  {programmes.map((p) => (
                    <tr key={p.nom} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-5 pr-6 font-medium text-black">{p.nom}</td>
                      <td className="py-5 pr-6 t-lead">{p.contenu}</td>
                      <td className="py-5 text-gray-400">{p.duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </StaggerBlock>

          <AnimatedDivider />
          <StaggerBlock delay={0.3} className="pt-14 mb-16">
            <h2 className="t-caption uppercase tracking-widest mb-6">{t('offres.formations.exemple.title')}</h2>
            <div className="bg-gray-50 p-10">
              <p className="font-medium text-black text-lg mb-3">{exemple.contexte}</p>
              <p className="t-lead mb-8">{exemple.description}</p>
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
