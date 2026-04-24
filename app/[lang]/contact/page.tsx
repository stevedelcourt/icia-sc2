'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'

export default function ContactPage() {
  const t = useT()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    organisation: '',
    message: '',
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/49558612/9181c8cf-5f81-4459-af6b-81c8c3e69f91', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formData.firstname },
            { name: 'lastname', value: formData.lastname },
            { name: 'email', value: formData.email },
            { name: 'company', value: formData.organisation },
            { name: 'message', value: formData.message },
          ],
          context: {
            pageUri: 'https://mariusia.com/contact',
            pageName: 'Contact'
          }
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        console.error('HubSpot error:', response.status)
        setErrorMessage(t('contact.error.default'))
        setSubmitStatus('error')
      }
    } catch (err) {
      console.error('HubSpot exception:', err)
      setErrorMessage(t('contact.error.default'))
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://www.mariusia.com/contact',
    name: 'Contact - Marius IA',
    description: 'Contactez Marius IA pour vos projets de conseil en stratégie IA, conformité AI Act et transformation.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33-4-91-00-00-00',
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
        areaServed: ['FR', 'Europe']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 Bd Euroméditerranée, Quai d\'Arenc',
        addressLocality: 'Marseille',
        postalCode: '13002',
        addressCountry: 'FR'
      }
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-2xl mx-auto px-8">
          {submitStatus === 'success' ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-16 h-16 mx-auto mb-6 border-2 border-[#00255D] flex items-center justify-center text-2xl text-[#00255D]"
              >
                ✓
              </motion.div>
              <StaggerBlock delay={0.15}>
                <h2 className="text-3xl text-black mb-4">{t('contact.success.title')}</h2>
              </StaggerBlock>
              <StaggerBlock delay={0.3}>
                <p className="text-gray-500 mb-8">
                  {t('contact.success.body')}
                </p>
              </StaggerBlock>
              <StaggerBlock delay={0.4}>
                <LocalizedLink href="/" className="text-base text-black hover:underline transition-colors duration-200">
                  {t('contact.success.retour')}
                </LocalizedLink>
              </StaggerBlock>
            </div>
          ) : (
            <StaggerBlock delay={0}>
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('contact.label')}</p>
              <h1 className="text-3xl md:text-4xl text-black mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-lg text-gray-500 mb-10">
                {t('contact.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="firstname" className="block text-sm text-gray-500 mb-2 transition-colors duration-200 group-focus-within:text-[#00255D]">{t('contact.form.prenom')}</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      required
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-[#00255D] outline-none ring-0 focus:ring-0 transition-all duration-200"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastname" className="block text-sm text-gray-500 mb-2 transition-colors duration-200 group-focus-within:text-[#00255D]">{t('contact.form.nom')}</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      required
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-[#00255D] outline-none ring-0 focus:ring-0 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm text-gray-500 mb-2 transition-colors duration-200 group-focus-within:text-[#00255D]">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-[#00255D] outline-none ring-0 focus:ring-0 transition-all duration-200"
                  />
                </div>

                <div className="group">
                  <label htmlFor="organisation" className="block text-sm text-gray-500 mb-2 transition-colors duration-200 group-focus-within:text-[#00255D]">{t('contact.form.organisation')}</label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-[#00255D] outline-none ring-0 focus:ring-0 transition-all duration-200"
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm text-gray-500 mb-2 transition-colors duration-200 group-focus-within:text-[#00255D]">{t('contact.form.message')} <span className="text-gray-400">{t('contact.form.message_optional')}</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-[#00255D] outline-none ring-0 focus:ring-0 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-500">
                    {t('contact.form.consent')}
                  </label>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 text-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                </motion.div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">
                    {errorMessage || t('contact.error.default')}
                  </p>
                )}
              </form>

              <div className="mt-16 pt-12 border-t border-gray-200">
                <img src="/MariusIA-logo.svg" alt="Marius IA" className="h-16 w-auto mb-6" />
                <p className="text-base text-gray-600 mb-2">{t('contact.phone')}</p>
                <LocalizedLink href="/contact" className="text-base text-gray-600 hover:text-black transition-colors duration-200 block mb-4">
                  {t('contact.email.local')}&#x40;{t('contact.email.domain')}
                </LocalizedLink>
                <p className="text-sm font-bold text-gray-800">{t('contact.adresse.title')}</p>
                <p className="text-sm text-gray-500">{t('contact.adresse.ligne')}</p>
              </div>

              <AnimatedDivider className="mt-16 pt-12 border-t border-gray-200" />
              <div className="w-full h-[300px] border border-gray-200 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="yes"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=5.360486%2C43.308887%2C5.370486%2C43.318887&amp;layer=transportmap&amp;marker=43.313887%2C5.365486"
                  style={{ border: 0 }}
                  title={t('contact.adresse.title')}
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                <a
                  href="https://www.openstreetmap.org/directions?from=&to=43.3139%2C5.3655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {t('contact.adresse.itineraire')}
                </a>
                {' • '}
                <a
                  href="https://campuscyber.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {t('contact.adresse.site')}
                </a>
              </p>
            </StaggerBlock>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
