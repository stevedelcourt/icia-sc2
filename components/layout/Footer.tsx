'use client'

import Link from 'next/link'
import { useT, LocalizedLink } from '@/lib/i18n'

const openCookiePanel = () => {
  if (typeof window !== 'undefined') {
    const cc = (window as unknown as { CookieConsent?: { showPreferences: () => void } }).CookieConsent
    if (cc?.showPreferences) {
      cc.showPreferences()
    }
  }
}

export function Footer() {
  const t = useT()

  const programmeLinks = [
    { label: t('footer.programmes.impact'), href: '/programme-impact' },
    { label: t('footer.programmes.territoires'), href: '/icia-territoires' },
    { label: t('footer.programmes.education'), href: '/icia-education' },
    { label: t('footer.programmes.travail'), href: '/icia-travail-competences' },
  ]

  const associationLinks = [
    { label: t('footer.about.gouvernance') || 'Gouvernance', href: '/gouvernance' },
    { label: t('footer.about.conseil') || 'Conseil stratégique', href: '/gouvernance#conseil-strategique' },
    { label: t('footer.about.partenaires') || 'Partenaires', href: '/partenaires' },
    { label: t('footer.about.devenir_membre') || 'Devenir membre', href: '/devenir-membre' },
  ]

  const aboutLinks = [
    { label: t('footer.about.qui_sommes_nous'), href: '/a-propos' },
    { label: t('footer.about.manifeste') || 'ICIA Manifeste', href: '/manifeste' },
    { label: t('footer.about.donations') || 'Faire un don', href: '/donations' },
    { label: t('footer.about.actualites') || 'Actualités', href: '/actualites' },
  ]

  const legalLinks = [
    { label: t('footer.legal.mentions'), href: '/mentions-legales' },
    { label: t('footer.legal.confidentialite'), href: '/politique-confidentialite' },
    { label: t('footer.legal.cookies'), onClick: openCookiePanel },
    { label: t('footer.legal.cgv'), href: '/conditions-utilisation' },
  ]

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '64px 0 32px' }}>
      <div className="container-mentivis">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px' }}>
          <div>
            <LocalizedLink href="/" style={{ display: 'inline-block', marginBottom: '12px' }}>
              <img
                src="/images/icia-logo-wordmark-noir.svg"
                alt="ICIA, Institut Collectif de l'IA"
                style={{ height: '28px', width: 'auto', opacity: 0.85 }}
              />
            </LocalizedLink>
            <p style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.4, color: 'var(--text-primary)', marginBottom: '6px', maxWidth: '280px' }}>
              Comprendre les transformations liées à l&rsquo;IA
            </p>
            <p style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1.5, color: 'var(--text-tertiary)', marginBottom: '16px', maxWidth: '280px' }}>
              Association loi 1901{' '}
              <a href="/Recepisse_CR.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>
                W133042589
              </a>
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              <a
                href="https://www.google.com/maps/place/Campus+Cyber+R%C3%A9gion+Sud+%2F+Euromed/@43.3136566,5.3663277,17z/data=!3m2!4b1!5s0x12c9c0f13fce974f:0x7fd62ed04cf28c16!4m6!3m5!1s0x12c9c1002ab85d81:0x202c6089924a8bc4!8m2!3d43.3136566!4d5.3663277!16s%2Fg%2F11wn5b8jd9?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Campus Cyber.IA Euromed Marseille
              </a>
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
              Tour Mirabeau<br />
              4 boulevard Jacques Saadé<br />
              13002 Marseille
            </p>
          </div>

          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
              {t('footer.column.programmes')}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {programmeLinks.map((link) => (
                <LocalizedLink
                  key={link.label}
                  href={link.href}
                  className="t-caption ft-link"
                  style={{ display: 'block', color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
              {t('footer.column.association') || 'Association'}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {associationLinks.map((link) => (
                <LocalizedLink
                  key={link.label}
                  href={link.href}
                  className="t-caption ft-link"
                  style={{ display: 'block', color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
              {t('footer.column.a_propos')}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aboutLinks.map((link) => (
                <LocalizedLink
                  key={link.label}
                  href={link.href}
                  className="t-caption ft-link"
                  style={{ display: 'block', color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom" style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          flexDirection: 'row-reverse',
        }}>
          <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-tertiary)' }}>
            &copy; {new Date().getFullYear()} ICIA, Association loi 1901
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {legalLinks.map((link) => (
              <div key={link.label}>
                {link.onClick ? (
                  <button onClick={link.onClick} style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                    {link.label}
                  </button>
                ) : (
                  <LocalizedLink href={link.href!} style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-tertiary)' }}>
                    {link.label}
                  </LocalizedLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column-reverse !important; align-items: flex-start; }
        }
        .ft-link {
          transition: color 0.18s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ft-link::before {
          content: '→';
          opacity: 0;
          margin-right: 0;
          transition: opacity 0.25s ease, margin-right 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ft-link:hover {
          color: var(--text-primary) !important;
          transform: translateX(4px);
        }
        .ft-link:hover::before {
          opacity: 1;
          margin-right: 6px;
        }
      `}</style>
    </footer>
  )
}
