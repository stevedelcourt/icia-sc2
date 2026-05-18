'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock, AnimatedCard, FadeIn } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'

const chevronRight = (
  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Home() {
  const t = useT()
  const params = useParams()
  const lang = (params?.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Institut Collectif de l'IA",
            "alternateName": "ICIA",
            "url": "https://www.iciafrance.com",
            "description": "Association loi 1901 d\u00e9di\u00e9e aux enjeux collectifs de l'intelligence artificielle.",
            "areaServed": ["France", "Europe"],
            "knowsAbout": ["Artificial Intelligence", "AI Education", "AI Skills", "Digital Inclusion"],
            "contactPoint": { "@type": "ContactPoint", "url": "https://www.iciafrance.com/contact" }
          })
        }}
      />
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* 1. Hero */}
        <section id="accueil" className="section bg-primary">
          <div className="container-mentivis">
            <StaggerBlock delay={0}>
              <p className="t-micro" style={{ textTransform: 'uppercase', letterSpacing: '0.14px', marginBottom: '24px' }}>
                {t('homepage.hero.label')}
              </p>
            </StaggerBlock>
            <StaggerBlock delay={0.1}>
              <h1 className="t-hero text-primary" style={{ marginBottom: '20px', whiteSpace: 'pre-line' }}>
                {t('homepage.hero.h1')}
              </h1>
            </StaggerBlock>
            <StaggerBlock delay={0.2}>
              <p className="t-lead" style={{ maxWidth: '560px', marginBottom: '16px' }}>
                {t('homepage.hero.baseline')}
              </p>
            </StaggerBlock>
            <StaggerBlock delay={0.3}>
              <p className="t-lead" style={{ maxWidth: '600px', marginBottom: '40px' }}>
                {t('homepage.hero.intro')}
              </p>
            </StaggerBlock>
            <StaggerBlock delay={0.4}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <LocalizedLink href="/#mission" className="btn-pill btn-black">
                  {t('homepage.hero.cta_mission')}
                  {chevronRight}
                </LocalizedLink>
                <LocalizedLink href="/#programmes" className="btn-pill btn-outline-shadow">
                  {t('homepage.hero.cta_programmes')}
                  {chevronRight}
                </LocalizedLink>
              </div>
            </StaggerBlock>
          </div>
        </section>

        {/* 2. Mission */}
        <section id="mission" className="section bg-secondary">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {t('homepage.mission.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ maxWidth: '800px', marginBottom: '48px' }}>
                {t('homepage.mission.intro')}
              </p>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                [t('homepage.mission.intelligible.title'), t('homepage.mission.intelligible.desc')],
                [t('homepage.mission.competences.title'), t('homepage.mission.competences.desc')],
                [t('homepage.mission.fractures.title'), t('homepage.mission.fractures.desc')],
                [t('homepage.mission.debat.title'), t('homepage.mission.debat.desc')],
              ].map(([title, desc], i) => (
                <AnimatedCard key={title} delay={i * 0.1} className="p-8 bg-primary rounded-card shadow-card" whileHover={{ y: -4 }}>
                  <h3 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{title}</h3>
                  <p className="t-caption">{desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Nos actions */}
        <section id="actions" className="section bg-primary">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>
                {t('homepage.actions.title')}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                [t('homepage.actions.formation.title'), t('homepage.actions.formation.desc')],
                [t('homepage.actions.recherche.title'), t('homepage.actions.recherche.desc')],
                [t('homepage.actions.territoires.title'), t('homepage.actions.territoires.desc')],
                [t('homepage.actions.ressources.title'), t('homepage.actions.ressources.desc')],
                [t('homepage.actions.debats.title'), t('homepage.actions.debats.desc')],
              ].map(([title, desc], i) => (
                <AnimatedCard key={title} delay={i * 0.08} className="p-8 bg-secondary rounded-card shadow-card" whileHover={{ y: -4 }}>
                  <h3 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{title}</h3>
                  <p className="t-caption">{desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Pour qui */}
        <section id="pour-qui" className="section bg-warm">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '12px', whiteSpace: 'pre-line' }}>
                {t('homepage.pour_qui.title')}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '48px' }}>
              {[
                [t('homepage.pour_qui.citoyens.title'), t('homepage.pour_qui.citoyens.desc')],
                [t('homepage.pour_qui.professionnels.title'), t('homepage.pour_qui.professionnels.desc')],
                [t('homepage.pour_qui.organisations.title'), t('homepage.pour_qui.organisations.desc')],
                [t('homepage.pour_qui.publics.title'), t('homepage.pour_qui.publics.desc')],
                [t('homepage.pour_qui.education.title'), t('homepage.pour_qui.education.desc')],
              ].map(([title, desc], i) => (
                <AnimatedCard key={title} delay={i * 0.06} className="p-8 bg-primary rounded-card shadow-card" whileHover={{ y: -4 }}>
                  <h3 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{title}</h3>
                  <p className="t-caption">{desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Nos engagements */}
        <section id="engagements" className="section bg-secondary">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>
                {t('homepage.engagements.title')}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                [t('homepage.engagements.independance.title'), t('homepage.engagements.independance.desc')],
                [t('homepage.engagements.interet.title'), t('homepage.engagements.interet.desc')],
                [t('homepage.engagements.accessibilite.title'), t('homepage.engagements.accessibilite.desc')],
                [t('homepage.engagements.critique.title'), t('homepage.engagements.critique.desc')],
                [t('homepage.engagements.action.title'), t('homepage.engagements.action.desc')],
              ].map(([title, desc], i) => (
                <AnimatedCard key={title} delay={i * 0.08} className="p-8 bg-primary rounded-card shadow-card" whileHover={{ y: -4 }}>
                  <h3 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{title}</h3>
                  <p className="t-caption">{desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Programmes ICIA */}
        <section id="programmes" className="section bg-primary">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '48px' }}>
                {t('homepage.programmes.title')}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {[
                [t('homepage.programmes.territoires.title'), t('homepage.programmes.territoires.desc')],
                [t('homepage.programmes.education.title'), t('homepage.programmes.education.desc')],
                [t('homepage.programmes.travail.title'), t('homepage.programmes.travail.desc')],
              ].map(([title, desc], i) => (
                <AnimatedCard key={title} delay={i * 0.1} className="p-8 bg-secondary rounded-card shadow-card" whileHover={{ y: -4 }}>
                  <h3 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{title}</h3>
                  <p className="t-caption">{desc}</p>
                </AnimatedCard>
              ))}
            </div>
            <AnimatedCard delay={0.3} className="p-10 bg-warm rounded-card shadow-card">
              <div style={{ maxWidth: '640px' }}>
                <h3 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                  {t('homepage.programmes.impact.title')}
                </h3>
                <p className="t-lead" style={{ marginBottom: '12px' }}>
                  {t('homepage.programmes.impact.desc')}
                </p>
                <p className="t-caption" style={{ marginBottom: '24px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {t('homepage.programmes.impact.tagline')}
                </p>
                <LocalizedLink href="/programme-impact" className="btn-pill btn-black">
                  {t('homepage.programmes.impact.cta')}
                  {chevronRight}
                </LocalizedLink>
              </div>
            </AnimatedCard>
          </div>
        </section>

        {/* 7. Qui sommes-nous ? */}
        <section id="a-propos" className="section bg-secondary">
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {t('homepage.a_propos.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t('homepage.a_propos.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t('homepage.a_propos.body.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="t-lead">
                {t('homepage.a_propos.body.3')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 8. Collaborer */}
        <section id="collaborer" className="section bg-primary">
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {t('homepage.collaborer.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '12px' }}>
                {t('homepage.collaborer.intro')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {t('homepage.collaborer.list').split('\n').map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className="t-lead text-primary"
                    style={{ padding: '12px 0' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* 9. Gouvernance & Opération */}
        <section id="gouvernance" className="section bg-secondary">
          <div className="container-mentivis" style={{ maxWidth: '800px' }}>
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '32px' }}>
                {t('homepage.gouvernance.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t('homepage.gouvernance.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t('homepage.gouvernance.body.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '32px' }}>
                {t('homepage.gouvernance.body.3')}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="p-8 bg-primary rounded-card shadow-card" style={{ marginBottom: '16px' }}>
                <p className="t-heading text-primary" style={{ fontWeight: 500, marginBottom: '12px' }}>
                  {t('homepage.gouvernance.mentivis.title')}
                </p>
                <p className="t-caption">
                  {t('homepage.gouvernance.mentivis.desc')}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="t-micro">
                {t('homepage.gouvernance.mentivis.note')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 10. Ancrage territorial */}
        <section id="territoire" className="section bg-warm">
          <div className="container-mentivis" style={{ maxWidth: '800px' }}>
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {t('homepage.territoire.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t('homepage.territoire.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="t-lead" style={{ marginBottom: '24px' }}>
                {t('homepage.territoire.body.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-caption text-primary" style={{ fontWeight: 500 }}>
                {t('homepage.territoire.adresse')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 11. CTA Final */}
        <section id="cta" className="section bg-secondary">
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <h2 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {t('homepage.cta.title')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '40px' }}>
                {t('homepage.cta.body')}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t('homepage.cta.button')}
                {chevronRight}
              </LocalizedLink>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
