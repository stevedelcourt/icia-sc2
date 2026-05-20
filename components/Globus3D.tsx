'use client'

import { useEffect, useRef } from 'react'

export default function Globus3D({
  size = 580,
  speed = 22,
  count = 500,
  tilt = 0.23,
  className = '',
}: {
  size?: number
  speed?: number
  count?: number
  tilt?: number
  className?: string
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const scene = svg.querySelector('#scene')!
    if (!scene) return

    const CX = size / 2
    const CY = size / 2
    const SPHERE_R = size * 0.39
    const PERSP = size * 1.4
    const BASE = SPHERE_R / 80
    const PHI = Math.PI * (3 - Math.sqrt(5))

    const cosT = Math.cos(tilt)
    const sinT = Math.sin(tilt)

    const pts = Array.from({ length: count }, (_, i) => {
      const y3 = 1 - ((i + 0.5) / count) * 2
      const rho = Math.sqrt(Math.max(0, 1 - y3 * y3))
      const th = PHI * i
      return { x3: rho * Math.cos(th), y3, z3: rho * Math.sin(th) }
    })

    let raf: number

    function render(t: number) {
      while (scene.firstChild) scene.removeChild(scene.firstChild)

      const angle = (t / 1000 / speed) * Math.PI * 2
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      const proj = pts
        .map(({ x3, y3, z3 }) => {
          let rx = x3 * cosA + z3 * sinA
          let ry = y3
          let rz = -x3 * sinA + z3 * cosA
          const ry2 = ry * cosT - rz * sinT
          const rz2 = ry * sinT + rz * cosT
          ry = ry2
          rz = rz2
          const zPx = rz * SPHERE_R
          const psc = PERSP / (PERSP - zPx)
          const px = CX + rx * SPHERE_R * psc
          const py = CY - ry * SPHERE_R * psc
          const depth = (rz + 1) / 2
          const dotR = (0.4 + depth * 2.4) * BASE * psc
          return { px, py, rz, depth, dotR }
        })
        .sort((a, b) => a.rz - b.rz)

      for (const p of proj) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', String(p.px))
        circle.setAttribute('cy', String(p.py))
        circle.setAttribute('r', String(Math.max(0.3, p.dotR)))
        circle.setAttribute('fill', 'currentColor')
        circle.setAttribute('fill-opacity', '1')
        scene.appendChild(circle)
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [size, speed, count, tilt])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <g id="scene" />
    </svg>
  )
}
