'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Partner {
  name: string
  logo: string
  website: string
}

export function PartnerLogos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [partners, setPartners] = useState<Partner[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    // Try to load from static JSON first (for static export)
    fetch('/partners.json')
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setPartners(data)
        }
      })
      .catch(() => {
        // Fallback to API (for Vercel)
        fetch('/api/partners')
          .then(r => r.json())
          .then(setPartners)
          .catch(() => setPartners([]))
      })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  if (partners.length === 0) {
    return (
      <section className="relative overflow-hidden py-8 bg-[#00255D]">
        <div className="h-28 flex items-center justify-center">
          <div className="animate-pulse text-white/30">Chargement...</div>
        </div>
      </section>
    )
  }

  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="relative overflow-hidden py-8">
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(270deg, #00255D, #023D87, #00255D);
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-container {
          animation: scroll 25s linear infinite;
        }
        .scroll-container:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .scroll-container {
            animation: scroll 12s linear infinite;
          }
        }
      `}</style>
      <div className="gradient-bg absolute inset-0" />
      <div 
        ref={containerRef}
        className="relative scroll-container flex gap-16 overflow-x-hidden cursor-grab active:cursor-grabbing px-8"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ width: '200%' }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div key={`${partner.name}-${index}`} className="flex-shrink-0 flex items-center" style={{ width: '300px' }}>
            {partner.website ? (
              <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={280}
                  height={140}
                  className="h-28 w-auto object-contain"
                  priority={index < partners.length}
                  unoptimized={partner.logo.startsWith('http')}
                />
              </a>
            ) : (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={280}
                height={140}
                className="h-28 w-auto object-contain"
                priority={index < partners.length}
                unoptimized={partner.logo.startsWith('http')}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
