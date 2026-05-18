import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'
import { LocalizedLink } from '@/lib/i18n'

export default function ProgrammeImpactPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-warm)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <p className="t-micro" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>
              {t(lang, 'programme_impact.label')}
            </p>
            <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
              {t(lang, 'programme_impact.title')}
            </h1>
            <p className="t-lead" style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '32px' }}>
              {t(lang, 'programme_impact.tagline')}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              {t(lang, 'programme_impact.body.1')}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              {t(lang, 'programme_impact.body.2')}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="t-lead" style={{ marginBottom: '40px' }}>
              {t(lang, 'programme_impact.body.3')}
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <LocalizedLink href="/contact" className="btn-pill btn-black">
              {t(lang, 'header.cta')}
              <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedLink>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
