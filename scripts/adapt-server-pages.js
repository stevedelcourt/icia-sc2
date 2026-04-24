const fs = require('fs');
const path = require('path');

const files = [
  'app/[lang]/a-propos/page.tsx',
  'app/[lang]/actualites/page.tsx',
  'app/[lang]/actualites/[slug]/page.tsx',
  'app/[lang]/conditions-utilisation/page.tsx',
  'app/[lang]/cookies/page.tsx',
  'app/[lang]/mentions-legales/page.tsx',
  'app/[lang]/politique-confidentialite/page.tsx',
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update import
  content = content.replace(
    /import \{ t \} from '@\/generated\/content'/g,
    "import { t, type Locale } from '@/generated/content'"
  );

  // 2. Update function signature to include params
  // Pattern: export default function Name() {
  content = content.replace(
    /export default (async )?function (\w+)\(\s*\)/g,
    "export default $1function $2({ params }: { params: { lang: string } })"
  );

  // Pattern for actualites/[slug] which already has params: { slug: string }
  content = content.replace(
    /params:\s*\{\s*slug:\s*string\s*\}/g,
    "params: { slug: string; lang: string }"
  );

  // 3. Replace t(' with t(params.lang as Locale, '
  // Be careful not to replace in import statements or comments
  content = content.replace(/\bt\('/g, "t(params.lang as Locale, '");

  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated ${file}`);
}
