import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl  text-black mb-12">{t('confidentialite.title')}</h1>
          <div className="prose prose-lg max-w-none text-[#666666]">
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.responsable.title')}</h2>
            <p>{t('confidentialite.responsable.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.donnees.title')}</h2>
            <p>{t('confidentialite.donnees.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.utilisation.title')}</h2>
            <p>{t('confidentialite.utilisation.intro')}</p>
            <ul className="list-disc pl-6">
              <li>{t('confidentialite.utilisation.1')}</li>
              <li>{t('confidentialite.utilisation.2')}</li>
              <li>{t('confidentialite.utilisation.3')}</li>
            </ul>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.droits.title')}</h2>
            <p>{t('confidentialite.droits.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.duree.title')}</h2>
            <p>{t('confidentialite.duree.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('confidentialite.cookies.title')}</h2>
            <p>{t('confidentialite.cookies.text')}</p>
            <ul className="list-disc pl-6">
              <li><strong>{t('confidentialite.cookies.finalite')} :</strong> {t('confidentialite.cookies.finalite_text')}</li>
              <li><strong>{t('confidentialite.cookies.utilises')} :</strong> {t('confidentialite.cookies.utilises_text')}</li>
              <li><strong>{t('confidentialite.cookies.duree')} :</strong> {t('confidentialite.cookies.duree_text')}</li>
              <li><strong>{t('confidentialite.cookies.consentement')} :</strong> {t('confidentialite.cookies.consentement_text')}</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
