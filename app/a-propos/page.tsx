import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollExpandSection } from '@/components/ScrollExpandSection'
import { AnimatedDivider } from '@/components/Animations'
import { t } from '@/generated/content'
import Link from 'next/link'

export default function AProposPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.mariusia.com/a-propos',
    name: 'À propos - Marius IA',
    description: 'Marius IA est l\'institut collectif de l\'IA. Conseil en stratégie IA, conformité AI Act, gouvernance IA pour PME, ETI et organisations françaises.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://www.mariusia.com/#organization',
      name: 'Marius IA',
      url: 'https://www.mariusia.com',
      logo: 'https://www.mariusia.com/MariusIA-logo.svg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4 Bd Euroméditerranée, Quai d\'Arenc',
        addressLocality: 'Marseille',
        postalCode: '13002',
        addressCountry: 'FR'
      },
      areaServed: ['Europe', 'France'],
      sameAs: ['https://www.mentivis.com']
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-36 pb-24" style={{ backgroundColor: '#f9f7f3' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div>
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">{t('a_propos.label')}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-black leading-[1.1] mb-16 whitespace-pre-line">
              {t('a_propos.title')}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 mb-24">
            <div>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                {t('a_propos.paragraph.1')}
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                {t('a_propos.paragraph.2')}
              </p>
            </div>
            <div className="lg:pt-0">
              <div className="flex items-start gap-12 mb-6" style={{ alignItems: 'flex-start' }}>
                <img 
                  src="/images/MariusIA-logo-grey-monogram.svg" 
                  alt="Marius IA" 
                  className="h-[70px] w-auto"
                />
                <img 
                  src="/images/cyber-campus-logo.svg" 
                  alt="Campus Cyber.AI" 
                  className="h-[50px] md:h-[70px] w-auto"
                />
              </div>
              <p className="text-lg text-gray-500 leading-relaxed">
                {t('a_propos.paragraph.3')}
              </p>
            </div>
          </div>

          <ScrollExpandSection>
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">{t('a_propos.institut.label')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">{t('a_propos.institut.title')}</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('a_propos.institut.paragraph.1')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00255D] mb-4">{t('a_propos.institut.mission_title')}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('a_propos.institut.mission')}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t('a_propos.institut.vision')}
                </p>
              </div>
            </div>
          </ScrollExpandSection>

          <AnimatedDivider />
          <div className="pt-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                  <a
                    href="https://campuscyber.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition-colors"
                  >
                    {t('a_propos.campus.title')}
                  </a>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {t('a_propos.campus.paragraph')}
                </p>
              </div>
              <img
                src="/images/cybercampus.webp"
                alt="Campus Cyber.AI"
                className="w-full md:w-[400px] h-auto object-cover self-start"
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact" className="inline-block px-10 py-4 text-lg text-white bg-black hover:bg-white hover:text-black transition-all duration-200">
              {t('a_propos.cta')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
