import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function Cookies() {
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
              Politique de cookies
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Qu'est-ce qu'un cookie ?
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site internet. Les cookies permettent au site de reconnaître votre navigateur et de conserver des informations pendant une durée déterminée, comme vos préférences de navigation ou des données statistiques anonymes.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Cookies utilisés sur notre site
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Le site mariusia.com utilise les types de cookies suivants :
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
                <strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent la navigation sur le site et l'accès aux différentes fonctionnalités. Sans ces cookies, certaines parties du site ne pourraient pas fonctionner correctement.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Cookies analytiques :</strong> Ces cookies nous permettent de mesurer l'audience du site et de comprendre comment les visiteurs interagissent avec son contenu (pages visitées, temps passé, parcours de navigation). Les données collectées sont anonymisées et utilisées uniquement à des fins statistiques pour améliorer l'expérience utilisateur.
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Gestion des cookies
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Lors de votre première visite sur le site mariusia.com, un bandeau vous informe de l'utilisation des cookies et vous permet d'accepter ou de refuser leur dépôt. À tout moment, vous pouvez modifier vos préférences en matière de cookies en cliquant sur le lien "Gestion des cookies" présent en bas de page. Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. La procédure varie selon le navigateur utilisé (Chrome, Firefox, Safari, Edge). Veuillez noter que le refus de certains cookies peut altérer le fonctionnement du site.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Durée de conservation
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les cookies déposés sur votre terminal ont une durée de validité maximale de 13 mois. À l'expiration de ce délai, votre consentement sera de nouveau sollicité si vous visitez à nouveau le site.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>
              Contact
            </h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Pour toute question relative à notre politique de cookies, vous pouvez nous contacter à l'adresse suivante : contact@mariusia.com.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
