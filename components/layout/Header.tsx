'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useT, LocalizedLink, useLocale } from '@/lib/i18n'

export function Header() {
  const t = useT()
  const lang = useLocale()
  const pathname = usePathname()

  const navItems = [
    {
      label: t('header.nav.programmes'),
      children: [
        { label: 'ICIA Territoires', href: '/icia-territoires' },
        { label: 'ICIA Education', href: '/icia-education' },
        { label: 'ICIA Travail & Compétences', href: '/icia-travail-competences' },
        { label: t('footer.programmes.impact'), href: '/programme-impact' },
      ],
    },
    {
      label: t('header.nav.association') || 'Association',
      children: [
        { label: t('header.nav.gouvernance') || 'Gouvernance', href: '/gouvernance' },
        { label: t('footer.about.conseil') || 'Conseil stratégique', href: '/gouvernance#conseil-strategique' },
        { label: t('footer.about.partenaires') || 'Partenaires', href: '/partenaires' },
        { label: t('header.nav.devenir_membre') || 'Devenir membre', href: '/devenir-membre' },
      ],
    },
    {
      label: t('header.nav.a_propos'),
      children: [
        { label: t('footer.about.qui_sommes_nous'), href: '/a-propos' },
        { label: t('footer.about.manifeste') || 'ICIA Manifeste', href: '/manifeste' },
        { label: t('footer.about.conseil') || 'Conseil stratégique', href: '/gouvernance#conseil-strategique' },
        { label: t('footer.about.donations') || 'Faire un don', href: '/donations' },
      ],
    },
    { label: t('header.nav.actualites') || 'Actualités', href: '/actualites' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 8) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsMobileMenuOpen(false); setOpenDropdown(null) }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMenu = () => { setIsMobileMenuOpen(false); setMobileExpanded(null) }
  const getLangSwitchHref = () => pathname.replace(new RegExp(`^/${lang}`), lang === 'fr' ? '/en' : '/fr')

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '64px', backgroundColor: '#ffffff', boxShadow: isScrolled ? 'var(--shadow-card)' : 'none', borderBottom: '1px solid var(--border-subtle)', transition: 'box-shadow 0.35s ease' }}>
      <div className="container-wide" style={{ height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
            <LocalizedLink href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/icia-anim-logo.svg" alt="ICIA" style={{ height: '36px', width: 'auto' }} />
            </LocalizedLink>
          </motion.div>

          {/* Desktop nav */}
          <nav className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '28px' }} ref={dropdownRef}>
            {navItems.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className="navbar-link t-nav"
                      style={{ color: 'var(--text-secondary)', padding: '20px 0', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, transition: 'transform 0.2s ease', transform: openDropdown === item.label ? 'rotate(180deg)' : 'none' }}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          onMouseLeave={() => setOpenDropdown(null)}
                          style={{
                            position: 'absolute', top: '100%', left: '-12px', minWidth: '240px',
                            background: '#fff', borderRadius: '16px', padding: '8px 0',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                            zIndex: 1001,
                          }}
                        >
                          {item.children.map(child => (
                            <LocalizedLink key={child.href} href={child.href}
                              style={{ display: 'block', padding: '10px 20px', fontSize: '14px', fontWeight: 400, color: '#0A0A0A', textDecoration: 'none', transition: 'color 0.18s ease, background 0.18s ease' }}
                              className="dropdown-item"
                              onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#000' }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0A0A0A' }}
                            >
                              {child.label}
                            </LocalizedLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <LocalizedLink href={item.href!} className="navbar-link t-nav" style={{ color: 'var(--text-secondary)', padding: '20px 0', display: 'inline-block' }}>
                    {item.label}
                  </LocalizedLink>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={getLangSwitchHref()} className="lang-switch" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}>
                {lang === 'fr' ? 'EN' : 'FR'}
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <LocalizedLink href="/contact" className="btn-header-outline">{t('header.cta')}</LocalizedLink>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <LocalizedLink href="/devenir-membre" className="btn-header-black">{t('header.cta_join')}</LocalizedLink>
            </motion.div>
          </div>

          {/* Mobile burger */}
          <div className="navbar-mobile" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
            <Link href={getLangSwitchHref()} style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{lang === 'fr' ? 'EN' : 'FR'}</Link>
            <button type="button" className={`burger-btn${isMobileMenuOpen ? ' is-open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={t('header.aria.menu')} style={{ padding: '6px', color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line className="burger-line burger-line-top" x1="18" y1="34" x2="82" y2="34" />
                <line className="burger-line burger-line-mid" x1="18" y1="50" x2="82" y2="50" />
                <line className="burger-line burger-line-bot" x1="18" y1="66" x2="82" y2="66" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="navbar-mobile" style={{ position: 'fixed', top: '64px', right: 0, bottom: 0, width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', zIndex: 999, overflowY: 'auto', borderLeft: '1px solid var(--border-light)' }}>
            <div style={{ padding: '24px var(--grid-margin)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {navItems.map(item => (
                  <div key={item.label} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    {item.children ? (
                      <>
                        <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', background: 'none', border: 'none', fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer' }}>
                          {item.label}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                              <div style={{ paddingBottom: '12px', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {item.children.map(child => (
                                  <LocalizedLink key={child.href} href={child.href} onClick={closeMenu} style={{ fontSize: '15px', fontWeight: 400, color: '#4e4e4e', padding: '6px 0', display: 'block' }}>
                                    {child.label}
                                  </LocalizedLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <LocalizedLink href={item.href!} onClick={closeMenu} style={{ display: 'block', padding: '16px 0', fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {item.label}
                      </LocalizedLink>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <LocalizedLink href="/contact" onClick={closeMenu} className="btn-pill btn-outline-shadow" style={{ width: '100%', justifyContent: 'center' }}>{t('header.cta')}</LocalizedLink>
                <LocalizedLink href="/devenir-membre" onClick={closeMenu} className="btn-pill btn-black" style={{ width: '100%', justifyContent: 'center' }}>{t('header.cta_join')}</LocalizedLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-link { position: relative; text-decoration: none; transition: color 0.18s ease; }
        .navbar-link::after { content: ''; position: absolute; bottom: 14px; left: 0; width: 100%; height: 2px; background: var(--text-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .navbar-link:hover { color: var(--text-primary) !important; }
        .navbar-link:hover::after { transform: scaleX(1); }
        .dropdown-item { position: relative; }
        .dropdown-item::after { content: ''; position: absolute; bottom: 6px; left: 20px; width: calc(100% - 40px); height: 1px; background: var(--text-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .dropdown-item:hover::after { transform: scaleX(1); }
        .lang-switch:hover { background: rgba(0,0,0,0.04); border-radius: 50%; }
        @media (max-width: 1024px) { .navbar-desktop { display: none !important; } .navbar-mobile { display: flex !important; } }
        @media (min-width: 1025px) { .navbar-mobile { display: none !important; } }
        .burger-line { fill: none; stroke: currentColor; stroke-width: 4.5; stroke-linecap: round; transform-box: fill-box; transform-origin: center; }
        .burger-line-top, .burger-line-bot { transition: transform 0.52s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .burger-line-mid { transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1); }
        .burger-btn.is-open .burger-line-top { transform: translateY(16px) rotate(45deg); }
        .burger-btn.is-open .burger-line-mid { transform: scaleX(0); opacity: 0; }
        .burger-btn.is-open .burger-line-bot { transform: translateY(-16px) rotate(-45deg); }
      `}</style>
    </header>
  )
}
