'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useT, LocalizedLink, useLocale } from '@/lib/i18n'

export function Header() {
  const t = useT()
  const lang = useLocale()
  const pathname = usePathname()
  const pathWithoutLang = pathname.replace(new RegExp(`^/${lang}`), '') || '/'

  const navLinks = [
    { label: t('header.nav.mission'), href: '/#mission' },
    { label: t('header.nav.programmes'), href: '/#programmes' },
    { label: t('header.nav.gouvernance') || 'Gouvernance', href: '/gouvernance' },
    { label: t('header.nav.devenir_membre') || 'Devenir membre', href: '/devenir-membre' },
    { label: t('header.nav.a_propos'), href: '/a-propos' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomePage = pathWithoutLang === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const closeMenu = () => setIsMobileMenuOpen(false)

  const getLangSwitchHref = () => {
    return pathname.replace(new RegExp(`^/${lang}`), lang === 'fr' ? '/en' : '/fr')
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        backgroundColor: '#ffffff',
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'box-shadow 0.35s ease',
      }}>
      <div className="container-wide" style={{ height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <LocalizedLink href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/icia-logo-wordmark-noir.svg"
                alt="ICIA, Institut Collectif de l'IA"
                style={{ height: '36px', width: 'auto' }}
              />
            </LocalizedLink>
          </motion.div>

          <nav className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <LocalizedLink
                  href={link.href}
                  className="navbar-link t-nav"
                  style={{ color: 'var(--text-secondary)', padding: '20px 0', display: 'inline-block' }}
                >
                  {link.label}
                </LocalizedLink>
              </motion.div>
            ))}
          </nav>

          <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={getLangSwitchHref()}
                className="lang-switch"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LocalizedLink href="/contact" className="btn-header-outline">
                {t('header.cta')}
              </LocalizedLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <LocalizedLink href="/contact" className="btn-header-black">
                {t('header.cta_join')}
              </LocalizedLink>
            </motion.div>
          </div>

          <div className="navbar-mobile" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
            <Link
              href={getLangSwitchHref()}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </Link>
            <button
              type="button"
              style={{ padding: '6px', color: 'var(--text-primary)', touchAction: 'manipulation' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('header.aria.menu')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="navbar-mobile"
            style={{
              position: 'fixed',
              top: '64px',
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#ffffff',
              zIndex: 999,
              overflowY: 'auto',
              borderLeft: '1px solid var(--border-light)',
            }}
          >
            <div style={{ padding: '32px var(--grid-margin)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link) => (
                  <LocalizedLink
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-heading)',
                      fontWeight: 300,
                      color: 'var(--text-primary)',
                      padding: '16px 0',
                      borderBottom: '1px solid var(--border-light)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </LocalizedLink>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <LocalizedLink
                  href="/contact"
                  onClick={closeMenu}
                  className="btn-pill btn-black"
                  style={{ width: '100%' }}
                >
                  {t('header.cta')}
                </LocalizedLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-link {
          position: relative;
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: 16px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--text-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .navbar-link:hover {
          color: var(--text-primary);
        }
        .navbar-link:hover::after {
          transform: scaleX(1);
        }
        .lang-switch:hover {
          background: rgba(0,0,0,0.04);
          border-radius: 50%;
        }
        @media (max-width: 1024px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .navbar-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
