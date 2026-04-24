'use client'

import Link from 'next/link'
import { createContext, useContext } from 'react'
import { t as tFn, type Locale, type ContentKey } from '@/generated/content'

const LocaleContext = createContext<Locale>('fr')

export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

export function useT(): (key: ContentKey) => string {
  const lang = useLocale()
  return (key: ContentKey) => tFn(lang, key)
}

export function LocalizedLink({ href, ...props }: React.ComponentProps<typeof Link>) {
  const lang = useLocale()
  const localizedHref =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith(`/${lang}/`)
      ? `/${lang}${href}`
      : href
  return <Link href={localizedHref} {...props} />
}

export function useLocalizedPathname(): string {
  // Only works in Client Components wrapped by I18nProvider
  // In Server Components, use params.lang directly
  if (typeof window === 'undefined') return ''
  const lang = useLocale()
  return window.location.pathname.replace(new RegExp(`^/${lang}`), '') || '/'
}
