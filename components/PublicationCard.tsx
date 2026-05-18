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

const tagStyle: Record<string, React.CSSProperties> = {
  announcements: { backgroundColor: '#a6a6a6', color: '#ffffff' },
  perspectives: { backgroundColor: '#a6a6a6', color: '#ffffff' },
  'regulatory-insights': { backgroundColor: '#a6a6a6', color: '#ffffff' },
  news: { backgroundColor: '#a6a6a6', color: '#ffffff' },
  'strategy-papers': { backgroundColor: '#a6a6a6', color: '#ffffff' },
}

const defaultTagStyle: React.CSSProperties = {
  backgroundColor: '#e5e5e5',
  color: '#4e4e4e',
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
  const tagS = tagStyle[category] || defaultTagStyle
  const imagePath = heroImage
    ? `/images/publications/${slug}/${heroImage}`
    : '/images/og-image.png'

  return (
    <>
      <style>{`
        .pc-row { flex-direction: column; }
        @media (min-width: 768px) {
          .pc-row { flex-direction: row !important; gap: 32px !important; }
          .pc-thumb { width: 12rem !important; }
        }
        @media (min-width: 1024px) {
          .pc-thumb { width: 14rem !important; }
        }
        .pc-img { transition: transform 0.5s ease; }
        .pc-group:hover .pc-img { transform: scale(1.05); }
        .pc-headline { transition: color 0.2s ease; }
        .pc-group:hover .pc-headline { color: var(--text-secondary); }
        .pc-link:hover { color: var(--text-secondary); text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pc-group"
      >
        <div
          className="pc-row"
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
          }}
        >
          <LocalizedLink
            href={`/publications/${slug}/`}
            className="pc-thumb"
            style={{ display: 'block', width: '100%', flexShrink: 0 }}
          >
            <div
              className="bg-secondary rounded-card"
              style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}
            >
              <img
                src={imagePath}
                alt={headline}
                className="pc-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                width="400"
                height="400"
              />
            </div>
          </LocalizedLink>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '4px',
              paddingBottom: '4px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '2px',
                marginBottom: '12px',
                ...tagS,
              }}
            >
              {tagLabel}
            </span>

            <p className="t-caption text-tertiary" style={{ marginBottom: '8px' }}>
              {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <LocalizedLink href={`/publications/${slug}/`}>
              <h2 className="t-heading text-primary pc-headline" style={{ marginBottom: '8px' }}>
                {headline}
              </h2>
            </LocalizedLink>

            <p
              className="t-caption text-secondary"
              style={{
                marginBottom: '16px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {subheadline}
            </p>

            <LocalizedLink
              href={`/publications/${slug}/`}
              className="t-caption text-primary pc-link"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              {t(lang, 'publications.card.read_button')}
              <svg
                style={{ marginLeft: '4px', width: '14px', height: '14px' }}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 2.625L9.625 7L5.25 11.375"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </LocalizedLink>
          </div>
        </div>
      </motion.article>
    </>
  )
}
