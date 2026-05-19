import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'
import { t, type Locale } from '@/generated/content'

const MEMBRES_FR = [
  { name: 'Mathias Costes', role: 'Président' },
  { name: 'Roxan Roumegas', role: 'Vice-Président' },
  { name: 'Julie Steiner', role: 'Trésorière' },
  { name: 'Steven Delcourt', role: 'Secrétaire Général' },
  { name: 'Stéphane Vannier', role: 'Administrateur' },
  { name: 'Léonard Cox', role: 'Administrateur' },
]

const MEMBRES_EN = [
  { name: 'Mathias Costes', role: 'President' },
  { name: 'Roxan Roumegas', role: 'Vice President' },
  { name: 'Julie Steiner', role: 'Treasurer' },
  { name: 'Steven Delcourt', role: 'General Secretary' },
  { name: 'Stéphane Vannier', role: 'Board Member' },
  { name: 'Léonard Cox', role: 'Board Member' },
]

export default function GouvernancePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const membres = lang === 'en' ? MEMBRES_EN : MEMBRES_FR

  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">{t(lang, 'gouvernance.label')}</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>
                {t(lang, 'gouvernance.title')}
              </h1>
              <p className="t-lead" style={{ maxWidth: '620px' }}>
                {lang === 'fr'
                  ? "L'ICIA est une association loi 1901 indépendante. Elle définit sa mission, ses orientations et ses programmes d'intérêt général."
                  : 'ICIA is an independent non-profit association. It defines its mission, orientations and public interest programs.'}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section style={{ background: '#ffffff', padding: '0 0 var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)' }}>
              <FadeIn delay={0.1}>
                <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                  {t(lang, 'gouvernance.body.1')}
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                  {t(lang, 'gouvernance.body.2')}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                  {t(lang, 'gouvernance.body.3')}
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="t-lead" style={{ maxWidth: '680px' }}>
                  {t(lang, 'gouvernance.body.4')}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Conseil d'administration */}
        <section style={{ background: '#f5f5f5', padding: '0 0 var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow" style={{ marginBottom: '12px' }}>
                {lang === 'fr' ? "Conseil d'administration" : 'Board of Directors'}
              </p>
              <h2 className="t-title text-primary" style={{ marginBottom: '40px' }}>
                {lang === 'fr' ? 'Les membres du conseil' : 'Board members'}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {membres.map((m, i) => (
                <FadeIn key={m.name} delay={0.1 + i * 0.06}>
                  <div>
                    <div style={{
                      width: '100%', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden',
                      marginBottom: '14px', background: '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '48px', fontWeight: 300, color: '#d4d4d4' }}>{m.name.charAt(0)}</span>
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: '0 0 4px' }}>{m.name}</p>
                    <p style={{ fontSize: '13px', color: '#4e4e4e', margin: 0 }}>{m.role}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                {lang === 'fr' ? 'Rejoignez la gouvernance de l\'ICIA' : 'Join ICIA\'s governance'}
              </h2>
              <p className="t-lead" style={{ marginBottom: '32px' }}>
                {lang === 'fr'
                  ? "Participez aux décisions qui façonnent l'avenir de l'intelligence artificielle. L'ICIA est une association ouverte à toutes les bonnes volontés."
                  : 'Participate in the decisions shaping the future of artificial intelligence. ICIA is an association open to all goodwill.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <LocalizedLink href="/devenir-membre" className="btn-pill btn-black">
                  {lang === 'fr' ? 'Devenir membre' : 'Become a member'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
                <LocalizedLink href="/contact" className="btn-pill btn-outline-shadow">
                  {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
