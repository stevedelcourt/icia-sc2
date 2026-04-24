import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t, type Locale } from '@/generated/content'

export default function MentionsLegales({ params }: { params: { lang: string } }) {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black mb-12">{t(params.lang as Locale, 'mentions_legales.title')}</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-xl font-bold text-black mt-8 mb-4">{t(params.lang as Locale, 'mentions_legales.editeur.title')}</h2>
            <p>{t(params.lang as Locale, 'mentions_legales.editeur.nom')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.editeur.forme')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.editeur.siege')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.editeur.rcs')}</p>
            
            <h2 className="text-xl font-bold text-black mt-8 mb-4">{t(params.lang as Locale, 'mentions_legales.hebergement.title')}</h2>
            <p>{t(params.lang as Locale, 'mentions_legales.hebergement.nom')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.hebergement.siret')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.hebergement.rcs')}</p>
            <p>{t(params.lang as Locale, 'mentions_legales.hebergement.capital')}</p>
            
            <h2 className="text-xl font-bold text-black mt-8 mb-4">{t(params.lang as Locale, 'mentions_legales.presentation.title')}</h2>
            <p><a href="/MariusIA-BAM.pdf" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-600">{t(params.lang as Locale, 'mentions_legales.presentation.lien')}</a></p>
            
            <h2 className="text-xl font-bold text-black mt-8 mb-4">{t(params.lang as Locale, 'mentions_legales.pi.title')}</h2>
            <p>{t(params.lang as Locale, 'mentions_legales.pi.text')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
