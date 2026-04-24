'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollGradientProps {
  startColor?: 'blue' | 'green' | 'white'
}

export default function ScrollGradient({ startColor = 'blue' }: ScrollGradientProps) {
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const maxScroll = 2000
  const progress = Math.min(scrollY / maxScroll, 1)
  
  let startR: number, startG: number, startB: number
  
  if (startColor === 'green') {
    startR = 189
    startG = 245
    startB = 171
  } else if (startColor === 'white') {
    startR = 250
    startG = 250
    startB = 250
  } else {
    startR = 174
    startG = 189
    startB = 219
  }
  
  const r = Math.round(startR + (235 - startR) * progress)
  const g = Math.round(startG + (235 - startG) * progress)
  const b = Math.round(startB + (240 - startB) * progress)
  
  const bgColor = `rgb(${r}, ${g}, ${b})`

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: bgColor, transition: 'background 0.3s ease-out' }}
    />
  )
}
