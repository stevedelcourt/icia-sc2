// scripts/build-content.js
// Parses content/site.fr.txt and content/site.en.txt and generates generated/content.ts

const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'generated', 'content.ts');

const locales = ['fr', 'en'];

function parseContent(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Content file not found: ${filePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const content = {};
  let currentKey = null;
  let currentValue = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (currentKey) {
        content[currentKey] = currentValue.join('\n').trim();
      }
      currentKey = line.slice(2).trim();
      currentValue = [];
    } else {
      currentValue.push(line);
    }
  }

  if (currentKey) {
    content[currentKey] = currentValue.join('\n').trim();
  }

  return content;
}

function escapeTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

function generateTypeScript(localeContents) {
  const allKeys = new Set();
  for (const locale of locales) {
    Object.keys(localeContents[locale]).forEach(k => allKeys.add(k));
  }
  const sortedKeys = Array.from(allKeys).sort();

  // Build nested structure per locale
  const localeEntries = locales.map(locale => {
    const entries = sortedKeys
      .filter(key => localeContents[locale][key] !== undefined)
      .map(key => `    '${key}': \`${escapeTemplate(localeContents[locale][key])}\``)
      .join(',\n');
    return `  '${locale}': {\n${entries}\n  }`;
  }).join(',\n');

  const keysType = sortedKeys.map(k => `  '${k}'`).join(' |\n');

  return `// AUTO-GENERATED from content/site.fr.txt and content/site.en.txt
// Do not edit manually. Run 'node scripts/build-content.js' to regenerate.

export const siteContent = {
${localeEntries}
} as const;

export type Locale = keyof typeof siteContent;
export type ContentKey = keyof typeof siteContent['fr'];

export function t(lang: Locale, key: ContentKey): string {
  return siteContent[lang]?.[key] ?? siteContent['fr'][key] ?? key;
}

export function getAvailableLocales(): Locale[] {
  return ${JSON.stringify(locales)};
}

export function isValidLocale(lang: string): lang is Locale {
  return getAvailableLocales().includes(lang as Locale);
}
`;
}

const localeContents = {};
let totalKeys = 0;

for (const locale of locales) {
  const filePath = path.join(contentDir, `site.${locale}.txt`);
  localeContents[locale] = parseContent(filePath);
  const keyCount = Object.keys(localeContents[locale]).length;
  totalKeys = Math.max(totalKeys, keyCount);
  console.log(`✓ Parsed ${keyCount} strings from site.${locale}.txt`);
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, generateTypeScript(localeContents));
console.log(`✓ Generated ${totalKeys} keys for ${locales.length} locales → ${outputFile}`);
