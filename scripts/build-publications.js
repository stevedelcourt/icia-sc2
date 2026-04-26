// scripts/build-publications.js
// Parses content/publications/fr/*.md and content/publications/en/*.md
// Generates generated/publications.ts with locale-aware data

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const publicationsDir = path.join(process.cwd(), 'content', 'publications');
const outputFile = path.join(process.cwd(), 'generated', 'publications.ts');
const locales = ['fr', 'en'];

function parsePublication(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data;

  // Normalize relatedSlugs to array
  let relatedSlugs = [];
  if (data.relatedSlugs) {
    if (Array.isArray(data.relatedSlugs)) {
      relatedSlugs = data.relatedSlugs;
    } else if (typeof data.relatedSlugs === 'string') {
      relatedSlugs = data.relatedSlugs.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  return {
    slug: data.slug || path.basename(filePath, '.md'),
    date: data.date || '',
    category: data.category || '',
    headline: data.headline || '',
    subheadline: data.subheadline || '',
    keywords: data.keywords || '',
    heroImage: data.heroImage || '',
    card1Title: data.card1Title || '',
    card1Body: data.card1Body || '',
    card1Image: data.card1Image || '',
    card2Title: data.card2Title || '',
    card2Body: data.card2Body || '',
    card2Image: data.card2Image || '',
    card3Title: data.card3Title || '',
    card3Body: data.card3Body || '',
    card3Image: data.card3Image || '',
    card1Link: data.card1Link || '',
    card1LinkLabel: data.card1LinkLabel || '',
    card2Link: data.card2Link || '',
    card2LinkLabel: data.card2LinkLabel || '',
    card3Link: data.card3Link || '',
    card3LinkLabel: data.card3LinkLabel || '',
    ctaText: data.ctaText || '',
    ctaLink: data.ctaLink || '',
    link: data.link || '',
    linkLabel: data.linkLabel || '',
    relatedSlugs,
    body: parsed.content.trim(),
  };
}

function buildPublications() {
  const localePublications = {};
  const localeSlugs = {};
  const slugMapping = {};

  for (const locale of locales) {
    const localeDir = path.join(publicationsDir, locale);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.md'));
    const pubs = [];

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      pubs.push(parsePublication(filePath));
    }

    pubs.sort((a, b) => new Date(b.date) - new Date(a.date));
    localePublications[locale] = pubs;
    localeSlugs[locale] = pubs.map(p => p.slug);
  }

  const frSlugSet = new Set(localeSlugs['fr'] || []);
  const enSlugSet = new Set(localeSlugs['en'] || []);

  for (const enSlug of (localeSlugs['en'] || [])) {
    const enPub = (localePublications['en'] || []).find(p => p.slug === enSlug);
    if (!enPub) continue;

    let frSlug = null;

    const relatedFr = (enPub.relatedSlugs || []).find(s => frSlugSet.has(s));
    if (relatedFr) {
      frSlug = relatedFr;
    } else {
      const frCandidates = localePublications['fr'] || [];
      for (const frPub of frCandidates) {
        const frRelatedEn = (frPub.relatedSlugs || []).find(s => enSlugSet.has(s));
        if (frRelatedEn) {
          frSlug = frPub.slug;
          break;
        }
      }
    }

    if (frSlug) {
      slugMapping[enSlug] = frSlug;
    }
  }

  const imgFields = ['heroImage', 'card1Image', 'card2Image', 'card3Image'];
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'publications');

  for (const enSlug of Object.keys(slugMapping)) {
    const frSlug = slugMapping[enSlug];
    const enPub = (localePublications['en'] || []).find(p => p.slug === enSlug);
    const frPub = (localePublications['fr'] || []).find(p => p.slug === frSlug);
    if (!enPub || !frPub) continue;

    for (const imgField of imgFields) {
      const enImg = enPub[imgField];
      if (!enImg) continue;

      const enImgPath = path.join(imagesDir, enSlug, enImg);
      const frImgPath = path.join(imagesDir, frSlug, enImg);

      if (!fs.existsSync(enImgPath) && fs.existsSync(frImgPath)) {
        const enImgDir = path.join(imagesDir, enSlug);
        if (!fs.existsSync(enImgDir)) {
          fs.mkdirSync(enImgDir, { recursive: true });
        }
        fs.copyFileSync(frImgPath, enImgPath);
        console.log(`  Copying ${frSlug}/${enImg} → ${enSlug}/${enImg}`);
      }
    }
  }

  const ts = `// AUTO-GENERATED from content/publications/fr/*.md and content/publications/en/*.md
// Do not edit manually. Run 'node scripts/build-publications.js' to regenerate.

export interface Publication {
  slug: string;
  date: string;
  category: string;
  headline: string;
  subheadline: string;
  keywords: string;
  heroImage: string;
  card1Title: string;
  card1Body: string;
  card1Image: string;
  card2Title: string;
  card2Body: string;
  card2Image: string;
  card3Title: string;
  card3Body: string;
  card3Image: string;
  card1Link: string;
  card1LinkLabel: string;
  card2Link: string;
  card2LinkLabel: string;
  card3Link: string;
  card3LinkLabel: string;
  ctaText: string;
  ctaLink: string;
  link: string;
  linkLabel: string;
  relatedSlugs: string[];
  body: string;
}

export type Locale = 'fr' | 'en';

export const publicationsFr: Publication[] = ${JSON.stringify(localePublications['fr'], null, 2)};

export const publicationsEn: Publication[] = ${JSON.stringify(localePublications['en'], null, 2)};

export function getPublications(lang: Locale): Publication[] {
  return lang === 'en' ? publicationsEn : publicationsFr;
}

export function getPublicationBySlug(slug: string, lang: Locale): Publication | undefined {
  return getPublications(lang).find(p => p.slug === slug);
}

export function getPublicationSlugs(lang: Locale): string[] {
  return lang === 'en' ? ${JSON.stringify(localeSlugs['en'])} : ${JSON.stringify(localeSlugs['fr'])};
}

export function getCategories(lang: Locale): string[] {
  const cats = new Set(getPublications(lang).map(p => p.category).filter(Boolean));
  return Array.from(cats);
}

export const allPublicationSlugs: { lang: string; slug: string }[] = [
${locales.map(locale => localeSlugs[locale].map(slug => `  { lang: '${locale}', slug: '${slug}' }`).join(',\n')).filter(Boolean).join(',\n')}
];
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, ts);

  const total = locales.reduce((sum, l) => sum + localePublications[l].length, 0);
  console.log(`✓ Generated ${total} publications (${locales.map(l => `${localePublications[l].length} ${l}`).join(', ')}) → ${outputFile}`);
}

buildPublications();
