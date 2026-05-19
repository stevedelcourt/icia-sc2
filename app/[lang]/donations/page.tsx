'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

const PRESETS = [10, 30, 50, 100] as const
const HUBSPOT_PORTAL = '49558612'
const HUBSPOT_FORM = '18f9d9bd-e18f-42cb-84e9-1a342fb6416b'

export default function DonationsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState<string>('')
  const finalAmount = custom ? parseInt(custom) || 0 : amount
  const afterTax = Math.round(finalAmount * 0.34)

  // Slide-out form state
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState({ firstname: '', lastname: '', email: '', company: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleDonate = () => { if (finalAmount > 0) setShowForm(true) }
  const handleCancel = () => { setShowForm(false); setSent(false) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValues.email) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL}/${HUBSPOT_FORM}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formValues.firstname },
            { name: 'lastname', value: formValues.lastname },
            { name: 'email', value: formValues.email },
            { name: 'phone', value: formValues.phone },
            { name: 'company', value: formValues.company },
            { name: 'message', value: `[Don: ${finalAmount} €]` },
            { name: 'donation', value: String(finalAmount) },
          ],
          context: { pageUri: `https://iciafrance.com/${lang}/donations/`, pageName: 'Donation' },
        }),
      })
      if (res.ok) { setSent(true) }
    } catch {}
    setIsSubmitting(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid #e5e5e5', borderRadius: '8px',
    fontSize: '15px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ background: '#ffffff', padding: 'clamp(20px, 3vw, 40px) 0 clamp(20px, 3vw, 40px)' }}>
          <div className="container-mentivis">
            <div className="don-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div>
                <FadeIn>
                  <p className="eyebrow">ICIA</p>
                  <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
                    {lang === 'fr' ? 'Faire un don' : 'Make a donation'}
                  </h1>
                  <p className="t-lead" style={{ marginBottom: '8px' }}>
                    {lang === 'fr'
                      ? 'Votre don est déductible à 66 % dans la limite de 20 % de votre revenu imposable. Un reçu fiscal vous sera adressé.'
                      : 'Your donation is 66% tax-deductible, up to 20% of your taxable income. A tax receipt will be sent.'}
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <img src="/images/pricing-blocks-animated.svg" alt="" style={{ width: '100%', height: 'auto' }} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Amount + Form — 2/3 | 1/3 */}
        <section style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }} className="don-grid">
              {/* Left: amount picker */}
              <div>
                <FadeIn>
                  <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                    {lang === 'fr' ? 'Montant du don' : 'Donation amount'}
                  </h2>

                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    {PRESETS.map((v) => (
                      <button key={v} onClick={() => { setAmount(v); setCustom('') }} className="amount-btn" style={{
                        padding: '22px 12px', borderRadius: '14px', cursor: 'pointer',
                        border: (!custom && amount === v) ? '2px solid #000' : '2px solid #e5e5e5',
                        background: (!custom && amount === v) ? '#000' : '#fff',
                        color: (!custom && amount === v) ? '#fff' : '#000',
                        fontFamily: 'inherit', fontSize: '14px', transition: 'all 0.3s ease',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      }}
                      onMouseEnter={e => {
                        if (!custom && amount === v) return
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f97316 0%, #d946ef 100%)'
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = 'transparent'
                      }}
                      onMouseLeave={e => {
                        if (!custom && amount === v) return
                        e.currentTarget.style.background = '#fff'
                        e.currentTarget.style.color = '#000'
                        e.currentTarget.style.borderColor = '#e5e5e5'
                      }}
                      >
                        <span style={{ fontSize: '20px', fontWeight: 500 }}>{v} €</span>
                        <span style={{ fontSize: '11px', opacity: 0.5 }}>{Math.round(v * 0.34)} € après impôt</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="number" value={custom} onChange={e => { setCustom(e.target.value); if (e.target.value) setAmount(0) }}
                      placeholder="Autre" min="5" style={{ ...inputStyle, width: '120px', fontSize: '18px' }} />
                    <span style={{ fontSize: '18px', color: '#4e4e4e' }}>€</span>
                    {custom && parseInt(custom) > 0 && (
                      <span style={{ fontSize: '13px', color: '#4e4e4e' }}>→ {Math.round(parseInt(custom) * 0.34)} € après impôt</span>
                    )}
                  </div>

                  <button onClick={handleDonate} className="btn-pill btn-black" style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '16px' }}>
                    {lang === 'fr' ? `Donner ${finalAmount} €${afterTax ? ` (${afterTax} € après impôt)` : ''}` : `Donate €${finalAmount}`}
                    <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
                    {lang === 'fr' ? '66 % déductible de vos impôts.' : '66% tax deductible.'}
                  </p>
                </FadeIn>
              </div>

              {/* Right: slide-out form panel (desktop) or in-page (mobile) */}
              <div style={{ paddingTop: '60px' }}>
                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: '#fff', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
                    >
                      {sent ? (
                        <div>
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', marginBottom: '16px' }}>✓</motion.div>
                          <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '8px' }}>
                            {lang === 'fr' ? 'Merci pour votre don !' : 'Thank you!'}
                          </h3>
                          <p style={{ fontSize: '14px', color: '#4e4e4e', marginBottom: '16px' }}>
                            {lang === 'fr' ? `Nous vous contacterons pour finaliser votre don de ${finalAmount} €.` : `We will contact you to finalize your donation of €${finalAmount}.`}
                          </p>
                          <button onClick={handleCancel} className="btn-pill btn-black">
                            {lang === 'fr' ? 'Fermer' : 'Close'}
                          </button>
                        </div>
                      ) : (
                        <>
                          <p style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                            {lang === 'fr' ? 'Votre don' : 'Your donation'}
                          </p>
                          <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '20px' }}>
                            {lang === 'fr' ? `Don de ${finalAmount} €` : `€${finalAmount} donation`}
                          </h3>
                          <form ref={formRef} onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                              <input placeholder={lang === 'fr' ? 'Prénom' : 'First name'} value={formValues.firstname} onChange={e => setFormValues({ ...formValues, firstname: e.target.value })} style={inputStyle} />
                              <input placeholder={lang === 'fr' ? 'Nom' : 'Last name'} value={formValues.lastname} onChange={e => setFormValues({ ...formValues, lastname: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                              <input type="email" placeholder="Email *" required value={formValues.email} onChange={e => setFormValues({ ...formValues, email: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                              <input placeholder={lang === 'fr' ? 'Organisation' : 'Organization'} value={formValues.company} onChange={e => setFormValues({ ...formValues, company: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <input type="tel" placeholder={lang === 'fr' ? 'Téléphone (optionnel)' : 'Phone (optional)'} value={formValues.phone} onChange={e => setFormValues({ ...formValues, phone: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button type="submit" disabled={isSubmitting} className="btn-pill btn-black" style={{ flex: 1, justifyContent: 'center' }}>
                                {isSubmitting ? '...' : lang === 'fr' ? 'Envoyer' : 'Send'}
                              </button>
                              <button type="button" onClick={handleCancel} style={{ padding: '12px 20px', border: '1px solid #e5e5e5', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>
                                {lang === 'fr' ? 'Annuler' : 'Cancel'}
                              </button>
                            </div>
                          </form>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Why give — larger cards */}
            <FadeIn>
              <div style={{ marginTop: '64px' }}>
                <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                  {lang === 'fr' ? 'Pourquoi donner ?' : 'Why give?'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {[
                    { t: lang === 'fr' ? 'Financez des formations' : 'Fund training', d: lang === 'fr' ? 'Programmes gratuits pour les publics éloignés de l\'IA.' : 'Free programs for communities far from AI.' },
                    { t: lang === 'fr' ? 'Créez des ressources' : 'Create resources', d: lang === 'fr' ? 'Guides et outils accessibles à tous.' : 'Guides and tools accessible to all.' },
                    { t: lang === 'fr' ? 'Réduisez les fractures' : 'Reduce divides', d: lang === 'fr' ? 'Limitez les écarts d\'accès aux compétences IA.' : 'Limit gaps in AI skills access.' },
                    { t: lang === 'fr' ? 'Déduisez à 66 %' : 'Deduct at 66%', d: lang === 'fr' ? 'Un don de 100 € vous coûte 34 €.' : 'A €100 donation costs you €34.' },
                  ].map(item => (
                    <div key={item.t} style={{ background: '#fff', borderRadius: '22px', padding: 'clamp(28px, 3vw, 36px) clamp(24px, 3vw, 32px)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px', transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>{item.t}</h3>
                      <p style={{ fontSize: '14px', color: '#4e4e4e', lineHeight: 1.5, margin: 0 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .don-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .don-grid { grid-template-columns: 1fr !important; }
        }
      ` }} />
      <Footer />
    </>
  )
}
