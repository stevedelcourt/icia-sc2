import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main
        className="section"
        style={{
          paddingTop: 'calc(64px + var(--section-gap))',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h1 className="t-display text-primary" style={{ marginBottom: '40px' }}>
              Mentions légales
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Éditeur du site
            </h2>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              <strong>Mentivis SAS</strong>
            </p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              Société par actions simplifiée au capital social de 1 500 euros
            </p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              Siège social : 13 rue Saint-Honoré, 78000 Versailles, France
            </p>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              RCS Versailles : 982 665 902
            </p>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Directeur de la publication : Stéphane Vannier, Président de Mentivis SAS
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Hébergement
            </h2>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              <strong>o2switch</strong>
            </p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              Chemin des Pardiaux, 63000 Clermont-Ferrand, France
            </p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              SIRET : 510 909 807 00032
            </p>
            <p className="t-lead" style={{ marginBottom: '8px' }}>
              RCS Clermont-Ferrand : 510 909 807
            </p>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Capital social : 100 000 euros
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Présentation de l'entreprise
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              <a
                href="/MariusIA-BAM.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
              >
                Télécharger le document de présentation (PDF)
              </a>
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Propriété intellectuelle
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ensemble des éléments du site mariusia.com (structure, textes, images, logos, marques, vidéos) est protégé par le droit d'auteur et le droit des marques. Toute reproduction, représentation ou diffusion, en tout ou partie, du contenu de ce site sur quelque support que ce soit est formellement interdite, sauf autorisation expresse de Mentivis SAS. Les marques "Marius IA" et "L'institut collectif de l'IA" sont des marques déposées par Mentivis SAS.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
