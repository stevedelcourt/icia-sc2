import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn, AnimatedCard } from '@/components/Animations'
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
          <FadeIn>
            <p className="t-micro" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>
              {t(lang, 'mission.label')}
            </p>
            <h1 className="t-display text-primary" style={{ marginBottom: '32px' }}>
              {t(lang, 'mission.title')}
            </h1>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {piliers.map((p, i) => (
              <AnimatedCard key={p.title} delay={i * 0.1} className="p-8 bg-secondary rounded-card shadow-card" whileHover={{ y: -4 }}>
                <h2 className="t-heading text-primary" style={{ marginBottom: '12px' }}>{p.title}</h2>
                <p className="t-caption">{p.desc}</p>
              </AnimatedCard>
            ))}
          </div>

          <div style={{ maxWidth: '720px' }}>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {t(lang, 'mission.body.1')}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="t-lead">
                {t(lang, 'mission.body.2')}
              </p>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
