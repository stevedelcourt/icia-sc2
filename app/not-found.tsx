'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { I18nProvider, useT, LocalizedLink } from '@/lib/i18n'

function NotFoundContent() {
  const t = useT()
  return (
    <>
      <meta name="robots" content="noindex" />
      <Header />
      <div className="min-h-screen bg-[#bdf5ab] flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-8">
          <img
            src="/images/808.webp"
            alt="808"
            className="w-full max-w-md mx-auto"
          />
        </div>

        <h1 className="text-[120px] md:text-[180px] font-bold text-black leading-none mb-4">{t('not_found.title')}</h1>

        <p className="text-3xl md:text-4xl font-bold text-black mb-4 relative z-10">
          {t('not_found.heading')}
        </p>

        <p className="text-xl text-black mb-8 max-w-lg relative z-10">
          {t('not_found.body')}
        </p>

        <div className="flex gap-4 relative z-10">
          <LocalizedLink
            href="/"
            className="px-8 py-4 bg-black text-white text-lg hover:bg-gray-800 transition-colors"
          >
            {t('not_found.cta_home')}
          </LocalizedLink>
          <LocalizedLink
            href="/contact"
            className="px-8 py-4 border-2 border-black text-black text-lg hover:bg-black hover:text-white transition-colors"
          >
            {t('not_found.cta_contact')}
          </LocalizedLink>
        </div>

        <div className="mt-12 text-sm text-black opacity-60 relative z-10">
          <p>{t('not_found.footer')}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en/') ? 'en' : 'fr'

  return (
    <I18nProvider lang={lang}>
      <NotFoundContent />
    </I18nProvider>
  )
}