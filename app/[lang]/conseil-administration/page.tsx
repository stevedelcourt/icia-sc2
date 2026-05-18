import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

interface Membre {
  name: string
  role: string
}

const MEMBRES_FR: Membre[] = [
  { name: 'Mathias Costes', role: 'Président' },
  { name: 'Roxan Roumegas', role: 'Vice-Président' },
  { name: 'Julie Steiner', role: 'Trésorière' },
  { name: 'Steven Delcourt', role: 'Secrétaire Général' },
  { name: 'Stéphane Vannier', role: 'Administrateur' },
  { name: 'Léonard Cox', role: 'Administrateur' },
]

const MEMBRES_EN: Membre[] = [
  { name: 'Mathias Costes', role: 'President' },
  { name: 'Roxan Roumegas', role: 'Vice President' },
  { name: 'Julie Steiner', role: 'Treasurer' },
  { name: 'Steven Delcourt', role: 'General Secretary' },
  { name: 'Stéphane Vannier', role: 'Board Member' },
  { name: 'Léonard Cox', role: 'Board Member' },
]

export default function ConseilAdministrationPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const membres = lang === 'en' ? MEMBRES_EN : MEMBRES_FR

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <FadeIn>
            <p className="eyebrow">ICIA</p>
            <h1 className="t-display text-primary" style={{ marginBottom: '24px' }}>
              {lang === 'fr' ? "Conseil d'administration" : 'Board of Directors'}
            </h1>
            <p className="t-lead" style={{ maxWidth: '640px', marginBottom: '56px' }}>
              {lang === 'fr'
                ? "L'ICIA est gouverné par un conseil d'administration composé de membres bénévoles, engagés pour la mission d'intérêt général de l'association."
                : 'ICIA is governed by a board of directors composed of volunteer members, committed to the public interest mission of the association.'}
            </p>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {membres.map((membre, i) => (
              <FadeIn key={membre.name} delay={0.1 + i * 0.06}>
                <div>
                  <div style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '48px', fontWeight: 300, color: '#d4d4d4' }}>
                      {membre.name.charAt(0)}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: '0 0 4px' }}>
                    {membre.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4e4e4e', margin: 0 }}>
                    {membre.role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
