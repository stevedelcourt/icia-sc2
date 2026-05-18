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
    { label: t('header.nav.a_propos'), href: '/a-propos' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomePage = pathWithoutLang === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 20)
      } else {
        setIsScrolled(window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

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
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.98)',
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        transition: 'background-color 0.35s ease, box-shadow 0.35s ease',
      }}>
      <div className="container-mentivis" style={{ height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <LocalizedLink href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                ICIA
              </span>
              <span style={{
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                marginLeft: '10px',
                paddingLeft: '10px',
                borderLeft: '1px solid var(--border-light)',
                fontWeight: 400,
                lineHeight: 1.3,
                display: 'inline-block',
              }}>
                Institut Collectif<br />de l&rsquo;IA
              </span>
            </LocalizedLink>
          </motion.div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="navbar-desktop">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <LocalizedLink
                  href={link.href}
                  className="t-nav text-primary"
                  style={{ transition: 'color 0.18s ease' }}
                >
                  {link.label}
                </LocalizedLink>
              </motion.div>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="navbar-desktop">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={getLangSwitchHref()}
                className="t-nav text-tertiary"
                style={{ textTransform: 'uppercase', transition: 'color 0.18s ease' }}
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t('header.cta')}
              </LocalizedLink>
            </motion.div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="navbar-mobile">
            <Link
              href={getLangSwitchHref()}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="navbar-mobile"
            style={{
              backgroundColor: '#111827',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              width: '100%',
              overflow: 'hidden',
              touchAction: 'manipulation',
            }}
          >
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link) => (
                  <LocalizedLink
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      fontSize: '18px',
                      color: '#ffffff',
                      padding: '12px 0',
                      fontWeight: 500,
                      transition: 'color 0.18s ease',
                    }}
                  >
                    {link.label}
                  </LocalizedLink>
                ))}
                <LocalizedLink
                  href="/contact"
                  onClick={closeMenu}
                  className="btn-pill btn-black"
                  style={{ marginTop: '8px', justifyContent: 'center', width: '100%' }}
                >
                  {t('header.cta')}
                </LocalizedLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
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
