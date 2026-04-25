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
# URL: https://www.mariusia.com/${lang}/
# Description: ${t(lang, 'layout.seo.description')}
# Language: ${lang === 'fr' ? 'Français' : 'English'}

## Core Topics
- ${t(lang, 'homepage.piliers.1.title')}
- ${t(lang, 'homepage.piliers.2.title')}
- ${t(lang, 'homepage.piliers.3.title')}

## Mission
${t(lang, 'homepage.hero.title')}

${t(lang, 'homepage.hero.subtitle')}

${t(lang, 'homepage.hero.body')}

## Services

### ${t(lang, 'homepage.offres.1.subtitle')}
${t(lang, 'homepage.offres.1.title')}
${t(lang, 'homepage.offres.1.desc')}
${t(lang, 'homepage.offres.1.price')} · ${t(lang, 'homepage.offres.1.duration')}

### ${t(lang, 'homepage.offres.2.subtitle')}
${t(lang, 'homepage.offres.2.title')}
${t(lang, 'homepage.offres.2.desc')}
${t(lang, 'homepage.offres.2.price')} · ${t(lang, 'homepage.offres.2.duration')}

### ${t(lang, 'homepage.offres.3.subtitle')}
${t(lang, 'homepage.offres.3.title')}
${t(lang, 'homepage.offres.3.desc')}
${t(lang, 'homepage.offres.3.price')} · ${t(lang, 'homepage.offres.3.duration')}

### ${t(lang, 'homepage.offres.4.subtitle')}
${t(lang, 'homepage.offres.4.title')}
${t(lang, 'homepage.offres.4.desc')}
${t(lang, 'homepage.offres.4.price')} · ${t(lang, 'homepage.offres.4.duration')}

## Target Sectors
- ${t(lang, 'homepage.pour_qui.1.title')}: ${t(lang, 'homepage.pour_qui.1.desc')}
- ${t(lang, 'homepage.pour_qui.2.title')}: ${t(lang, 'homepage.pour_qui.2.desc')}
- ${t(lang, 'homepage.pour_qui.3.title')}: ${t(lang, 'homepage.pour_qui.3.desc')}
- ${t(lang, 'homepage.pour_qui.4.title')}: ${t(lang, 'homepage.pour_qui.4.desc')}
- ${t(lang, 'homepage.pour_qui.5.title')}: ${t(lang, 'homepage.pour_qui.5.desc')}
- ${t(lang, 'homepage.pour_qui.6.title')}: ${t(lang, 'homepage.pour_qui.6.desc')}

## Core Principles
1. ${t(lang, 'homepage.piliers.1.title')} — ${t(lang, 'homepage.piliers.1.desc')}
2. ${t(lang, 'homepage.piliers.2.title')} — ${t(lang, 'homepage.piliers.2.desc')}
3. ${t(lang, 'homepage.piliers.3.title')} — ${t(lang, 'homepage.piliers.3.desc')}

## Contact
${t(lang, 'contact.adresse.ligne')}
${lang === 'fr' ? 'Tél' : 'Phone'}: ${t(lang, 'contact.phone')}
Email: ${t(lang, 'contact.email.local')}@${t(lang, 'contact.email.domain')}
https://www.mariusia.com/${lang}/contact

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
