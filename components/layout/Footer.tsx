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

  const programmeLinks = [
    { label: t('footer.programmes.impact'), href: '/programme-impact' },
    { label: t('footer.programmes.territoires'), href: '/programmes' },
    { label: t('footer.programmes.education'), href: '/programmes' },
    { label: t('footer.programmes.travail'), href: '/programmes' },
  ]

  const aboutLinks = [
    { label: t('footer.about.qui_sommes_nous'), href: '/a-propos' },
    { label: t('footer.about.publications'), href: '/publications' },
  ]

  const legalLinks = [
    { label: t('footer.legal.mentions'), href: '/mentions-legales' },
    { label: t('footer.legal.confidentialite'), href: '/politique-confidentialite' },
    { label: t('footer.legal.cookies'), onClick: openCookiePanel },
    { label: t('footer.legal.cgv'), href: '/conditions-utilisation' },
  ]

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '64px 0 32px' }}>
      <div className="container-mentivis">
        <LocalizedLink href="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
          <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ICIA</span>
        </LocalizedLink>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '40px', marginTop: '24px' }} className="footer-grid">
          <div style={{ maxWidth: '280px' }}>
            <p className="t-caption text-secondary" style={{ marginBottom: '12px' }}>
              {t('footer.tagline')}
            </p>
            <p className="t-caption text-tertiary" style={{ marginBottom: '4px' }}>
              {t('footer.by')} <a href="https://mentivis.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Mentivis</a>
            </p>
            <p className="t-caption text-tertiary">
              {t('footer.location.prefix')} <a href="https://www.mariusia.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{t('footer.location.city')}</a>
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <a href="https://www.linkedin.com/company/marius-ia/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)' }} aria-label={t('footer.social.linkedin_aria')}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <p className="t-micro" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>{t('footer.column.programmes')}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {programmeLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ x: 6 }}>
                  <LocalizedLink
                    href={link.href}
                    className="t-caption text-tertiary"
                    style={{ display: 'block' }}
                  >
                    {link.label}
                  </LocalizedLink>
                </motion.div>
              ))}
            </nav>
          </div>

          <div>
            <p className="t-micro" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>{t('footer.column.a_propos')}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aboutLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ x: 6 }}>
                  <LocalizedLink
                    href={link.href}
                    className="t-caption text-tertiary"
                    style={{ display: 'block' }}
                  >
                    {link.label}
                  </LocalizedLink>
                </motion.div>
              ))}
            </nav>

            <p className="t-micro" style={{ textTransform: 'uppercase', marginTop: '24px', marginBottom: '16px' }}>{t('footer.column.legal')}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {legalLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ x: 6 }}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="t-caption text-tertiary"
                      style={{ display: 'block', textAlign: 'left' }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <LocalizedLink
                      href={link.href!}
                      className="t-caption text-tertiary"
                      style={{ display: 'block' }}
                    >
                      {link.label}
                    </LocalizedLink>
                  )}
                </motion.div>
              ))}
            </nav>
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <p className="t-micro">
            ICIA &copy; {new Date().getFullYear()} — Association loi 1901
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
