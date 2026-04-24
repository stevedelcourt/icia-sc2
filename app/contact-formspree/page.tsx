'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    entreprise: '',
    secteur: '',
    effectif: '',
    priorite: '',
    consent: false,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://formspree.io/f/mwvnrqrv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          prenom: formData.firstName,
          nom: formData.lastName,
          email: formData.email,
          entreprise: formData.entreprise,
          secteur: formData.secteur,
          effectif: formData.effectif,
          priorite: formData.priorite,
          consentement: formData.consent ? 'Oui' : 'Non'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        const data = await response.json()
        if (data.errors) {
          console.error(data.errors)
        }
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-2xl mx-auto px-8">
          {submitStatus === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gray-200 flex items-center justify-center text-2xl text-gray-400">
                ✓
              </div>
              <h2 className="text-3xl  text-black mb-4">{t('contact_formspree.success.title')}</h2>
              <p className="text-gray-500 mb-8">
                {t('contact_formspree.success.body')}
              </p>
              <Link href="/" className="text-base text-black hover:underline transition-colors duration-200">
                {t('contact_formspree.success.retour')}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('contact_formspree.label')}</p>
              <h1 className="text-3xl md:text-4xl  text-black mb-8">
                {t('contact_formspree.title')}
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.prenom')}</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.nom')}</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="entreprise" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.entreprise')}</label>
                  <input 
                    type="text" 
                    id="entreprise" 
                    name="entreprise"
                    required
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="secteur" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.secteur')}</label>
                  <select 
                    id="secteur" 
                    name="secteur"
                    required
                    value={formData.secteur}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                  >
                    <option value="">{t('contact_formspree.form.select_default')}</option>
                    <option value="pmi-eti">{t('contact_formspree.form.secteur.pme')}</option>
                    <option value="collectivite">{t('contact_formspree.form.secteur.collectivite')}</option>
                    <option value="education">{t('contact_formspree.form.secteur.education')}</option>
                    <option value="creatif">{t('contact_formspree.form.secteur.creatif')}</option>
                    <option value="citoyen">{t('contact_formspree.form.secteur.citoyen')}</option>
                    <option value="autre">{t('contact_formspree.form.secteur.autre')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="effectif" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.effectif')}</label>
                  <select 
                    id="effectif" 
                    name="effectif"
                    required
                    value={formData.effectif}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                  >
                    <option value="">{t('contact_formspree.form.select_default')}</option>
                    <option value="1-10">{t('contact_formspree.form.effectif.1_10')}</option>
                    <option value="11-50">{t('contact_formspree.form.effectif.11_50')}</option>
                    <option value="51-250">{t('contact_formspree.form.effectif.51_250')}</option>
                    <option value="251-1000">{t('contact_formspree.form.effectif.251_1000')}</option>
                    <option value="1000+">{t('contact_formspree.form.effectif.1000+')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priorite" className="block text-sm text-gray-500 mb-2">{t('contact_formspree.form.priorite')}</label>
                  <select 
                    id="priorite" 
                    name="priorite"
                    required
                    value={formData.priorite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 bg-white focus:border-black outline-none transition-colors duration-200"
                  >
                    <option value="">{t('contact_formspree.form.select_default')}</option>
                    <option value="comprendre">{t('contact_formspree.form.priorite.ai_act')}</option>
                    <option value="diagnostic">{t('contact_formspree.form.priorite.diagnostic')}</option>
                    <option value="formation">{t('contact_formspree.form.priorite.formation')}</option>
                    <option value="transformation">{t('contact_formspree.form.priorite.transformation')}</option>
                    <option value="partenaire">{t('contact_formspree.form.priorite.partenaire')}</option>
                    <option value="autre">{t('contact_formspree.form.priorite.autre')}</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-500">
                      {t('contact_formspree.form.consent')}
                    </span>
                  </label>
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? t('contact_formspree.form.submitting') : t('contact_formspree.form.submit')}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
