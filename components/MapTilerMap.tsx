'use client'

import { useEffect, useRef, useState } from 'react'

const MAPTILER_KEY = 'hlDK4JqkqAmVM3NkMA8g'
const MAPLIBRE_CDN = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js'

interface MapTilerMapProps {
  className?: string
}

export function MapTilerMap({ className = '' }: MapTilerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [mapLib, setMapLib] = useState<any>(null)
  const mapRef = useRef<any>(null)

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />
}
