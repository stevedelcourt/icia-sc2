import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

const PARTENAIRES = [
  { slug: 'mentivis', name: 'Mentivis', desc: 'Opérateur pédagogique et partenaire d\'ingénierie de l\'Institut. Conception et déploiement des dispositifs pédagogiques dédiés à l\'IA.' },
  { slug: 'mariusia', name: 'Mariusia', desc: 'Lieu d\'ancrage physique et écosystème marseillais. Espace dédié aux initiatives éducatives, créatives et entrepreneuriales en IA.' },
  { slug: 'campus-cyber-ia', name: 'Campus Cyber.IA', desc: 'Campus dédié à la cybersécurité et à l\'intelligence artificielle. Formation, innovation et recherche appliquée.' },
  { slug: 'airwell', name: 'Airwell', desc: '' },
  { slug: 'france-travail', name: 'France Travail', desc: 'Accompagnement des transitions professionnelles et anticipation des besoins en compétences numériques sur les territoires.' },
  { slug: 'mk2', name: 'MK2', desc: '' },
]

export default function PartenairesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis" style={{ maxWidth: '800px' }}>
            <FadeIn>
              <p className="eyebrow">Partenaires</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>
                {lang === 'fr' ? 'Ensemble, donnons à l\'IA sa dimension collective' : 'Together, let\'s give AI its collective dimension'}
              </h1>
              <p className="t-lead" style={{ marginBottom: '24px', fontSize: '18px' }}>
                {lang === 'fr'
                  ? "L'ICIA fédère un réseau de partenaires engagés — institutions, entreprises, associations, établissements d'enseignement — autour d'une conviction commune."
                  : 'ICIA brings together a network of committed partners — institutions, companies, nonprofits, educational establishments — around a shared conviction.'}
              </p>
              <p className="t-lead" style={{ marginBottom: '40px' }}>
                {lang === 'fr'
                  ? "Devenir partenaire de l'ICIA, c'est rejoindre un écosystème qui croit que l'intelligence artificielle ne doit pas rester entre les mains de quelques-uns. C'est contribuer à des programmes d'intérêt général, participer à la gouvernance éclairée de l'association, et bénéficier d'une visibilité au sein d'un réseau engagé pour une IA plus inclusive, plus compréhensible et plus maîtrisable."
                  : 'Becoming an ICIA partner means joining an ecosystem that believes artificial intelligence should not remain in the hands of a few. It means contributing to public interest programs, participating in enlightened governance, and gaining visibility within a network committed to more inclusive, understandable and manageable AI.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <LocalizedLink href="/contact" className="btn-pill btn-black">
                  {lang === 'fr' ? 'Devenir partenaire' : 'Become a partner'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
                <LocalizedLink href="/devenir-membre" className="btn-pill btn-outline-shadow">
                  {lang === 'fr' ? 'Devenir membre' : 'Become a member'}
                  <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </LocalizedLink>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Partners grid */}
        <section style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <h2 className="t-title text-primary" style={{ marginBottom: '8px' }}>
                {lang === 'fr' ? 'Notre réseau de partenaires' : 'Our partner network'}
              </h2>
              <p className="t-caption" style={{ marginBottom: '40px' }}>
                {lang === 'fr' ? '6 organisations, une conviction commune.' : '6 organizations, one shared conviction.'}
              </p>
            </FadeIn>
            <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
              {PARTENAIRES.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.02}>
                  <div className="partner-card" style={{
                    aspectRatio: '1/1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Logo */}
                    <img
                      src={`/images/partners/${p.slug}.svg`}
                      alt={p.name}
                      style={{
                        width: 'clamp(72px, 7vw, 100px)',
                        height: 'clamp(72px, 7vw, 100px)',
                        marginBottom: '10px',
                      }}
                    />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#999',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>{p.name}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                {lang === 'fr' ? 'Devenez partenaire de l\'ICIA' : 'Become an ICIA partner'}
              </h2>
              <p className="t-lead" style={{ marginBottom: '24px' }}>
                {lang === 'fr'
                  ? "Rejoignez notre réseau de partenaires engagés et contribuez à la mission d'intérêt général de l'ICIA."
                  : 'Join our network of committed partners and contribute to ICIA\'s public interest mission.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </LocalizedLink>
            </FadeIn>
          </div>
        </section>

      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) { .partners-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .partners-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 400px) { .partners-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      ` }} />
      <Footer />
    </>
  )
}
