// scripts/build-content.js
// Parses content/site.txt and generates generated/content.ts

const fs = require('fs');
const path = require('path');

const contentFile = path.join(process.cwd(), 'content', 'site.txt');
const outputFile = path.join(process.cwd(), 'generated', 'content.ts');

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

function generateTypeScript(content) {
  const entries = Object.entries(content)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `  '${key}': \`${escapeTemplate(value)}\``)
    .join(',\n');

  return `// AUTO-GENERATED from content/site.txt
// Do not edit manually. Run 'npm run content:build' to regenerate.

export const siteContent = {
${entries}
} as const;

export type ContentKey = keyof typeof siteContent;

export function t(key: ContentKey): string {
  return siteContent[key] ?? key;
}
`;
}

const content = parseContent(contentFile);
const keysCount = Object.keys(content).length;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, generateTypeScript(content));
console.log(`✓ Generated ${keysCount} strings → ${outputFile}`);
