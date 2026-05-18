# ICIA France

## Organization
- **Brand**: ICIA | "Institut Collectif de l'IA"
- **Entity**: Association loi 1901 (non-profit)
- **URL**: https://www.iciafrance.com
- **Positioning**: "Comprendre l'intelligence artificielle. Développer les capacités d'agir. Construire une transition plus inclusive."

## Ecosystem
```
ICIA (iciafrance.com)  →  Mission, association, intérêt général, programmes
Mentivis (mentivis.com) →  Opérateur pédagogique, ingénierie
Mariusia (mariusia.com)  →  Ancrage physique, lieu, écosystème marseillais
```

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- CSS custom properties (NO Tailwind  -  removed May 2026)
- Framer Motion for animations
- Notion API for content/images (via `scripts/download-images.js`)
- Static export deployed to Vercel + o2switch FTP

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (runs prebuild first) |
| `npm run build:export` | Static export to `out/` |
| `npm run start` | Production server (port 3002) |
| `npm run lint` | ESLint |

## Build Pipeline
1. `prebuild` → `node scripts/build-content.js` (generates `generated/content.ts` from `content/site.fr.txt` + `content/site.en.txt`)
2. `prebuild` → `node scripts/build-publications.js` (generates publication data from `content/publications/`)
3. `prebuild` → `node scripts/download-images.js` (fetches Notion images, skips if `NOTION_KEY` not set)
4. `build` → `next build`

## Deployment
- **Vercel**: Primary hosting (https://icia.vercel.app)
- **o2switch FTP**: Production hosting (iciafrance.com)
  - Host: `ftp.sc7bovu7233.universe.wf`
  - User: `sc7bovu7233`
  - Port: 21 (FTPS explicite)
  - Upload `out/` contents manually via FTP
  - Include all file types: `.html .js .css .json .png .jpg .svg .webp .avif .txt .xml .gz .pdf .ico .woff2 .woff .ttf .eot`

## Design System (CSS Custom Properties)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#ffffff` | Hero, main sections |
| `--bg-secondary` | `#f5f5f5` | Alt sections, legal pages |
| `--bg-warm` | `#f5f3f1` | Warm sections |
| `--text-primary` | `#000000` | Headings, body |
| `--text-secondary` | `#4e4e4e` | Lead text |
| `--text-tertiary` | `#777169` | Captions, micro text |
| `--border-light` | `#e5e5e5` | Card borders |

### Typography (Inter only, NO serif)
| Class | Size | Weight |
|-------|------|--------|
| `.t-display` | `clamp(2.25rem, 4.5vw, 3.5rem)` | 300 |
| `.t-hero` | `clamp(2rem, 5vw, 3.5rem)` | 300 |
| `.t-title` | `clamp(1.5rem, 3vw, 2.25rem)` | 300 |
| `.t-heading` | `clamp(1.125rem, 2vw, 1.75rem)` | 300 |
| `.t-lead` | `1.125rem` | 400 |
| `.t-caption` | `0.875rem` | 400 |
| `.t-micro` | `0.75rem` | 500 |
| `.t-nav` | `0.9375rem` | 500 |

### Layout
| Class | Purpose |
|-------|---------|
| `.container-mentivis` | Max 1240px, centered, grid-margin padding |
| `.container-wide` | Max 1440px |
| `.section` | Full-width section padding |
| `.section-sm` | Smaller section padding |
| `.bg-primary` | White background |
| `.bg-secondary` | Light grey background |
| `.bg-warm` | Warm beige background |

### Buttons
- `.btn-pill`  -  Base pill button (border-radius 8px)
- `.btn-black`  -  Black bg, white text
- `.btn-warm`  -  Warm bg
- `.btn-outline-shadow`  -  Outline with shadow
- `.btn-chevron`  -  Chevron icon inside button

### Cards
- `.rounded-card`  -  16px border-radius
- `.shadow-card`  -  Subtle shadow
- `.shadow-card-full`  -  Full shadow

### Rules
1. **No Tailwind CSS**  -  All styles use CSS custom properties or inline styles
2. **No serif fonts ever**  -  Inter only
3. **Text left-aligned**  -  No centering
4. **text-wrap: balance** on headings
5. **French typography**: Use U+2019 apostrophe (') in French text
6. **Em-dashes FORBIDDEN**: Never use U+2014 (—). Use comma or colon instead.
7. **Background colors restricted**: Only `#ffffff` (dominant, headers, main sections), `#f5f5f5` (footer, alt sections, legal pages, cards), `#f5f3f1` (warm cards). No other background colors allowed unless explicitly stated.
8. **Build before restart**: `rm -rf .next && pkill -f next && npm run dev`

## Page Structure

### Routes
| Route | Page | Source |
|-------|------|--------|
| `/` | Homepage (11 sections) | `app/[lang]/page.tsx` |
| `/mission` | Mission detail | `app/[lang]/mission/page.tsx` |
| `/programmes` | Programs overview | `app/[lang]/programmes/page.tsx` |
| `/programme-impact` | Impact Program detail | `app/[lang]/programme-impact/page.tsx` |
| `/gouvernance` | Governance & Operations | `app/[lang]/gouvernance/page.tsx` |
| `/a-propos` | About ICIA | `app/[lang]/a-propos/page.tsx` |
| `/contact` | Contact form | `app/[lang]/contact/page.tsx` |
| `/publications` | Publications list | `app/[lang]/publications/page.tsx` |
| `/publications/[slug]` | Publication detail | `app/[lang]/publications/[slug]/page.tsx` |
| `/mentions-legales` | Legal notice | `app/[lang]/mentions-legales/page.tsx` |
| `/politique-confidentialite` | Privacy policy | `app/[lang]/politique-confidentialite/page.tsx` |
| `/cookies` | Cookie policy | `app/[lang]/cookies/page.tsx` |
| `/conditions-utilisation` | Terms of use | `app/[lang]/conditions-utilisation/page.tsx` |

### Homepage Sections (in order, immuable)
1. Hero  -  H1, baseline, intro, 2 CTAs
2. Mission  -  4 cards (Intelligible, Compétences, Fractures, Débat)
3. Nos actions  -  5 cards
4. Pour qui  -  5 cards (Citoyens, Professionnels, Organisations, Acteurs publics, Éducation)
5. Nos engagements  -  5 principles
6. Programmes ICIA  -  3 cards + highlighted Programme Impact
7. Qui sommes-nous ?  -  Association text
8. Collaborer  -  Partner types list
9. Gouvernance & Opération  -  Association + Mentivis operator model
10. Ancrage territorial  -  Marseille section
11. CTA final  -  Contact

## Content (i18n)
- **Primary**: `content/site.fr.txt` (~200 keys)  -  French content
- **Secondary**: `content/site.en.txt`  -  English translations
- **Generated**: `generated/content.ts`  -  Auto-generated from both files
- **Build script**: `node scripts/build-content.js`
- Format: `# key.name` followed by value text (blank lines preserved)

## Components

### Layout
- `components/layout/Header.tsx`  -  Fixed navbar (ICIA logo, nav: Mission/Programmes/À propos, Contact CTA, FR/EN toggle, mobile hamburger)
- `components/layout/Footer.tsx`  -  Footer (tagline, program links, about links, legal)

### Shared
- `components/Animations.tsx`  -  `StaggerBlock`, `AnimatedCard`, `FadeIn`, `AnimatedDivider`
- `components/Picture.tsx`  -  avif/webp fallback wrapper
- `components/LangSetter.tsx`  -  Language redirect
- `components/ui/Button.tsx`  -  Reusable button with variants

### Content
- `components/PublicationCard.tsx`  -  Publication card
- `components/PublicationFilter.tsx`  -  Category filter + sort
- `components/RecentArticles.tsx`  -  3 recent publications grid
- `components/MarkdownBody.tsx`  -  Markdown renderer

### Legacy (removed but kept as unused)
- `components/ScrollGradient.tsx`, `ScrollExpandSection.tsx`  -  Old components, no longer imported

## i18n Usage
```tsx
import { useT, LocalizedLink, useLocale } from '@/lib/i18n'
const t = useT()
t('homepage.hero.h1')           // get translated string
<LocalizedLink href="/contact">  // auto-prefix locale
```

## Next.js Config
- `output: 'export'` only when `NEXT_EXPORT=true`
- `trailingSlash: true`
- `images.unoptimized: true`
- `compiler.removeConsole` in production

## Known Issues
- 404 hydration error: `usePathname()` in `app/not-found.tsx` (pre-existing, cosmetic)
- Stale `.next` cache: `rm -rf .next && pkill -f next && npm run dev`

## FTP Upload (Manual)
```bash
# Build
npm run build:export

# Upload out/ contents via FTP client to:
# Host: ftp.sc7bovu7233.universe.wf
# User: sc7bovu7233
# Port: 21 (FTPS explicite)
```
