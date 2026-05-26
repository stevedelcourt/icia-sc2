import { pageMetadata } from '@/lib/seo-metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ActualitesList } from './ActualitesList'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, '/actualites')
}

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export default function ActualitesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  return (
    <>
      <Header />
      <main className="section" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: 'calc(64px + var(--section-gap))' }}>
        <div className="container-mentivis">
          <p className="eyebrow">ICIA</p>
          <h1 className="t-display text-primary" style={{ marginBottom: '16px' }}>
            {lang === 'fr' ? 'Actualités' : 'News'}
          </h1>
          <p className="t-lead" style={{ marginBottom: '48px' }}>
            {lang === 'fr'
              ? 'Les dernières nouvelles et publications de l\'Institut Collectif de l\'IA.'
              : 'The latest news and publications from the Institut Collectif de l\'IA.'}
          </p>
          <ActualitesList lang={lang} />
        </div>
      </main>
      <Footer />
    </>
  )
}
