import { NextRequest, NextResponse } from 'next/server'

const NOTION_KEY = process.env.NOTION_KEY
const NOTION_DB = process.env.NOTION_DB || '306d314b3ef080d58c4ec5bd85683d73'

const notion = {
  baseUrl: 'https://api.notion.com/v1',
  headers: {
    'Authorization': `Bearer ${NOTION_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }
}

export async function POST(request: NextRequest) {
  try {
    const articles = [
      {
        title: 'Lancement officiel de l\'ICIA',
        slug: 'lancement-officiel-icia',
        excerpt: 'L\'Institut Collectif de l\'IA ouvre ses portes a Marseille.',
        category: 'Actualites',
        date: '2025-02-15',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        content: 'L\'Institut Collectif de l\'IA a officiellement lance ses activites.'
      },
      {
        title: 'Partenariat avec les universites',
        slug: 'partenariat-universites',
        excerpt: 'L\'ICIA signe un accord avec les universites de Marseille.',
        category: 'Partenariats',
        date: '2025-02-10',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        content: 'Ce partenariat permettra aux etudiants de beneficier de contenus pedagogiques.'
      },
      {
        title: 'Le Think Tank publie son rapport',
        slug: 'think-tank-rapport',
        excerpt: 'Une analyse approfondie des impacts de l\'IA sur le marche du travail.',
        category: 'Think Tank',
        date: '2025-02-05',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
        content: 'Le Think Tank de l\'ICIA publie son premier rapport thematique.'
      }
    ]

    for (const article of articles) {
      const res = await fetch(`${notion.baseUrl}/pages`, {
        method: 'POST',
        headers: notion.headers,
        body: JSON.stringify({
          parent: { database_id: NOTION_DB },
          properties: {
            Name: { title: [{ text: { content: article.title } }] },
            Slug: { rich_text: [{ text: { content: article.slug } }] },
            Excerpt: { rich_text: [{ text: { content: article.excerpt } }] },
            Category: { select: { name: article.category } },
            Date: { date: { start: article.date } },
            Image: { url: article.image },
            Content: { rich_text: [{ text: { content: article.content } }] }
          }
        })
      })
    }

    return NextResponse.json({ success: true, message: '3 articles created' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const dynamic = 'force-static'
