'use client'

import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'

const GA_ID = 'G-NJWMZE9B0P'

function initGtag() {
  const w = window as unknown as {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
  w.dataLayer = w.dataLayer || []
  function gtag(...args: unknown[]) {
    w.dataLayer.push(args)
  }
  w.gtag = gtag

  // Google Consent Mode v2 — default denied
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
}

function loadGtagScript() {
  if (document.getElementById('gtag-script')) return
  const script = document.createElement('script')
  script.id = 'gtag-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

function updateConsent(accepted: boolean) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (!w.gtag) return
  w.gtag('consent', 'update', {
    ad_storage: accepted ? 'granted' : 'denied',
    analytics_storage: accepted ? 'granted' : 'denied',
    ad_user_data: accepted ? 'granted' : 'denied',
    ad_personalization: accepted ? 'granted' : 'denied',
  })
}

function handleConsent(cookie: { categories?: string[] }) {
  const hasAnalytics = cookie.categories?.includes('analytics') ?? false
  if (hasAnalytics) {
    loadGtagScript()
    // gtag('js', new Date()) and gtag('config') are handled by the script loading
    // but we need to call config after script loads. Let's do it via dataLayer push
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (w.gtag) {
      w.gtag('js', new Date())
      w.gtag('config', GA_ID)
    }
  }
  updateConsent(hasAnalytics)
}

export default function CookieConsentBanner() {
  useEffect(() => {
    // Initialize gtag with default denied consent immediately
    initGtag()

    CookieConsent.run({
      cookie: {
        name: 'cc_cookie',
        expiresAfterDays: 365,
        secure: true,
        sameSite: 'Strict',
      },
      guiOptions: {
        consentModal: {
          layout: 'cloud inline',
          position: 'bottom center',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: '_gid' },
              { name: '_gat' },
            ],
          },
          services: {
            ga: {
              label: 'Google Analytics',
            },
          },
        },
      },
      onFirstConsent: ({ cookie }) => {
        handleConsent(cookie)
      },
      onConsent: ({ cookie }) => {
        handleConsent(cookie)
      },
      onChange: ({ cookie }) => {
        handleConsent(cookie)
      },
      language: {
        default: 'fr',
        translations: {
          fr: {
            consentModal: {
              title: 'Gestion des cookies',
              description:
                "Marius utilise des cookies pour faire fonctionner le site et améliorer votre navigation. Vous pouvez les accepter ou les configurer librement.",
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              showPreferencesBtn: 'Configurer',
              footer:
                '<a href="/politique-confidentialite/">Politique de confidentialité</a>',
            },
            preferencesModal: {
              title: 'Gestion des cookies',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              savePreferencesBtn: 'Enregistrer',
              closeIconLabel: 'Fermer',
              sections: [
                {
                  description:
                    "Nous utilisons des cookies pour faire fonctionner le site et analyser son usage. Les cookies nécessaires sont toujours actifs. Les autres sont optionnels et configurables selon vos préférences.",
                },
                {
                  title: 'Cookies nécessaires',
                  description:
                    "Ces cookies sont essentiels au bon fonctionnement du site et ne peuvent pas être désactivés.",
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analyse et performance',
                  description:
                    "Ces cookies nous permettent de mesurer l'audience et d'améliorer notre site.",
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
      onModalReady: ({ modalName, modal }) => {
        if (modalName === 'preferencesModal') {
          const body = modal.querySelector('.pm__body')
          if (body && !body.querySelector('.cc-logo')) {
            const logo = document.createElement('img')
            logo.src = '/MariusIA-logo.svg'
            logo.alt = 'Marius IA'
            logo.className = 'cc-logo'
            logo.style.cssText = 'height:64px;width:auto;margin-bottom:16px;display:block;'
            body.insertBefore(logo, body.firstChild)
          }
        }
      },
    })

    // Expose CookieConsent on window so footer can open preferences
    ;(window as unknown as { CookieConsent: typeof CookieConsent }).CookieConsent = CookieConsent
  }, [])

  return null
}
