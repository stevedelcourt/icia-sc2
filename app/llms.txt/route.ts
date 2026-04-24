export const dynamic = 'force-static'

export function GET() {
  const content = `# Site: Marius IA
# URL: https://www.mariusia.com
# Description: Conseil en stratégie IA et conformité AI Act pour PME et ETI

## Core Topics
- Stratégie IA
- AI Act (règlement européen)
- Gouvernance IA
- Conduite du changement
- Formation et acculturation

## Services
- Diagnostic IA & AI Act (porte d'entrée universelle, 4-6 semaines)
- Formations et acculturation (intra-entreprise)
- Transformation IA (accompagnement 6-12 mois)
- Partenaire support long terme (abonnement 12 mois)

## Audience
- PME (Petites et Moyennes Entreprises)
- ETI (Entreprises de Taille Intermédiaire)
- Décideurs et dirigeants

## Zones d'intervention
- France (Campus Cyber.AI, Marseille)
- Europe

## Langue
- Français
- Anglais

## Coordonnées
https://www.mariusia.com/contact`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}