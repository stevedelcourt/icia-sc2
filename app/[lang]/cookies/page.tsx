import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: 'calc(64px + var(--section-gap))', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-mentivis" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h1 className="t-display text-primary" style={{ marginBottom: '40px' }}>Politique de cookies</h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Qu'est-ce qu'un cookie ?</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, mobile) lors de la consultation d'un site internet. Il permet de stocker des informations relatives à votre navigation et d'améliorer votre expérience utilisateur.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Cookies utilisés</h2>
            <p className="t-lead" style={{ marginBottom: '12px' }}>
              Le site iciafrance.com utilise les types de cookies suivants :
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li className="t-lead" style={{ marginBottom: '8px' }}>
                Cookies strictement nécessaires : indispensables au bon fonctionnement du site. Ils permettent la navigation et l'accès aux différentes fonctionnalités.
              </li>
              <li className="t-lead" style={{ marginBottom: '8px' }}>
                Cookies analytiques : mesure d'audience et compréhension des interactions avec le contenu (pages visitées, temps passé, parcours). Les données sont anonymisées à des fins statistiques.
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Gestion des cookies</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Lors de votre première visite, un bandeau vous informe de l'utilisation des cookies et vous permet d'accepter ou de refuser leur dépôt. À tout moment, vous pouvez modifier vos préférences via le lien « Gestion des cookies » en bas de page. Vous pouvez également configurer votre navigateur (Chrome, Firefox, Safari, Edge) pour bloquer ou supprimer les cookies. Le refus de certains cookies peut altérer le fonctionnement du site.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Durée de conservation</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt sur votre terminal. À l'expiration de ce délai, votre consentement sera de nouveau sollicité.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="t-heading text-primary" style={{ marginTop: '32px', marginBottom: '12px' }}>Contact</h2>
            <p className="t-lead" style={{ marginBottom: '20px' }}>
              Pour toute question relative à notre politique de cookies : contact@iciafrance.com.
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
