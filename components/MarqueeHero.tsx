'use client'

import { useRef, useEffect, useCallback } from 'react'

export default function MarqueeHero() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const targetRef = useRef(0)
  const velocityRef = useRef(0)
  const imgWRef = useRef(0)
  const rafRef = useRef(0)
  const startedRef = useRef(false)

  const GAP = 30

  const measure = useCallback(() => {
    if (!trackRef.current) return
    const img = trackRef.current.querySelector('img') as HTMLImageElement | null
    if (!img) return
    imgWRef.current = img.getBoundingClientRect().width
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)

  }, [measure])

  useEffect(() => {
    // Start mobile centered
    const isMobile = window.innerWidth <= 768
    if (isMobile && imgWRef.current > 0) {
      const containerW = window.innerWidth
      const centerOffset = (imgWRef.current - containerW) / 2
      offsetRef.current = centerOffset
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-centerOffset}px)`
      }
    }
    startedRef.current = true

    const handleMove = (clientX: number) => {
      const w = window.innerWidth
      const normalized = (clientX / w) * 2 - 1 // -1 (left) → +1 (right)
      const eased = normalized * normalized * normalized // cubic easing
      const maxSpeed = 6
      targetRef.current = eased * maxSpeed
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX)
    }
    const onTouchEnd = () => { targetRef.current = 0 }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    const tick = () => {
      // Smooth velocity interpolation
      velocityRef.current += (targetRef.current - velocityRef.current) * 0.08

      const stepW = imgWRef.current + GAP
      if (stepW <= 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      offsetRef.current += velocityRef.current

      // Infinite loop wrap
      while (offsetRef.current > stepW) offsetRef.current -= stepW
      while (offsetRef.current < 0) offsetRef.current += stepW

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ width: '100%', overflow: 'hidden', marginTop: 'var(--section-gap)' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: `${GAP}px`,
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: '35vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: '35vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: '35vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: '35vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
      </div>
    </div>
  )
}
