import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 60

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  try {
    const query: any = { 
      page_size: 100,
      sorts: [{ property: 'Date', direction: 'descending' }]
    }
    if (slug && slug !== 'create') {
      query.filter = {
        property: 'Slug',
        rich_text: { equals: slug }
      }
    }
    
    const response = await fetch(`${notion.baseUrl}/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify(query),
      next: { revalidate: 60 }
    })

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ error: 'No articles found' }, { status: 404 })
    }

    const articles = data.results.map((page: any) => {
      const props = page.properties
      
      const getImageUrl = (prop: any) => {
        if (!prop) return ''
        if (prop.url) return prop.url
        if (prop.files && prop.files.length > 0) {
          const file = prop.files[0]
          if (file.file) return file.file.url
          if (file.external) return file.external.url
        }
        return ''
      }
      
      return {
        slug: props.Slug?.rich_text?.[0]?.plain_text || '',
        title: props.Titre?.rich_text?.[0]?.plain_text || '',
        excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || '',
        category: props.Category?.select?.name || '',
        date: props.Date?.date?.start || '',
        image: getImageUrl(props.Image) || getImageUrl(props.Media) || '',
        content: props.Article?.title?.[0]?.plain_text || ''
      }
    })

    return NextResponse.json(slug ? articles[0] : articles)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed' }, { status: 500 })
  }
}
