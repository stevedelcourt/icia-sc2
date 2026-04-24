const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB = process.env.NOTION_DB || '306d314b3ef080d58c4ec5bd85683d73';
const NOTION_PARTNERS_DB = process.env.NOTION_PARTNERS_DB || '307d314b3ef0803aabeac0c66c1275fd';

const notion = {
  baseUrl: 'https://api.notion.com/v1',
  headers: {
    'Authorization': `Bearer ${NOTION_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) {
      resolve(null);
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        resolve(null);
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      resolve(null);
    });
  });
}

async function getImageUrls() {
  if (!NOTION_KEY) {
    console.log('No NOTION_KEY, skipping image download');
    return { articles: [], partners: [] };
  }

  try {
    // Get articles
    const query = { page_size: 100 };
    const response = await fetch(`${notion.baseUrl}/databases/${NOTION_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify(query)
    });

    const data = await response.json();
    const articles = [];
    
    if (data.results) {
      for (const page of data.results) {
        const props = page.properties;
        const slug = props.Slug?.rich_text?.[0]?.plain_text || props.Titre?.title?.[0]?.plain_text || '';
        
        if (!slug) continue;

        const getImageUrl = (prop) => {
          if (!prop) return '';
          if (prop.url) return prop.url;
          if (prop.files && prop.files.length > 0) {
            const file = prop.files[0];
            if (file.file) return file.file.url;
            if (file.external) return file.external.url;
          }
          return '';
        };

        const imageUrl = getImageUrl(props.Image) || getImageUrl(props.Media);
        if (imageUrl) {
          const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
          articles.push({ url: imageUrl, slug, ext });
        }
      }
    }

    // Get partners
    const partnersResponse = await fetch(`${notion.baseUrl}/databases/${NOTION_PARTNERS_DB}/query`, {
      method: 'POST',
      headers: notion.headers,
      body: JSON.stringify({ page_size: 100 })
    });

    const partnersData = await partnersResponse.json();
    const partners = [];

    if (partnersData.results) {
      for (const page of partnersData.results) {
        const props = page.properties;
        const companyName = props.Company_name?.rich_text?.[0]?.plain_text || '';
        
        if (!companyName) continue;

        const logoUrl = props.Logo?.files?.[0]?.file?.url || props.Logo?.files?.[0]?.external?.url || '';
        
        if (logoUrl) {
          const ext = path.extname(new URL(logoUrl).pathname) || '.png';
          partners.push({ url: logoUrl, name: companyName, ext });
        }
      }
    }

    return { articles, partners };
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    return { articles: [], partners: [] };
  }
}

async function main() {
  console.log('Downloading Notion images and generating partner data...');
  
  const articlesDir = path.join(process.cwd(), 'public', 'articles');
  const partnersDir = path.join(process.cwd(), 'public', 'partners');
  
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  if (!fs.existsSync(partnersDir)) {
    fs.mkdirSync(partnersDir, { recursive: true });
  }

  const { articles, partners } = await getImageUrls();
  
  // Download article images
  for (const { url, slug, ext } of articles) {
    const filename = `${slug}${ext}`;
    const filepath = path.join(articlesDir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`Already exists: ${filename}`);
      continue;
    }

    await downloadImage(url, filepath);
  }

  // Download partner logos and save partner data
  const partnersData = [];
  for (const { url, name, ext } of partners) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `${slug}${ext}`;
    const filepath = path.join(partnersDir, filename);
    
    if (!fs.existsSync(filepath)) {
      await downloadImage(url, filepath);
    }
    
    partnersData.push({
      name,
      logo: `/partners/${filename}`,
      website: ''
    });
  }

  // Save partners data to JSON
  const partnersJsonPath = path.join(process.cwd(), 'public', 'partners.json');
  fs.writeFileSync(partnersJsonPath, JSON.stringify(partnersData, null, 2));
  console.log('Generated partners.json');

  console.log('Done downloading images');
}

main();
