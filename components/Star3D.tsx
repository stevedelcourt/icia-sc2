'use client'

import { useEffect, useRef } from 'react'

export default function Star3D({
  size = 580,
  speed = 18,
  tilt = 0.20,
  className = '',
}: {
  size?: number
  speed?: number
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
    const SPHERE_R = size * 0.40
    const PERSP = size * 1.35

    const RAW = [
      [0,72],[14,55],[29,80],[44,61],[62,51],[78,75],
      [96,60],[113,64],[131,54],[149,70],[166,49],[182,63],
      [196,52],[212,66],[229,58],[249,73],[267,55],[285,49],
      [305,69],[323,53],[341,49],[354,66],[49,42],[168,37],
    ]

    const MAX_LEN = 80

    const spikes = RAW.map(([deg, len], i) => {
      const a = deg * Math.PI / 180
      const r = len / MAX_LEN
      const nx = r * Math.cos(a)
      const ny = r * Math.sin(a)
      const z = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
      return { nx, ny, nz: i % 2 === 0 ? z : -z }
    })

    const cosT = Math.cos(tilt)
    const sinT = Math.sin(tilt)

    let raf: number

    function render(t: number) {
      while (scene.firstChild) scene.removeChild(scene.firstChild)

      const angle = (t / 1000 / speed) * Math.PI * 2
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      const proj = spikes
        .map(({ nx, ny, nz }) => {
          let rx = nx * cosA + nz * sinA
          let ry = ny
          let rz = -nx * sinA + nz * cosA
          const ry2 = ry * cosT - rz * sinT
          const rz2 = ry * sinT + rz * cosT
          ry = ry2
          rz = rz2
          const zPx = rz * SPHERE_R
          const psc = PERSP / (PERSP - zPx)
          const ex = CX + rx * SPHERE_R * psc
          const ey = CY + ry * SPHERE_R * psc
          return { ex, ey, rz, depth: (rz + 1) / 2 }
        })
        .sort((a, b) => a.rz - b.rz)

      // lines
      for (const p of proj) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', String(CX))
        line.setAttribute('y1', String(CY))
        line.setAttribute('x2', String(p.ex))
        line.setAttribute('y2', String(p.ey))
        line.setAttribute('stroke', 'currentColor')
        line.setAttribute('stroke-opacity', '1')
        line.setAttribute('stroke-width', String(0.35 + p.depth * 1.55))
        scene.appendChild(line)
      }

      // dots
      for (const p of proj) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', String(p.ex))
        circle.setAttribute('cy', String(p.ey))
        circle.setAttribute('r', String(1.5 + p.depth * 4))
        circle.setAttribute('fill', 'currentColor')
        circle.setAttribute('fill-opacity', '1')
        scene.appendChild(circle)
      }

      // center dot
      const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      center.setAttribute('cx', String(CX))
      center.setAttribute('cy', String(CY))
      center.setAttribute('r', '2.5')
      center.setAttribute('fill', 'currentColor')
      center.setAttribute('fill-opacity', '1')
      scene.appendChild(center)

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [size, speed, tilt])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
    >
      <g id="scene" />
    </svg>
  )
}
