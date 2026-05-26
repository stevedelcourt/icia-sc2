import { pageMetadata } from '@/lib/seo-metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, '/plan-du-site')
}

const SECTIONS = [
  {
    title: 'Programmes',
    links: [
      { label: 'Programme Impact', href: '/programme-impact' },
      { label: 'ICIA Territoires', href: '/icia-territoires' },
      { label: 'ICIA Education', href: '/icia-education' },
      { label: 'ICIA Travail & Compétences', href: '/icia-travail-competences' },
    ],
  },
  {
    title: 'Association',
    links: [
      { label: 'Mission', href: '/mission' },
      { label: 'Gouvernance', href: '/gouvernance' },
      { label: 'Partenaires', href: '/partenaires' },
      { label: 'Devenir membre', href: '/devenir-membre' },
      { label: 'Faire un don', href: '/donations' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Qui sommes-nous ?', href: '/a-propos' },
      { label: 'Manifeste', href: '/manifeste' },
      { label: 'Actualités', href: '/actualites' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Plan du site', href: '/plan-du-site' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'Gestion des cookies', href: '/cookies' },
      { label: "Conditions d'utilisation", href: '/conditions-utilisation' },
    ],
  },
]

export default function PlanDuSitePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">ICIA</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
                {lang === 'fr' ? 'Plan du site' : 'Sitemap'}
              </h1>
              <p className="t-lead" style={{ marginBottom: '48px' }}>
                {lang === 'fr'
                  ? 'Une vue d\'ensemble de toutes les pages du site ICIA.'
                  : 'An overview of all ICIA site pages.'}
              </p>
            </FadeIn>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
              {SECTIONS.map((section, i) => (
                <FadeIn key={section.title} delay={i * 0.08}>
                  <div>
                    <h2 className="t-heading text-primary" style={{ fontWeight: 500, marginBottom: '16px', fontSize: '17px' }}>
                      {section.title}
                    </h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {section.links.map(link => (
                        <LocalizedLink
                          key={link.href}
                          href={link.href}
                          className="t-caption"
                          style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.18s ease' }}
                        >
                          {link.label}
                        </LocalizedLink>
                      ))}
                    </nav>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
