import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function ConditionsUtilisation() {
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
              Conditions générales d'utilisation
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Acceptation des conditions
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'accès et l'utilisation du site mariusia.com sont soumis à l'acceptation et au respect des présentes conditions générales d'utilisation. En accédant à ce site, l'utilisateur reconnaît avoir pris connaissance des présentes conditions et s'engage à les respecter sans réserve.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Utilisation du site
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Le site mariusia.com est un site de présentation des services de conseil proposés par Mentivis SAS. L'utilisateur s'engage à ne pas utiliser le site à des fins illicites ou interdites par la loi. Toute utilisation frauduleuse, abusive ou contraire aux présentes conditions pourra entraîner la restriction de l'accès au site.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Propriété intellectuelle
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ensemble des contenus présents sur le site mariusia.com (textes, images, logos, vidéos, graphismes, icônes) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Ces contenus sont la propriété exclusive de Mentivis SAS ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Mentivis SAS.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Limitation de responsabilité
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Mentivis SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site mariusia.com. Toutefois, Mentivis SAS ne saurait être tenue responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l'utilisation des informations disponibles sur le site. Le site peut contenir des liens hypertextes vers d'autres sites internet. Mentivis SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Droit applicable et juridiction
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les présentes conditions générales d'utilisation sont régies par le droit français. En cas de litige relatif à l'utilisation du site mariusia.com, les tribunaux français seront seuls compétents. Pour toute question relative aux présentes conditions, vous pouvez nous contacter à l'adresse suivante : contact@mariusia.com.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
