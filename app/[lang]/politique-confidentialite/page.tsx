import { pageMetadata } from '@/lib/seo-metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, '/politique-confidentialite')
}

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: 'calc(64px + var(--section-gap))', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h1 className="t-display text-primary" style={{ marginBottom: '40px' }}>Politique de confidentialité</h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Responsable du traitement</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ICIA, Institut Collectif de l'IA, association loi 1901, dont le siège social est situé au 4 boulevard Jacques Saadé, 13002 Marseille, est responsable du traitement des données personnelles collectées via le site iciafrance.com.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Données collectées</h2>
            <p className="t-lead" style={{ marginBottom: '12px' }}>
              Les données personnelles susceptibles d'être collectées sur le site iciafrance.com sont : nom, prénom, adresse email, organisation, message. Ces données sont collectées lorsque l'utilisateur remplit le formulaire de contact.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Finalités</h2>
            <p className="t-lead" style={{ marginBottom: '12px' }}>
              Les données collectées sont utilisées pour :
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Répondre aux demandes de contact et de renseignement</li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Informer sur les programmes et activités de l'ICIA</li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Améliorer le site et l'expérience utilisateur grâce aux données d'audience</li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Droits des utilisateurs</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Conformément au RGPD et à la loi Informatique et Libertés, l'utilisateur dispose des droits d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Ces droits peuvent être exercés en envoyant un email à contact@iciafrance.com. Une réponse sera apportée dans un délai maximum d'un mois.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Cookies</h2>
            <p className="t-lead" style={{ marginBottom: '12px' }}>
              Le site iciafrance.com utilise des cookies pour améliorer l'expérience de navigation. Les informations relatives aux cookies sont détaillées dans notre politique de cookies.
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Analyse d'audience et amélioration du site</li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Cookies de session et cookies d'analyse d'audience anonymisés</li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Durée maximale de 13 mois pour les cookies d'analyse</li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>Le dépôt de cookies non essentiels est soumis au consentement de l'utilisateur</li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Sécurité des données</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              L'ICIA met en œuvre les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité des données personnelles collectées.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
