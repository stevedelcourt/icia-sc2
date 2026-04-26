'use client'

import { useEffect, useRef, useState } from 'react'

const MAPTILER_KEY = 'hlDK4JqkqAmVM3NkMA8g'

interface MapTilerMapProps {
  className?: string
}

export function MapTilerMap({ className = '' }: MapTilerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    async function initMap() {
      try {
        console.log('Map: Starting to load maplibre-gl')
        const maplibregl = await import('maplibre-gl')
        console.log('Map: Loaded maplibre-gl, Map constructor:', typeof maplibregl.Map)

        if (!mapContainer.current) {
          console.log('Map: No container, skipping')
          return
        }

        console.log('Map: Creating map')
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
        console.log('Map: Created successfully')
      } catch (e: any) {
        console.error('Map error:', e)
        setError(e.message || 'Failed to load map')
      }
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  if (error) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center bg-gray-100 text-red-500`}>
        Map error: {error}
      </div>
    )
  }

  return <div ref={mapContainer} className={`w-full h-full ${className}`} />
}