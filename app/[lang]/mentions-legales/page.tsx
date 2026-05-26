import { pageMetadata } from '@/lib/seo-metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, '/mentions-legales')
}

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: 'calc(64px + var(--section-gap))', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h1 className="t-display text-primary" style={{ marginBottom: '40px' }}>Mentions légales</h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Éditeur du site</h2>
            <p className="t-lead" style={{ marginBottom: '8px' }}>ICIA, Institut Collectif de l'IA</p>
              <p className="t-lead" style={{ marginBottom: '8px' }}>Association loi 1901</p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>Siège social : 4 boulevard Jacques Saadé, 13002 Marseille, France</p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>Email : contact@iciafrance.com</p>
            <p className="t-lead" style={{ marginBottom: '20px' }}>Directeur de la publication : Mathias Costes, Président de l'ICIA</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Hébergement</h2>
            <p className="t-lead" style={{ marginBottom: '8px' }}>o2switch</p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>Chemin des Pardiaux, 63000 Clermont-Ferrand, France</p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>SIRET : 510 909 807 00032</p>
            <p className="t-lead" style={{ marginBottom: '20px' }}>RCS Clermont-Ferrand : 510 909 807</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Propriété intellectuelle</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ensemble des éléments du site iciafrance.com (structure, textes, images, logos) est protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion du contenu est interdite sans autorisation expresse de l'ICIA.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
