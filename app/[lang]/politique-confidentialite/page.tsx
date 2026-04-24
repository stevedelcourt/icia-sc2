import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t, type Locale } from '@/generated/content'

export default function PolitiqueConfidentialite({ params }: { params: { lang: string } }) {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl  text-black mb-12">{t(params.lang as Locale, 'confidentialite.title')}</h1>
          <div className="prose prose-lg max-w-none text-[#666666]">
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.responsable.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.responsable.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.donnees.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.donnees.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.utilisation.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.utilisation.intro')}</p>
            <ul className="list-disc pl-6">
              <li>{t(params.lang as Locale, 'confidentialite.utilisation.1')}</li>
              <li>{t(params.lang as Locale, 'confidentialite.utilisation.2')}</li>
              <li>{t(params.lang as Locale, 'confidentialite.utilisation.3')}</li>
            </ul>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.droits.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.droits.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.duree.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.duree.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t(params.lang as Locale, 'confidentialite.cookies.title')}</h2>
            <p>{t(params.lang as Locale, 'confidentialite.cookies.text')}</p>
            <ul className="list-disc pl-6">
              <li><strong>{t(params.lang as Locale, 'confidentialite.cookies.finalite')} :</strong> {t(params.lang as Locale, 'confidentialite.cookies.finalite_text')}</li>
              <li><strong>{t(params.lang as Locale, 'confidentialite.cookies.utilises')} :</strong> {t(params.lang as Locale, 'confidentialite.cookies.utilises_text')}</li>
              <li><strong>{t(params.lang as Locale, 'confidentialite.cookies.duree')} :</strong> {t(params.lang as Locale, 'confidentialite.cookies.duree_text')}</li>
              <li><strong>{t(params.lang as Locale, 'confidentialite.cookies.consentement')} :</strong> {t(params.lang as Locale, 'confidentialite.cookies.consentement_text')}</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
