'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n'

interface ActualiteCardProps {
  slug: string
  title: string
  titleEn: string
  excerpt: string
  excerptEn: string
  category: string
  date: string
  image: string
}

const GRADIENTS = [
  'linear-gradient(135deg, #3886c1, #2a6ba0)',
  'linear-gradient(135deg, #1a1a2e, #16213e)',
  'linear-gradient(135deg, #0f3460, #533483)',
]

export function ActualiteCard({ slug, title, titleEn, excerpt, excerptEn, category, date, image }: ActualiteCardProps) {
  const lang = useLocale()
  const displayTitle = lang === 'en' ? titleEn : title
  const displayExcerpt = lang === 'en' ? excerptEn : excerpt
  const gradIdx = slug.length % GRADIENTS.length
  const formattedDate = new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Link href={`/${lang}/actualites/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px',
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.08) 0px 8px 24px' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}
      >
        <div style={{ width: '100%', aspectRatio: '1/1', background: GRADIENTS[gradIdx], position: 'relative', overflow: 'hidden' }}>
          {image && (
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px', padding: '4px 10px',
            fontSize: '10px', fontWeight: 500, color: '#fff',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {formattedDate}
          </span>
        </div>
        <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', display: 'block' }}>
            {category}
          </span>
          <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#000', lineHeight: 1.38, marginBottom: '8px' }}>
            {displayTitle}
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: '0 0 16px', flex: 1 }}>
            {displayExcerpt}
          </p>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#000', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {lang === 'fr' ? 'Lire la suite' : 'Read more'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
