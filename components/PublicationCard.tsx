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
  business: 'bg-navy text-white',
  techno: 'bg-rouge text-white',
  people: 'bg-accent-green text-white',
  reglementation: 'bg-accent-purple text-white',
  metier: 'bg-accent-teal text-white',
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
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={imagePath}
              alt={headline}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <p className="text-sm text-gray-400 mb-2">
            {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Headline */}
          <LocalizedLink href={`/publications/${slug}/`}>
            <h2 className="text-xl md:text-2xl font-bold text-black group-hover:text-navy transition-colors duration-200 mb-2 leading-tight">
              {headline}
            </h2>
          </LocalizedLink>

          {/* Subheadline */}
          <p className="text-base text-gray-500 leading-relaxed mb-4 line-clamp-3">
            {subheadline}
          </p>

          {/* Read button */}
          <LocalizedLink
            href={`/publications/${slug}/`}
            className="inline-flex items-center text-sm font-semibold text-navy hover:text-navy-light transition-colors duration-200"
          >
            {t(lang, 'publications.card.read_button')}
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedLink>
        </div>
      </div>
    </motion.article>
  )
}
