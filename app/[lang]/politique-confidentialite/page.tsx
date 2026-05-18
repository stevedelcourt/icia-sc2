import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function PolitiqueConfidentialite() {
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
              Politique de confidentialité
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Responsable du traitement
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Mentivis SAS, société par actions simplifiée, immatriculée au RCS de Versailles sous le numéro 982 665 902, dont le siège social est situé au 13 rue Saint-Honoré, 78000 Versailles, est responsable du traitement des données personnelles collectées via le site mariusia.com.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Données collectées
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les données personnelles susceptibles d'être collectées sur le site mariusia.com sont les suivantes : nom, prénom, adresse email, numéro de téléphone, fonction, entreprise. Ces données sont collectées lorsque l'utilisateur remplit le formulaire de contact ou s'inscrit à notre newsletter.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Finalités de la collecte
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les données personnelles collectées sont utilisées pour les finalités suivantes :
            </p>
            <ul
              className="t-lead"
              style={{
                marginBottom: '20px',
                paddingLeft: '24px',
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Répondre aux demandes de contact et aux questions adressées via le formulaire du site
              </li>
              <li style={{ marginBottom: '8px' }}>
                Envoyer des informations sur nos services et nos actualités, sous réserve du consentement préalable de l'utilisateur
              </li>
              <li style={{ marginBottom: '8px' }}>
                Améliorer l'expérience utilisateur et le fonctionnement du site
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Droits des utilisateurs
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, l'utilisateur dispose des droits suivants sur ses données personnelles : droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Ces droits peuvent être exercés en envoyant un email à l'adresse suivante : contact@mariusia.com. Une réponse sera apportée dans un délai maximum d'un mois suivant la réception de la demande.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Durée de conservation
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les données personnelles sont conservées pour une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles ont été collectées. Les données de contact issues du formulaire sont conservées pendant une durée maximale de trois ans à compter du dernier contact. Au-delà de cette durée, les données sont supprimées ou anonymisées.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Cookies
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Le site mariusia.com utilise des cookies pour améliorer l'expérience de navigation. Les informations relatives aux cookies utilisés sont détaillées dans notre politique de cookies accessible sur la page dédiée.
            </p>
            <ul
              className="t-lead"
              style={{
                marginBottom: '20px',
                paddingLeft: '24px',
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <strong>Finalité :</strong> Analyse d'audience et amélioration du site
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Cookies utilisés :</strong> Cookies de session et cookies d'analyse d'audience anonymisés
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Durée :</strong> 13 mois maximum pour les cookies d'analyse
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Consentement :</strong> Le dépôt de cookies non essentiels est soumis au consentement préalable de l'utilisateur via le bandeau de gestion des cookies
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Sécurité des données
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Mentivis SAS met en œuvre les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité des données personnelles collectées, afin d'empêcher tout accès non autorisé, toute modification, divulgation ou destruction.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
