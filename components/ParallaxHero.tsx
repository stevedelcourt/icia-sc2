'use client'

import { useRef, useEffect } from 'react'

export default function ParallaxHero() {
  const backRef = useRef<HTMLImageElement>(null)
  const frontRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    let lastY = window.scrollY

    const tick = () => {
      const scrollY = window.scrollY
      if (scrollY !== lastY) {
        lastY = scrollY
        if (backRef.current) {
          backRef.current.style.transform = `translateY(${scrollY * 0.05}px)`
        }
        if (frontRef.current) {
          frontRef.current.style.transform = `translateY(${scrollY * 0.2}px)`
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{ position: 'relative', height: '50vh', overflow: 'hidden', background: '#f5f5f5' }}>
      <img
        ref={backRef}
        src="/images/proportions-back.webp"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
          zIndex: 1,
        }}
      />
      <img
        ref={frontRef}
        src="/images/proportions-front.webp"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
          zIndex: 2,
        }}
      />
    </div>
  )
}
