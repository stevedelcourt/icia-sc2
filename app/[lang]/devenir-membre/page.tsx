'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'

const TIERS = [
  { num: '01', name: 'Accès', range: '0 – 10 salariés', price: '600 – 800 € / an', desc: 'Accès au réseau ICIA et diffusion des ressources.', detail: 'Pour les startups, indépendants et petites structures.', features: ['Accès au réseau ICIA', 'Ressources et publications', 'Invitations aux événements publics', 'Lettre d\'information trimestrielle'] },
  { num: '02', name: 'Standard', range: '10 – 50 salariés', price: '1 500 – 2 000 € / an', desc: 'Accès aux événements, contenus et ressources pédagogiques.', detail: 'Pour les PME en croissance.', features: ['Tout le niveau Accès', 'Accès aux formations en ligne', 'Ressources pédagogiques dédiées', 'Mise en relation avec l\'écosystème', 'Participation aux événements réservés'] },
  { num: '03', name: 'Partenaire', range: '50 – 250 salariés', price: '2 500 – 5 000 € / an', desc: 'Participation active, visibilité et implication dans les actions.', detail: 'Pour les PME établies et ETI émergentes.', features: ['Tout le niveau Standard', 'Participation aux groupes de travail', 'Visibilité dans le réseau ICIA', 'Implication dans les programmes', 'Accès prioritaire aux projets pilotes'] },
  { num: '04', name: 'Mécénat', range: '250 salariés et +', price: '5 000 – 15 000 €+ / an', desc: 'Soutien stratégique, sponsoring et impact.', detail: 'Pour les grandes entreprises et institutions.', features: ['Tout le niveau Partenaire', 'Mécénat stratégique', 'Gouvernance et comité des partenaires', 'Co-construction de programmes', 'Visibilité institutionnelle dédiée'] },
]

const HUBSPOT_PORTAL = '49558612'
const HUBSPOT_FORM = '18f9d9bd-e18f-42cb-84e9-1a342fb6416b'

export default function DevenirMembrePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  const [selectedTier, setSelectedTier] = useState<typeof TIERS[0] | null>(null)
  const [formValues, setFormValues] = useState({ firstname: '', lastname: '', email: '', company: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleSelect = (tier: typeof TIERS[0]) => { setSelectedTier(tier); setSent(false); setFormValues({ firstname: '', lastname: '', email: '', company: '', phone: '' }) }
  const handleCancel = () => { setSelectedTier(null); setSent(false) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedTier || !formValues.email) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL}/${HUBSPOT_FORM}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formValues.firstname }, { name: 'lastname', value: formValues.lastname },
            { name: 'email', value: formValues.email }, { name: 'phone', value: formValues.phone },
            { name: 'company', value: formValues.company },
            { name: 'message', value: `[Adhésion: ${selectedTier.name} (Niveau ${selectedTier.num}) — ${selectedTier.price}]` },
          ],
          context: { pageUri: `https://iciafrance.com/${lang}/devenir-membre/`, pageName: 'Adhesion' },
        }),
      })
      if (res.ok) setSent(true)
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
        <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 100px) 0 clamp(40px, 6vw, 80px)' }}>
          <div className="container-mentivis">
            <div className="membre-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'stretch' }}>
              <div>
                <FadeIn>
                  <p className="eyebrow">ICIA</p>
                  <h1 className="t-display text-primary" style={{ marginBottom: '20px' }}>{lang === 'fr' ? 'Devenir membre' : 'Become a member'}</h1>
                  <p className="t-lead" style={{ marginBottom: '8px' }}>
                    {lang === 'fr' ? "Rejoignez le réseau de l'Institut Collectif de l'IA." : 'Join the Institut Collectif de l\'IA network.'}
                  </p>
                  <p className="t-caption" style={{ color: '#4e4e4e' }}>
                    {lang === 'fr' ? "Le montant dépend de votre effectif et du niveau d'engagement souhaité." : 'The amount depends on your workforce and engagement level.'}
                  </p>
                </FadeIn>
              </div>
              <div style={{ display: 'flex', opacity: 0 }} className="membre-hero-img">
                <div style={{ borderRadius: '22px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', flex: 1 }}>
                  <img src="/images/modules/organisations.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tiers + slide-out form */}
        <section style={{ background: '#f5f5f5', padding: 'var(--section-gap) 0' }}>
          <div className="container-mentivis">
            <div className="membre-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'stretch' }}>
              {/* Left: tier cards */}
              <div>
                <FadeIn>
                  <h2 className="t-title text-primary" style={{ marginBottom: '24px' }}>
                    {lang === 'fr' ? 'Niveaux d\'adhésion' : 'Membership levels'}
                  </h2>
                </FadeIn>
                {TIERS.map((tier, i) => (
                  <FadeIn key={tier.num} delay={i * 0.06}>
                    <div
                      onClick={() => handleSelect(tier)}
                      className="tier-card"
                      style={{
                        background: selectedTier?.num === tier.num ? '#000' : '#fff',
                        borderRadius: '16px', padding: '24px 28px', marginBottom: '10px',
                        cursor: 'pointer', transition: 'all 0.3s ease',
                        color: selectedTier?.num === tier.num ? '#fff' : 'inherit',
                        boxShadow: selectedTier?.num === tier.num ? '0 8px 32px rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.04) 0px 1px 2px',
                      }}
                      onMouseEnter={e => {
                        if (selectedTier?.num === tier.num || isMobile) return
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f97316 0%, #d946ef 100%)'
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={e => {
                        if (selectedTier?.num === tier.num || isMobile) return
                        e.currentTarget.style.background = '#fff'
                        e.currentTarget.style.color = '#000'
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5 }}>{tier.num}</span>
                            <span style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1.1 }}>{tier.name}</span>
                            <span style={{ fontSize: '12px', opacity: 0.5 }}>{tier.range}</span>
                          </div>
                          <p style={{ fontSize: '17px', fontWeight: 500, color: selectedTier?.num === tier.num ? 'inherit' : '#000', margin: '0 0 2px', whiteSpace: 'nowrap' }}>
                            {tier.price}
                          </p>
                          <p style={{ fontSize: '13px', opacity: 0.7, margin: 0 }}>
                            {tier.desc}
                          </p>
                        </div>
                        <span style={{ fontSize: '22px', opacity: selectedTier?.num === tier.num ? 1 : 0.3 }}>→</span>
                      </div>
                    </div>
                    {/* Mobile: form inline below clicked tier */}
                    {isMobile && selectedTier?.num === tier.num && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px 24px', marginBottom: '10px', overflow: 'hidden' }}
                      >
                        {sent ? (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', marginBottom: '10px' }}>✓</div>
                            <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{lang === 'fr' ? 'Demande envoyée !' : 'Request sent!'}</p>
                            <button onClick={handleCancel} className="btn-pill btn-black" style={{ marginTop: '8px' }}>{lang === 'fr' ? 'Fermer' : 'Close'}</button>
                          </div>
                        ) : (
                          <>
                            <p style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{lang === 'fr' ? 'Formulaire d\'adhésion' : 'Membership form'}</p>
                            <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '4px' }}>{selectedTier.name}</h3>
                            <p style={{ fontSize: '16px', fontWeight: 300, color: '#4e4e4e', marginBottom: '6px' }}>{selectedTier.price}</p>
                            <p style={{ fontSize: '13px', color: '#4e4e4e', marginBottom: '16px' }}>{selectedTier.detail}</p>
                            <form onSubmit={handleSubmit}>
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
                  </FadeIn>
                ))}
              </div>

              {/* Right: image or slide-out form (desktop only) */}
              <div className="membre-form-col" style={{ height: '100%', display: isMobile ? 'none' : 'flex', flexDirection: 'column', paddingTop: selectedTier ? 'clamp(30px, 4vw, 60px)' : 'clamp(48px, 5vw, 60px)', position: 'relative' }}>
                {/* Default image when no tier selected */}
                {!selectedTier && (
                  <div style={{ flex: 1, display: 'flex' }}>
                    <img src="/images/winner-small.avif" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '22px' }} />
                  </div>
                )}
                <AnimatePresence>
                  {selectedTier && (
                    <motion.div
                      className="membre-form-panel"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: '#fff', borderRadius: '22px', padding: 'clamp(30px, 4vw, 60px) clamp(28px, 4vw, 36px) clamp(24px, 3vw, 32px)', boxShadow: '0 16px 48px rgba(0,0,0,0.08)', flex: 1, display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                      {sent ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', marginBottom: '16px' }}>✓</motion.div>
                          <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '8px' }}>{lang === 'fr' ? 'Demande envoyée !' : 'Request sent!'}</h3>
                          <p style={{ fontSize: '14px', color: '#4e4e4e', marginBottom: '16px' }}>
                            {lang === 'fr' ? `Nous vous recontacterons au sujet de l'adhésion ${selectedTier.name}.` : `We'll get back to you about the ${selectedTier.name} membership.`}
                          </p>
                          <button onClick={handleCancel} className="btn-pill btn-black">{lang === 'fr' ? 'Fermer' : 'Close'}</button>
                        </div>
                      ) : (
                        <>
                          <p style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                            {lang === 'fr' ? 'Formulaire d\'adhésion' : 'Membership form'}
                          </p>
                          <h3 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '6px' }}>{selectedTier.name}</h3>
                          <p style={{ fontSize: '18px', fontWeight: 300, color: '#4e4e4e', marginBottom: '8px' }}>{selectedTier.price}</p>
                          <p style={{ fontSize: '14px', color: '#4e4e4e', lineHeight: 1.5, marginBottom: '24px' }}>{selectedTier.detail}</p>
                          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
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

            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 768px) { .membre-grid { grid-template-columns: 1fr !important; } .membre-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
              .membre-hero-img { animation: fadeIn 0.7s ease 0.2s forwards; }
              @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            ` }} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
