'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock, AnimatedCard } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'
import { RecentArticles } from '@/components/RecentArticles'
import { BauhausHero } from '@/components/BauhausHero'
import { Picture } from '@/components/Picture'

export default function Home() {
  const t = useT()
  const params = useParams()
  const lang = (params?.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

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
      img: '/images/illustrations/01- ia.webp'
    },
    {
      num: t('homepage.offres.2.num'),
      title: t('homepage.offres.2.title'),
      subtitle: t('homepage.offres.2.subtitle'),
      description: t('homepage.offres.2.desc'),
      price: t('homepage.offres.2.price'),
      duration: t('homepage.offres.2.duration'),
      href: '/formations',
      img: '/images/illustrations/02-equipe.webp'
    },
    {
      num: t('homepage.offres.3.num'),
      title: t('homepage.offres.3.title'),
      subtitle: t('homepage.offres.3.subtitle'),
      description: t('homepage.offres.3.desc'),
      price: t('homepage.offres.3.price'),
      duration: t('homepage.offres.3.duration'),
      href: '/transformation',
      img: '/images/illustrations/03-transfo.webp'
    },
    {
      num: t('homepage.offres.4.num'),
      title: t('homepage.offres.4.title'),
      subtitle: t('homepage.offres.4.subtitle'),
      description: t('homepage.offres.4.desc'),
      price: t('homepage.offres.4.price'),
      duration: t('homepage.offres.4.duration'),
      href: '/partenaire',
      img: '/images/illustrations/04-expert.webp'
    },
  ]

  const acteurs = [
    {
      title: t('homepage.pour_qui.1.title'),
      desc: t('homepage.pour_qui.1.desc'),
      href: '/entreprises',
      anchor: 'entreprises',
      img: '/images/illustrations/pme-tpe.webp'
    },
    {
      title: t('homepage.pour_qui.2.title'),
      desc: t('homepage.pour_qui.2.desc'),
      href: '/professions-liberales',
      anchor: 'professions-liberales',
      img: '/images/illustrations/lawyer.webp'
    },
    {
      title: t('homepage.pour_qui.3.title'),
      desc: t('homepage.pour_qui.3.desc'),
      href: '/education',
      anchor: 'education',
      img: '/images/illustrations/etudiant.webp'
    },
    {
      title: t('homepage.pour_qui.4.title'),
      desc: t('homepage.pour_qui.4.desc'),
      href: '/secteurs-creatifs',
      anchor: 'secteurs-creatifs',
      img: '/images/illustrations/crea.webp'
    },
    {
      title: t('homepage.pour_qui.5.title'),
      desc: t('homepage.pour_qui.5.desc'),
      href: '/pouvoirs-publics',
      anchor: 'pouvoirs-publics',
      img: '/images/illustrations/collectivite.webp'
    },
    {
      title: t('homepage.pour_qui.6.title'),
      desc: t('homepage.pour_qui.6.desc'),
      href: '/citoyens',
      anchor: 'citoyen',
      img: '/images/illustrations/public.webp'
    },
  ]

  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, -80])

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
      <main className="pt-16">

        {/* Hero */}
        <section
          id="accueil"
          ref={heroRef}
          className="section bg-primary"
        >
          <div className="container-mentivis">
            <StaggerBlock delay={0}>
              <p className="t-caption uppercase tracking-widest mb-6">{t('homepage.hero.label')}</p>
            </StaggerBlock>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <StaggerBlock delay={0.1}>
                  <h1 className="t-hero mb-6 whitespace-pre-line text-primary">
                    {t('homepage.hero.title')}
                  </h1>
                </StaggerBlock>
                <StaggerBlock delay={0.2}>
                  <p className="t-lead mb-6 max-w-xl">
                    {t('homepage.hero.subtitle')}
                  </p>
                </StaggerBlock>
                <StaggerBlock delay={0.3}>
                  <p className="t-lead mb-8 max-w-lg">
                    {t('homepage.hero.body')}
                  </p>
                </StaggerBlock>
                <StaggerBlock delay={0.4}>
                  <LocalizedLink
                    href="/#acteurs"
                    className="btn-pill btn-black"
                  >
                    {t('homepage.hero.cta')}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </LocalizedLink>
                </StaggerBlock>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
                style={{ y: heroImageY }}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <BauhausHero />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Piliers */}
        <section id="piliers" className="section bg-secondary">
          <div className="container-mentivis">
            <StaggerBlock delay={0} className="mb-12">
              <h2 className="t-display text-primary">{t('homepage.piliers.title')}</h2>
            </StaggerBlock>
            <div className="grid md:grid-cols-3 gap-6">
              {piliers.map((p, i) => (
                <AnimatedCard key={p.title} id={p.anchor} delay={i * 0.1} className="p-8 bg-primary rounded-card shadow-card hover:shadow-card-full transition-shadow duration-200">
                  <h3 className="t-heading text-primary mb-3">{p.title}</h3>
                  <p className="t-caption">{p.desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Acteurs */}
        <section id="acteurs" className="section bg-primary">
          <div className="container-mentivis">
            <StaggerBlock delay={0} className="mb-12">
              <h2 className="t-display text-primary mb-3">{t('homepage.pour_qui.title')}</h2>
              <p className="t-lead max-w-2xl">{t('homepage.pour_qui.subtitle')}</p>
            </StaggerBlock>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {acteurs.map((acteur, i) => (
                <AnimatedCard key={acteur.title} id={acteur.anchor} delay={i * 0.05} whileHover={{ y: -4 }}>
                  <LocalizedLink href={acteur.href} className="group block p-6 bg-primary rounded-card shadow-card hover:shadow-card-full transition-all duration-200 h-full">
                    <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
                      <Picture src={acteur.img} alt={acteur.title} className="w-full h-full object-cover" width={400} height={400} />
                    </div>
                    <h3 className="t-heading text-primary mb-2">{acteur.title}</h3>
                    <p className="t-caption">{acteur.desc}</p>
                  </LocalizedLink>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Offres */}
        <section id="offres" className="section bg-secondary">
          <div className="container-mentivis">
            <StaggerBlock delay={0} className="mb-12">
              <h2 className="t-display text-primary mb-3">{t('homepage.offres.title')}</h2>
              <p className="t-lead max-w-2xl">{t('homepage.offres.subtitle')}</p>
            </StaggerBlock>
            <div className="space-y-6">
              {offres.map((offre, i) => (
                <AnimatedCard key={offre.num} delay={i * 0.1} id={'offre-' + offre.href.replace('/', '')}>
                  <LocalizedLink href={offre.href} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-primary rounded-card shadow-card hover:shadow-card-full transition-all duration-200">
                    <div className="flex-1">
                      <h3 className="t-title text-primary mb-1">{offre.num} {offre.title}</h3>
                      <p className="t-caption mb-3">{offre.subtitle}</p>
                      <p className="t-lead mb-3">{offre.description}</p>
                      <p className="t-caption">{offre.price} · {offre.duration}</p>
                    </div>
                    <div className="w-full md:w-48 aspect-square flex-shrink-0 overflow-hidden">
                      <Picture src={offre.img} alt={offre.title} className="w-full h-full object-cover" width={192} height={192} />
                    </div>
                  </LocalizedLink>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="section bg-warm">
          <div className="container-mentivis">
            <StaggerBlock delay={0}>
              <p className="t-caption uppercase tracking-widest mb-4">{t('homepage.contact.label')}</p>
            </StaggerBlock>
            <StaggerBlock delay={0.1}>
              <h2 className="t-display text-primary mb-6 max-w-2xl">{t('homepage.contact.heading')}</h2>
            </StaggerBlock>
            <StaggerBlock delay={0.2}>
              <p className="t-lead mb-8 max-w-xl">
                {t('homepage.contact.body')}
              </p>
            </StaggerBlock>
            <StaggerBlock delay={0.3}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t('homepage.contact.cta')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </StaggerBlock>
          </div>
        </section>
      </main>
      <RecentArticles lang={lang} />
      <Footer />
    </>
  )
}
