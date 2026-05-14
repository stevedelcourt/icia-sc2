'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useT, LocalizedLink, useLocale } from '@/lib/i18n'
import { AnimatedLogo } from '@/components/AnimatedLogo'
import { getPublicationTranslation } from '@/generated/publication-translations'

export function Header() {
  const t = useT()
  const lang = useLocale()
  const pathname = usePathname()
  const pathWithoutLang = pathname.replace(new RegExp(`^/${lang}`), '') || '/'

  // Get translation slug if on a publication page
  const isPublicationPage = pathname.match(/^\/(fr|en)\/publications\/([^/]+)\//);
  const getLangSwitchHref = () => {
    if (isPublicationPage) {
      const slug = isPublicationPage[2];
      const translationSlug = getPublicationTranslation(slug, lang);
      if (translationSlug) {
        const newLang = lang === 'fr' ? 'en' : 'fr';
        return `/${newLang}/publications/${translationSlug}/`;
      }
    }
    return pathname.replace(new RegExp(`^/${lang}`), lang === 'fr' ? '/en' : '/fr');
  };

  const navLinks = [
    { label: t('header.nav.pour_qui'), href: '/#acteurs', bold: true, children: [
      { label: t('header.submenu.pour_qui.entreprises'), href: '/entreprises' },
      { label: t('header.submenu.pour_qui.professions_liberales'), href: '/professions-liberales' },
      { label: t('header.submenu.pour_qui.ecoles'), href: '/education' },
      { label: t('header.submenu.pour_qui.industries_creatives'), href: '/secteurs-creatifs' },
      { label: t('header.submenu.pour_qui.collectivites'), href: '/pouvoirs-publics' },
      { label: t('header.submenu.pour_qui.grand_public'), href: '/citoyens' },
    ]},
    { label: t('header.nav.offres'), href: '/#offres', bold: true, children: [
      { label: t('header.submenu.offres.diagnostic'), href: '/diagnostic' },
      { label: t('header.submenu.offres.formations'), href: '/formations' },
      { label: t('header.submenu.offres.transformation'), href: '/transformation' },
      { label: t('header.submenu.offres.partenaire'), href: '/partenaire' },
    ]},
    { label: t('header.nav.a_propos'), href: '/a-propos/', bold: true },
    { label: t('header.nav.publications'), href: '/publications/', bold: true },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const isHomePage = pathWithoutLang === '/'
  const acteursPaths = ['/entreprises', '/pouvoirs-publics', '/education', '/secteurs-creatifs', '/professions-liberales', '/citoyens']
  const isActeursPage = acteursPaths.some(p => pathWithoutLang === p || pathWithoutLang.startsWith(p)) || pathWithoutLang === '/a-propos'
  const offresPaths = ['/diagnostic', '/formations', '/transformation', '/partenaire']
  const isOffresPage = offresPaths.some(p => pathWithoutLang === p || pathWithoutLang.startsWith(p))

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
    setExpandedMenu(null)
  }, [pathname])

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
    setExpandedMenu(null)
  }

  const headerBg = () => '#ffffff'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16"
      style={{ 
        backgroundColor: headerBg(),
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}>
      <div className="container-mentivis h-full">
        <div className="flex items-center justify-between h-full">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedLogo />
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <LocalizedLink
                  href={link.href}
                  className="t-nav text-primary hover:text-secondary hover:underline hover:underline-offset-4 transition-colors duration-200"
                >
                  {link.label}
                </LocalizedLink>
              </motion.div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={getLangSwitchHref()}
                className="t-nav text-tertiary hover:text-primary hover:underline hover:underline-offset-4 uppercase transition-colors duration-200"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LocalizedLink
                href="/contact"
                className="btn-pill btn-black"
              >
                {t('header.cta')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </motion.div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={getLangSwitchHref()}
              className="text-sm font-medium text-black hover:text-gray-600 hover:underline hover:underline-offset-4 uppercase transition-colors duration-200"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </Link>
            <button
              type="button"
              className="p-1.5 xs:p-2 text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('header.aria.menu')}
              style={{ touchAction: 'manipulation' }}
            >
              <svg className="w-6 xs:w-7 h-6 xs:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="lg:hidden bg-[#111827] border-t w-full overflow-hidden"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="px-4 xs:px-5 sm:px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.children ? (
                    <div>
                      <div className="flex items-center">
                        <LocalizedLink
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex-1 text-left text-base xs:text-lg py-3 text-white ${link.bold ? 'font-bold' : ''} hover:text-gray-200 hover:underline hover:underline-offset-4 transition-colors`}
                        >
                          {link.label}
                        </LocalizedLink>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setExpandedMenu(expandedMenu === link.href ? null : link.href)
                          }}
                          className="p-3 -mr-3 text-gray-400 hover:text-white transition-colors"
                          aria-label={expandedMenu === link.href ? t('header.aria.close_submenu') : t('header.aria.open_submenu')}
                        >
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${expandedMenu === link.href ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedMenu === link.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-1 border-l-2 border-gray-700 ml-2">
                              {link.children.map((child) => {
                                const childPath = child.href.replace(new RegExp(`^/${lang}`), '') || '/'
                                const isActive = pathWithoutLang === childPath
                                return (
                                  <LocalizedLink
                                    key={child.href}
                                    href={child.href}
                                    onClick={(e: React.MouseEvent) => {
                                      e.stopPropagation()
                                      closeMenu()
                                    }}
                                    className={`block text-base xs:text-lg py-3 ${
                                      isActive
                                        ? 'text-white underline decoration-[#D92A1C] underline-offset-4'
                                        : 'text-gray-300 hover:text-white hover:underline hover:underline-offset-4'
                                      } transition-colors`}
                                  >
                                    {child.label}
                                  </LocalizedLink>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <LocalizedLink
                      href={link.href}
                      onClick={closeMenu}
                      className={`block text-base xs:text-lg py-3 text-white ${link.bold ? 'font-bold' : ''} hover:text-gray-200 hover:underline hover:underline-offset-4 transition-colors`}
                    >
                      {link.label}
                    </LocalizedLink>
                  )}
                </div>
              ))}
              <LocalizedLink
                href="/contact"
                onClick={closeMenu}
                className="btn-pill btn-black w-full justify-center mt-2"
              >
                {t('header.cta')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
