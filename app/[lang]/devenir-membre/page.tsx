import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { LocalizedLink } from '@/lib/i18n'

export default function DevenirMembrePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: 'clamp(40px, 5vw, 56px) clamp(32px, 5vw, 48px)', maxWidth: '720px' }}>
            <FadeIn>
              <p className="eyebrow">ICIA</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {lang === 'fr' ? 'Devenir membre' : 'Become a member'}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {lang === 'fr'
                  ? "Rejoindre l'ICIA, c'est participer activement à la mission d'intérêt général de l'association : rendre l'intelligence artificielle plus compréhensible, accessible et maîtrisable pour tous."
                  : 'Joining ICIA means actively participating in the public interest mission: making artificial intelligence more understandable, accessible and manageable for everyone.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="t-lead" style={{ marginBottom: '16px' }}>
                {lang === 'fr'
                  ? "En tant que membre, vous contribuez à la gouvernance de l'association, participez à l'assemblée générale et pouvez vous impliquer dans les programmes et les groupes de travail."
                  : "As a member, you contribute to the association's governance, participate in the general assembly and can get involved in programs and working groups."}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="t-lead" style={{ marginBottom: '32px' }}>
                {lang === 'fr'
                  ? "L'adhésion est ouverte à toute personne physique ou morale partageant les valeurs et la mission de l'ICIA."
                  : 'Membership is open to any individual or legal entity sharing the values and mission of ICIA.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
