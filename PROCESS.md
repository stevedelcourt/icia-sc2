# Process: mariusia.com → iciafrance.com Transformation

**Date**: 18 mai 2026
**Author**: stevedelcourt (steven.delcourt@mentivis.com)

## Context

Transformed the existing Marius IA website (mariusia.com) into **ICIA France** (iciafrance.com). ICIA (Institut Collectif de l'IA) is a French non-profit association (loi 1901) dedicated to AI education, skills development, and public interest initiatives.

The original site was a consulting firm website (Marius IA / Mentivis SAS). The new site represents the association ICIA, with Mentivis as its operational and pedagogical partner, and Mariusia as its physical location in Marseille.

Ecosystem:
```
ICIA (iciafrance.com)  →  Mission, association, intérêt général, programmes
Mentivis (mentivis.com) →  Opérateur pédagogique, ingénierie
Mariusia (mariusia.com)  →  Ancrage physique, lieu, écosystème marseillais
```

## Changes Summary

### 1. Git Identity
- Set user.name = `stevedelcourt`
- Set user.email = `steven.delcourt@mentivis.com`

### 2. Tailwind CSS Removal
- Deleted `tailwind.config.ts` and `postcss.config.js`
- Removed `tailwindcss`, `postcss`, `autoprefixer` from `package.json`
- Removed `@tailwind` directives from `globals.css`
- All components rewritten to use CSS custom properties + inline styles
- CSS utility classes from globals.css used throughout (`.section`, `.container-mentivis`, `.t-display`, `.btn-pill`, etc.)

### 3. Domain Rebrand
| Old | New |
|-----|-----|
| `mariusia.com` | `iciafrance.com` |
| `Marius IA` | `ICIA` / `Institut Collectif de l'IA` |
| `Mentivis SAS` (as primary entity) | `ICIA` (association) + `Mentivis SAS` (parent/operator) |

Updated in: `app/[lang]/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `_redirects`, all pages, all JSON-LD

### 4. Pages Deleted (11 pages)
```
app/[lang]/entreprises/
app/[lang]/pouvoirs-publics/
app/[lang]/education/
app/[lang]/secteurs-creatifs/
app/[lang]/citoyens/
app/[lang]/professions-liberales/
app/[lang]/diagnostic/
app/[lang]/formations/
app/[lang]/transformation/
app/[lang]/partenaire/
app/[lang]/expertises/
app/[lang]/contact-formspree/
```

### 5. Pages Created / Rewritten

| Page | Status |
|------|--------|
| `app/[lang]/page.tsx` | **Rewritten** — 11-section ICIA homepage |
| `app/[lang]/mission/` | **New** — Mission detail |
| `app/[lang]/programmes/` | **New** — Programs overview |
| `app/[lang]/programme-impact/` | **New** — Impact Program |
| `app/[lang]/gouvernance/` | **New** — Governance & Operations |
| `app/[lang]/a-propos/` | **Rewritten** — ICIA about page |
| `app/[lang]/contact/` | **Rewritten** — Simplified contact form |
| `app/[lang]/publications/` | **Kept, fixed** — Added missing content keys |
| `app/[lang]/publications/[slug]/` | **Kept, fixed** |
| `app/[lang]/mentions-legales/` | **Rewritten** — Hardcoded FR legal content |
| `app/[lang]/politique-confidentialite/` | **Rewritten** — Hardcoded FR legal content |
| `app/[lang]/cookies/` | **Rewritten** — Hardcoded FR legal content |
| `app/[lang]/conditions-utilisation/` | **Rewritten** — Hardcoded FR legal content |
| `app/[lang]/llms.txt/route.ts` | **Rewritten** — Updated content keys |
| `app/not-found.tsx` | **Rewritten** — Removed Tailwind, ICIA branded |

### 6. Components

**Removed**: `BauhausHero.tsx`, `BauhausIcon.tsx`, `AnimatedLogo.tsx`, `SpeedBanner.tsx`

**Rewritten** (removed Tailwind): `Header.tsx`, `Footer.tsx`, `Button.tsx`, `PublicationCard.tsx`, `PublicationFilter.tsx`, `RecentArticles.tsx`, `MarkdownBody.tsx`

**Kept**: `Animations.tsx`, `Picture.tsx`, `LangSetter.tsx`, `CookieConsent.tsx`, `CookieConsentClient.tsx`, `ScrollGradient.tsx` (unused), `ScrollExpandSection.tsx` (unused), `CounterNumber.tsx` (unused), `OpenFreeMap.tsx` (unused)

### 7. Content (i18n)
- `content/site.fr.txt` — Full rewrite (~192 keys, ICIA content in French)
- `content/site.en.txt` — Same keys, English translations
- `generated/content.ts` — Auto-regenerated on build
- Added missing keys for publications, filter, tags, not-found

### 8. Design System
Following MentivisOS design tokens via CSS custom properties:
- Colors: `--bg-primary` (#fff), `--bg-secondary` (#f5f5f5), `--bg-warm` (#f5f3f1)
- Typography: Inter only, weight 300 for headings, left-aligned
- Buttons: `.btn-pill.btn-black` (black bg), `.btn-pill.btn-warm`, `.btn-outline-shadow`
- Cards: 16px border-radius, subtle shadows, hover translateY(-4px)
- Layout: 1240px max container, responsive grids, no centering

### 9. Homepage Architecture (11 sections, immuable)
1. Hero — H1, baseline, intro, 2 CTAs
2. Mission — 4 cards (Intelligible, Compétences, Fractures, Débat)
3. Nos actions — 5 cards
4. Pour qui — 5 cards (Citoyens, Professionnels, Organisations, Acteurs publics, Éducation)
5. Nos engagements — 5 principles
6. Programmes ICIA — 3 cards + highlighted Programme Impact
7. Qui sommes-nous ? — Association text
8. Collaborer — Partner types list
9. Gouvernance & Opération — Association + Mentivis operator model
10. Ancrage territorial — Marseille section
11. CTA final — Contact

### 10. Build Verification
- `npm run build` — ✅ Successful
- 17 static routes (FR + EN for all pages)
- 4 SSG publication detail pages
- Zero Tailwind dependencies
- TypeScript compilation clean

## FTP Deployment

```
Host: ftp.sc7bovu7233.universe.wf
User: sc7bovu7233
Port: 21 (FTPS explicite)
Domain: iciafrance.com
```

Build and deploy:
```bash
cd /Users/stv/Documents/zed/icia-france
npm run build:export
# Then upload out/ via FTP client
```
