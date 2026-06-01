import { t, type Locale } from '@/generated/content'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export async function GET(
  _request: Request,
  { params }: { params: { lang: string } }
) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale

  const content = `# Site: ${t(lang, 'layout.ld_json.org.name')}
# URL: https://iciafrance.com/${lang}/
# Description: ${t(lang, 'layout.seo.description')}
# Language: ${lang === 'fr' ? 'Français' : 'English'}

## Mission
${t(lang, 'homepage.mission.intro')}

## Our Commitments
- ${t(lang, 'homepage.engagements.independance.title')}: ${t(lang, 'homepage.engagements.independance.desc')}
- ${t(lang, 'homepage.engagements.interet.title')}: ${t(lang, 'homepage.engagements.interet.desc')}
- ${t(lang, 'homepage.engagements.accessibilite.title')}: ${t(lang, 'homepage.engagements.accessibilite.desc')}
- ${t(lang, 'homepage.engagements.critique.title')}: ${t(lang, 'homepage.engagements.critique.desc')}
- ${t(lang, 'homepage.engagements.action.title')}: ${t(lang, 'homepage.engagements.action.desc')}

## What We Do
- ${t(lang, 'homepage.actions.formation.title')}
- ${t(lang, 'homepage.actions.recherche.title')}
- ${t(lang, 'homepage.actions.territoires.title')}
- ${t(lang, 'homepage.actions.ressources.title')}
- ${t(lang, 'homepage.actions.debats.title')}

## Who We Serve
- ${t(lang, 'homepage.pour_qui.citoyens.title')}: ${t(lang, 'homepage.pour_qui.citoyens.desc')}
- ${t(lang, 'homepage.pour_qui.professionnels.title')}: ${t(lang, 'homepage.pour_qui.professionnels.desc')}
- ${t(lang, 'homepage.pour_qui.organisations.title')}: ${t(lang, 'homepage.pour_qui.organisations.desc')}
- ${t(lang, 'homepage.pour_qui.publics.title')}: ${t(lang, 'homepage.pour_qui.publics.desc')}
- ${t(lang, 'homepage.pour_qui.education.title')}: ${t(lang, 'homepage.pour_qui.education.desc')}

## Programs
- ${t(lang, 'homepage.programmes.impact.title')}: ${t(lang, 'homepage.programmes.impact.desc')}
- ${t(lang, 'homepage.programmes.territoires.title')}: ${t(lang, 'homepage.programmes.territoires.desc')}
- ${t(lang, 'homepage.programmes.education.title')}: ${t(lang, 'homepage.programmes.education.desc')}
- ${t(lang, 'homepage.programmes.travail.title')}: ${t(lang, 'homepage.programmes.travail.desc')}

## About
${t(lang, 'homepage.a_propos.body.1')}

${t(lang, 'homepage.a_propos.body.2')}

${t(lang, 'homepage.territoire.body.1')}
${t(lang, 'homepage.territoire.adresse')}

## Governance
${t(lang, 'homepage.gouvernance.body.1')}

${t(lang, 'homepage.gouvernance.mentivis.title')}

## Contact
https://iciafrance.com/${lang}/contact

## Parent Organization
${t(lang, 'layout.ld_json.org.parent_name')}
https://www.mentivis.com
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
