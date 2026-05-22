'use client'

import { useRef, useEffect, useCallback } from 'react'

const GAP = 30
const BACK_SPEED = 0.08
const FRONT_BASE = 0.25
const FRONT_GAIN = 0.05
const DECAY = 0.95

export default function ParallaxHero() {
  const backTrackRef = useRef<HTMLDivElement>(null)
  const frontTrackRef = useRef<HTMLDivElement>(null)
  const imgWRef = useRef(0)
  const backOffsetRef = useRef(0)
  const frontOffsetRef = useRef(0)
  const frontBoostRef = useRef(0)
  const lastScrollRef = useRef(0)
  const rafRef = useRef(0)
  const fallbackTimer = useRef<ReturnType<typeof setTimeout>>()

  const measure = useCallback(() => {
    if (!backTrackRef.current) return
    const img = backTrackRef.current.querySelector('img') as HTMLImageElement | null
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
    window.addEventListener('resize', measure)
    fallbackTimer.current = setTimeout(() => { if (imgWRef.current === 0) measure() }, 1000)
    lastScrollRef.current = window.scrollY

    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollRef.current
      lastScrollRef.current = scrollY
      if (delta <= 0) return
      const clampedDelta = Math.min(delta, 200)
      frontBoostRef.current += clampedDelta * FRONT_GAIN
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const tick = () => {
      frontBoostRef.current *= DECAY
      const frontSpeed = FRONT_BASE + frontBoostRef.current

      backOffsetRef.current += BACK_SPEED
      frontOffsetRef.current += frontSpeed

      if (imgWRef.current > 0) {
        const stepW = imgWRef.current + GAP
        const wrapRange = 4 * stepW

        while (backOffsetRef.current > wrapRange) backOffsetRef.current -= wrapRange
        while (backOffsetRef.current < 0) backOffsetRef.current += wrapRange
        while (frontOffsetRef.current > wrapRange) frontOffsetRef.current -= wrapRange
        while (frontOffsetRef.current < 0) frontOffsetRef.current += wrapRange

        if (backTrackRef.current) {
          backTrackRef.current.style.transform = `translateX(${-backOffsetRef.current}px)`
        }
        if (frontTrackRef.current) {
          frontTrackRef.current.style.transform = `translateX(${-frontOffsetRef.current}px)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(fallbackTimer.current)
    }
  }, [measure])

  const imgH = 'var(--parallax-img-h, 25vh)'

  const sharedImg: React.CSSProperties = {
    height: imgH,
    width: 'auto',
    flexShrink: 0,
    display: 'block',
    userSelect: 'none',
  }

  return (
    <>
      <div className="parallax-wrap" style={{ position: 'relative', width: '100%', overflow: 'hidden', marginTop: 'var(--section-gap)' }}>
        {/* Back layer — constant slow drift */}
        <div ref={backTrackRef} style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content', willChange: 'transform', position: 'absolute', top: 0, left: 0 }}>
          <img ref={imgRef} src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
        </div>

        {/* Front layer — base drift + scroll acceleration */}
        <div ref={frontTrackRef} style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content', willChange: 'transform', position: 'relative', zIndex: 2 }}>
          <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
          <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --parallax-img-h: 25vh; }
        @media (max-width: 768px) {
          :root { --parallax-img-h: 18vh; }
          .parallax-wrap { margin-top: clamp(32px, 6vw, 64px) !important; }
        }
      ` }} />
    </>
  )
}
