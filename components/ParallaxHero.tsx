'use client'

import { useRef, useEffect, useCallback } from 'react'

const GAP = 30
const BASE_SPEED = 0.15
const BACK_VR = 0.2
const FRONT_VR = 0.5

export default function ParallaxHero() {
  const backTrackRef = useRef<HTMLDivElement>(null)
  const frontTrackRef = useRef<HTMLDivElement>(null)
  const imgWRef = useRef(0)
  const offsetRef = useRef(0)
  const scrollYRef = useRef(0)
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
    const debouncedMeasure = () => {
      clearTimeout(fallbackTimer.current)
      fallbackTimer.current = setTimeout(measure, 250)
    }
    window.addEventListener('resize', debouncedMeasure)
    fallbackTimer.current = setTimeout(() => { if (imgWRef.current === 0) measure() }, 1000)

    const handleScroll = () => { scrollYRef.current = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const tick = () => {
      offsetRef.current += BASE_SPEED

      const stepW = imgWRef.current + GAP
      if (imgWRef.current > 0) {
        const wrapRange = 4 * stepW
        while (offsetRef.current > wrapRange) offsetRef.current -= wrapRange
        while (offsetRef.current < 0) offsetRef.current += wrapRange

        const backY = scrollYRef.current * BACK_VR
        const frontY = scrollYRef.current * FRONT_VR

        if (backTrackRef.current) {
          backTrackRef.current.style.transform = `translateX(${-offsetRef.current}px) translateY(${backY}px)`
        }
        if (frontTrackRef.current) {
          frontTrackRef.current.style.transform = `translateX(${-offsetRef.current}px) translateY(${frontY}px)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', debouncedMeasure)
      window.removeEventListener('scroll', handleScroll)
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
      <div className="parallax-wrap" style={{ width: '100%', marginTop: 'var(--section-gap)' }}>
        {/* Back layer — visible, same height as marquee */}
        <div style={{ width: '100%', height: imgH, overflow: 'hidden', position: 'relative', background: '#f5f5f5' }}>
          <div ref={backTrackRef} style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content', willChange: 'transform' }}>
            <img ref={imgRef} src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-back.webp" alt="" draggable={false} style={sharedImg} />
          </div>
        </div>

        {/* Front layer — visible, same height as marquee */}
        <div style={{ width: '100%', height: imgH, overflow: 'hidden', position: 'relative', background: '#ffffff' }}>
          <div ref={frontTrackRef} style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content', willChange: 'transform' }}>
            <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
            <img src="/images/proportions-front.webp" alt="" draggable={false} style={sharedImg} />
          </div>
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
