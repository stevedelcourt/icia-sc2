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
          <div className="flex items-center justify-between mb-12">
            <h2 className="t-display text-primary">
              {lang === 'fr' ? 'Dernières publications' : 'Latest publications'}
            </h2>
            <LocalizedLink
              href="/publications/"
              className="inline-flex items-center t-caption text-primary hover:text-secondary hover:underline hover:underline-offset-4 transition-colors duration-200 whitespace-nowrap"
            >
              {lang === 'fr' ? 'Voir tout' : 'View all'}
              <ArrowRight className="ml-1" />
            </LocalizedLink>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="group bg-primary rounded-card shadow-card hover:shadow-card-full transition-all duration-300"
              >
                <LocalizedLink href={`/publications/${pub.slug}/`} className="block">
                  <div className="aspect-video overflow-hidden bg-secondary rounded-card rounded-b-none">
                    <Picture
                      src={imagePath}
                      alt={pub.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </LocalizedLink>

                <div className="p-6">
                  <p className="t-caption text-tertiary mb-2">
                    {new Date(pub.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <LocalizedLink href={`/publications/${pub.slug}/`}>
                    <h3 className="t-heading text-primary group-hover:text-secondary transition-colors duration-200 mb-2 line-clamp-2">
                      {pub.headline}
                    </h3>
                  </LocalizedLink>

                  <p className="t-caption text-secondary mb-4 line-clamp-2">
                    {pub.subheadline}
                  </p>

                  <LocalizedLink
                    href={`/publications/${pub.slug}/`}
                    className="inline-flex items-center t-caption text-primary hover:text-secondary hover:underline hover:underline-offset-4 transition-colors duration-200"
                  >
                    {lang === 'fr' ? 'Lire la suite' : 'Read more'}
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
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
