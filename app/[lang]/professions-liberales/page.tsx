'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'
import { Picture } from '@/components/Picture'

export default function ProfessionsLiberalesPage() {
  const t = useT()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const navActeurs = [
    { label: t('acteurs.nav.entreprises'), href: '/entreprises' },
    { label: t('acteurs.nav.professions_liberales'), href: '/professions-liberales' },
    { label: t('acteurs.nav.ecoles'), href: '/education' },
    { label: t('acteurs.nav.creatifs'), href: '/secteurs-creatifs' },
    { label: t('acteurs.nav.collectivites'), href: '/pouvoirs-publics' },
    { label: t('acteurs.nav.grand_public'), href: '/citoyens' },
  ]

  const axes = [
    { title: t('acteurs.professions_liberales.axes.1.title'), description: t('acteurs.professions_liberales.axes.1.desc') },
    { title: t('acteurs.professions_liberales.axes.2.title'), description: t('acteurs.professions_liberales.axes.2.desc') },
    { title: t('acteurs.professions_liberales.axes.3.title'), description: t('acteurs.professions_liberales.axes.3.desc') },
    { title: t('acteurs.professions_liberales.axes.4.title'), description: t('acteurs.professions_liberales.axes.4.desc') },
    { title: t('acteurs.professions_liberales.axes.5.title'), description: t('acteurs.professions_liberales.axes.5.desc') },
    { title: t('acteurs.professions_liberales.axes.6.title'), description: t('acteurs.professions_liberales.axes.6.desc') },
  ]

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
    '@id': 'https://www.mariusia.com/professions-liberales',
    name: 'Conseil IA pour Professions Libérales - Marius IA',
    description: 'Accompagnement IA pour professions libérales : droit, médecine, comptabilité, architecture. Veille réglementaire, sécurité des données, outils adaptés.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
    },
    areaServed: ['FR'],
    serviceType: ['AI Consulting', 'Professional Services', 'Regulatory Compliance'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section pt-16 bg-secondary">
        <div className="container-mentivis">
          <section>
          <nav className="mb-12 md:mb-16">
            <div className="lg:hidden relative flex items-center">
              <button
                onClick={() => scrollMenu('left')}
                className={`absolute left-0 z-10 transition-opacity flex items-center justify-center ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'var(--bg-secondary)', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll left"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                ref={scrollRef}
                className="flex gap-4 t-caption text-secondary pl-7 pr-7 overflow-x-auto scrollbar-hide whitespace-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', background: 'var(--bg-secondary)' }}
              >
                {navActeurs.map((item) => (
                  <LocalizedLink key={item.href} href={item.href} className={`hover:text-black hover:underline hover:underline-offset-4 transition-colors duration-200 flex-shrink-0 ${item.href === '/professions-liberales' ? 'text-black font-medium' : ''}`}>
                    {item.label}
                  </LocalizedLink>
                ))}
              </div>
              <button
                onClick={() => scrollMenu('right')}
                className={`absolute right-0 z-10 transition-opacity flex items-center justify-center ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'var(--bg-secondary)', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll right"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex gap-8 t-caption text-secondary">
              {navActeurs.map((item) => (
                <LocalizedLink key={item.href} href={item.href} className={`hover:text-black hover:underline hover:underline-offset-4 transition-colors duration-200 ${item.href === '/professions-liberales' ? 'text-black font-medium' : ''}`}>
                  {item.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
            <StaggerBlock>
              <p className="t-caption uppercase tracking-widest mb-4">{t('acteurs.shared.label')}</p>
              <h1 className="t-display text-primary leading-tight mb-6">{t('acteurs.professions_liberales.title')}</h1>
              <p className="t-lead mb-8">{t('acteurs.professions_liberales.hero')}</p>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t('acteurs.shared.cta')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </StaggerBlock>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:pt-20 w-full lg:w-[500px] aspect-square overflow-hidden flex-shrink-0">
              <Picture src="/images/illustrations/lawyer.webp" alt="Professions libérales" className="w-full h-full object-cover" width={500} height={500} />
            </motion.div>
          </div>
          </section>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-16">
            <h2 className="t-caption uppercase tracking-widest mb-12">{t('acteurs.shared.axes_title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {axes.map((axe) => (
                <div key={axe.title} className="p-10 transition-colors duration-300">
                  <h3 className="t-heading text-primary mb-3">{axe.title}</h3>
                  <p className="text-secondary">{axe.description}</p>
                </div>
              ))}
            </div>
          </StaggerBlock>
        </div>
      </main>
      <Footer />
    </>
  )
}
