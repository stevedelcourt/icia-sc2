'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useT, LocalizedLink } from '@/lib/i18n'

const COLORS = {
  blue: { r: 174, g: 189, b: 219 },
  white: { r: 255, g: 255, b: 255 },
}

function interpolateToWhite(progress: number): string {
  const { r, g, b } = COLORS.blue
  const { r: r2, g: g2, b: b2 } = COLORS.white
  const eased = 1 - Math.pow(1 - progress, 5)
  const R = Math.round(r + (r2 - r) * eased)
  const G = Math.round(g + (g2 - g) * eased)
  const B = Math.round(b + (b2 - b) * eased)
  return `rgb(${R}, ${G}, ${B})`
}

export default function CitoyensPage() {
  const t = useT()
  const heroRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
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
    { title: t('acteurs.grand_public.axes.1.title'), description: t('acteurs.grand_public.axes.1.desc') },
    { title: t('acteurs.grand_public.axes.2.title'), description: t('acteurs.grand_public.axes.2.desc') },
    { title: t('acteurs.grand_public.axes.3.title'), description: t('acteurs.grand_public.axes.3.desc') },
    { title: t('acteurs.grand_public.axes.4.title'), description: t('acteurs.grand_public.axes.4.desc') },
  ]

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const offset = -rect.top
      const maxOffset = hero.offsetHeight - window.innerHeight * 0.3
      const progress = Math.min(Math.max(offset / Math.max(maxOffset, 1), 0), 1)
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
    '@id': 'https://www.mariusia.com/citoyens',
    name: 'IA pour le Grand Public - Marius IA',
    description: 'Acculturation à l\'IA, sécurité et éthique, emploi et reconversion, passerelles vers la formation pour les citoyens.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
    },
    areaServed: ['FR'],
    serviceType: ['Public AI Education', 'Digital Literacy', 'AI Awareness'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-36 pb-24" style={{ background: heroBackground }}>
        <div className="max-w-6xl mx-auto px-8">
          <section ref={heroRef}>
          <nav className="mb-12 md:mb-16">
            <div className="lg:hidden relative flex items-center">
              <button
                onClick={() => scrollMenu('left')}
                className={`absolute left-0 z-10 transition-opacity flex items-center justify-center ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: '#aebddb', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll left"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                ref={scrollRef}
                className="flex gap-4 text-sm text-gray-400 pl-7 pr-7 overflow-x-auto scrollbar-hide whitespace-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', background: '#aebddb' }}
              >
                {navActeurs.map((item) => (
                  <LocalizedLink key={item.href} href={item.href} className={`hover:text-black transition-colors duration-200 flex-shrink-0 ${item.href === '/citoyens' ? 'text-black font-medium' : ''}`}>
                    {item.label}
                  </LocalizedLink>
                ))}
              </div>
              <button
                onClick={() => scrollMenu('right')}
                className={`absolute right-0 z-10 transition-opacity flex items-center justify-center ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ background: '#aebddb', width: '32px', height: '32px', padding: 0 }}
                aria-label="Scroll right"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex gap-8 text-sm text-gray-400">
              {navActeurs.map((item) => (
                <LocalizedLink key={item.href} href={item.href} className={`hover:text-black transition-colors duration-200 ${item.href === '/citoyens' ? 'text-black font-medium' : ''}`}>
                  {item.label}
                </LocalizedLink>
              ))}
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
            <StaggerBlock>
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('acteurs.shared.label')}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">{t('acteurs.grand_public.title')}</h1>
              <p className="text-xl font-medium text-gray-600 mb-10">{t('acteurs.grand_public.hero')}</p>
              <LocalizedLink href="/contact" className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200">{t('acteurs.grand_public.cta')}</LocalizedLink>
            </StaggerBlock>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:pt-20">
              <img src="/images/grandpublic.webp" alt="Grand public" className="w-full" />
            </motion.div>
          </div>
          </section>

          <AnimatedDivider />
          <StaggerBlock delay={0.2} className="pt-16">
            <h2 className="text-sm tracking-widest text-gray-400 uppercase mb-12">{t('acteurs.shared.axes_title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {axes.map((axe) => (
                <div key={axe.title} className="p-10 transition-colors duration-300">
                  <h3 className="text-xl text-black mb-3">{axe.title}</h3>
                  <p className="text-gray-500">{axe.description}</p>
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
