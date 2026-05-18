import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn, AnimatedCard } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'
import { LocalizedLink } from '@/lib/i18n'

export default function ProgrammesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  const programmes = [
    {
      title: t(lang, 'homepage.programmes.impact.title'),
      desc: t(lang, 'homepage.programmes.impact.desc'),
      tagline: t(lang, 'homepage.programmes.impact.tagline'),
      href: '/programme-impact',
      featured: true,
    },
    {
      title: t(lang, 'homepage.programmes.territoires.title'),
      desc: t(lang, 'homepage.programmes.territoires.desc'),
    },
    {
      title: t(lang, 'homepage.programmes.education.title'),
      desc: t(lang, 'homepage.programmes.education.desc'),
    },
    {
      title: t(lang, 'homepage.programmes.travail.title'),
      desc: t(lang, 'homepage.programmes.travail.desc'),
    },
  ]

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <FadeIn>
            <p className="t-micro" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>
              {t(lang, 'programmes.label')}
            </p>
            <h1 className="t-display text-primary" style={{ marginBottom: '24px' }}>
              {t(lang, 'programmes.title')}
            </h1>
            <p className="t-lead" style={{ maxWidth: '640px', marginBottom: '48px' }}>
              {t(lang, 'programmes.intro')}
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {programmes.map((p, i) => (
              <AnimatedCard key={p.title} delay={i * 0.1} className="p-8 bg-primary rounded-card shadow-card" whileHover={{ y: -4 }}>
                <h2 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{p.title}</h2>
                <p className="t-caption" style={{ marginBottom: p.featured ? '12px' : '0' }}>{p.desc}</p>
                {p.featured && p.tagline && (
                  <p className="t-caption" style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    {p.tagline}
                  </p>
                )}
                {p.href && (
                  <LocalizedLink href={p.href} className="btn-pill btn-black" style={{ marginTop: '8px' }}>
                    {t(lang, 'homepage.programmes.impact.cta')}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </LocalizedLink>
                )}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
