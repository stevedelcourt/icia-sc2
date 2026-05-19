// app/api/admin/actualites/images/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'Disabled' }, { status: 403 })
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const slug = formData.get('slug') as string
    if (!file || !slug) return NextResponse.json({ error: 'File and slug required' }, { status: 400 })

    const dir = path.join(process.cwd(), 'public', 'images', 'publications', slug)
    fs.mkdirSync(dir, { recursive: true })

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    fs.writeFileSync(path.join(dir, fileName), buffer)

    return NextResponse.json({ success: true, fileName, path: `/images/publications/${slug}/${fileName}` })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
