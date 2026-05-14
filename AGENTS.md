# ICIA - Marius IA

## Organization
- **Brand**: Marius IA | "L'institut collectif de l'IA"
- **Entity**: Mentivis SAS (cabinet de conseil en transformation stratégique)
- **URL**: https://www.mariusia.com
- **Positioning**: "Nous ne vendons pas de l'IA. Nous aidons à en faire un avantage pour tous."

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3.4, Framer Motion
- Three.js (`@react-three/fiber`, `@react-three/drei`) for 3D
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
1. `prebuild` → `scripts/download-images.js` fetches images from Notion
2. Requires: `NOTION_KEY`, `NOTION_DB`, `NOTION_PARTNERS_DB`
3. Skips gracefully if vars not set
4. Generates `public/partners.json`

## Deployment
- **Vercel**: Primary hosting (https://icia.vercel.app)
- **o2switch**: Manual FTP upload from `out/` folder (user deploys manually)
- **sc2**: Test environment (sc2bovu7233.universe.wf)
- **sc1**: Production environment (sc1bovu7233.universe.wf) — **never deploy to sc1**
- CI triggers on push to `main`

## FTP Upload Quirks
- **Manual FTP deployment**: User deploys manually via FTP (not automated scripts)
- **IMPORTANT**: `scripts/promote-to-sc1.py` must **never** be used — sc1 is production and must not be touched
- When adding new asset types (like .avif), ensure they are included in manual upload
- `ftp_upload.py` has hardcoded credentials and path (`/Users/stv/Documents/zed/icia/out`)
- Only uploads specific extensions (line 24): `.html .js .css .json .png .jpg .svg .webp .txt .xml .gz .pdf .ico .woff2 .woff .ttf .eot`
- Adding new asset types requires updating this list
- **IMPORTANT**: `.avif` files must be uploaded manually alongside `.webp` files

## Image Optimization
- **Picture component**: `components/Picture.tsx` wraps images with avif/webp fallback
- Usage: `<Picture src="/images/name.webp" alt="..." className="..." />`
- Automatically generates `<source type="image/avif">` and `<source type="image/webp">` from .webp path
- **avif files**: Located alongside .webp files in `public/images/`
- **Rule**: Always use `<Picture>` component (not `<img>`) for .webp images to enable avif fallback

## Key Paths
| Path | Purpose |
|------|---------|
| `app/` | Next.js pages |
| `components/layout/` | Header.tsx, Footer.tsx |
| `components/` | ScrollGradient.tsx, SpeedBanner.tsx + domain folders |
| `public/images/favicon_io/` | Favicon files |
| `public/images/og-image.png` | OpenGraph image |
| `public/js/` | tarteaucitron.min.js (cookie lib), cookies.js (config) |

## Acteurs Pages (5 segments)
These pages share a common pattern with a horizontal "Acteurs" navigation bar:
- `app/entreprises/page.tsx`
- `app/pouvoirs-publics/page.tsx`
- `app/education/page.tsx`
- `app/secteurs-creatifs/page.tsx`
- `app/citoyens/page.tsx`

Each has a mobile scrollable nav with left/right arrow buttons. The nav background color uses `#bdf5ab` (green) on these pages.

## Header Mobile Menu
- Desktop: simple horizontal nav
- Mobile: hamburger opens slide-down panel with dark background (`#111827`)
- "Offres" and "Acteurs" have sub-menus that slide left-to-right (drawer pattern)
- Active page in sub-menu is underlined with `#D92A1C` (rouge)

## Custom Tailwind Colors
- `navy` (#00255D) - primary
- `cream` (#FAFAF7) - background
- `rouge` (#D92A1C) - accent
- See `tailwind.config.ts` for full palette including legacy aliases

## Next.js Config Quirks
- `output: 'export'` only when `NEXT_EXPORT=true` env var is set
- `trailingSlash: true` - all URLs end with `/`
- `images.unoptimized: true` - required for static export
- `compiler.removeConsole` in production
- `async headers()` and `async redirects()` defined but **not applied** in static export (Next.js limitation)

## Cookie Management
- Self-hosted TarteAuCitron in `public/js/`
- Config in `public/js/cookies.js`
- CSS overrides in `app/globals.css` (white background, site styling)

## SEO Optimizations (Completed)
- **x-default hreflang**: Added to `app/[lang]/layout.tsx` and `app/sitemap.ts`
- **LocalBusiness schema**: Added to Organization JSON-LD in layout (address, geo coords, telephone)
- **Sitemap**: Updated with hreflang annotations for all pages
- **404 page**: Fixed links to use `/fr/` and `/en/` instead of `/_not-found/`
- **Picture component**: All .webp images now use avif fallback via `<Picture>` component
- **Publications**: JSON-LD Article schema present with author, publisher, datePublished
- **Pages with JSON-LD**: contact, diagnostic, formations, transformation, all actor pages, publications

## Known Issues
- **404 hydration error**: `usePathname()` in `app/not-found.tsx` causes React hydration mismatch on static 404 pages (pre-existing, cosmetic only)
- **Pagespeed preload warnings**: Cosmetic warnings for polyfills/fonts preloaded by Pagespeed but not used within load event

## French Typography
- Use French apostrophe (U+2019 ') in French text, not straight apostrophe
- Always put chevron_right (right of button text) for all buttons in a pill
