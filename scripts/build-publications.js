// scripts/build-publications.js
// Parses content/publications/*.md and generates generated/publications.ts

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const publicationsDir = path.join(process.cwd(), 'content', 'publications');
const outputFile = path.join(process.cwd(), 'generated', 'publications.ts');

function buildPublications() {
  if (!fs.existsSync(publicationsDir)) {
    fs.mkdirSync(publicationsDir, { recursive: true });
  }

  const files = fs.readdirSync(publicationsDir).filter(f => f.endsWith('.md'));
  const publications = [];

  for (const file of files) {
    const filePath = path.join(publicationsDir, file);
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

    publications.push({
      slug: data.slug || path.basename(file, '.md'),
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
      ctaText: data.ctaText || '',
      ctaLink: data.ctaLink || '',
      link: data.link || '',
      linkLabel: data.linkLabel || '',
      relatedSlugs,
      body: parsed.content.trim(),
    });
  }

  // Sort by date descending
  publications.sort((a, b) => new Date(b.date) - new Date(a.date));

  const slugs = publications.map(p => p.slug);

  const ts = `// AUTO-GENERATED from content/publications/*.md
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
  ctaText: string;
  ctaLink: string;
  link: string;
  linkLabel: string;
  relatedSlugs: string[];
  body: string;
}

export const publications: Publication[] = ${JSON.stringify(publications, null, 2)};

export const publicationSlugs: string[] = ${JSON.stringify(slugs)};

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find(p => p.slug === slug);
}

export function getCategories(): string[] {
  const cats = new Set(publications.map(p => p.category).filter(Boolean));
  return Array.from(cats);
}
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, ts);
  console.log(`✓ Generated ${publications.length} publications → ${outputFile}`);
}

buildPublications();
