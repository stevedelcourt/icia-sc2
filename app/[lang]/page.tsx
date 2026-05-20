'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { ActualitesGrid } from '@/components/ActualitesGrid'
import { useT, LocalizedLink } from '@/lib/i18n'
import Star3D from '@/components/Star3D'
import MarqueeHero from '@/components/MarqueeHero'

const staggerItem = 0.08

const ROSE = `radial-gradient(ellipse 58% 52% at 88% 18%, rgba(38, 52, 218, 0.92) 0%, transparent 58%),radial-gradient(ellipse 55% 58% at 38% 62%, rgba(118, 38, 202, 0.88) 0%, transparent 56%),radial-gradient(ellipse 46% 42% at 12% 88%, rgba(202, 48, 152, 0.78) 0%, transparent 52%),radial-gradient(ellipse 35% 30% at 65% 85%, rgba(148, 28, 178, 0.55) 0%, transparent 48%),linear-gradient(138deg, #2232b8 0%, #6e1e9e 100%)`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`

const chevron = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export default function Home() {
  const t = useT()
  const params = useParams()
  const lang = (params?.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

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
              <h1 className="t-hero text-primary" style={{ marginBottom: '40px' }}>{t('homepage.hero.h1')}</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <p className="t-lead" style={{ maxWidth: '620px', marginBottom: '40px' }}>{t('homepage.hero.baseline')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <LocalizedLink href="/#mission" className="btn-pill btn-black" style={{ fontSize: '14px', padding: '8px 12px' }}>{lang === 'fr' ? 'Notre mission' : 'Our mission'}{chevron}</LocalizedLink>
                <LocalizedLink href="/#programmes" className="btn-pill btn-warm" style={{ fontSize: '14px', padding: '8px 12px' }}>{lang === 'fr' ? 'Nos programmes' : 'Our programs'}{chevron}</LocalizedLink>
              </div>
            </motion.div>
          </div>

          {/* Full-width image marquee */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <MarqueeHero />
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
                  className="engagement-card"
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
            <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                [t('homepage.actions.formation.title'), t('homepage.actions.formation.desc')],
                [t('homepage.actions.recherche.title'), t('homepage.actions.recherche.desc')],
                [t('homepage.actions.territoires.title'), t('homepage.actions.territoires.desc')],
                [t('homepage.actions.ressources.title'), t('homepage.actions.ressources.desc')],
                [t('homepage.actions.debats.title'), t('homepage.actions.debats.desc')],
              ].map(([title, desc], i) => (
                <motion.div key={title}
                  className="action-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    aspectRatio: '16/9',
                    background: '#f5f5f5',
                    borderRadius: '22px',
                    padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.background = `${ROSE}, ${GRAIN}`
                    e.currentTarget.style.backgroundSize = '100% 100%, 250px 250px'
                    const t = e.currentTarget.querySelector('h3') as HTMLElement
                    const d = e.currentTarget.querySelector('p') as HTMLElement
                    if (t) t.style.color = '#fff'
                    if (d) d.style.color = 'rgba(255,255,255,0.85)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.background = '#f5f5f5'
                    const t = e.currentTarget.querySelector('h3') as HTMLElement
                    const d = e.currentTarget.querySelector('p') as HTMLElement
                    if (t) t.style.color = '#000'
                    if (d) d.style.color = '#4e4e4e'
                  }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px', color: '#000', lineHeight: 1.3, position: 'relative', zIndex: 1 }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0, position: 'relative', zIndex: 1 }}>{desc}</p>
                </motion.div>
              ))}
              {/* 6th card */}
              <motion.div
                className="action-card action-cta"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 5 * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    aspectRatio: '16/9',
                  background: 'linear-gradient(135deg, #1A2B80 0%, #7030A0 38%, #B02050 72%, #C83040 100%)',
                  borderRadius: '22px',
                  padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
              >
                <img src="/images/squaretunnel.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, pointerEvents: 'none' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px', color: '#fff', lineHeight: 1.3, position: 'relative', zIndex: 1 }}>{lang === 'fr' ? 'Rejoignez-nous' : 'Join us'}</h3>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <LocalizedLink href="/devenir-membre" className="btn-pill btn-black" style={{ fontSize: '14px', padding: '8px 16px' }}>
                    {lang === 'fr' ? 'Adhérer' : 'Join'}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </LocalizedLink>
                </div>
              </motion.div>
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
            <FadeIn>
              <p className="eyebrow">Principes</p>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>{t('homepage.engagements.title')}</h2>
            </FadeIn>
            <div className="engagements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
                  style={{ aspectRatio: '16/9', background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '12px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#000', marginBottom: '8px', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{desc}</p>
                </motion.div>
              ))}
              {/* 6th card — Manifeste */}
              <motion.div
                className="engagement-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 5 * staggerItem, ease: [0.16, 1, 0.3, 1] }}
                style={{ aspectRatio: '16/9', background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '12px' }}>06</span>
                <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#000', marginBottom: '8px', lineHeight: 1.3 }}>{lang === 'fr' ? 'Le manifeste de l\'ICIA' : 'The ICIA Manifesto'}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: 0 }}>{lang === 'fr' ? 'Consultez nos principes fondateurs.' : 'Read our founding principles.'}</p>
                  <LocalizedLink href="/manifeste" className="btn-pill btn-black" style={{ fontSize: '14px', padding: '8px 16px', flexShrink: 0, marginLeft: '12px' }}>
                    {lang === 'fr' ? 'Lire' : 'Read'}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </LocalizedLink>
                </div>
              </motion.div>
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
                  style={{ background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px', color: '#000', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', marginBottom: '14px' }}>{desc}</p>
                  <LocalizedLink href={i === 0 ? '/icia-territoires' : i === 1 ? '/icia-education' : '/icia-travail-competences'} className="btn-pill btn-black" style={{ fontSize: '13px', padding: '7px 12px', marginTop: 'auto', alignSelf: 'flex-start' }}>
                    {lang === 'fr' ? 'Voir' : 'See'}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </LocalizedLink>
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
                <FadeIn delay={0.1}><p className="t-lead" style={{ maxWidth: '620px', marginBottom: '16px' }}>{t('homepage.a_propos.body.1')}</p></FadeIn>
                <FadeIn delay={0.15}><p className="t-lead" style={{ maxWidth: '620px', marginBottom: '16px' }}>{t('homepage.a_propos.body.2')}</p></FadeIn>
                <FadeIn delay={0.2}><p className="t-lead" style={{ maxWidth: '620px' }}>{t('homepage.a_propos.body.3')}</p></FadeIn>
              </div>
              <FadeIn delay={0.25}>
                <div className="star3d-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Star3D size={580} />
                </div>
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
            <FadeIn>
              <div style={{ fontSize: '17px', fontWeight: 300, lineHeight: 1.9, color: '#000' }}>
                {t('homepage.collaborer.list').split('\n').map((item, i) => {
                  const icons = [
                    <path key="c" d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 13h6"/>,
                    <path key="a" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 0 1 0 8 4 4 0 0 1 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>,
                    <path key="e" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4h6l2.5 3h5A2.5 2.5 0 0 1 22 9.5v10"/>,
                    <path key="f" d="M2 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 8h4M9 12h4M9 16h3"/>,
                    <path key="b" d="M20 7h-4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 3v4M18 11v.01M18 15v.01"/>,
                    <path key="g" d="M6 3h12l-4 7h4l-8 11 3-8H9z"/>,
                    <path key="h" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
                  ]
                  return (
                    <div key={item} className="collab-line" style={{ padding: '8px 0', borderBottom: i < t('homepage.collaborer.list').split('\n').length - 1 ? '1px solid var(--border-light)' : 'none', display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <svg className="collab-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0, flexShrink: 0, transition: 'opacity 0.25s ease' }}>
                        {icons[i % icons.length]}
                      </svg>
                      <span>{item}</span>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
            <style dangerouslySetInnerHTML={{ __html: `
              .collab-line:hover .collab-icon { opacity: 1 !important; }
            ` }} />
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
            <div className="ancrage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                <FadeIn>
                  <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                    {lang === 'fr' ? 'Né à Marseille. Pensé pour la France.' : 'Born in Marseille. Built for France.'}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="t-lead" style={{ marginBottom: '12px' }}>
                    {lang === 'fr'
                      ? "L'Institut Collectif de l'IA est une initiative nationale dont l'ancrage initial se situe à Marseille, au sein du même lieu que Mariusia."
                      : 'The Institut Collectif de l\'IA is a national initiative, initially anchored in Marseille, in the same location as Mariusia.'}
                  </p>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="t-lead" style={{ marginBottom: '12px' }}>
                    {lang === 'fr'
                      ? "Parce que l'IA transforme déjà les compétences, l'éducation, le travail et l'accès à l'information, ses enjeux ne peuvent être réservés à quelques acteurs spécialisés ou à quelques métropoles."
                      : 'Because AI is already transforming skills, education, work and access to information, its challenges cannot be reserved for a few specialized players or a few major cities.'}
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="t-lead" style={{ marginBottom: '24px' }}>
                    {lang === 'fr'
                      ? "L'ICIA défend une approche distribuée, ancrée dans les territoires, connectée aux réalités de terrain et ouverte à l'ensemble des acteurs publics, éducatifs, économiques et associatifs."
                      : 'ICIA champions a distributed approach, anchored in territories, connected to field realities and open to all public, educational, economic and associative actors.'}
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <p className="t-caption" style={{ fontWeight: 500, color: '#000', marginBottom: '4px' }}>4 boulevard Jacques Saadé</p>
                  <p className="t-caption" style={{ fontWeight: 500, color: '#000' }}>13002 Marseille, France</p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <img src="/images/mrs.avif" alt="Marseille" style={{ width: '100%', borderRadius: '22px', aspectRatio: '4/3', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }} />
              </FadeIn>
            </div>
          </div>
        </section>

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

        {/* Actualités */}
        <ActualitesGrid />

        </main>

      <Footer />
      <style jsx>{`
        @media (max-width: 1080px) {
          .star3d-wrap { max-width: 420px !important; margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 870px) {
          .star3d-wrap { max-width: 340px !important; }
        }
        @media (max-width: 768px) {
          .a-propos-grid { grid-template-columns: 1fr !important; }
          .a-propos-grid > * { min-width: 0 !important; overflow: hidden; }
          .ancrage-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .actions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .action-card { aspect-ratio: 16/9 !important; }
          .engagements-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .engagement-card { aspect-ratio: 16/9 !important; min-width: 0; }
          .star3d-wrap { max-width: 300px !important; }
        }
        @media (max-width: 480px) {
          .actions-grid { grid-template-columns: 1fr !important; }
          .action-card { aspect-ratio: auto !important; }
          .engagements-grid { grid-template-columns: 1fr !important; }
          .engagement-card { aspect-ratio: auto !important; min-width: 0; }
          .star3d-wrap { max-width: 250px !important; }
        }
      `}</style>
    </>
  )
}

/* ── Interactive Pour Qui (click-to-swap grid) ── */
function InteractivePourQui({ title, items }: { title: string; items: { title: string; desc: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(3)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  const IMAGES = [
    '/images/modules/citoyens.avif',
    '/images/modules/professionnels.avif',
    '/images/modules/organisations.avif',
    '/images/modules/acteurs-publics.avif',
    '/images/modules/monde-educatif.avif',
  ]

  const active = items[activeIndex]
  const smallItems = items.map((_, i) => i).filter(i => i !== activeIndex)
  const positions = [
    { gridColumn: 2, gridRow: 1 },
    { gridColumn: 2, gridRow: 2 },
    { gridColumn: 2, gridRow: 3 },
    { gridColumn: 2, gridRow: 4, offset: true },
  ]

  return (
    <section id="pour-qui" style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
      <div className="container-mentivis">
        <FadeIn>
          <p className="eyebrow">Publics</p>
          <h2 className="t-display text-primary" style={{ marginBottom: '48px', whiteSpace: 'pre-line' }}>{title}</h2>
        </FadeIn>

        {/* Desktop: 3:1 grid */}
        <div className="pour-qui-desktop" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gridTemplateRows: 'auto', gap: '12px' }}>
          {/* Big card — active item with image */}
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridRow: 'span 4',
              backgroundImage: `url(${IMAGES[activeIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '22px',
              padding: 'clamp(36px, 5vw, 52px) clamp(32px, 5vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-image 0.5s ease',
              boxShadow: '0 8px 32px rgba(56,134,193,0.18)',
              minHeight: 'clamp(360px, 40vw, 520px)',
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
              <h3 className="t-title" style={{ color: '#fff', marginBottom: '16px', lineHeight: 1.15 }}>
                <span style={{ background: '#000776', padding: '4px 12px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{active.title}</span>
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#fff', margin: 0, maxWidth: '500px' }}>
                <span style={{ background: '#000776', padding: '4px 12px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{active.desc}</span>
              </p>
            </div>
          </motion.div>

          {/* 4 small cards stacked */}
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
                className="pq-small"
                style={{
                  gridColumn: pos.gridColumn,
                  gridRow: pos.gridRow,
                  background: '#f5f5f5',
                  borderRadius: '18px',
                  padding: pos.offset ? 'clamp(10px, 2vw, 16px) clamp(16px, 2vw, 24px)' : 'clamp(20px, 3vw, 28px) clamp(20px, 3vw, 24px)',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: pos.offset ? '-clamp(20px, 3vw, 40px)' : '0',
                  zIndex: pos.offset ? 2 : 1,
                  boxShadow: pos.offset ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span className="pq-small__num" style={{ fontSize: '11px', fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'block' }}>
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <h4 className="pq-small__title" style={{ fontSize: '14px', fontWeight: 500, color: '#000', lineHeight: 1.3, margin: 0 }}>{item.title}</h4>
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
                  overflow: 'hidden',
                  maxHeight: isExpanded ? '600px' : '0',
                  opacity: isExpanded ? 1 : 0,
                  transition: 'max-height 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease',
                }}>
                    <img src={IMAGES[i]} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', marginTop: '12px' }} />
                    <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: '0 0 20px' }}>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pour-qui-desktop { display: none !important; }
          .pour-qui-mobile { display: block !important; }
        }
        .pq-small:hover { background: #3886c1 !important; }
        .pq-small:hover .pq-small__num { color: rgba(255,255,255,0.7) !important; }
        .pq-small:hover .pq-small__title { color: #fff !important; }
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
        { question: 'Où se déroulent les formations ?', answer: <>Les formations sont proposées en présentiel à Marseille (<a href="https://maps.app.goo.gl/nw2Ugmzh1av1gfku8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Campus Cyber.IA Euromed</a>), en distanciel, et en formats hybrides. Des sessions peuvent également être organisées dans vos locaux.</> },
        { question: "Comment puis-je participer aux activités de l'ICIA ?", answer: "Vous pouvez nous contacter via le formulaire de contact pour rejoindre un programme, proposer un partenariat ou contribuer aux activités de l'association." },
        { question: "Comment l'ICIA conçoit-elle et déploie-t-elle ses dispositifs ?", answer: "L'ICIA définit les orientations programmatiques et les exigences de qualité. Elle s'appuie sur un réseau de partenaires opérationnels spécialisés en ingénierie de formation et en déploiement pédagogique pour la mise en œuvre concrète des programmes." },
      ],
    },
    en: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      items: [
        { question: 'What is ICIA?', answer: 'The Institut Collectif de l\'IA (ICIA) is a French non-profit association dedicated to the collective challenges of artificial intelligence.' },
        { question: 'Who are the programs for?', answer: 'Citizens, professionals, organizations, public actors and the educational world. Our programs are designed for everyone who has to navigate AI in their daily lives.' },
        { question: 'How are programs funded?', answer: 'ICIA programs are funded through voluntary contributions, public grants, and partnerships with foundations and companies committed to the public interest.' },
        { question: 'Where do the training sessions take place?', answer: <>In-person in Marseille (<a href="https://maps.app.goo.gl/nw2Ugmzh1av1gfku8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Campus Cyber.IA Euromed</a>), remotely, and in hybrid formats. Sessions can also be organized at your premises.</> },
        { question: 'How can I get involved?', answer: 'Contact us via the contact form to join a program, propose a partnership, or contribute to the association\'s activities.' },
        { question: 'How does ICIA design and deploy its programs?', answer: 'ICIA defines the programmatic orientations and quality requirements. It relies on a network of specialized operational partners in training engineering and educational deployment for the concrete implementation of programs.' },
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
      background: '#000',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div className="container-mentivis">
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(2.5rem, 6vw, 6rem)' }}>
          <div className="faq-intro">
            <p style={{ marginBottom: '1.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '12px' }}>
              {data.eyebrow}
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '1.75rem', color: '#fff' }}>
              {data.title}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.items.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <article key={i} style={{
                  background: '#000',
                  borderRadius: '16px',
                  padding: '0 24px',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.35)' : 'none',
                  transition: 'background 0.3s ease',
                }}>
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} style={{
                    width: '100%', background: 'none', border: 'none', color: '#fff',
                    fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
                    padding: '1.6rem 0', display: 'grid', gridTemplateColumns: '2.25rem 1fr auto',
                    alignItems: 'center', gap: '1.5rem', fontSize: '1.0625rem', fontWeight: 400,
                    letterSpacing: '-0.005em', lineHeight: 1.4,
                  }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item.question}</span>
                    <span style={{ position: 'relative', width: 14, height: 14, flexShrink: 0 }}>
                      <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1, background: 'rgba(255,255,255,0.6)', transform: 'translateY(-50%)', transition: 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                      <span style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: 'rgba(255,255,255,0.6)', transform: isOpen ? 'translateX(-50%) rotate(90deg)' : 'translateX(-50%)', transition: 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.5s cubic-bezier(0.65, 0, 0.35, 1)' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ padding: '0 0 2.25rem calc(2.25rem + 1.5rem)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', maxWidth: '62ch', fontWeight: 300, margin: 0 }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
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
