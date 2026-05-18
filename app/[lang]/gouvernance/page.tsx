import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'

export default function GouvernancePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <div className="inner-card">
            <FadeIn>
              <p className="eyebrow">{t(lang, 'gouvernance.label')}</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '32px' }}>
                {t(lang, 'gouvernance.title')}
              </h1>
            </FadeIn>

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
              <p className="t-lead" style={{ marginBottom: '48px', maxWidth: '680px' }}>
                {t(lang, 'gouvernance.body.4')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="t-caption" style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                ICIA, Association loi 1901
              </p>
              <p className="t-micro">
                Siège social : 4 boulevard Jacques Saadé, 13002 Marseille
              </p>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
