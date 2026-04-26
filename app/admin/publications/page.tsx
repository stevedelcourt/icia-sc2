'use client'

import { useState } from 'react'
import { getPublications, type Locale } from '@/generated/publications'

const CATEGORIES = ['announcements', 'perspectives', 'regulatory-insights', 'news', 'strategy-papers']

const EMPTY_FORM = {
  slug: '',
  lang: 'fr' as Locale,
  date: '',
  category: 'announcements',
  headline: '',
  subheadline: '',
  keywords: '',
  heroImage: null as File | null,
  card1Title: '',
  card1Body: '',
  card1Image: null as File | null,
  card2Title: '',
  card2Body: '',
  card2Image: null as File | null,
  card3Title: '',
  card3Body: '',
  card3Image: null as File | null,
  card1Link: '',
  card1LinkLabel: '',
  card2Link: '',
  card2LinkLabel: '',
  card3Link: '',
  card3LinkLabel: '',
  ctaText: '',
  ctaLink: '',
  link: '/fr/contact/',
  linkLabel: '',
  relatedSlugs: [] as string[],
  body: '',
}

export default function AdminPublicationsPage() {
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">Not available in production.</p>
      </div>
    )
  }

  const [selectedSlug, setSelectedSlug] = useState('')
  const [selectedLang, setSelectedLang] = useState<Locale>('fr')
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [existingImages, setExistingImages] = useState({
    heroImage: '',
    card1Image: '',
    card2Image: '',
    card3Image: '',
  })

  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function loadPublication(lang: Locale, slug: string) {
    if (!slug) {
      setSelectedSlug('')
      setForm({ ...EMPTY_FORM, lang, date: new Date().toISOString().split('T')[0] })
      setExistingImages({ heroImage: '', card1Image: '', card2Image: '', card3Image: '' })
      return
    }

    const pubs = getPublications(lang)
    const pub = pubs.find((p) => p.slug === slug)
    if (!pub) return

    setSelectedSlug(slug)
    setSelectedLang(lang)
    setForm({
      ...EMPTY_FORM,
      lang,
      slug: pub.slug,
      date: pub.date,
      category: pub.category,
      headline: pub.headline,
      subheadline: pub.subheadline,
      keywords: pub.keywords,
      card1Title: pub.card1Title,
      card1Body: pub.card1Body,
      card2Title: pub.card2Title,
      card2Body: pub.card2Body,
      card3Title: pub.card3Title,
      card3Body: pub.card3Body,
      card1Link: (pub as any).card1Link || '',
      card1LinkLabel: (pub as any).card1LinkLabel || '',
      card2Link: (pub as any).card2Link || '',
      card2LinkLabel: (pub as any).card2LinkLabel || '',
      card3Link: (pub as any).card3Link || '',
      card3LinkLabel: (pub as any).card3LinkLabel || '',
      ctaText: pub.ctaText,
      ctaLink: pub.ctaLink,
      link: pub.link,
      linkLabel: pub.linkLabel,
      relatedSlugs: pub.relatedSlugs || [],
      body: pub.body,
      heroImage: null,
      card1Image: null,
      card2Image: null,
      card3Image: null,
    })
    setExistingImages({
      heroImage: pub.heroImage,
      card1Image: pub.card1Image,
      card2Image: pub.card2Image,
      card3Image: pub.card3Image,
    })
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleFileChange(field: string, file: File | null) {
    setForm((prev) => ({ ...prev, [field]: file }))
  }

  function toggleRelatedSlug(slug: string) {
    setForm((prev) => {
      const current = prev.relatedSlugs
      if (current.includes(slug)) {
        return { ...prev, relatedSlugs: current.filter((s) => s !== slug) }
      }
      if (current.length >= 2) {
        return prev
      }
      return { ...prev, relatedSlugs: [...current, slug] }
    })
  }

  function generateSlug(headline: string) {
    return headline
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 60)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')

    const slug = form.slug || generateSlug(form.headline)
    const data = new FormData()
    data.append('slug', slug)
    data.append('lang', form.lang)
    data.append('date', form.date)
    data.append('category', form.category)
    data.append('headline', form.headline)
    data.append('subheadline', form.subheadline)
    data.append('keywords', form.keywords)
    data.append('card1Title', form.card1Title)
    data.append('card1Body', form.card1Body)
    data.append('card1Link', form.card1Link)
    data.append('card1LinkLabel', form.card1LinkLabel)
    data.append('card2Title', form.card2Title)
    data.append('card2Body', form.card2Body)
    data.append('card2Link', form.card2Link)
    data.append('card2LinkLabel', form.card2LinkLabel)
    data.append('card3Title', form.card3Title)
    data.append('card3Body', form.card3Body)
    data.append('card3Link', form.card3Link)
    data.append('card3LinkLabel', form.card3LinkLabel)
    data.append('ctaText', form.ctaText)
    data.append('ctaLink', form.ctaLink)
    data.append('link', form.link)
    data.append('linkLabel', form.linkLabel)
    data.append('relatedSlugs', form.relatedSlugs.join(','))
    data.append('body', form.body)

    data.append('existingHeroImage', existingImages.heroImage)
    data.append('existingCard1Image', existingImages.card1Image)
    data.append('existingCard2Image', existingImages.card2Image)
    data.append('existingCard3Image', existingImages.card3Image)

    if (form.heroImage) data.append('heroImage', form.heroImage)
    if (form.card1Image) data.append('card1Image', form.card1Image)
    if (form.card2Image) data.append('card2Image', form.card2Image)
    if (form.card3Image) data.append('card3Image', form.card3Image)

    try {
      const res = await fetch('/api/publications', {
        method: 'POST',
        body: data,
      })

      if (res.ok) {
        setStatus('saved')
        setMessage(`Publication "${slug}" (${form.lang}) saved successfully!`)
      } else {
        const err = await res.text()
        setStatus('error')
        setMessage(err || 'Failed to save publication.')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Is the dev server running?')
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 bg-white focus:border-navy outline-none transition-all duration-200'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2'

  const allPublications = [...getPublications('fr'), ...getPublications('en')]
  const existingPublications = getPublications(form.lang).filter((p) => p.slug !== form.slug)
  const isEditing = !!selectedSlug

  return (
    <div className="min-h-screen bg-gray-50 py-12" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-3xl font-bold text-black mb-2">Publication Editor</h1>
        <p className="text-gray-500 mb-8">
          {isEditing ? `Editing: ${form.headline || selectedSlug} (${form.lang.toUpperCase()})` : 'Create a new strategic publication.'}
        </p>

        {/* Language + Article selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className={labelClass}>Language</label>
            <select
              value={selectedLang}
              onChange={(e) => {
                const lang = e.target.value as Locale
                setSelectedLang(lang)
                loadPublication(lang, '')
              }}
              className={inputClass}
            >
              <option value="fr">French (FR)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Select Article</label>
            <select
              value={selectedSlug}
              onChange={(e) => loadPublication(selectedLang, e.target.value)}
              className={inputClass}
            >
              <option value="">+ Create new article</option>
              {getPublications(selectedLang).map((pub) => (
                <option key={pub.slug} value={pub.slug}>
                  {pub.headline || pub.slug} ({pub.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        {status === 'saved' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-sm">
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic info */}
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Basic Info</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Headline *</label>
                <input
                  type="text"
                  value={form.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  onBlur={(e) => {
                    if (!form.slug) setForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
                  }}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className={inputClass}
                  placeholder="auto-generated from headline"
                />
              </div>
              <div>
                <label className={labelClass}>Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Subheadline *</label>
                <input
                  type="text"
                  value={form.subheadline}
                  onChange={(e) => handleChange('subheadline', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>SEO Keywords</label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={(e) => handleChange('keywords', e.target.value)}
                  className={inputClass}
                  placeholder="stratégie IA, transformation digitale, PME"
                />
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Hero Image (16:9)</h2>
            {existingImages.heroImage && !form.heroImage && (
              <p className="text-sm text-gray-500 mb-2">
                Current: <span className="font-mono text-navy">{existingImages.heroImage}</span>
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('heroImage', e.target.files?.[0] || null)}
              className="w-full"
            />
            {form.heroImage && (
              <p className="mt-2 text-sm text-green-600">New: {form.heroImage.name}</p>
            )}
          </div>

          {/* Summary cards */}
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Summary Cards</h2>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => {
                const existingImg = existingImages[`card${i}Image` as keyof typeof existingImages]
                return (
                  <div key={i} className="border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Card {i}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          type="text"
                          value={form[`card${i}Title` as keyof typeof form] as string}
                          onChange={(e) => handleChange(`card${i}Title`, e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Optional Image (16:9)</label>
                        {existingImg && !(form[`card${i}Image` as keyof typeof form] as File | null) && (
                          <p className="text-sm text-gray-500 mb-1">
                            Current: <span className="font-mono text-navy">{existingImg}</span>
                          </p>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileChange(`card${i}Image`, e.target.files?.[0] || null)
                          }
                          className="w-full"
                        />
                        {(form[`card${i}Image` as keyof typeof form] as File | null) && (
                          <p className="mt-1 text-sm text-green-600">
                            New: {(form[`card${i}Image` as keyof typeof form] as File).name}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Body</label>
                        <textarea
                          value={form[`card${i}Body` as keyof typeof form] as string}
                          onChange={(e) => handleChange(`card${i}Body`, e.target.value)}
                          className={`${inputClass} resize-none`}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Link URL (optional)</label>
                        <input
                          type="text"
                          value={form[`card${i}Link` as keyof typeof form] as string}
                          onChange={(e) => handleChange(`card${i}Link`, e.target.value)}
                          className={inputClass}
                          placeholder="/fr/contact/"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Link Label (optional)</label>
                        <input
                          type="text"
                          value={form[`card${i}LinkLabel` as keyof typeof form] as string}
                          onChange={(e) => handleChange(`card${i}LinkLabel`, e.target.value)}
                          className={inputClass}
                          placeholder="En savoir plus"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Optional CTA text button */}
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Optional Text CTA</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Button Text</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  className={inputClass}
                  placeholder="En savoir plus"
                />
              </div>
              <div>
                <label className={labelClass}>Link URL</label>
                <input
                  type="text"
                  value={form.ctaLink}
                  onChange={(e) => handleChange('ctaLink', e.target.value)}
                  className={inputClass}
                  placeholder="/fr/contact/"
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Bottom CTA Button</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Link URL</label>
                <input
                  type="text"
                  value={form.link}
                  onChange={(e) => handleChange('link', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Link Label</label>
                <input
                  type="text"
                  value={form.linkLabel}
                  onChange={(e) => handleChange('linkLabel', e.target.value)}
                  className={inputClass}
                  placeholder="Discutons de votre stratégie"
                />
              </div>
            </div>
          </div>

          {/* Related articles */}
          {existingPublications.length > 0 && (
<div className="bg-white p-8 border border-gray-200" suppressHydrationWarning={true}>
              <h2 className="text-xl font-bold text-black mb-2">Related Articles</h2>
              <p className="text-sm text-gray-500 mb-6">Select up to 2 articles to show in the &quot;Lire aussi&quot; section.</p>
              <div className="space-y-2">
                {existingPublications.map((pub) => (
                  <label
                    key={pub.slug}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                      form.relatedSlugs.includes(pub.slug)
                        ? 'border-navy bg-navy/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.relatedSlugs.includes(pub.slug)}
                      onChange={() => toggleRelatedSlug(pub.slug)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-sm text-black">{pub.headline}</p>
                      <p className="text-xs text-gray-500">{pub.category} — {pub.date}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Body */}
          <div className="bg-white p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">Article Body (Markdown)</h2>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="text-sm text-navy hover:underline"
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {preview ? (
              <div className="prose prose-lg max-w-none border border-gray-100 p-6 bg-gray-50">
                <div dangerouslySetInnerHTML={{ __html: form.body.replace(/\n/g, '<br>') }} />
              </div>
            ) : (
              <textarea
                value={form.body}
                onChange={(e) => handleChange('body', e.target.value)}
                className={`${inputClass} font-mono text-sm`}
                rows={20}
                placeholder="# Titre principal\n\nVotre texte ici. **Gras**, *italique*.\n\n- Liste à puces\n- Deuxième item"
              />
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="px-8 py-4 text-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
            >
              {status === 'saving' ? 'Saving...' : isEditing ? 'Update Publication' : 'Save Publication'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => loadPublication(form.lang, '')}
                className="px-8 py-4 text-lg text-black border border-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Cancel / New
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-8 py-4 text-lg text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                Supprimer
              </button>
            )}
          </div>
        </form>

        {/* Delete confirmation modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 max-w-md">
              <h3 className="text-xl font-bold text-black mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Cette action supprimera l&apos;article &quot;{form.headline || form.slug}&quot; en FR et EN, ainsi que toutes ses images. Cette action est irr&apos;versible.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    setShowDeleteModal(false)
                    setStatus('saving')
                    try {
                      const res = await fetch(`/api/publications?slug=${form.slug}&lang=${form.lang}`, { method: 'DELETE' })
                      if (res.ok) {
                        setStatus('idle')
                        setMessage(`Publication "${form.slug}" deleted from FR and EN.`)
                        setSelectedSlug('')
                        setForm({ ...EMPTY_FORM, lang: form.lang })
                      } else {
                        const err = await res.text()
                        setStatus('error')
                        setMessage(err || 'Failed to delete.')
                      }
                    } catch {
                      setStatus('error')
                      setMessage('Network error.')
                    }
                  }}
                  className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
