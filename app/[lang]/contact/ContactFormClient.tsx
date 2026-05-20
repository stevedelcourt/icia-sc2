'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { StaggerBlock } from '@/components/Animations'
import { useT, LocalizedLink, useLocale } from '@/lib/i18n'

const OpenFreeMap = dynamic(() => import('@/components/OpenFreeMap').then(m => m.OpenFreeMap), { ssr: false })

const HUBSPOT_PORTAL = '49558612'
const HUBSPOT_FORM = '18f9d9bd-e18f-42cb-84e9-1a342fb6416b'

export function ContactFormClient() {
  const t = useT()
  const lang = useLocale()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setMounted(true)
    const el = mapRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShowMap(true); obs.disconnect() } }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const adhesion = searchParams.get('adhesion') || ''
  const niveau = searchParams.get('niveau') || ''
  const donationAmount = searchParams.get('donation') || ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    let message = String(formData.get('message') || '')
    if (adhesion) message = `[Adhésion: ${adhesion} (Niveau ${niveau})]\n${message}`
    if (donationAmount) message = `[Don: ${donationAmount} €]\n${message}`

    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL}/${HUBSPOT_FORM}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: String(formData.get('firstname') || '') },
            { name: 'lastname', value: String(formData.get('lastname') || '') },
            { name: 'email', value: String(formData.get('email') || '') },
            { name: 'phone', value: String(formData.get('phone') || '') },
            { name: 'company', value: String(formData.get('company') || '') },
            { name: 'message', value: message },
            { name: 'donation', value: donationAmount },
          ],
          context: { pageUri: `https://iciafrance.com/${lang}/contact/`, pageName: adhesion ? 'Adhesion' : donationAmount ? 'Donation' : 'Contact' },
        }),
      })
      setSubmitStatus(response.ok ? 'success' : 'error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', border: '1px solid var(--border-light)',
    backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
    fontSize: '16px', fontFamily: 'Inter, sans-serif', outline: 'none',
    borderRadius: '8px',
  }

  const adhesionNote = adhesion ? ` — ${adhesion} (Niv. ${niveau})` : ''
  const donationNote = donationAmount ? ` — Don de ${donationAmount} €` : ''

  if (submitStatus === 'success') {
    return (
      <main className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))', minHeight: '60vh' }}>
        <div className="container-mentivis">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{ width: '48px', height: '48px', margin: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--text-primary)', border: '2px solid var(--border-light)' }}>
            ✓
          </motion.div>
          <h2 className="t-display text-primary" style={{ marginBottom: '16px' }}>{t('contact_form.success')}</h2>
          <LocalizedLink href="/" className="btn-pill btn-black" style={{ marginTop: '24px' }}>
            Retour à l'accueil
            <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </LocalizedLink>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: 'calc(64px + var(--section-gap))', paddingBottom: '0' }}>
        <div className="container-mentivis">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div className="contact-form-col">
              <StaggerBlock delay={0}>
                <p className="eyebrow">{t('contact.label')}{adhesionNote}{donationNote}</p>
                <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>{t('contact.title')}</h1>
                <p className="t-lead" style={{ marginBottom: '40px' }}>{t('contact.body')}</p>

                <form onSubmit={handleSubmit}>
                  <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label htmlFor="firstname" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Prénom</label>
                      <input type="text" id="firstname" name="firstname" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="lastname" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Nom</label>
                      <input type="text" id="lastname" name="lastname" style={inputStyle} />
                    </div>
                  </div>
                  <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label htmlFor="email" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>{t('contact_form.email')} *</label>
                      <input type="email" id="email" name="email" required style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Téléphone</label>
                      <input type="tel" id="phone" name="phone" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="company" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>{t('contact_form.organisation')}</label>
                    <input type="text" id="company" name="company" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="message" className="t-caption" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>{t('contact_form.message')} *</label>
                    <textarea id="message" name="message" rows={5} required style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-pill btn-black" style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '16px' }}>
                    {isSubmitting ? 'Envoi...' : t('contact_form.send')}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>

                  {submitStatus === 'error' && (
                    <p style={{ color: '#D92A1C', textAlign: 'left', marginTop: '16px', fontSize: '14px' }}>{t('contact_form.error')}</p>
                  )}
                </form>
              </StaggerBlock>
            </div>

            <div className="contact-map-col" style={{ paddingTop: '4px' }}>
              <h2 className="t-title text-primary" style={{ marginBottom: '16px' }}>Nous trouver</h2>
              <p className="t-caption" style={{ marginBottom: '24px' }}>
                <a href="https://maps.app.goo.gl/nw2Ugmzh1av1gfku8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Campus Cyber.IA Euromed<br />4 boulevard Jacques Saadé<br />13002 Marseille
                </a>
              </p>
              <div ref={mapRef} style={{ width: '100%', aspectRatio: '1/1', border: '1px solid var(--border-light)', overflow: 'hidden', background: '#f5f5f5' }}>
                  {mounted && showMap ? <OpenFreeMap /> : null}
                </div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 768px) {
              .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
              .contact-map-col { order: 2 !important; }
              .contact-form-col { order: 1 !important; }
            }
            @media (max-width: 480px) {
              .contact-form-row { grid-template-columns: 1fr !important; }
            }
          ` }} />
        </div>
      </section>
    </main>
  )
}
