'use client'

import { useEffect, useState } from 'react'
import { useT } from '@/lib/i18n'

export default function SpeedBanner() {
  const t = useT()
  const [loadTime, setLoadTime] = useState<number | null>(null)

  useEffect(() => {
    const calculateSpeed = () => {
      setTimeout(() => {
        const timing = (
          window.performance as unknown as { timing: PerformanceTiming }
        ).timing

        if (timing && timing.navigationStart > 0) {
          const time = Date.now() - timing.navigationStart
          setLoadTime(time)
        } else {
          const entries = window.performance.getEntriesByType('navigation')
          if (entries.length > 0) {
            const navEntry = entries[0] as PerformanceNavigationTiming
            setLoadTime(navEntry.loadEventEnd - navEntry.startTime)
          }
        }
      }, 0)
    }

    if (document.readyState === 'complete') {
      calculateSpeed()
    } else {
      window.addEventListener('load', calculateSpeed)
      return () => window.removeEventListener('load', calculateSpeed)
    }
  }, [])

  if (!loadTime) return null

  const seconds = (loadTime / 1000).toFixed(2)

  return (
    <div className="w-full py-1 text-[10px] text-center text-gray-400 bg-gray-50 border-t border-gray-100 uppercase tracking-widest">
      {t('speed_banner.text').replace('{seconds}', seconds)}
    </div>
  )
}