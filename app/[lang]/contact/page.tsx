'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StaggerBlock } from '@/components/Animations'
import { useT, LocalizedLink } from '@/lib/i18n'

const OpenFreeMap = dynamic(() => import('@/components/OpenFreeMap').then(mod => ({ default: mod.OpenFreeMap })), { ssr: false })

export default function ContactPage() {
  const t = useT()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/49558612/9181c8cf-5f81-4459-af6b-81c8c3e69f91', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: String(formData.get('firstname') || '') },
            { name: 'lastname', value: String(formData.get('lastname') || '') },
            { name: 'email', value: String(formData.get('email') || '') },
            { name: 'company', value: String(formData.get('organisation') || '') },
            { name: 'message', value: String(formData.get('message') || '') },
          ],
          context: { pageUri: 'https://iciafrance.com/contact', pageName: 'Contact' }
        })
      })
      setSubmitStatus(response.ok ? 'success' : 'error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://www.iciafrance.com/contact',
    name: 'Contact  -  ICIA',
    description: 'Contactez l\'Institut Collectif de l\'IA.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.iciafrance.com/#organization',
      name: 'Institut Collectif de l\'IA',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'public contact',
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

  if (submitStatus === 'success') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))', minHeight: '60vh' }}>
          <div className="container-mentivis" style={{ maxWidth: '600px' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-light)',
              }}
            >
              ✓
            </motion.div>
            <h2 className="t-display text-primary" style={{ marginBottom: '16px' }}>{t('contact_form.success')}</h2>
            <LocalizedLink href="/" className="btn-pill btn-black" style={{ marginTop: '24px' }}>
              Retour à l&rsquo;accueil
              <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </LocalizedLink>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis" style={{ maxWidth: '600px' }}>
          <StaggerBlock delay={0}>
            <p className="t-micro" style={{ textTransform: 'uppercase', letterSpacing: '0.14px', marginBottom: '16px' }}>
              {t('contact.label')}
            </p>
            <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
              {t('contact.title')}
            </h1>
            <p className="t-lead" style={{ marginBottom: '40px' }}>
              {t('contact.body')}
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label htmlFor="firstname" className="t-caption text-secondary" style={{ display: 'block', marginBottom: '6px' }}>Prénom</label>
                  <input
                    type="text" id="firstname" name="firstname" required
                    style={{
                      width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                      fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="t-caption text-secondary" style={{ display: 'block', marginBottom: '6px' }}>Nom</label>
                  <input
                    type="text" id="lastname" name="lastname" required
                    style={{
                      width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                      fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="email" className="t-caption text-secondary" style={{ display: 'block', marginBottom: '6px' }}>{t('contact_form.email')}</label>
                <input
                  type="email" id="email" name="email" required
                  style={{
                    width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                    fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="organisation" className="t-caption text-secondary" style={{ display: 'block', marginBottom: '6px' }}>{t('contact_form.organisation')}</label>
                <input
                  type="text" id="organisation" name="organisation"
                  style={{
                    width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                    fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="message" className="t-caption text-secondary" style={{ display: 'block', marginBottom: '6px' }}>{t('contact_form.message')}</label>
                <textarea
                  id="message" name="message" rows={5}
                  style={{
                    width: '100%', padding: '12px 16px', border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                    fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-pill btn-black" style={{ width: '100%', justifyContent: 'center' }}>
                {isSubmitting ? 'Envoi...' : t('contact_form.send')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {submitStatus === 'error' && (
                <p style={{ color: '#D92A1C', textAlign: 'center', marginTop: '16px' }}>
                  {t('contact_form.error')}
                </p>
              )}
              </form>

            <div style={{ marginTop: '64px' }}>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>
                Nous trouver
              </h2>
              <p className="t-caption" style={{ marginBottom: '24px' }}>
                Campus Cyber.IA Euromed, 4 boulevard Jacques Saadé, 13002 Marseille
              </p>
              <div style={{ width: '100%', aspectRatio: '1/1', border: '1px solid var(--border-light)', borderRadius: 'var(--r-card)', overflow: 'hidden', maxHeight: '500px' }}>
                <OpenFreeMap />
              </div>
            </div>
          </StaggerBlock>
        </div>
      </main>
      <Footer />
    </>
  )
}
