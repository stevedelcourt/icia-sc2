'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { LocalizedLink } from '@/lib/i18n'
import { ArrowRight } from '@/components/ui/ArrowRight'
import { FadeIn } from '@/components/ui/FadeIn'
import { Picture } from '@/components/Picture'
import { getPublications, type Locale } from '@/generated/publications'

export function RecentArticles({ lang }: { lang: Locale }) {
  const recent = useMemo(() => {
    return getPublications(lang).slice(0, 3)
  }, [lang])

  if (recent.length === 0) return null

  return (
    <section className="section bg-warm">
      <div className="container-mentivis">
        <FadeIn>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px',
            }}
          >
            <h2 className="t-display text-primary">
              {lang === 'fr' ? 'Dernières publications' : 'Latest publications'}
            </h2>
            <LocalizedLink
              href="/publications/"
              className="t-caption text-primary ra-viewall"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {lang === 'fr' ? 'Voir tout' : 'View all'}
              <ArrowRight className="ra-arrow-sm" />
            </LocalizedLink>
          </div>
        </FadeIn>

        <style>{`
          .ra-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 768px) {
            .ra-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .ra-card { transition: box-shadow 0.3s ease; }
          .ra-card:hover { box-shadow: var(--shadow-card-full); }
          .ra-card-img { transition: transform 0.5s ease; }
          .ra-card:hover .ra-card-img { transform: scale(1.05); }
          .ra-headline { transition: color 0.2s ease; }
          .ra-card:hover .ra-headline { color: var(--text-secondary); }
          .ra-link:hover { color: var(--text-secondary); text-decoration: underline; text-underline-offset: 4px; }
          .ra-viewall:hover { color: var(--text-secondary); text-decoration: underline; text-underline-offset: 4px; }
          .ra-arrow { transition: transform 0.2s ease; }
          .ra-card:hover .ra-arrow { transform: translateX(4px); }
          .ra-arrow-sm { margin-left: 4px; }
        `}</style>

        <div className="ra-grid">
          {recent.map((pub, i) => {
            const imagePath = pub.heroImage
              ? `/images/publications/${pub.slug}/${pub.heroImage}`
              : '/images/og-image.png'

            return (
              <motion.article
                key={pub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-primary rounded-card shadow-card ra-card"
              >
                <LocalizedLink
                  href={`/publications/${pub.slug}/`}
                  style={{ display: 'block' }}
                >
                  <div
                    className="bg-secondary rounded-card"
                    style={{
                      aspectRatio: '16 / 9',
                      overflow: 'hidden',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <Picture
                      src={imagePath}
                      alt={pub.headline}
                      className="ra-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </LocalizedLink>

                <div style={{ padding: '24px' }}>
                  <p className="t-caption text-tertiary" style={{ marginBottom: '8px' }}>
                    {new Date(pub.date).toLocaleDateString(
                      lang === 'fr' ? 'fr-FR' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </p>

                  <LocalizedLink href={`/publications/${pub.slug}/`}>
                    <h3
                      className="t-heading text-primary ra-headline"
                      style={{
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {pub.headline}
                    </h3>
                  </LocalizedLink>

                  <p
                    className="t-caption text-secondary"
                    style={{
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {pub.subheadline}
                  </p>

                  <LocalizedLink
                    href={`/publications/${pub.slug}/`}
                    className="t-caption text-primary ra-link"
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    {lang === 'fr' ? 'Lire la suite' : 'Read more'}
                    <ArrowRight className="ra-arrow-sm ra-arrow" />
                  </LocalizedLink>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
