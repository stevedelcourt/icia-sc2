import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'
import { t, type Locale } from '@/generated/content'

export default function GouvernancePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

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
        </section>

        {/* Conseil stratégique */}
        <section style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow" style={{ marginBottom: '12px' }}>
                {lang === 'fr' ? 'Conseil stratégique' : 'Strategic Council'}
              </p>
              <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                {lang === 'fr' ? 'Une gouvernance éclairée' : 'Enlightened governance'}
              </h2>
              <p className="t-lead" style={{ lineHeight: 1.65, maxWidth: '680px' }}>
                {lang === 'fr'
                  ? "L'ICIA se dote prochainement d'un Conseil stratégique composé de personnalités issues des mondes académique, économique et institutionnel, réunies autour d'une conviction commune : l'intelligence artificielle appelle une gouvernance éducative à la hauteur de ses enjeux. Ce conseil aura pour mission d'éclairer les orientations programmatiques de l'Institut, de renforcer son ancrage dans les débats qui structurent la transformation des organisations et des territoires, et d'assurer la crédibilité scientifique et éthique de ses travaux. Ses membres, dont les noms seront communiqués prochainement, apportent à l'ICIA une diversité d'expertises et une indépendance de jugement conformes aux exigences d'une institution d'intérêt général."
                  : 'ICIA will soon establish a Strategic Council composed of personalities from the academic, economic and institutional worlds, united around a shared conviction: artificial intelligence calls for educational governance commensurate with its challenges. This council will have the mission of informing the Institute\'s programmatic orientations, strengthening its anchoring in the debates that structure the transformation of organizations and territories, and ensuring the scientific and ethical credibility of its work. Its members, whose names will be communicated shortly, bring to ICIA a diversity of expertise and an independence of judgment in line with the requirements of a public interest institution.'}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
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
