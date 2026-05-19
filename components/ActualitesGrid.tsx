'use client'

import { useRef, useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n'
import { getLatestActualites, type Actualite } from '@/generated/actualites'
import { publicationsFr, publicationsEn } from '@/generated/publications'
import { ActualiteCard } from './ActualiteCard'

interface UnifiedItem {
  slug: string; title: string; titleEn: string; excerpt: string; excerptEn: string
  category: string; date: string; image: string; type: 'actualite' | 'publication'
}

export function ActualitesGrid() {
  const lang = useLocale()
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Merge actualites + publications, take 3 most recent
  const actus = getLatestActualites(10).map(a => ({
    slug: a.slug, title: a.title, titleEn: a.titleEn, excerpt: a.excerpt, excerptEn: a.excerptEn,
    category: a.category, date: a.date, image: a.image, type: 'actualite' as const,
  }))

  const pubsSource = lang === 'en' ? publicationsEn : publicationsFr
  const pubs = pubsSource.map(p => ({
    slug: p.slug, title: p.headline, titleEn: p.headline, excerpt: p.subheadline, excerptEn: p.subheadline,
    category: p.category, date: p.date, image: p.heroImage, type: 'publication' as const,
  }))

  const all = [...actus, ...pubs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  if (all.length === 0) return null

  return (
    <section ref={ref} style={{
      background: '#ffffff',
      padding: 'var(--section-gap) 0',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div className="container-mentivis">
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: '36px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 500, color: '#4e4e4e', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '8px' }}>
              {lang === 'fr' ? 'Actualités' : 'News'}
            </p>
            <h2 className="t-display text-primary" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              {lang === 'fr' ? 'Nos dernières actualités' : 'Our latest news'}
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {all.map((item, i) => (
            <div key={item.slug} style={{ transition: 'opacity 0.5s ease', transitionDelay: `${i * 0.1}s`, opacity: visible ? 1 : 0 }}>
              <UnifiedCard item={item} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Unified Card ── */
function UnifiedCard({ item, lang }: { item: UnifiedItem; lang: string }) {
  const displayTitle = lang === 'en' && item.titleEn ? item.titleEn : item.title
  const displayExcerpt = lang === 'en' && item.excerptEn ? item.excerptEn : item.excerpt
  const formattedDate = new Date(item.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const href = item.type === 'publication' ? `/${lang}/publications/${item.slug}/` : `/${lang}/actualites/${item.slug}`

  const gradIdx = item.slug.length % 3
  const GRADIENTS = ['linear-gradient(135deg, #3886c1, #2a6ba0)', 'linear-gradient(135deg, #1a1a2e, #16213e)', 'linear-gradient(135deg, #0f3460, #533483)']

  return (
    <a href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div style={{
        background: '#ffffff', borderRadius: '16px', overflow: 'hidden',
        boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px',
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.08) 0px 8px 24px' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}
      >
        <div style={{ width: '100%', aspectRatio: '1/1', background: GRADIENTS[gradIdx], position: 'relative', overflow: 'hidden' }}>
          {item.image && <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '4px 10px', fontSize: '10px', fontWeight: 500, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {formattedDate}
          </span>
        </div>
        <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: 500, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</span>
            {item.type === 'publication' && (
              <span style={{ fontSize: '10px', fontWeight: 500, color: '#3886c1', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(56,134,193,0.08)', padding: '1px 6px', borderRadius: '4px' }}>
                {lang === 'fr' ? 'Publication' : 'Publication'}
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#000', lineHeight: 1.38, marginBottom: '8px' }}>{displayTitle}</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#4e4e4e', margin: '0 0 16px', flex: 1 }}>{displayExcerpt.slice(0, 140)}</p>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#000', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {lang === 'fr' ? 'Lire la suite' : 'Read more'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </a>
  )
}
