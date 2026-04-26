import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    const data = await request.formData()

    const slug = (data.get('slug') as string)?.trim()
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const safeSlug = slug.replace(/[^a-z0-9-]/g, '')

    // Build frontmatter
    const frontmatter: Record<string, string> = {
      slug: safeSlug,
      date: (data.get('date') as string) || new Date().toISOString().split('T')[0],
      category: (data.get('category') as string) || 'business',
      headline: (data.get('headline') as string) || '',
      subheadline: (data.get('subheadline') as string) || '',
      keywords: (data.get('keywords') as string) || '',
    }

    // Handle image uploads
    const imageDir = path.join(process.cwd(), 'public', 'images', 'publications', safeSlug)
    fs.mkdirSync(imageDir, { recursive: true })

    // Hero image: new upload wins, otherwise keep existing
    const heroImage = data.get('heroImage') as File | null
    const existingHeroImage = (data.get('existingHeroImage') as string) || ''
    if (heroImage && heroImage.size > 0) {
      const heroPath = path.join(imageDir, heroImage.name)
      const buffer = Buffer.from(await heroImage.arrayBuffer())
      fs.writeFileSync(heroPath, buffer)
      frontmatter.heroImage = heroImage.name
    } else if (existingHeroImage) {
      frontmatter.heroImage = existingHeroImage
    }

    // Card images
    for (let i = 1; i <= 3; i++) {
      const cardImage = data.get(`card${i}Image`) as File | null
      const existingCardImage = (data.get(`existingCard${i}Image`) as string) || ''
      if (cardImage && cardImage.size > 0) {
        const cardPath = path.join(imageDir, cardImage.name)
        const buffer = Buffer.from(await cardImage.arrayBuffer())
        fs.writeFileSync(cardPath, buffer)
        frontmatter[`card${i}Image`] = cardImage.name
      } else if (existingCardImage) {
        frontmatter[`card${i}Image`] = existingCardImage
      }

      frontmatter[`card${i}Title`] = (data.get(`card${i}Title`) as string) || ''
      frontmatter[`card${i}Body`] = (data.get(`card${i}Body`) as string) || ''
    }

    frontmatter.ctaText = (data.get('ctaText') as string) || ''
    frontmatter.ctaLink = (data.get('ctaLink') as string) || ''
    frontmatter.link = (data.get('link') as string) || ''
    frontmatter.linkLabel = (data.get('linkLabel') as string) || ''

    const relatedSlugsRaw = (data.get('relatedSlugs') as string) || ''
    if (relatedSlugsRaw) {
      frontmatter.relatedSlugs = relatedSlugsRaw
    }

    // Build markdown content
    const body = (data.get('body') as string) || ''

    const fmLines: string[] = []
    for (const [k, v] of Object.entries(frontmatter)) {
      if (v === '') continue
      if (k === 'relatedSlugs') {
        const slugs = (v as string).split(',').map((s) => s.trim()).filter(Boolean)
        if (slugs.length > 0) {
          fmLines.push('relatedSlugs:')
          for (const s of slugs) {
            fmLines.push(`  - ${s}`)
          }
        }
      } else {
        fmLines.push(`${k}: "${(v as string).replace(/"/g, '\\"')}"`)
      }
    }

    const mdContent = `---\n${fmLines.join('\n')}\n---\n\n${body}\n`

    // Save markdown file
    const publicationsDir = path.join(process.cwd(), 'content', 'publications')
    fs.mkdirSync(publicationsDir, { recursive: true })
    const mdPath = path.join(publicationsDir, `${safeSlug}.md`)
    fs.writeFileSync(mdPath, mdContent, 'utf8')

    return NextResponse.json({ success: true, slug: safeSlug })
  } catch (err) {
    console.error('Save publication error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
