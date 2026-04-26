# Deploy Skill for ICIA-Sc2

## Purpose
Complete rebuild, error check, commit and deploy workflow for the Marius IA Next.js static site.

## Workflow

### 1. Prebuild - Generate Content
```bash
node scripts/build-content.js && node scripts/build-publications.js
```
- Parses `content/site.fr.txt` and `content/site.en.txt` → `generated/content.ts`
- Parses `content/publications/fr/*.md` and `content/publications/en/*.md` → `generated/publications.ts`
- Generates `generated/publication-translations.ts` for FR/EN article language switching

### 2. Build
```bash
rm -rf out .next && NEXT_EXPORT=true npm run build
```
- Clean build with static export enabled
- Warnings about redirects/headers with `output: export` are expected (not errors)

### 3. Post-build
```bash
cp out/404.html out/fr/404.html && cp out/404.html out/en/404.html
```
- Required for static export on o2switch

### 4. Deploy
```bash
python3 ftp_upload.py
```
- Uploads `out/` folder to sc2 (o2switch)

### 5. Git Commit
```bash
git add -A && git commit -m "message"
```

## Complete One-Liner
```bash
node scripts/build-content.js && node scripts/build-publications.js && rm -rf out .next && NEXT_EXPORT=true npm run build && cp out/404.html out/fr/404.html && cp out/404.html out/en/404.html && python3 ftp_upload.py && git add -A && git commit -m "Deploy updates"
```

## Notes
- Build output is `out/` folder
- Deploy target is sc2 on o2switch (via ftp_upload.py)
- The `NEXT_EXPORT=true` env var enables static export mode
- Build warnings about redirects/headers are expected for static export
