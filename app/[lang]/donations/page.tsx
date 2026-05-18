'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

const PRESETS = [10, 30, 50, 100] as const

export default function DonationsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const finalAmount = custom ? parseInt(custom) || 0 : amount
  const afterTax = Math.round(finalAmount * 0.34)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || finalAmount <= 0) return
    setIsSubmitting(true)
    try {
      await fetch('https://api.hsforms.com/submissions/v3/integration/submit/49558612/9181c8cf-5f81-4459-af6b-81c8c3e69f91', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: name },
            { name: 'email', value: email },
            { name: 'donation_amount', value: finalAmount.toString() },
          ],
          context: { pageUri: 'https://iciafrance.com/donations', pageName: 'Donation' }
        })
      })
    } catch {}
    setIsSubmitting(false)
    setSent(true)
  }

  // ──────────── Render ────────────
  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>

        {/* ── 1. Hero ── */}
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <p className="eyebrow">ICIA</p>
              <h1 className="t-display text-primary" style={{ marginBottom: '24px' }}>
                {lang === 'fr' ? 'Faire un don' : 'Make a donation'}
              </h1>
              <p className="t-lead" style={{ marginBottom: '24px' }}>
                {lang === 'fr'
                  ? "Soutenir l'ICIA, c'est contribuer à une mission d'intérêt général : rendre les compétences en intelligence artificielle accessibles au plus grand nombre, réduire les fractures numériques et favoriser un débat public informé."
                  : 'Supporting ICIA means contributing to a public interest mission: making AI skills accessible to all, reducing digital divides and fostering informed public debate.'}
              </p>
              {/* Tax deduction highlight */}
              <div style={{
                background: '#f5f3f1', borderRadius: '16px', padding: '20px 24px',
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', marginBottom: '4px' }}>
                    {lang === 'fr' ? '66 % de déduction fiscale' : '66% tax deduction'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#4e4e4e', lineHeight: 1.5, margin: 0 }}>
                    {lang === 'fr'
                      ? "Votre don est déductible de vos impôts à hauteur de 66 %, dans la limite de 20 % de votre revenu imposable. Un don de 50 € ne vous coûte que 17 € après réduction."
                      : 'Your donation is 66% tax-deductible, up to 20% of your taxable income. A €50 donation costs you only €17 after deduction.'}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 2. Amount selection ── */}
        <section style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: '640px' }}>
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: 'clamp(32px, 5vw, 48px) clamp(28px, 5vw, 40px)', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}>
              <FadeIn>
                <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                  {lang === 'fr' ? 'Montant du don' : 'Donation amount'}
                </h2>
              </FadeIn>

              {/* Preset amounts */}
              <FadeIn delay={0.1}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
                  {PRESETS.map((v) => {
                    const isActive = !custom && amount === v
                    return (
                      <button
                        key={v}
                        onClick={() => { setAmount(v); setCustom('') }}
                        style={{
                          padding: '14px 8px', borderRadius: '12px', cursor: 'pointer',
                          border: isActive ? '2px solid #000' : '2px solid #e5e5e5',
                          background: isActive ? '#000' : '#fff',
                          color: isActive ? '#fff' : '#000',
                          fontFamily: 'inherit', fontSize: '14px',
                          transition: 'all 0.2s ease',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                        }}
                      >
                        <span style={{ fontSize: '20px', fontWeight: 500 }}>{v} €</span>
                        <span style={{ fontSize: '11px', opacity: isActive ? 0.7 : 0.5 }}>
                          {Math.round(v * 0.34)} € après impôt
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Custom amount */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ fontSize: '13px', color: '#4e4e4e', marginBottom: '6px', display: 'block' }}>
                    {lang === 'fr' ? 'Autre montant' : 'Custom amount'}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="number"
                      value={custom}
                      onChange={e => { setCustom(e.target.value); if (e.target.value) setAmount(0) }}
                      placeholder="50"
                      min="5"
                      style={{
                        width: '120px', padding: '12px 16px', border: custom ? '2px solid #000' : '2px solid #e5e5e5',
                        borderRadius: '12px', fontSize: '18px', fontFamily: 'inherit', outline: 'none',
                      }}
                    />
                    <span style={{ fontSize: '18px', color: '#4e4e4e' }}>€</span>
                    {custom && parseInt(custom) > 0 && (
                      <span style={{ fontSize: '13px', color: '#4e4e4e' }}>
                        → {Math.round(parseInt(custom) * 0.34)} € après impôt
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Donor info */}
              <FadeIn delay={0.15}>
                <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000', marginBottom: '16px' }}>
                  {lang === 'fr' ? 'Mes coordonnées' : 'My contact details'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <input
                      type="text" value={name} onChange={e => setName(e.target.value)}
                      required
                      placeholder={lang === 'fr' ? 'Nom et prénom' : 'Full name'}
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', fontFamily: 'inherit', outline: 'none' }}
                    />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>

                  <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '16px', lineHeight: 1.5 }}>
                    {lang === 'fr'
                      ? 'Ces informations sont nécessaires pour traiter votre don et vous adresser votre reçu fiscal. Conformément au RGPD, vous disposez de droits d\'accès et de rectification sur vos données.'
                      : 'This information is required to process your donation and send your tax receipt. In accordance with GDPR, you have the right to access and rectify your data.'}
                  </p>

                  {!sent ? (
                    <button type="submit" disabled={isSubmitting || finalAmount <= 0}
                      className="btn-pill btn-black"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px 24px' }}
                    >
                      {isSubmitting
                        ? (lang === 'fr' ? 'Envoi...' : 'Sending...')
                        : `${lang === 'fr' ? 'Donner' : 'Donate'} ${finalAmount} €${afterTax ? ` (${afterTax} € après impôt)` : ''}`}
                      <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{
                      background: '#f5f3f1', borderRadius: '16px', padding: '24px',
                      textAlign: 'left', border: '1px solid rgba(0,0,0,0.06)',
                    }}>
                      <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                        {lang === 'fr' ? 'Merci pour votre soutien !' : 'Thank you for your support!'}
                      </p>
                      <p style={{ fontSize: '14px', color: '#4e4e4e', lineHeight: 1.5, margin: 0 }}>
                        {lang === 'fr'
                          ? `Nous avons bien reçu votre intention de don de ${finalAmount} €. Nous vous contacterons très prochainement pour finaliser votre contribution.`
                          : `We have received your donation intent of €${finalAmount}. We will contact you shortly to finalize your contribution.`}
                      </p>
                    </motion.div>
                  )}
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── 3. Why give ── */}
        <section style={{ background: '#ffffff', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: '720px' }}>
            <FadeIn>
              <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                {lang === 'fr' ? 'Pourquoi donner ?' : 'Why give?'}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
              {[
                { t: lang === 'fr' ? 'Financez des formations' : 'Fund training', d: lang === 'fr' ? 'Vos dons permettent de proposer des programmes de formation gratuits aux publics éloignés de l\'IA.' : 'Your donations help offer free training programs to communities far from AI.' },
                { t: lang === 'fr' ? 'Créez des ressources ouvertes' : 'Create open resources', d: lang === 'fr' ? 'Guides, outils et contenus pédagogiques accessibles à tous, sans condition.' : 'Guides, tools and educational content accessible to all, unconditionally.' },
                { t: lang === 'fr' ? 'Réduisez les fractures' : 'Reduce divides', d: lang === 'fr' ? 'Limitez les écarts d\'accès aux compétences IA entre les territoires et les générations.' : 'Limit gaps in AI skills access between territories and generations.' },
                { t: lang === 'fr' ? 'Déduisez à 66 %' : 'Deduct at 66%', d: lang === 'fr' ? 'Votre don est déductible de vos impôts. Un don de 100 € vous coûte 34 €.' : 'Your donation is tax-deductible. A €100 donation costs you €34.' },
              ].map(item => (
                <div key={item.t} style={{
                  background: '#f5f5f5', borderRadius: '16px', padding: '24px',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                   onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000', marginBottom: '6px' }}>{item.t}</h3>
                  <p style={{ fontSize: '13px', color: '#4e4e4e', lineHeight: 1.5, margin: 0 }}>{item.d}</p>
                </div>
              ))}
            </div>

            <FadeIn delay={0.1}>
              <div style={{
                background: '#f5f3f1', borderRadius: '16px', padding: '20px 24px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <p style={{ fontSize: '13px', color: '#4e4e4e', lineHeight: 1.5, margin: 0 }}>
                  {lang === 'fr'
                    ? "L'ICIA est une association loi 1901. Les dons ouvrent droit à une réduction d'impôt de 66 % dans la limite de 20 % de votre revenu imposable. Vous recevrez un reçu fiscal par email."
                    : 'ICIA is a French non-profit association. Donations are eligible for a 66% tax deduction within the limit of 20% of your taxable income. You will receive a tax receipt by email.'}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
