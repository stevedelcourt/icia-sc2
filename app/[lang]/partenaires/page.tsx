import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

const PARTENAIRES = [
  { name: 'Mentivis', desc: 'Opérateur pédagogique et partenaire d\'ingénierie de l\'Institut.', url: 'https://mentivis.com' },
  { name: 'Mariusia', desc: 'Lieu d\'ancrage physique et écosystème marseillais de l\'ICIA.', url: 'https://mariusia.com' },
  { name: 'Campus Cyber.IA Euromed', desc: 'Campus dédié à la cybersécurité et à l\'intelligence artificielle.', url: 'https://campuscyber.fr' },
]

export default function PartenairesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <FadeIn>
            <p className="eyebrow">ICIA</p>
            <h1 className="t-display text-primary" style={{ marginBottom: '24px' }}>
              {lang === 'fr' ? 'Partenaires' : 'Partners'}
            </h1>
            <p className="t-lead" style={{ maxWidth: '640px', marginBottom: '56px' }}>
              {lang === 'fr'
                ? "L'ICIA s'appuie sur un réseau de partenaires spécialisés pour assurer la conception, l'ingénierie et le déploiement de ses programmes."
                : 'ICIA relies on a network of specialized partners to ensure the design, engineering and deployment of its programs.'}
            </p>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {PARTENAIRES.map((p, i) => (
              <FadeIn key={p.name} delay={0.1 + i * 0.08}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="p-8 bg-secondary rounded-card shadow-card card-hover" style={{ borderRadius: 'var(--r-module)', height: '100%' }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '3/2',
                      borderRadius: 'var(--r-card)',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '32px', fontWeight: 300, color: '#d4d4d4' }}>
                        {p.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="t-heading text-primary" style={{ marginBottom: '8px', fontWeight: 400 }}>
                      {p.name}
                    </h3>
                    <p className="t-caption">{p.desc}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
