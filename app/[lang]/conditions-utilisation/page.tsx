import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function ConditionsUtilisation() {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: 'calc(64px + var(--section-gap))', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h1 className="t-display text-primary" style={{ marginBottom: '40px' }}>Conditions générales d'utilisation</h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Acceptation des conditions</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'accès et l'utilisation du site iciafrance.com sont soumis à l'acceptation et au respect des présentes conditions générales d'utilisation.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Utilisation du site</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Le site iciafrance.com est un site de présentation des programmes et activités de l'ICIA, Institut Collectif de l'IA. L'utilisateur s'engage à ne pas utiliser le site à des fins illicites ou interdites par la loi.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Propriété intellectuelle</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ensemble des contenus présents sur le site iciafrance.com est protégé par les lois relatives à la propriété intellectuelle. Ces contenus sont la propriété exclusive de l'ICIA ou de ses partenaires. Toute reproduction sans autorisation est interdite.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Limitation de responsabilité</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ICIA s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées. Toutefois, l'ICIA ne saurait être tenue responsable des erreurs ou omissions, ni des dommages résultant de l'utilisation des informations disponibles sur le site.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Droit applicable</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents. Pour toute question : contact@iciafrance.com.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
