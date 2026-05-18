'use client'

import { useMemo, useState } from 'react'
import { actualites, getActualiteCategories } from '@/generated/actualites'
import { ActualiteCard } from '@/components/ActualiteCard'

export function ActualitesList({ lang }: { lang: 'fr' | 'en' }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = useMemo(() => getActualiteCategories(), [])

  const filtered = activeCategory === 'all'
    ? actualites
    : actualites.filter(a => a.category === activeCategory)

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        <button onClick={() => setActiveCategory('all')} style={{
          padding: '8px 16px', borderRadius: '100px', border: activeCategory === 'all' ? '1.5px solid #000' : '1px solid #e5e5e5',
          background: activeCategory === 'all' ? '#000' : 'transparent',
          color: activeCategory === 'all' ? '#fff' : '#4e4e4e',
          cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
          transition: 'all 0.2s ease',
        }}>
          {lang === 'fr' ? 'Tous' : 'All'}
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 16px', borderRadius: '100px', border: activeCategory === cat ? '1.5px solid #000' : '1px solid #e5e5e5',
            background: activeCategory === cat ? '#000' : 'transparent',
            color: activeCategory === cat ? '#fff' : '#4e4e4e',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
            textTransform: 'capitalize',
            transition: 'all 0.2s ease',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="t-lead" style={{ color: '#9CA3AF' }}>
          {lang === 'fr' ? 'Aucune actualité pour le moment.' : 'No news at the moment.'}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map(a => (
            <ActualiteCard key={a.slug} {...a} />
          ))}
        </div>
      )}
    </>
  )
}
