'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock, AnimatedDivider } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

const OpenFreeMap = dynamic(() => import('@/components/OpenFreeMap').then(mod => ({ default: mod.OpenFreeMap })), { ssr: false })

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
        streetAddress: '4 boulevard Jacques Saadé',
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
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pt-section pb-section-sm bg-secondary">
          <div className="max-w-2xl mx-auto" style={{ paddingLeft: 'var(--grid-margin)', paddingRight: 'var(--grid-margin)' }}>
          {submitStatus === 'success' ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-16 h-16 mx-auto mb-6 border-2 border-border flex items-center justify-center text-2xl text-primary"
              >
                ✓
              </motion.div>
              <StaggerBlock delay={0.15}>
                <h2 className="t-display text-primary mb-4">{t('contact.success.title')}</h2>
              </StaggerBlock>
              <StaggerBlock delay={0.3}>
                <p className="text-secondary mb-8">
                  {t('contact.success.body')}
                </p>
              </StaggerBlock>
              <StaggerBlock delay={0.4}>
                <LocalizedLink href="/" className="text-base text-primary hover:underline transition-colors duration-200">
                  {t('contact.success.retour')}
                </LocalizedLink>
              </StaggerBlock>
            </div>
          ) : (
            <StaggerBlock delay={0}>
              <p className="t-caption uppercase tracking-widest mb-4">{t('contact.label')}</p>
              <h1 className="t-display text-primary mb-4">
                {t('contact.title')}
              </h1>
              <p className="t-lead text-secondary mb-10">
                {t('contact.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="firstname" className="block text-sm text-secondary mb-2 transition-colors duration-200 group-focus-within:text-primary">{t('contact.form.prenom')}</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      required
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-primary focus:border-primary outline-none ring-0 focus:ring-0 transition-all duration-200"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastname" className="block text-sm text-secondary mb-2 transition-colors duration-200 group-focus-within:text-primary">{t('contact.form.nom')}</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      required
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-primary focus:border-primary outline-none ring-0 focus:ring-0 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm text-secondary mb-2 transition-colors duration-200 group-focus-within:text-primary">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-primary focus:border-primary outline-none ring-0 focus:ring-0 transition-all duration-200"
                  />
                </div>

                <div className="group">
                  <label htmlFor="organisation" className="block text-sm text-secondary mb-2 transition-colors duration-200 group-focus-within:text-primary">{t('contact.form.organisation')}</label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-primary focus:border-primary outline-none ring-0 focus:ring-0 transition-all duration-200"
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm text-secondary mb-2 transition-colors duration-200 group-focus-within:text-primary">{t('contact.form.message')} <span className="text-tertiary">{t('contact.form.message_optional')}</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-primary focus:border-primary outline-none ring-0 focus:ring-0 transition-all duration-200 resize-none"
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
                  <label htmlFor="consent" className="text-sm text-secondary">
                    {t('contact.form.consent')}
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                  arrow={false}
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">
                    {errorMessage || t('contact.error.default')}
                  </p>
                )}
              </form>

              <div className="mt-16 pt-12 border-t border-border">
                <img src="/MariusIA-logo.svg" alt="Marius IA" className="h-16 w-auto mb-2" width="200" height="56" />
                <p className="text-base text-secondary mb-2">{t('contact.phone')}</p>
                <LocalizedLink href="/contact" className="text-base text-secondary hover:text-primary transition-colors duration-200 block mb-4">
                  {t('contact.email.local')}&#x40;{t('contact.email.domain')}
                </LocalizedLink>
                <p className="text-sm font-bold text-primary">{t('contact.adresse.title')}</p>
                <p className="text-sm text-secondary">{t('contact.adresse.ligne')}</p>
                <a
                  href="https://maps.app.goo.gl/nw2Ugmzh1av1gfku8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-block mt-1"
                >
                  {t('contact.adresse.google_maps')}
                </a>
              </div>

              <AnimatedDivider className="mt-16 pt-12 border-t border-border" />
              <div className="w-full aspect-square border border-border overflow-hidden">
                <OpenFreeMap />
              </div>
              
            </StaggerBlock>
          )}
        </div>
      </main>
      </div>
      <Footer />
    </>
  )
}
