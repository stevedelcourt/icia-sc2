import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'

export default function Cookies() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl  text-black mb-12">{t('cookies.title')}</h1>
          <div className="prose prose-lg max-w-none text-[#666666]">
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('cookies.definition.title')}</h2>
            <p>{t('cookies.definition.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('cookies.utilises.title')}</h2>
            <p>{t('cookies.utilises.text')}</p>
            <ul className="list-disc pl-6">
              <li><strong>{t('cookies.essentiels')} :</strong> {t('cookies.essentiels_text')}</li>
              <li><strong>{t('cookies.analytiques')} :</strong> {t('cookies.analytiques_text')}</li>
            </ul>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('cookies.gestion.title')}</h2>
            <p>{t('cookies.gestion.text')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
