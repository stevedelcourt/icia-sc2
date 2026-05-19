import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'
import { t, type Locale } from '@/generated/content'

export default function MissionPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  const piliers = [
    { title: t(lang, 'mission.intelligible.title'), desc: t(lang, 'mission.intelligible.desc') },
    { title: t(lang, 'mission.competences.title'), desc: t(lang, 'mission.competences.desc') },
    { title: t(lang, 'mission.fractures.title'), desc: t(lang, 'mission.fractures.desc') },
    { title: t(lang, 'mission.debat.title'), desc: t(lang, 'mission.debat.desc') },
  ]

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <div className="inner-card">
            <FadeIn>
              <p className="eyebrow">{t(lang, 'mission.label')}</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '32px' }}>
                {t(lang, 'mission.title')}
              </h1>
            </FadeIn>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
              {piliers.map((p, i) => (
                <FadeIn key={p.title} delay={0.1 + i * 0.08}>
                  <div className="p-8 bg-primary rounded-card shadow-card card-hover">
                    <h2 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{p.title}</h2>
                    <p className="t-caption">{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <p className="t-lead" style={{ marginBottom: '16px', maxWidth: '680px' }}>
                {t(lang, 'mission.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.45}>
              <p className="t-lead" style={{ maxWidth: '680px' }}>
                {t(lang, 'mission.body.2')}
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div style={{ marginTop: '48px' }}>
                <LocalizedLink href="/contact" className="btn-pill btn-black">
                  {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
