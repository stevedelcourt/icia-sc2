'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

const FEATURES = {
  fr: [
    { t: 'Diagnostic territorial', d: 'Cartographie des besoins locaux, identification des opportunités IA et évaluation de la maturité numérique.' },
    { t: 'Ateliers de sensibilisation', d: 'Formats accessibles pour élus, agents et acteurs associatifs. Poser un vocabulaire commun.' },
    { t: 'Stratégie IA responsable', d: 'Feuilles de route adaptées au contexte et aux moyens du territoire.' },
    { t: 'Observatoire territorial', d: 'Pilotez l\'adoption, mesurez les effets et ajustez votre politique IA.' },
  ],
  en: [
    { t: 'Territorial diagnosis', d: 'Mapping local needs, identifying AI opportunities.' },
    { t: 'Awareness workshops', d: 'Accessible formats for officials, agents and non-profit actors.' },
    { t: 'Responsible AI strategy', d: 'Roadmaps adapted to territory context and resources.' },
    { t: 'Territorial observatory', d: 'Monitor adoption, measure effects, adjust your AI policy.' },
  ],
}

export default function IciaTerritoiresPage({ params }: { params: { lang: string } }) {
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
                  <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>{lang === 'fr' ? 'ICIA Territoires' : 'ICIA Territories'}</h1>
                  <p className="t-lead" style={{ marginBottom: '16px' }}>{lang === 'fr' ? 'Acculturation IA pour collectivités, associations et acteurs locaux.' : 'AI acculturation for local authorities, non-profits and local stakeholders.'}</p>
                  <p className="t-lead" style={{ marginBottom: '32px' }}>{lang === 'fr' ? "Les territoires sont en première ligne de la transformation IA. L'ICIA accompagne les collectivités, les associations et les acteurs locaux pour comprendre, anticiper et intégrer l'intelligence artificielle dans leurs politiques publiques." : 'Territories are at the frontline of AI transformation. ICIA supports local authorities to understand, anticipate and integrate AI.'}</p>
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
                  <img src="/images/modules/acteurs-publics.avif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
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
