'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

const FEATURES = {
  fr: [
    { t: 'Ressources pédagogiques', d: 'Supports construits pour être utilisés directement en cours, à tous les niveaux d\'enseignement.' },
    { t: 'Formation des équipes', d: 'Accompagnement des enseignants et personnels pour intégrer l\'IA dans leurs pratiques.' },
    { t: 'Esprit critique', d: 'Formation au jugement, à l\'éthique et à la compréhension des mécanismes de l\'IA.' },
    { t: 'Programmes sur mesure', d: 'Construction de parcours adaptés à votre établissement et vos disciplines.' },
  ],
  en: [
    { t: 'Educational resources', d: 'Materials built for direct classroom use at all education levels.' },
    { t: 'Team training', d: 'Support for teachers and staff to integrate AI into their practices.' },
    { t: 'Critical thinking', d: 'Training in judgment, ethics and understanding AI mechanisms.' },
    { t: 'Custom programs', d: 'Building pathways adapted to your institution and disciplines.' },
  ],
}

export default function IciaEducationPage({ params }: { params: { lang: string } }) {
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
                  <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>{lang === 'fr' ? 'ICIA Education' : 'ICIA Education'}</h1>
                  <p className="t-lead" style={{ marginBottom: '16px' }}>{lang === 'fr' ? 'Compétences IA, pédagogie et transformation éducative.' : 'AI skills, pedagogy and educational transformation.'}</p>
                  <p className="t-lead" style={{ marginBottom: '32px' }}>{lang === 'fr' ? "L'IA transforme la manière d'enseigner et d'apprendre. L'ICIA accompagne les établissements d'enseignement pour intégrer l'IA avec méthode." : 'AI is transforming education. ICIA supports educational institutions to integrate AI with method.'}</p>
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
                  <img src="/images/modules/monde-educatif.avif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
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
