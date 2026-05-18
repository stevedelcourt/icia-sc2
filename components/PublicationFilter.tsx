'use client'

import { useState } from 'react'
import { t, type Locale } from '@/generated/content'

interface PublicationFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  sortOrder: 'newest' | 'oldest'
  onSortChange: (order: 'newest' | 'oldest') => void
  lang: Locale
}

const activeTagBgMap: Record<string, string> = {
  announcements: '#a6a6a6',
  perspectives: '#a6a6a6',
  'regulatory-insights': '#a6a6a6',
  news: '#a6a6a6',
  'strategy-papers': '#a6a6a6',
}

const pillBase: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '2px',
  border: '1px solid',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const pillInactive: React.CSSProperties = {
  ...pillBase,
  backgroundColor: '#ffffff',
  color: '#4e4e4e',
  borderColor: '#e5e5e5',
}

const pillActiveAll: React.CSSProperties = {
  ...pillBase,
  backgroundColor: '#000000',
  color: '#ffffff',
  borderColor: '#000000',
}

export function PublicationFilter({
  categories,
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  lang,
}: PublicationFilterProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <>
      <style>{`
        .pf-row { flex-direction: column; }
        @media (min-width: 640px) {
          .pf-row { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
        }
        .pf-pill-hover:hover { border-color: #a3a3a3; }
        .pf-sortbtn:hover { border-color: #a3a3a3; }
        .pf-sortopt:hover { background-color: #f5f5f5; }
        .pf-chevron { transition: transform 0.2s ease; }
        .pf-chevron.open { transform: rotate(180deg); }
      `}</style>
      <div
        className="pf-row"
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            onClick={() => onCategoryChange('')}
            className={activeCategory === '' ? undefined : 'pf-pill-hover'}
            style={activeCategory === '' ? pillActiveAll : pillInactive}
          >
            {t(lang, 'publications.filter.all_tags')}
          </button>
          {categories.map((cat) => {
            const tagKey = `publications.tag.${cat}`
            const tagLabel = (t as any)(lang, tagKey) || cat
            const isActive = activeCategory === cat
            const bg = activeTagBgMap[cat] || '#e5e5e5'
            const txt = activeTagBgMap[cat] ? '#ffffff' : '#4e4e4e'
            const bdr = activeTagBgMap[cat] || '#e5e5e5'
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isActive ? '' : cat)}
                className={isActive ? undefined : 'pf-pill-hover'}
                style={
                  isActive
                    ? { ...pillBase, backgroundColor: bg, color: txt, borderColor: bdr }
                    : pillInactive
                }
              >
                {tagLabel}
              </button>
            )
          })}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="pf-sortbtn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#4e4e4e',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {sortOrder === 'newest'
              ? t(lang, 'publications.filter.sort_newest')
              : t(lang, 'publications.filter.sort_oldest')}
            <svg
              className={`pf-chevron${isSortOpen ? ' open' : ''}`}
              style={{ width: '16px', height: '16px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isSortOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                marginTop: '4px',
                width: '12rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                zIndex: 10,
              }}
            >
              {(['newest', 'oldest'] as const).map((order) => (
                <button
                  key={order}
                  onClick={() => {
                    onSortChange(order)
                    setIsSortOpen(false)
                  }}
                  className="pf-sortopt"
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    color: sortOrder === order ? '#000000' : '#4e4e4e',
                    fontWeight: sortOrder === order ? 500 : 400,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {t(lang, `publications.filter.sort_${order}`)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
