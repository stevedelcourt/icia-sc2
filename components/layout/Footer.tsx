'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useT, LocalizedLink } from '@/lib/i18n'

const openCookiePanel = () => {
  if (typeof window !== 'undefined') {
    const cc = (window as unknown as { CookieConsent?: { showPreferences: () => void } }).CookieConsent
    if (cc?.showPreferences) {
      cc.showPreferences()
    }
  }
}

export function Footer() {
  const t = useT()

  const offreLinks = [
    { label: t('header.submenu.offres.diagnostic'), href: '/diagnostic' },
    { label: t('header.submenu.offres.formations'), href: '/formations' },
    { label: t('header.submenu.offres.transformation'), href: '/transformation' },
    { label: t('header.submenu.offres.partenaire'), href: '/partenaire' },
  ]

  const acteurLinks = [
    { label: t('header.submenu.pour_qui.entreprises'), href: '/entreprises' },
    { label: t('header.submenu.pour_qui.professions_liberales'), href: '/professions-liberales' },
    { label: t('header.submenu.pour_qui.ecoles'), href: '/education' },
    { label: t('header.submenu.pour_qui.industries_creatives'), href: '/secteurs-creatifs' },
    { label: t('header.submenu.pour_qui.collectivites'), href: '/pouvoirs-publics' },
    { label: t('header.submenu.pour_qui.grand_public'), href: '/citoyens' },
  ]

  const legalLinks = [
    { label: t('footer.legal.mentions'), href: '/mentions-legales' },
    { label: t('footer.legal.confidentialite'), href: '/politique-confidentialite' },
    { label: t('footer.legal.cookies'), onClick: openCookiePanel },
    { label: t('footer.legal.cgv'), href: '/conditions-utilisation' },
  ]

  return (
    <footer className="border-t border-border py-16 md:py-20" style={{ backgroundColor: '#fdfdfd' }}>
      <div className="container-mentivis">
        <LocalizedLink href="/">
          <motion.img
            src="/MariusIA-logo.svg"
            alt="MARIUS IA"
            className="h-10 w-auto cursor-pointer opacity-80"
            whileHover={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </LocalizedLink>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mt-6">
          <div className="max-w-xs">
            <p className="t-caption text-secondary">{t('footer.tagline')}</p>
            <p className="t-caption text-tertiary mt-2">{t('footer.by')} <a href="https://mentivis.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">Mentivis</a></p>
            <p className="t-caption text-tertiary mt-1">{t('footer.location.prefix')} <a href="https://campuscyber.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">Cyber.AI</a>{t('footer.location.city')}</p>

            <div className="flex gap-4 mt-6">
              <a href="https://www.linkedin.com/company/marius-ia/" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-primary transition-colors duration-200" aria-label={t('footer.social.linkedin_aria')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/mari.us.ia/" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-primary transition-colors duration-200" aria-label={t('footer.social.instagram_aria')}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <div>
              <p className="t-caption uppercase tracking-widest text-tertiary mb-4">{t('footer.column.pour_qui')}</p>
              <nav className="space-y-2">
                {acteurLinks.map((link) => (
                  <motion.div key={link.href} whileHover={{ x: 6 }}>
                    <LocalizedLink
                      href={link.href}
                      className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                    >
                      {link.label}
                    </LocalizedLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div>
              <p className="t-caption uppercase tracking-widest text-tertiary mb-4">{t('footer.column.offres')}</p>
              <nav className="space-y-2">
                {offreLinks.map((link) => (
                  <motion.div key={link.href} whileHover={{ x: 6 }}>
                    <LocalizedLink
                      href={link.href}
                      className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                    >
                      {link.label}
                    </LocalizedLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div>
              <p className="t-caption uppercase tracking-widest text-tertiary mb-4">{t('footer.column.a_propos')}</p>
              <nav className="space-y-2">
                <motion.div whileHover={{ x: 6 }}>
                  <LocalizedLink
                    href="/a-propos"
                     className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                   >
                     {t('footer.about.qui_sommes_nous')}
                  </LocalizedLink>
                </motion.div>
                <motion.div whileHover={{ x: 6 }}>
                  <LocalizedLink
                    href="/expertises"
                     className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                   >
                     {t('footer.about.expertises')}
                  </LocalizedLink>
                </motion.div>
                <motion.div whileHover={{ x: 6 }}>
                  <LocalizedLink
                    href="/publications"
                     className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                   >
                     {t('footer.about.publications')}
                  </LocalizedLink>
                </motion.div>
              </nav>
            </div>

            <div>
              <p className="t-caption uppercase tracking-widest text-tertiary mb-4">{t('footer.column.legal')}</p>
              <nav className="space-y-2">
                {legalLinks.map((link) => (
                  <motion.div key={link.label} whileHover={{ x: 6 }}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <LocalizedLink
                        href={link.href}
                        className="block t-caption text-tertiary hover:text-primary hover:underline hover:underline-offset-4 transition-colors duration-200"
                      >
                        {link.label}
                      </LocalizedLink>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
