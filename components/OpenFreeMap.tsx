'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'

const LNG = 5.366328
const LAT = 43.313887

interface OpenFreeMapProps {
  className?: string
}

export function OpenFreeMap({ className = '' }: OpenFreeMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)
  const recenterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [LNG, LAT],
      zoom: 14.5,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')

    const style = document.createElement('style')
    style.textContent = `
      @keyframes markerFloat {
        0%, 100% { transform: rotate(-45deg) translateY(0px); }
        50% { transform: rotate(-45deg) translateY(-8px); }
      }
      .maplibregl-canvas { outline: none !important; }
      .maplibregl-ctrl-attrib { display: none !important; }
    `
    document.head.appendChild(style)

    const el = document.createElement('div')
    el.innerHTML = `
      <div style="
        width: 42px;
        height: 42px;
        background: #1a2b4a;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #ffffff;
        box-shadow: 0 6px 20px rgba(0,0,0,0.45);
        animation: markerFloat 3s ease-in-out infinite;
        cursor: pointer;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        "></div>
      </div>
    `

    markerRef.current = new maplibregl.Marker({ element: el })
      .setLngLat([LNG, LAT])
      .addTo(map)

    mapRef.current = map

    map.on('load', () => {
      if (!mapRef.current) return

      // Animate to 3D perspective
      mapRef.current.easeTo({
        center: [LNG, LAT],
zoom: 14.5,
      pitch: 60,
      bearing: 10,
        duration: 1500,
        easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      })

      // Force WebGL repaint loop for first 600ms to fix depth buffer for fill-extrusion
      let frame = 0
      const repaintLoop = () => {
        if (!mapRef.current) return
        mapRef.current.triggerRepaint()
        frame++
        if (frame < 36) {
          rafRef.current = requestAnimationFrame(repaintLoop)
        }
      }
      rafRef.current = requestAnimationFrame(repaintLoop)
    })

    map.on('dragstart', () => {
      if (recenterTimer.current) clearTimeout(recenterTimer.current)
    })

    map.on('dragend', () => {
      recenterTimer.current = setTimeout(() => {
        if (!mapRef.current || !markerRef.current) return
        mapRef.current.easeTo({
          center: [LNG, LAT],
          zoom: 14.5,
          pitch: 60,
          bearing: 10,
          duration: 1200,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        })
        markerRef.current!.setLngLat([LNG, LAT])
      }, 2000)
    })

    map.on('zoomstart', () => {
      if (recenterTimer.current) clearTimeout(recenterTimer.current)
    })

    map.on('zoomend', () => {
      recenterTimer.current = setTimeout(() => {
        if (!mapRef.current || !markerRef.current) return
        mapRef.current.easeTo({
          center: [LNG, LAT],
          zoom: 14.5,
          pitch: 60,
          bearing: 10,
          duration: 1200,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        })
        markerRef.current!.setLngLat([LNG, LAT])
      }, 2000)
    })

    return () => {
      if (recenterTimer.current) clearTimeout(recenterTimer.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} className={className} />
}