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
    { label: t('header.nav.nos_principes'), href: '/#piliers', bold: true },
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

  const headerBg = () => {
    if (isHomePage) return isScrolled ? '#ffffff' : '#aebddb'
    if (isActeursPage) return isScrolled ? '#ffffff' : '#aebddb'
    if (isOffresPage) return isScrolled ? '#ffffff' : '#bdf5ab'
    return 'white'
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 py-3"
      style={{ backgroundColor: headerBg() }}>
      <div className="max-w-6xl mx-auto px-4 xs:px-6 sm:px-8">
        <div className="flex items-center justify-between">
          <LocalizedLink href="/" className="flex items-center">
            <img
              src="/MariusIA-logo.svg"
              alt="Marius IA"
              className="h-[72px] sm:h-20 w-auto"
            />
          </LocalizedLink>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className="text-base font-medium text-black hover:text-gray-600 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </LocalizedLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={pathname.replace(new RegExp(`^/${lang}`), lang === 'fr' ? '/en' : '/fr')}
              className="text-sm font-medium text-black hover:text-gray-600 uppercase transition-colors duration-200"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </Link>
            <LocalizedLink
              href="/contact"
              className="inline-block px-5 py-1.5 xs:px-6 xs:py-2 text-sm font-medium text-[#00255D] border-2 border-[#00255D] hover:bg-[#00255D] hover:text-white transition-all duration-200"
            >
              {t('header.cta')}
            </LocalizedLink>
          </div>

          <button
            type="button"
            className="lg:hidden p-1.5 xs:p-2 text-black"
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
                          className={`flex-1 text-left text-base xs:text-lg py-3 text-white ${link.bold ? 'font-bold' : ''} hover:text-gray-200 transition-colors`}
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
                                        : 'text-gray-300 hover:text-white'
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
                      className={`block text-base xs:text-lg py-3 text-white ${link.bold ? 'font-bold' : ''} hover:text-gray-200 transition-colors`}
                    >
                      {link.label}
                    </LocalizedLink>
                  )}
                </div>
              ))}
              <Link
                href={pathname.replace(new RegExp(`^/${lang}`), lang === 'fr' ? '/en' : '/fr')}
                onClick={closeMenu}
                className="block text-center py-2.5 mt-4 text-sm text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#111827] transition-colors"
              >
                {lang === 'fr' ? 'English' : 'Français'}
              </Link>
              <LocalizedLink
                href="/contact"
                onClick={closeMenu}
                className="block text-center py-2.5 mt-2 text-sm text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#111827] transition-colors"
              >
            {t('header.cta')}
              </LocalizedLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
