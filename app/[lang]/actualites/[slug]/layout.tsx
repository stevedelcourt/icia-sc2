import { getActualiteSlugs } from '@/generated/actualites'
import type { ReactNode } from 'react'

export async function generateStaticParams() {
  return getActualiteSlugs().flatMap(slug => [
    { lang: 'fr', slug },
    { lang: 'en', slug },
  ])
}

export default function ActualiteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
