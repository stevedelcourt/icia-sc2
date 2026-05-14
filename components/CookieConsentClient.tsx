'use client'

import dynamic from 'next/dynamic'

export const CookieConsentBanner = dynamic(() => import('@/components/CookieConsent'), { ssr: false })
