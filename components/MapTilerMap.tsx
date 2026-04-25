'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAPTILER_KEY = 'hlDK4JqkqAmVM3NkMA8g'

interface MapTilerMapProps {
  className?: string
}

export function MapTilerMap({ className = '' }: MapTilerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
      center: [5.3637474, 43.3136605],
      zoom: 16,
      attributionControl: false,
    })

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')

    new maplibregl.Marker({ color: '#00255D' })
      .setLngLat([5.3637474, 43.3136605])
      .addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />
}
