import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { t, type Locale } from '@/generated/content'

export default function ConditionsUtilisation({ params }: { params: { lang: string } }) {
  return (
    <>
      <Header />
      <main className="section pt-16">
        <div className="container-mentivis">
          <h1 className="t-display text-primary mb-12">{t(params.lang as Locale, 'conditions.title')}</h1>
          <div className="prose prose-lg max-w-none">
            <h2 className="t-heading text-primary mt-8 mb-4">{t(params.lang as Locale, 'conditions.acceptation.title')}</h2>
            <p>{t(params.lang as Locale, 'conditions.acceptation.text')}</p>
            
            <h2 className="t-heading text-primary mt-8 mb-4">{t(params.lang as Locale, 'conditions.utilisation.title')}</h2>
            <p>{t(params.lang as Locale, 'conditions.utilisation.text')}</p>
            
            <h2 className="t-heading text-primary mt-8 mb-4">{t(params.lang as Locale, 'conditions.pi.title')}</h2>
            <p>{t(params.lang as Locale, 'conditions.pi.text')}</p>
            
            <h2 className="t-heading text-primary mt-8 mb-4">{t(params.lang as Locale, 'conditions.responsabilite.title')}</h2>
            <p>{t(params.lang as Locale, 'conditions.responsabilite.text')}</p>
            
            <h2 className="t-heading text-primary mt-8 mb-4">{t(params.lang as Locale, 'conditions.droit.title')}</h2>
            <p>{t(params.lang as Locale, 'conditions.droit.text')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
