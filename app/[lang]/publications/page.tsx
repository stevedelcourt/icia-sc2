'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PublicationCard } from '@/components/PublicationCard'
import { PublicationFilter } from '@/components/PublicationFilter'
import { FadeIn } from '@/components/ui/FadeIn'
import { publications, getCategories } from '@/generated/publications'
import { t, type Locale } from '@/generated/content'

export default function PublicationsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const [activeCategory, setActiveCategory] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const categories = useMemo(() => getCategories(), [])

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
  }, [activeCategory, sortOrder])

  return (
    <>
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f9f7f3' }}>
        <div className="max-w-6xl mx-auto px-8">
          <FadeIn>
            <div className="mb-16">
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
                {t(lang, 'publications.page.title')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-[1.1]">
                Publications
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
              <p className="text-lg text-gray-400">Aucune publication pour ce filtre.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
