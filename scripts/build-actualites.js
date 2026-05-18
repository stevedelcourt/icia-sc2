// scripts/build-actualites.js
// Reads content/actualites/*.json and generates generated/actualites.ts

const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'actualites');
const outputFile = path.join(process.cwd(), 'generated', 'actualites.ts');

function buildActualites() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  const articles = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const a = JSON.parse(raw);
      if (a.slug) articles.push(a);
    } catch (e) {
      console.warn(`Skipping ${file}: ${e.message}`);
    }
  }

  articles.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

  const content = `// AUTO-GENERATED from content/actualites/*.json
// Do not edit manually. Run 'node scripts/build-actualites.js' to regenerate.

export interface Actualite {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  body: string;
  bodyEn: string;
  category: string;
  date: string;
  image: string;
}

export const actualites: Actualite[] = ${JSON.stringify(articles, null, 2)};

export function getActualiteBySlug(slug: string): Actualite | undefined {
  return actualites.find(a => a.slug === slug);
}

export function getActualitesByCategory(category: string): Actualite[] {
  if (!category || category === 'all') return actualites;
  return actualites.filter(a => a.category === category);
}

export function getLatestActualites(count: number): Actualite[] {
  return actualites.slice(0, count);
}

export function getActualiteSlugs(): string[] {
  return actualites.map(a => a.slug);
}

export function getActualiteCategories(): string[] {
  const cats = new Set(actualites.map(a => a.category));
  return Array.from(cats).sort();
}
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, content);
  console.log(`✓ Generated ${articles.length} actualites → ${outputFile}`);
}

buildActualites();
