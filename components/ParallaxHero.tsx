'use client'

import { useRef, useEffect, useCallback } from 'react'

const BACK_RATIO = 0.2   // back moves at 20% of scroll speed
const FRONT_RATIO = 0.5  // front moves at 50% of scroll speed

export default function ParallaxHero() {
  const backRef = useRef<HTMLImageElement>(null)
  const frontRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef(0)

  const measure = useCallback(() => {
    // no-op for vertical parallax, but kept for future
  }, [])

  useEffect(() => {
    measure()
    let lastY = window.scrollY

    const tick = () => {
      const scrollY = window.scrollY
      if (scrollY !== lastY) {
        lastY = scrollY
        if (backRef.current) {
          backRef.current.style.transform = `translateY(${scrollY * BACK_RATIO}px)`
        }
        if (frontRef.current) {
          frontRef.current.style.transform = `translateY(${scrollY * FRONT_RATIO}px)`
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [measure])

  return (
    <section style={{ marginTop: 'var(--section-gap)' }}>
      <div style={{ position: 'relative', width: '100%', height: 'clamp(40vh, 50vh, 60vh)', overflow: 'hidden', background: '#f5f5f5' }}>
        {/* Back layer — slower */}
        <img
          ref={backRef}
          src="/images/proportions-back.webp"
          alt=""
          style={{
            position: 'absolute',
            top: '-50%',
            left: 0,
            width: '100%',
            height: '200%',
            objectFit: 'cover',
            willChange: 'transform',
            zIndex: 1,
          }}
        />

        {/* Front layer — faster */}
        <img
          ref={frontRef}
          src="/images/proportions-front.webp"
          alt=""
          style={{
            position: 'absolute',
            top: '-50%',
            left: 0,
            width: '100%',
            height: '200%',
            objectFit: 'cover',
            willChange: 'transform',
            zIndex: 2,
          }}
        />
      </div>
    </section>
  )
}
