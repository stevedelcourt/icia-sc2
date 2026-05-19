'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { I18nProvider, useT, LocalizedLink } from '@/lib/i18n'
import { usePathname } from 'next/navigation'

function NotFoundContent() {
  const t = useT()
  const pathname = usePathname()

  return (
    <>
      <meta name="robots" content="noindex" />
      <Header />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background star */}
        <img src="/images/star.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.06, pointerEvents: 'none' }} />

        <h1 style={{
          fontSize: 'clamp(120px, 18vw, 280px)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          lineHeight: 0.9,
          marginBottom: '8px',
          letterSpacing: '-0.04em',
          position: 'relative',
          zIndex: 1,
        }}>
          404
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 24px)',
          fontWeight: 300,
          marginBottom: '12px',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          background: '#111',
          color: '#ccc',
          padding: '6px 20px',
          borderRadius: '4px',
          position: 'relative',
          zIndex: 1,
        }}>
          {pathname}
        </p>

        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 28px)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          marginBottom: '40px',
          maxWidth: '600px',
          lineHeight: 1.3,
          position: 'relative',
          zIndex: 1,
        }}>
          {t('not_found.heading')}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <LocalizedLink href="/fr/" className="btn-pill btn-black">
            {t('not_found.cta_home')}
            <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </LocalizedLink>
          <LocalizedLink href="/fr/contact" className="btn-pill btn-outline-shadow">
            {t('not_found.cta_contact')}
            <svg className="btn-chevron" viewBox="0 0 14 14" fill="none"><path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </LocalizedLink>
        </div>

        <div style={{ marginTop: '40px', maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '16px', fontWeight: 300, fontStyle: 'italic', color: '#4e4e4e', lineHeight: 1.6, marginBottom: '8px' }}>
            &laquo;&nbsp;On ne voit bien qu&rsquo;avec le cœur. L&rsquo;essentiel est invisible pour les yeux.&nbsp;&raquo;
          </p>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF', marginBottom: '20px' }}>
            &mdash; Antoine de Saint-Exupéry
          </p>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
            Cette page appartient manifestement à l&rsquo;essentiel invisible.
          </p>
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
