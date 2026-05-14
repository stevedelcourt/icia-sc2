'use client'

import { motion } from 'framer-motion'
import { LocalizedLink } from '@/lib/i18n'
import { t, type Locale } from '@/generated/content'

interface PublicationCardProps {
  slug: string
  date: string
  category: string
  headline: string
  subheadline: string
  heroImage: string
  lang: Locale
  index?: number
}

const tagColors: Record<string, string> = {
  announcements: 'bg-[#a6a6a6] text-white',
  perspectives: 'bg-[#a6a6a6] text-white',
  'regulatory-insights': 'bg-[#a6a6a6] text-white',
  news: 'bg-[#a6a6a6] text-white',
  'strategy-papers': 'bg-[#a6a6a6] text-white',
}

export function PublicationCard({
  slug,
  date,
  category,
  headline,
  subheadline,
  heroImage,
  lang,
  index = 0,
}: PublicationCardProps) {
  const tagKey = `publications.tag.${category}`
  const tagLabel = (t as any)(lang, tagKey) || category
  const tagClass = tagColors[category] || 'bg-gray-200 text-gray-700'
  const imagePath = heroImage
    ? `/images/publications/${slug}/${heroImage}`
    : '/images/og-image.png'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Thumbnail - 1:1 crop from 16:9 */}
        <LocalizedLink
          href={`/publications/${slug}/`}
          className="block w-full md:w-48 lg:w-56 flex-shrink-0"
        >
          <div className="aspect-square overflow-hidden bg-secondary rounded-card">
            <img
              src={imagePath}
              alt={headline}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width="400"
              height="400"
            />
          </div>
        </LocalizedLink>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center py-1">
          {/* Tag */}
          <span
            className={`inline-block self-start px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm mb-3 ${tagClass}`}
          >
            {tagLabel}
          </span>

          {/* Date */}
          <p className="t-caption text-tertiary mb-2">
            {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Headline */}
          <LocalizedLink href={`/publications/${slug}/`}>
            <h2 className="t-heading text-primary group-hover:text-secondary transition-colors duration-200 mb-2">
              {headline}
            </h2>
          </LocalizedLink>

          {/* Subheadline */}
          <p className="t-caption text-secondary mb-4 line-clamp-3">
            {subheadline}
          </p>

          {/* Read button */}
          <LocalizedLink
            href={`/publications/${slug}/`}
            className="inline-flex items-center t-caption text-primary hover:text-secondary hover:underline hover:underline-offset-4 transition-colors duration-200"
          >
            {t(lang, 'publications.card.read_button')}
            <svg className="ml-1 w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </LocalizedLink>
        </div>
      </div>
    </motion.article>
  )
}
