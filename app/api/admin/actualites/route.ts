// app/api/admin/actualites/route.ts
// Local dev-only API for actualites CRUD
// Disabled in production (returns 403)

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content', 'actualites')

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true })
}

// GET /api/admin/actualites — list all articles
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }
  try {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'))
    const articles = files.map(f => JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf8')))
    articles.sort((a: any, b: any) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    return NextResponse.json({ articles })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST /api/admin/actualites — create or update
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }
  try {
    const article = await req.json()
    if (!article.slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })

    const filePath = path.join(contentDir, `${article.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2))

    return NextResponse.json({ success: true, slug: article.slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// DELETE /api/admin/actualites?slug=...
export async function DELETE(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })

    const filePath = path.join(contentDir, `${slug}.json`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
