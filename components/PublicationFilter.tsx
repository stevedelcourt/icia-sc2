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

const tagColors: Record<string, string> = {
  business: 'bg-navy text-white border-navy',
  techno: 'bg-rouge text-white border-rouge',
  people: 'bg-accent-green text-white border-accent-green',
  reglementation: 'bg-accent-purple text-white border-accent-purple',
  metier: 'bg-accent-teal text-white border-accent-teal',
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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 text-sm font-medium rounded-sm border transition-all duration-200 ${
            activeCategory === ''
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          {t(lang, 'publications.filter.all_tags')}
        </button>
        {categories.map((cat) => {
          const tagKey = `publications.tag.${cat}`
          const tagLabel = (t as any)(lang, tagKey) || cat
          const isActive = activeCategory === cat
          const colorClass = tagColors[cat] || 'bg-gray-200 text-gray-700 border-gray-200'
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(isActive ? '' : cat)}
              className={`px-4 py-2 text-sm font-medium rounded-sm border transition-all duration-200 ${
                isActive
                  ? colorClass
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {tagLabel}
            </button>
          )
        })}
      </div>

      {/* Sort dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:border-gray-400 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          {sortOrder === 'newest'
            ? t(lang, 'publications.filter.sort_newest')
            : t(lang, 'publications.filter.sort_oldest')}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isSortOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-10">
            <button
              onClick={() => {
                onSortChange('newest')
                setIsSortOpen(false)
              }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                sortOrder === 'newest' ? 'font-semibold text-black' : 'text-gray-600'
              }`}
            >
              {t(lang, 'publications.filter.sort_newest')}
            </button>
            <button
              onClick={() => {
                onSortChange('oldest')
                setIsSortOpen(false)
              }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                sortOrder === 'oldest' ? 'font-semibold text-black' : 'text-gray-600'
              }`}
            >
              {t(lang, 'publications.filter.sort_oldest')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
