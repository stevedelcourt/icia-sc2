'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { ActualitesGrid } from '@/components/ActualitesGrid'
import { useT, LocalizedLink } from '@/lib/i18n'

const staggerItem = 0.08

const chevron = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export default function Home() {
  const t = useT()
  const params = useParams()
  const lang = (params?.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const h1Full = t('homepage.hero.h1')
  const h1Lines = h1Full.split('\n')
  const h1First = h1Lines.slice(0, 2).join('\n')
  const h1Last = h1Lines[2] || ''

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization",
        "name": "Institut Collectif de l'IA", "alternateName": "ICIA",
        "url": "https://www.iciafrance.com",
        "description": "Association loi 1901 d\u00e9di\u00e9e aux enjeux collectifs de l'intelligence artificielle.",
        "areaServed": ["France", "Europe"],
        "contactPoint": { "@type": "ContactPoint", "url": "https://www.iciafrance.com/contact" }
      }) }} />
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* 1. Hero */}
        <section id="accueil" style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 0 0' }}>
          <div className="container-mentivis">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="eyebrow">{t('homepage.hero.label')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="t-hero text-primary" style={{ whiteSpace: 'pre-line', marginBottom: '4px' }}>{h1First}</h1>
              <h1 className="t-hero text-primary" style={{ whiteSpace: 'nowrap', marginBottom: '40px' }}>{h1Last}</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <p className="t-lead" style={{ maxWidth: '620px', marginBottom: '40px' }}>{t('homepage.hero.baseline')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <LocalizedLink href="/#mission" className="btn-pill btn-black">{t('homepage.hero.cta_mission')}{chevron}</LocalizedLink>
                <LocalizedLink href="/#programmes" className="btn-pill btn-warm">{t('homepage.hero.cta_programmes')}{chevron}</LocalizedLink>
              </div>
            </motion.div>
          </div>

          {/* Full-width image, edge to edge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <img
              src="/images/hero-icia.webp"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block', marginTop: 'var(--section-gap)' }}
            />
          </motion.div>
        </section>

        {/* 2. Mission — inner card pattern */}
        <section id="mission" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}>
              <FadeIn>
                <p className="eyebrow">Notre mission</p>
                <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>{t('homepage.mission.title')}</h2>
                <p className="t-lead" style={{ maxWidth: '800px', marginBottom: '48px' }}>{t('homepage.mission.intro')}</p>
              </FadeIn>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {[
                  [t('homepage.mission.intelligible.title'), t('homepage.mission.intelligible.desc')],
                  [t('homepage.mission.competences.title'), t('homepage.mission.competences.desc')],
                  [t('homepage.mission.fractures.title'), t('homepage.mission.fractures.desc')],
                  [t('homepage.mission.debat.title'), t('homepage.mission.debat.desc')],
                ].map(([title, desc], i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + i * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: '#ffffff', borderRadius: '16px', padding: 'clamp(24px, 3vw, 32px)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.06) 0px 4px 12px' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}
                  >
                    <h3 className="t-heading text-primary" style={{ marginBottom: '10px' }}>{title}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Nos actions */}
        <section id="actions" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">Ce que nous faisons</p>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>{t('homepage.actions.title')}</h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                [t('homepage.actions.formation.title'), t('homepage.actions.formation.desc')],
                [t('homepage.actions.recherche.title'), t('homepage.actions.recherche.desc')],
                [t('homepage.actions.territoires.title'), t('homepage.actions.territoires.desc')],
                [t('homepage.actions.ressources.title'), t('homepage.actions.ressources.desc')],
                [t('homepage.actions.debats.title'), t('homepage.actions.debats.desc')],
              ].map(([title, desc], i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  <h3 className="t-heading" style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px', color: '#000', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Pour qui — interactive click-to-swap */}
        <InteractivePourQui
          title={t('homepage.pour_qui.title')}
          items={[
            { title: t('homepage.pour_qui.citoyens.title'), desc: t('homepage.pour_qui.citoyens.desc') },
            { title: t('homepage.pour_qui.professionnels.title'), desc: t('homepage.pour_qui.professionnels.desc') },
            { title: t('homepage.pour_qui.organisations.title'), desc: t('homepage.pour_qui.organisations.desc') },
            { title: t('homepage.pour_qui.publics.title'), desc: t('homepage.pour_qui.publics.desc') },
            { title: t('homepage.pour_qui.education.title'), desc: t('homepage.pour_qui.education.desc') },
          ]}
        />

        {/* 5. Nos engagements */}
        <section id="engagements" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div style={{ background: '#f5f3f1', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)' }}>
              <FadeIn>
                <p className="eyebrow">Principes</p>
                <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>{t('homepage.engagements.title')}</h2>
              </FadeIn>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  [t('homepage.engagements.independance.title'), t('homepage.engagements.independance.desc')],
                  [t('homepage.engagements.interet.title'), t('homepage.engagements.interet.desc')],
                  [t('homepage.engagements.accessibilite.title'), t('homepage.engagements.accessibilite.desc')],
                  [t('homepage.engagements.critique.title'), t('homepage.engagements.critique.desc')],
                  [t('homepage.engagements.action.title'), t('homepage.engagements.action.desc')],
                ].map(([title, desc], i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: '#ffffff', borderRadius: '16px', padding: 'clamp(24px, 3vw, 32px)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                  >
                    <h3 className="t-heading text-primary" style={{ marginBottom: '10px' }}>{title}</h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Programmes ICIA */}
        <section id="programmes" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">Programmes</p>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>{t('homepage.programmes.title')}</h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                [t('homepage.programmes.territoires.title'), t('homepage.programmes.territoires.desc')],
                [t('homepage.programmes.education.title'), t('homepage.programmes.education.desc')],
                [t('homepage.programmes.travail.title'), t('homepage.programmes.travail.desc')],
              ].map(([title, desc], i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px', color: '#000', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: '#f5f3f1', borderRadius: '24px', padding: 'clamp(36px, 5vw, 52px) clamp(32px, 5vw, 48px)' }}
            >
              <div style={{ maxWidth: '640px' }}>
                <p className="eyebrow">{t('homepage.programmes.impact.tagline')}</p>
                <h3 className="t-title text-primary" style={{ marginBottom: '16px' }}>{t('homepage.programmes.impact.title')}</h3>
                <p className="t-lead" style={{ marginBottom: '24px' }}>{t('homepage.programmes.impact.desc')}</p>
                <LocalizedLink href="/programme-impact" className="btn-pill btn-black">{t('homepage.programmes.impact.cta')}{chevron}</LocalizedLink>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. Qui sommes-nous */}
        <section id="a-propos" style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div className="a-propos-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
              <div>
                <FadeIn>
                  <p className="eyebrow">ICIA</p>
                  <h2 className="t-display text-primary" style={{ marginBottom: '32px' }}>{t('homepage.a_propos.title')}</h2>
                </FadeIn>
                <FadeIn delay={0.1}><p className="t-lead" style={{ marginBottom: '16px' }}>{t('homepage.a_propos.body.1')}</p></FadeIn>
                <FadeIn delay={0.15}><p className="t-lead" style={{ marginBottom: '16px' }}>{t('homepage.a_propos.body.2')}</p></FadeIn>
                <FadeIn delay={0.2}><p className="t-lead">{t('homepage.a_propos.body.3')}</p></FadeIn>
              </div>
              <FadeIn delay={0.25}>
                <img src="/images/star.svg" alt="" style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 8. Collaborer */}
        <section id="collaborer" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">Partenariats</p>
              <h2 className="t-display text-primary" style={{ marginBottom: '32px' }}>{t('homepage.collaborer.title')}</h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {t('homepage.collaborer.list').split('\n').map((item, i) => (
                <FadeIn key={item} delay={i * 0.05}>
                  <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                  >
                    <span style={{ fontSize: '18px', color: '#4e4e4e' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Gouvernance & Opération */}
        <section id="gouvernance" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)' }}>
              <FadeIn>
                <p className="eyebrow">Modèle</p>
                <h2 className="t-display text-primary" style={{ marginBottom: '32px' }}>{t('homepage.gouvernance.title')}</h2>
              </FadeIn>
              <FadeIn delay={0.1}><p className="t-lead" style={{ marginBottom: '12px', maxWidth: '680px' }}>{t('homepage.gouvernance.body.1')}</p></FadeIn>
              <FadeIn delay={0.15}><p className="t-lead" style={{ marginBottom: '12px', maxWidth: '680px' }}>{t('homepage.gouvernance.body.2')}</p></FadeIn>
              <FadeIn delay={0.2}><p className="t-lead" style={{ marginBottom: '12px', maxWidth: '680px' }}>{t('homepage.gouvernance.body.3')}</p></FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection lang={lang} />

        {/* 10. Ancrage territorial */}
        <section id="territoire" style={{ background: '#f5f3f1', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '32px' }}>
                {lang === 'fr' ? 'Né à Marseille. Pensé pour la France.' : 'Born in Marseille. Built for France.'}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '12px', maxWidth: '720px' }}>
                {lang === 'fr'
                  ? "L'Institut Collectif de l'IA est une initiative nationale dont l'ancrage initial se situe à Marseille, au sein du même lieu que Mariusia."
                  : 'The Institut Collectif de l\'IA is a national initiative, initially anchored in Marseille, in the same location as Mariusia.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="t-lead" style={{ marginBottom: '12px', maxWidth: '720px' }}>
                {lang === 'fr'
                  ? "Parce que l'IA transforme déjà les compétences, l'éducation, le travail et l'accès à l'information, ses enjeux ne peuvent être réservés à quelques acteurs spécialisés ou à quelques métropoles."
                  : 'Because AI is already transforming skills, education, work and access to information, its challenges cannot be reserved for a few specialized players or a few major cities.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '24px', maxWidth: '720px' }}>
                {lang === 'fr'
                  ? "L'ICIA défend une approche distribuée, ancrée dans les territoires, connectée aux réalités de terrain et ouverte à l'ensemble des acteurs publics, éducatifs, économiques et associatifs."
                  : 'ICIA champions a distributed approach, anchored in territories, connected to field realities and open to all public, educational, economic and associative actors.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="t-caption" style={{ fontWeight: 500, color: '#000', marginBottom: '4px' }}>
                4 boulevard Jacques Saadé
              </p>
              <p className="t-caption" style={{ fontWeight: 500, color: '#000' }}>
                13002 Marseille, France
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Actualités */}
        <ActualitesGrid />

        {/* 11. CTA Final */}
        <section id="cta" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '20px' }}>{t('homepage.cta.title')}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '32px', maxWidth: '620px' }}>{t('homepage.cta.body')}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">{t('homepage.cta.button')}{chevron}</LocalizedLink>
            </FadeIn>
          </div>
        </section>

      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .a-propos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Footer />
    </>
  )
}

/* ── Interactive Pour Qui (click-to-swap grid) ── */
function InteractivePourQui({ title, items }: { title: string; items: { title: string; desc: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  const active = items[activeIndex]
  const smallItems = items.map((_, i) => i).filter(i => i !== activeIndex)
  const positions = [
    { gridColumn: 2, gridRow: 1 },
    { gridColumn: 3, gridRow: 1 },
    { gridColumn: 2, gridRow: 2 },
    { gridColumn: 3, gridRow: 2 },
  ]

  return (
    <section id="pour-qui" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
      <div className="container-mentivis">
        <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)' }}>
        <FadeIn>
          <p className="eyebrow">Publics</p>
          <h2 className="t-display text-primary" style={{ marginBottom: '48px', whiteSpace: 'pre-line' }}>{title}</h2>
        </FadeIn>

        {/* Desktop: 3-col click-to-swap grid */}
        <div className="pour-qui-desktop" style={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px' }}>
          {/* Big card — active item */}
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridRow: 'span 2',
              background: 'linear-gradient(135deg, #3886c1 0%, #2a6ba0 100%)',
              borderRadius: '22px',
              padding: 'clamp(36px, 5vw, 52px) clamp(32px, 5vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: '0 8px 32px rgba(56,134,193,0.18)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '18px', fontWeight: 500, marginBottom: 'auto',
            }}>
              {String(activeIndex + 1).padStart(2, '0')}
            </div>
            <div style={{ marginTop: 'auto' }}>
              <h3 className="t-title" style={{ color: '#fff', marginBottom: '16px', lineHeight: 1.15 }}>{active.title}</h3>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: '500px' }}>{active.desc}</p>
            </div>
          </motion.div>

          {/* 4 small cards */}
          {smallItems.map((itemIndex, i) => {
            const pos = positions[i]
            const item = items[itemIndex]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIndex(itemIndex)}
                style={{
                  gridColumn: pos.gridColumn,
                  gridRow: pos.gridRow,
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: 'clamp(20px, 3vw, 28px) clamp(20px, 3vw, 24px)',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = '#f0f0f0' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = '#ffffff' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'block' }}>
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#000', lineHeight: 1.3, margin: 0 }}>{item.title}</h4>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: accordion list */}
        <div className="pour-qui-mobile" style={{ display: 'none' }}>
          {items.map((item, i) => {
            const isExpanded = expandedMobile === i
            return (
              <div key={item.title} style={{ borderTop: i > 0 ? '1px solid var(--border-light)' : 'none' }}>
                <button
                  onClick={() => setExpandedMobile(isExpanded ? null : i)}
                  style={{
                    width: '100%', padding: '20px 0', textAlign: 'left',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{item.title}</span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#9CA3AF' }}>{String(i + 1).padStart(2, '0')}</span>
                </button>
                <div style={{
                  maxHeight: isExpanded ? '200px' : '0',
                  opacity: isExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: '0 0 20px' }}>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pour-qui-desktop { display: none !important; }
          .pour-qui-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

/* ── FAQ Section ── */
function FaqSection({ lang }: { lang: 'fr' | 'en' }) {
  const faq = {
    fr: {
      eyebrow: 'FAQ',
      title: lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions',
      items: [
        { question: "Qu'est-ce que l'ICIA ?", answer: "L'Institut Collectif de l'IA (ICIA) est une association loi 1901 dédiée aux enjeux collectifs de l'intelligence artificielle. Sa mission : rendre l'IA plus compréhensible, développer les compétences, réduire les fractures et favoriser un débat informé." },
        { question: 'À qui s\'adressent les programmes de l\'ICIA ?', answer: 'Aux citoyens, professionnels, organisations, acteurs publics et territoriaux, et au monde éducatif. Nos programmes sont conçus pour tous ceux qui doivent composer avec l\'IA dans leur quotidien.' },
        { question: 'Comment sont financés les programmes ?', answer: "Les programmes de l'ICIA sont financés par des contributions volontaires, des subventions publiques, des partenariats avec des fondations et des entreprises engagées dans l'intérêt général." },
        { question: 'Où se déroulent les formations ?', answer: "Les formations sont proposées en présentiel à Marseille (Campus Cyber.IA Euromed), en distanciel, et en formats hybrides. Des sessions peuvent également être organisées dans vos locaux." },
        { question: "Comment puis-je participer aux activités de l'ICIA ?", answer: "Vous pouvez nous contacter via le formulaire de contact pour rejoindre un programme, proposer un partenariat ou contribuer aux activités de l'association." },
        { question: "Quelle est la différence entre l'ICIA et Mentivis ?", answer: "L'ICIA est l'association qui définit la mission d'intérêt général et les programmes. Mentivis intervient comme opérateur pédagogique et partenaire d'ingénierie pour la conception et le déploiement des dispositifs." },
      ],
    },
    en: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      items: [
        { question: 'What is ICIA?', answer: 'The Institut Collectif de l\'IA (ICIA) is a French non-profit association dedicated to the collective challenges of artificial intelligence.' },
        { question: 'Who are the programs for?', answer: 'Citizens, professionals, organizations, public actors and the educational world. Our programs are designed for everyone who has to navigate AI in their daily lives.' },
        { question: 'How are programs funded?', answer: 'ICIA programs are funded through voluntary contributions, public grants, and partnerships with foundations and companies committed to the public interest.' },
        { question: 'Where do the training sessions take place?', answer: 'In-person in Marseille (Campus Cyber.IA Euromed), remotely, and in hybrid formats. Sessions can also be organized at your premises.' },
        { question: 'How can I get involved?', answer: 'Contact us via the contact form to join a program, propose a partnership, or contribute to the association\'s activities.' },
        { question: 'What is the difference between ICIA and Mentivis?', answer: 'ICIA is the association that defines the public interest mission and programs. Mentivis serves as the educational operator and engineering partner for program design and deployment.' },
      ],
    },
  }

  const locale = lang === 'en' ? 'en' : 'fr'
  const data = faq[locale]
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'var(--section-gap) 0',
      background: '#ffffff',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div className="container-mentivis">
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(2.5rem, 6vw, 6rem)' }}>
          <div className="faq-intro">
            <p style={{ marginBottom: '1.75rem', color: '#4e4e4e', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '12px' }}>
              {data.eyebrow}
            </p>
            <h2 className="t-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '1.75rem' }}>
              {data.title}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {data.items.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <article key={i} style={{ borderTop: i > 0 ? '1px solid var(--border-light)' : 'none' }}>
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} style={{
                    width: '100%', background: 'none', border: 'none', color: 'var(--text-primary)',
                    fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
                    padding: '1.85rem 0', display: 'grid', gridTemplateColumns: '2.25rem 1fr auto',
                    alignItems: 'center', gap: '1.5rem', fontSize: '1.0625rem', fontWeight: 400,
                    letterSpacing: '-0.005em', lineHeight: 1.4,
                  }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', color: isOpen ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item.question}</span>
                    <span style={{ position: 'relative', width: 14, height: 14, flexShrink: 0 }}>
                      <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1, background: isOpen ? 'var(--text-primary)' : 'var(--text-tertiary)', transform: 'translateY(-50%)', transition: 'background 0.3s ease, transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                      <span style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: isOpen ? 'var(--text-primary)' : 'var(--text-tertiary)', transform: isOpen ? 'translateX(-50%) rotate(90deg)' : 'translateX(-50%)', transition: 'background 0.3s ease, transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.5s cubic-bezier(0.65, 0, 0.35, 1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ padding: '0 0 2.25rem calc(2.25rem + 1.5rem)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '62ch', fontWeight: 400, margin: 0 }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
            <div style={{ borderTop: '1px solid var(--border-light)' }} />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 950px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
