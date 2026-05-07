'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'

const MAPTILER_KEY = 'hlDK4JqkqAmVM3NkMA8g'

interface MapTilerMapProps {
  className?: string
}

export function MapTilerMap({ className = '' }: MapTilerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    try {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
        center: [5.366328, 43.313887],
        zoom: 14,
        attributionControl: false,
      })

      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')

      new maplibregl.Marker({ color: '#00255D' })
        .setLngLat([5.366328, 43.313887])
        .addTo(map)

      mapRef.current = map
    } catch (e: any) {
      console.error('Map error:', e)
    }
  }, [])

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />
}