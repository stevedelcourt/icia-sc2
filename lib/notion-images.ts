import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

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

export async function getArticles() {
  if (!NOTION_KEY) return []
  
  try {
    const query: any = { 
      page_size: 100,
      sorts: [{ property: 'Date', direction: 'descending' }]
    }
    
    const response = await fetch(`${notion.baseUrl}/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify(query),
      next: { revalidate: 60 }
    })

    if (!response.ok) return []
    
    const data = await response.json()
    if (!data.results) return []

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

    const getRichText = (prop: any) => {
      if (!prop) return ''
      if (prop.rich_text && prop.rich_text.length > 0) {
        return prop.rich_text.map((t: any) => t.plain_text).join('')
      }
      if (prop.title && prop.title.length > 0) {
        return prop.title.map((t: any) => t.plain_text).join('')
      }
      return ''
    }

    const articles = data.results.map((page: any) => {
      const props = page.properties
      return {
        slug: getRichText(props.Slug),
        title: getRichText(props.Titre),
        excerpt: getRichText(props.Excerpt),
        category: props.Category?.select?.name || '',
        date: props.Date?.date?.start || '',
        image: getImageUrl(props.Image) || getImageUrl(props.Media) || '',
        articleField: getRichText(props.Article),
      }
    }).filter((a: any) => a.slug)

    return articles
  } catch {
    return []
  }
}

export async function downloadAndSaveImage(imageUrl: string, slug: string, index: number): Promise<string> {
  if (!imageUrl) return ''
  
  try {
    const publicDir = path.join(process.cwd(), 'public', 'articles')
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg'
    const filename = `${slug}-${index}${extension}`
    const localPath = `/articles/${filename}`
    const fullPath = path.join(publicDir, filename)

    if (fs.existsSync(fullPath)) {
      return localPath
    }

    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.log(`Failed to download image: ${imageUrl}`)
      return imageUrl
    }

    const buffer = await response.arrayBuffer()
    fs.writeFileSync(fullPath, Buffer.from(buffer))
    
    console.log(`Downloaded image: ${localPath}`)
    return localPath
  } catch (error) {
    console.log(`Error downloading image: ${imageUrl}`, error)
    return imageUrl
  }
}

export async function getArticlesWithLocalImages() {
  const articles = await getArticles()
  
  const articlesWithLocalImages = await Promise.all(
    articles.map(async (article: any, index: number) => {
      let localImage = article.image
      
      if (article.image && article.image.startsWith('http')) {
        localImage = await downloadAndSaveImage(article.image, article.slug, index)
      }
      
      return {
        ...article,
        image: localImage
      }
    })
  )
  
  return articlesWithLocalImages
}
