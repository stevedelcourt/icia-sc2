'use client'

import { useRef, useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n'
import { getLatestActualites, type Actualite } from '@/generated/actualites'
import { ActualiteCard } from './ActualiteCard'

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

  const articles = getLatestActualites(3)
  if (articles.length === 0) return null

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
              {lang === 'fr' ? 'Nos dernières publications' : 'Our latest publications'}
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {articles.map((a, i) => (
            <div key={a.slug} style={{ transition: 'opacity 0.5s ease', transitionDelay: `${i * 0.1}s`, opacity: visible ? 1 : 0 }}>
              <ActualiteCard {...a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
