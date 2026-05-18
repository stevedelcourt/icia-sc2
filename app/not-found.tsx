'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { I18nProvider, useT, LocalizedLink } from '@/lib/i18n'

function NotFoundContent() {
  const t = useT()
  return (
    <>
      <meta name="robots" content="noindex" />
      <Header />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f3f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(80px, 12vw, 180px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
          marginBottom: '16px',
        }}>
          {t('not_found.title')}
        </h1>

        <p style={{
          fontSize: 'clamp(20px, 3vw, 36px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>
          {t('not_found.heading')}
        </p>

        <p className="t-lead" style={{ maxWidth: '480px', marginBottom: '32px' }}>
          {t('not_found.body')}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <LocalizedLink
            href="/fr/"
            className="btn-pill btn-black"
          >
            {t('not_found.cta_home')}
          </LocalizedLink>
          <LocalizedLink
            href="/fr/contact"
            className="btn-pill btn-outline-shadow"
          >
            {t('not_found.cta_contact')}
          </LocalizedLink>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
          <LocalizedLink href="/fr/" style={{ fontSize: '14px', color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Français</LocalizedLink>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <LocalizedLink href="/en/" style={{ fontSize: '14px', color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>English</LocalizedLink>
        </div>

        <div style={{ marginTop: '48px' }}>
          <p className="t-micro">{t('not_found.footer')}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function NotFound() {
  return (
    <I18nProvider lang="fr">
      <NotFoundContent />
    </I18nProvider>
  )
}
