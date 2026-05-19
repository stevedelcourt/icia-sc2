'use client'

import { useMemo, useState } from 'react'
import { actualites, getActualiteCategories } from '@/generated/actualites'
import { publicationsFr, publicationsEn } from '@/generated/publications'
import { PublicationCard } from '@/components/PublicationCard'

export function ActualitesList({ lang }: { lang: 'fr' | 'en' }) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Merge both data sources into PublicationCard-compatible format
  const all: { slug: string; date: string; category: string; headline: string; subheadline: string; heroImage: string; type: 'publication' | 'actualite' }[] = [
    ...actualites.map(a => ({
      slug: a.slug, date: a.date, category: a.category,
      headline: lang === 'en' && a.titleEn ? a.titleEn : a.title,
      subheadline: lang === 'en' && a.excerptEn ? a.excerptEn : a.excerpt,
      heroImage: a.image, type: 'actualite' as const,
    })),
    ...(lang === 'en' ? publicationsEn : publicationsFr).map(p => ({
      slug: p.slug, date: p.date, category: p.category,
      headline: p.headline, subheadline: p.subheadline,
      heroImage: p.heroImage, type: 'publication' as const,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const categories = useMemo(() => {
    const cats = new Set(all.map(i => i.category))
    return Array.from(cats).sort()
  }, [])

  const filtered = activeCategory === 'all' ? all : all.filter(i => i.category === activeCategory)

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        <button onClick={() => setActiveCategory('all')} style={{
          padding: '8px 16px', borderRadius: '100px', border: activeCategory === 'all' ? '1.5px solid #000' : '1px solid #e5e5e5',
          background: activeCategory === 'all' ? '#000' : 'transparent', color: activeCategory === 'all' ? '#fff' : '#4e4e4e',
          cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s ease',
        }}>{lang === 'fr' ? 'Tous' : 'All'}</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 16px', borderRadius: '100px', border: activeCategory === cat ? '1.5px solid #000' : '1px solid #e5e5e5',
            background: activeCategory === cat ? '#000' : 'transparent', color: activeCategory === cat ? '#fff' : '#4e4e4e',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit', textTransform: 'capitalize', transition: 'all 0.2s ease',
          }}>{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="t-lead" style={{ color: '#9CA3AF' }}>{lang === 'fr' ? 'Aucune actualité.' : 'No news.'}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {filtered.map((item, i) => (
            <PublicationCard
              key={item.slug}
              slug={item.slug}
              date={item.date}
              category={item.category}
              headline={item.headline}
              subheadline={item.subheadline}
              heroImage={item.heroImage}
              lang={lang as any}
              index={i}
              type={item.type}
            />
          ))}
        </div>
      )}
    </>
  )
}
