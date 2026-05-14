'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PublicationCard } from '@/components/PublicationCard'
import { PublicationFilter } from '@/components/PublicationFilter'
import { FadeIn } from '@/components/ui/FadeIn'
import { getPublications, getCategories } from '@/generated/publications'
import { t, type Locale } from '@/generated/content'

export default function PublicationsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const [activeCategory, setActiveCategory] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const publications = useMemo(() => getPublications(lang), [lang])
  const categories = useMemo(() => getCategories(lang), [lang])

  const filteredPublications = useMemo(() => {
    let result = activeCategory
      ? publications.filter((p) => p.category === activeCategory)
      : [...publications]

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [activeCategory, sortOrder, publications])

  return (
    <>
      <Header />
      <main className="section pt-16 bg-primary">
        <div className="container-mentivis">
          <FadeIn>
            <div className="mb-16">
              <p className="t-caption uppercase tracking-widest mb-4">
                {t(lang, 'publications.page.title')}
              </p>
              <h1 className="t-display text-primary">
                {t(lang, 'publications.page.headline')}
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <PublicationFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              lang={lang}
            />
          </FadeIn>

          <div className="space-y-12">
            {filteredPublications.map((pub, index) => (
              <PublicationCard
                key={pub.slug}
                slug={pub.slug}
                date={pub.date}
                category={pub.category}
                headline={pub.headline}
                subheadline={pub.subheadline}
                heroImage={pub.heroImage}
                lang={lang}
                index={index}
              />
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-20">
              <p className="t-caption text-tertiary">
                {lang === 'en' ? 'No publications for this filter.' : 'Aucune publication pour ce filtre.'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
