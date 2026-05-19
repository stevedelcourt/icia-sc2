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
  type?: 'publication' | 'actualite'
  basePath?: string
}

export function PublicationCard({
  slug, date, category, headline, subheadline, heroImage,
  lang, index = 0, type = 'publication', basePath,
}: PublicationCardProps) {
  const tagKey = `publications.tag.${category}`
  const tagLabel = category
  const imagePath = heroImage
    ? (heroImage.startsWith('/') || heroImage.startsWith('http'))
      ? heroImage
      : `/images/publications/${slug}/${heroImage}`
    : '/images/og-image.png'
  const href = basePath || `/${type === 'publication' ? 'publications' : 'actualites'}/${slug}`

  return (
    <>
      <style>{`
        .ac-row { flex-direction: column; }
        @media (min-width: 640px) {
          .ac-row { flex-direction: row !important; gap: 28px !important; align-items: flex-start !important; }
          .ac-thumb { width: 220px !important; flex-shrink: 0 !important; }
        }
        .ac-img { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .ac-card:hover .ac-img { transform: scale(1.05); }
      `}</style>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="ac-card"
      >
        <div className="ac-row" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <LocalizedLink href={href} className="ac-thumb" style={{ display: 'block', width: '100%', flexShrink: 0 }}>
            <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 'var(--r-card)' }}>
              <img src={imagePath} alt={headline} className="ac-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </LocalizedLink>

          <div style={{ flex: 1, paddingTop: '2px', paddingBottom: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-block', padding: '4px 10px', fontSize: '11px', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '4px',
                backgroundColor: '#f5f5f5', color: '#4e4e4e',
              }}>
                {tagLabel}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <LocalizedLink href={href} style={{ textDecoration: 'none' }}>
              <h2 className="t-heading text-primary" style={{ marginBottom: '8px', transition: 'color 0.2s ease' }}>
                {headline}
              </h2>
            </LocalizedLink>

            <p className="t-caption" style={{ marginBottom: '14px', lineHeight: 1.55, color: '#4e4e4e' }}>
              {subheadline.length > 200 ? subheadline.slice(0, 200) + '...' : subheadline}
            </p>

            <LocalizedLink href={href}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none' }}>
              {t(lang, 'publications.card.read_button')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </LocalizedLink>
          </div>
        </div>
      </motion.article>
    </>
  )
}
