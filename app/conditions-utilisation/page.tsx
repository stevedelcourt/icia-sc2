import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t } from '@/generated/content'

export default function ConditionsUtilisation() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl  text-black mb-12">{t('conditions.title')}</h1>
          <div className="prose prose-lg max-w-none text-[#666666]">
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('conditions.acceptation.title')}</h2>
            <p>{t('conditions.acceptation.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('conditions.utilisation.title')}</h2>
            <p>{t('conditions.utilisation.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('conditions.pi.title')}</h2>
            <p>{t('conditions.pi.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('conditions.responsabilite.title')}</h2>
            <p>{t('conditions.responsabilite.text')}</p>
            
            <h2 className="text-xl font-medium text-black mt-8 mb-4">{t('conditions.droit.title')}</h2>
            <p>{t('conditions.droit.text')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
