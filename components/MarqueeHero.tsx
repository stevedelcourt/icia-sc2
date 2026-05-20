'use client'

import { useRef, useEffect, useCallback } from 'react'

const GAP = 30
const BASE = 0.15   // pixels/frame auto-drift
const DECAY = 0.95   // boost decay per frame
const GAIN = 0.03    // scroll delta → boost multiplier

export default function MarqueeHero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const imgWRef = useRef(0)
  const offsetRef = useRef(0)
  const boostRef = useRef(0)
  const lastScrollRef = useRef(0)
  const rafRef = useRef(0)

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
    if (isMobile) {
      requestAnimationFrame(() => {
        if (imgWRef.current > 0) {
          const containerW = window.innerWidth
          offsetRef.current = (imgWRef.current - containerW) / 2
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
          }
        }
      })
    }

    lastScrollRef.current = window.scrollY

    // IntersectionObserver: freeze when image is off-screen
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) boostRef.current = 0
    }, { threshold: 0.01 })
    if (wrapRef.current) obs.observe(wrapRef.current)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollRef.current
      lastScrollRef.current = scrollY
      // scroll down (delta > 0) feeds boost, scroll up reduces it
      boostRef.current = Math.max(0, boostRef.current + delta * GAIN)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const tick = () => {
      boostRef.current *= DECAY
      const speed = BASE + boostRef.current
      offsetRef.current += speed

      const stepW = imgWRef.current + GAP
      if (stepW > 0) {
        while (offsetRef.current > stepW) offsetRef.current -= stepW
        while (offsetRef.current < 0) offsetRef.current += stepW

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const imgH = `var(--marquee-img-h, 25vh)`

  return (
    <>
      <div ref={wrapRef} className="marquee-wrap" style={{ width: '100%', overflow: 'hidden', marginTop: 'var(--section-gap)' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: imgH, width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
          <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: imgH, width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
          <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: imgH, width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
          <img src="/images/hero-icia.avif" alt="" draggable={false} style={{ height: imgH, width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --marquee-img-h: 25vh; }
        @media (max-width: 768px) {
          :root { --marquee-img-h: 18vh; }
          .marquee-wrap { margin-top: clamp(32px, 6vw, 64px) !important; }
        }
      ` }} />
    </>
  )
}
