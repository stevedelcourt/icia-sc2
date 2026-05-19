'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

const FEATURES = {
  fr: [
    { t: 'Diagnostic compétences IA', d: 'Cartographie des métiers impactés et identification des besoins en montée en compétence.' },
    { t: 'Parcours de reconversion', d: 'Formations ciblées pour accompagner les transitions professionnelles vers les métiers de l\'IA.' },
    { t: 'Alignement branches', d: 'Travail avec les OPCO et branches professionnelles pour des formations alignées sur le marché.' },
    { t: 'Veille prospective', d: 'Analyse des évolutions du marché du travail et anticipation des compétences de demain.' },
  ],
  en: [
    { t: 'AI skills diagnosis', d: 'Mapping impacted professions and identifying upskilling needs.' },
    { t: 'Reskilling pathways', d: 'Targeted training for professional transitions toward AI roles.' },
    { t: 'Industry alignment', d: 'Working with professional branches for market-aligned training.' },
    { t: 'Foresight watch', d: 'Analysis of labor market evolutions and anticipation of future skills.' },
  ],
}

export default function IciaTravailCompetencesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const features = lang === 'en' ? FEATURES.en : FEATURES.fr
  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis">
            <div className="pg-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
              <div>
                <FadeIn>
                  <p className="eyebrow">Programme</p>
                  <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>{lang === 'fr' ? 'ICIA Travail & Compétences' : 'ICIA Work & Skills'}</h1>
                  <p className="t-lead" style={{ marginBottom: '16px' }}>{lang === 'fr' ? 'Emploi, reconversion, évolution des métiers et nouvelles capacités professionnelles.' : 'Employment, career transition, job evolution and new professional capabilities.'}</p>
                  <p className="t-lead" style={{ marginBottom: '32px' }}>{lang === 'fr' ? "L'IA redéfinit les compétences attendues dans tous les secteurs. L'ICIA accompagne les professionnels et les entreprises pour anticiper ces mutations." : 'AI is redefining expected skills across all sectors. ICIA supports professionals and companies to anticipate these changes.'}</p>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <LocalizedLink href="/contact" className="btn-pill btn-black">
                    {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </LocalizedLink>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <div style={{ borderRadius: '22px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                  <img src="/images/modules/professionnels.avif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        <section style={{ background: '#ffffff', padding: '0 0 var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn><h2 className="t-title text-primary" style={{ marginBottom: '40px' }}>{lang === 'fr' ? 'Ce que nous proposons' : 'What we offer'}</h2></FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {features.map((item, i) => (
                <FadeIn key={item.t} delay={i * 0.06}>
                  <div className="pg-card" style={{ background: '#f5f5f5', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'linear-gradient(135deg, #1A2B80 0%, #7030A0 38%, #B02050 72%, #C83040 100%)'; e.currentTarget.querySelectorAll('.pg-card-title,.pg-card-desc').forEach(el => (el as HTMLElement).style.color = '#fff') }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.querySelectorAll('.pg-card-title,.pg-card-desc').forEach(el => (el as HTMLElement).style.color = '') }}>
                    <h3 className="pg-card-title" style={{ fontSize: '17px', fontWeight: 500, color: '#000', marginBottom: '10px' }}>{item.t}</h3>
                    <p className="pg-card-desc" style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e' }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `@media (max-width:768px){.pg-hero-grid{grid-template-columns:1fr!important;gap:32px!important}}` }} />
      <Footer />
    </>
  )
}
