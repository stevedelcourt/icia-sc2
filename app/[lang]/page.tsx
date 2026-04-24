'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock, AnimatedDivider, AnimatedCard } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'

const COLORS = {
  blue: { r: 174, g: 189, b: 219 },
  cream: { r: 249, g: 247, b: 243 },
  white: { r: 255, g: 255, b: 255 },
}

function interpolateColor(progress: number): string {
  const { r, g, b } = COLORS.blue
  const { r: r2, g: g2, b: b2 } = COLORS.cream
  const eased = 1 - Math.pow(1 - progress, 3)
  const R = Math.round(r + (r2 - r) * eased)
  const G = Math.round(g + (g2 - g) * eased)
  const B = Math.round(b + (b2 - b) * eased)
  return `rgb(${R}, ${G}, ${B})`
}

function interpolateToWhite(progress: number): string {
  const { r, g, b } = COLORS.blue
  const { r: r2, g: g2, b: b2 } = COLORS.white
  const eased = 1 - Math.pow(1 - progress, 3)
  const R = Math.round(r + (r2 - r) * eased)
  const G = Math.round(g + (g2 - g) * eased)
  const B = Math.round(b + (b2 - b) * eased)
  return `rgb(${R}, ${G}, ${B})`
}

const partners = [
  '/partners/tertium-invest.webp',
  '/partners/ionis-education-group.webp',
  '/partners/airwell.webp',
  '/partners/mk2-.webp',
]

export default function Home() {
  const t = useT()

  const piliers = [
    { title: t('homepage.piliers.1.title'), desc: t('homepage.piliers.1.desc'), anchor: 'independance' },
    { title: t('homepage.piliers.2.title'), desc: t('homepage.piliers.2.desc'), anchor: 'conseil' },
    { title: t('homepage.piliers.3.title'), desc: t('homepage.piliers.3.desc'), anchor: 'confiance' },
  ]

  const offres = [
    {
      num: t('homepage.offres.1.num'),
      title: t('homepage.offres.1.title'),
      subtitle: t('homepage.offres.1.subtitle'),
      description: t('homepage.offres.1.desc'),
      price: t('homepage.offres.1.price'),
      duration: t('homepage.offres.1.duration'),
      href: '/diagnostic',
      image: '/images/IA.webp'
    },
    {
      num: t('homepage.offres.2.num'),
      title: t('homepage.offres.2.title'),
      subtitle: t('homepage.offres.2.subtitle'),
      description: t('homepage.offres.2.desc'),
      price: t('homepage.offres.2.price'),
      duration: t('homepage.offres.2.duration'),
      href: '/formations',
      image: '/images/book.webp'
    },
    {
      num: t('homepage.offres.3.num'),
      title: t('homepage.offres.3.title'),
      subtitle: t('homepage.offres.3.subtitle'),
      description: t('homepage.offres.3.desc'),
      price: t('homepage.offres.3.price'),
      duration: t('homepage.offres.3.duration'),
      href: '/transformation',
      image: '/images/tree.webp'
    },
    {
      num: t('homepage.offres.4.num'),
      title: t('homepage.offres.4.title'),
      subtitle: t('homepage.offres.4.subtitle'),
      description: t('homepage.offres.4.desc'),
      price: t('homepage.offres.4.price'),
      duration: t('homepage.offres.4.duration'),
      href: '/partenaire',
      image: '/images/team-work.webp'
    },
  ]

  const acteurs = [
    {
      title: t('homepage.pour_qui.1.title'),
      desc: t('homepage.pour_qui.1.desc'),
      href: '/entreprises',
      anchor: 'entreprises',
      image: '/images/overworked.webp'
    },
    {
      title: t('homepage.pour_qui.2.title'),
      desc: t('homepage.pour_qui.2.desc'),
      href: '/professions-liberales',
      anchor: 'professions-liberales',
      image: '/images/lawyer.webp'
    },
    {
      title: t('homepage.pour_qui.3.title'),
      desc: t('homepage.pour_qui.3.desc'),
      href: '/education',
      anchor: 'education',
      image: '/images/educa.webp'
    },
    {
      title: t('homepage.pour_qui.4.title'),
      desc: t('homepage.pour_qui.4.desc'),
      href: '/secteurs-creatifs',
      anchor: 'secteurs-creatifs',
      image: '/images/music.png'
    },
    {
      title: t('homepage.pour_qui.5.title'),
      desc: t('homepage.pour_qui.5.desc'),
      href: '/pouvoirs-publics',
      anchor: 'pouvoirs-publics',
      image: '/images/crea.webp'
    },
    {
      title: t('homepage.pour_qui.6.title'),
      desc: t('homepage.pour_qui.6.desc'),
      href: '/citoyens',
      anchor: 'citoyen',
      image: '/images/grandpublic.webp'
    },
  ]

  const navLinks = [
    { label: t('homepage.nav.accueil'), href: '#accueil' },
    { label: t('homepage.nav.piliers'), href: '#piliers' },
    { label: t('homepage.nav.pour_qui'), href: '#acteurs' },
    { label: t('homepage.nav.offres'), href: '#offres' },
    { label: t('homepage.nav.contact'), href: '#contact' },
  ]

  const heroRef = useRef<HTMLElement>(null)
  const offreRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [offreProgress, setOffreProgress] = useState(0)

  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, -80])

  useEffect(() => {
    const hero = heroRef.current
    const offre = offreRef.current
    if (!hero || !offre) return

    const handleScroll = () => {
      const rect1 = hero.getBoundingClientRect()
      const heroHeight = hero.offsetHeight
      const maxScroll1 = heroHeight * 1.5
      const scrolled1 = Math.max(0, -rect1.top)
      setScrollProgress(Math.min(scrolled1 / maxScroll1, 1))

      const rect2 = offre.getBoundingClientRect()
      const offreHeight = offre.offsetHeight
      const maxScroll2 = offreHeight * 1.5
      const scrolled2 = Math.max(0, -rect2.top)
      setOffreProgress(Math.min(scrolled2 / maxScroll2, 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroBackground = interpolateColor(scrollProgress)
  const offreBackground = interpolateToWhite(offreProgress)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Marius IA",
            "url": "https://www.mariusia.com",
            "description": "Conseil en stratégie IA et conformité AI Act pour PME et ETI. Accompagnement pragmatique vers la transformation IA.",
            "areaServed": ["Europe", "France"],
            "knowsAbout": ["Artificial Intelligence", "AI Act", "AI Governance", "Machine Learning", "Change Management"],
            "serviceType": ["AI Strategy Consulting", "AI Compliance", "AI Training"],
            "contactPoint": { "@type": "ContactPoint", "url": "https://www.mariusia.com/contact" }
          })
        }}
      />
      <Header />
      <main className="pt-14">

        <section
          id="accueil"
          ref={heroRef}
          className="py-16 md:py-20 border-b border-gray-200"
          style={{ backgroundColor: heroBackground }}
        >
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <StaggerBlock delay={0}>
                <p className="text-sm tracking-widest uppercase mb-8" style={{ color: '#000000' }}>{t('homepage.hero.label')}</p>
              </StaggerBlock>
            </div>
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <StaggerBlock delay={0.1}>
                  <h1 className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-8 whitespace-pre-line">
                    {t('homepage.hero.title')}
                  </h1>
                </StaggerBlock>
                <StaggerBlock delay={0.2}>
                  <p className="text-xl text-gray-500 mb-8 max-w-xl leading-relaxed">
                    {t('homepage.hero.subtitle')}
                  </p>
                </StaggerBlock>
                <StaggerBlock delay={0.3}>
                  <p className="text-xl text-gray-500 mb-6 max-w-lg leading-relaxed">
                    {t('homepage.hero.body')}
                  </p>
                </StaggerBlock>
                <StaggerBlock delay={0.4}>
                  <LocalizedLink
                    href="/#acteurs"
                    className="inline-block px-8 py-4 text-lg text-[#00255D] bg-[#bdf5ab] hover:bg-[#a8e6a0] transition-colors duration-200 font-semibold"
                  >
                    {t('homepage.hero.cta')}
                  </LocalizedLink>
                </StaggerBlock>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-sm"
              >
                <motion.div style={{ y: heroImageY }}>
                  <motion.img
                    src="/images/paperplane.png"
                    alt="Institut de l'IA"
                    className="w-full shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="piliers" className="py-16 md:py-20" style={{ backgroundColor: '#f9f7f3' }}>
          <div className="max-w-6xl mx-auto px-8">
            <StaggerBlock delay={0} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black">{t('homepage.piliers.title')}</h2>
            </StaggerBlock>
            <div className="grid md:grid-cols-3 gap-8">
              {piliers.map((p, i) => (
                <AnimatedCard key={p.title} id={p.anchor} delay={i * 0.1} className="p-10 bg-white hover:shadow-xl transition-all duration-300">
                  <h3 className="text-3xl font-bold text-black mb-4">{p.title}</h3>
                  <p className="text-gray-500">{p.desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        <AnimatedDivider />

        <section
          id="acteurs"
          ref={offreRef}
          className="py-16 md:py-20"
          style={{ backgroundColor: offreBackground }}
        >
          <div className="max-w-6xl mx-auto px-8">
            <StaggerBlock delay={0} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black">{t('homepage.pour_qui.title')}</h2>
              <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">{t('homepage.pour_qui.subtitle')}</p>
            </StaggerBlock>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acteurs.map((acteur, i) => (
                <AnimatedCard key={acteur.title} id={acteur.anchor} delay={i * 0.05} whileHover={{ y: -4 }}>
                  <LocalizedLink href={acteur.href} className="group block p-8 bg-white hover:shadow-xl transition-all duration-200 h-full">
                    {acteur.image && <div className="w-full aspect-square mb-4 overflow-hidden"><img src={acteur.image} alt={acteur.title} className="w-full h-full object-contain" /></div>}
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-600 transition-colors duration-200">{acteur.title}</h3>
                    <p className="text-gray-500 text-sm">{acteur.desc}</p>
                  </LocalizedLink>
                </AnimatedCard>
              ))}
            </div>
            </div>
        </section>

        <AnimatedDivider />

        <section id="offres" className="py-16 md:py-20" style={{ backgroundColor: '#f9f7f3' }}>
          <div className="max-w-6xl mx-auto px-8">
            <StaggerBlock delay={0} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black">{t('homepage.offres.title')}</h2>
              <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">{t('homepage.offres.subtitle')}</p>
            </StaggerBlock>
            <div className="py-10">
              {offres.map((offre, i) => (
                <AnimatedCard key={offre.num} delay={i * 0.1} id={'offre-' + offre.href.replace('/', '')} whileHover={{ scale: 1.01 }}>
                  <LocalizedLink href={offre.href} className="flex flex-col md:flex-row items-stretch group hover:bg-gray-100 transition-all duration-200 py-10">
                    <div className="flex-1 pl-6 self-center order-2 md:order-1">
                      <h3 className="text-2xl font-bold text-black mb-1 group-hover:text-gray-600 transition-colors duration-200">{offre.num} {offre.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{offre.subtitle}</p>
                      <p className="text-gray-500 mb-3">{offre.description}</p>
                      <p className="text-sm text-gray-400">{offre.price} · {offre.duration}</p>
                    </div>
                    <img src={offre.image} alt={offre.title} className="w-full md:w-[300px] aspect-square object-contain order-1 md:order-2" />
                  </LocalizedLink>
                </AnimatedCard>
              ))}
            </div>
            </div>
        </section>

        <AnimatedDivider />

        <section id="contact" className="py-20" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-3xl mx-auto px-8 text-center">
            <StaggerBlock delay={0}>
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('homepage.contact.label')}</p>
            </StaggerBlock>
            <StaggerBlock delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">{t('homepage.contact.heading')}</h2>
            </StaggerBlock>
            <StaggerBlock delay={0.2}>
              <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
                {t('homepage.contact.body')}
              </p>
            </StaggerBlock>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="inline-block">
              <LocalizedLink href="/contact" className="inline-block px-12 py-5 text-lg text-white bg-black hover:bg-white hover:text-black transition-all duration-200">
                {t('homepage.contact.cta')}
              </LocalizedLink>
            </motion.div>
          </div>
        </section>

        {/* Partners section hidden temporarily
        <section id="partenaires" className="py-20 border-b border-gray-200 overflow-hidden" style={{ backgroundColor: '#d8d8d8' }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">Confiance</p>
              <h2 className="text-4xl md:text-5xl  font-bold text-black">Ils nous font confiance</h2>
            </div>
            <div className="relative">
              <div className="flex gap-16 animate-scroll">
                {[...partners, ...partners].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Partenaire ${(i % 5) + 1}`}
                    className="w-[150px] h-auto grayscale opacity-60 flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        */}
      </main>
      <Footer />
    </>
  )
}
