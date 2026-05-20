'use client'

import { useRef, useEffect, useCallback } from 'react'

const GAP = 30
const BASE = 0.15
const DECAY = 0.95
const GAIN = 0.03

export default function MarqueeHero() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const imgWRef = useRef(0)
  const offsetRef = useRef(0)
  const boostRef = useRef(0)
  const lastScrollRef = useRef(0)
  const rafRef = useRef(0)
  const measureTimer = useRef<ReturnType<typeof setTimeout>>()
  const fallbackTimer = useRef<ReturnType<typeof setTimeout>>()

  const measure = useCallback(() => {
    if (!trackRef.current) return
    const img = trackRef.current.querySelector('img') as HTMLImageElement | null
    if (!img) return
    imgWRef.current = img.getBoundingClientRect().width
  }, [])

  const imgRef = useCallback((el: HTMLImageElement | null) => {
    if (!el) return
    if (el.complete) { measure() }
    else { el.addEventListener('load', measure, { once: true }) }
  }, [measure])

  useEffect(() => {
    measure()
    const debouncedMeasure = () => {
      clearTimeout(measureTimer.current)
      measureTimer.current = setTimeout(measure, 250)
    }
    window.addEventListener('resize', debouncedMeasure)
    return () => {
      window.removeEventListener('resize', debouncedMeasure)
      clearTimeout(measureTimer.current)
    }
  }, [measure])

  useEffect(() => {
    // Fallback: retry measure if image hasn't loaded after 1s
    fallbackTimer.current = setTimeout(() => { if (imgWRef.current === 0) measure() }, 1000)
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

    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollRef.current
      lastScrollRef.current = scrollY

      // Ignore scroll up and overscroll bounce (mobile address bar, rubber-banding)
      if (delta <= 0) return

      // Clamp delta to prevent massive jumps (address bar hide/show)
      const clampedDelta = Math.min(delta, 200)
      boostRef.current += clampedDelta * GAIN
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const tick = () => {
      boostRef.current *= DECAY

      // Freeze when image is off-screen (replaces IntersectionObserver)
      const rect = wrapRef.current?.getBoundingClientRect()
      const visible = rect && rect.bottom > 0 && rect.top < window.innerHeight
      if (!visible) boostRef.current = 0

      const speed = BASE + boostRef.current
      offsetRef.current += speed // scroll right

      if (imgWRef.current > 0) {
        const wrapRange = 2 * (imgWRef.current + GAP)
        while (offsetRef.current > wrapRange) offsetRef.current -= wrapRange
        while (offsetRef.current < 0) offsetRef.current += wrapRange

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(fallbackTimer.current)
    }
  }, [])

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
        <img ref={imgRef} src="/images/hero-icia.avif" alt="" draggable={false} className="marquee-img" style={{ height: '25vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} className="marquee-img" style={{ height: '25vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} className="marquee-img" style={{ height: '25vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        <img src="/images/hero-icia.avif" alt="" draggable={false} className="marquee-img" style={{ height: '25vh', width: 'auto', flexShrink: 0, display: 'block', userSelect: 'none' }} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .marquee-img { height: 18vh !important; }
          .marquee-wrap { margin-top: clamp(32px, 6vw, 64px) !important; }
        }
      ` }} />
    </>
  )
}
