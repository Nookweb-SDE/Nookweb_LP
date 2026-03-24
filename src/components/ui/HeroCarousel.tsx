'use client'

import { useRef, useEffect } from 'react'
import { HERO_CAROUSEL_ITEMS } from '@/data/heroCarousel'

const VERTICAL_RATIO = 1.9
const RADIUS_BOOST = 0.75
const SPEED_PX_PER_SEC = 60

export function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const items = Array.from(track.querySelectorAll<HTMLElement>('.hero-orbit-item'))
    const count = items.length
    if (count === 0) return

    const baseAngles = Array.from({ length: count }, (_, i) => (Math.PI * 2 / count) * i)

    let radiusX = 120
    let radiusY = radiusX * VERTICAL_RATIO
    let phase = 0
    let lastTime = performance.now()

    function recalcRadius() {
      if (!track) return
      const rect = track.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height)
      radiusX = size * 0.24 * RADIUS_BOOST
      radiusY = radiusX * VERTICAL_RATIO
    }

    function render() {
      for (let i = 0; i < count; i++) {
        const t = baseAngles[i] + phase
        const x = Math.cos(t) * radiusX
        const y = Math.sin(t) * radiusY
        const scale = 0.88 + 0.14 * (1 + Math.cos(t)) / 2
        items[i].style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      }
    }

    function tick(now: number) {
      const dt = (now - lastTime) / 1000
      lastTime = now
      const vx = -radiusX * Math.sin(phase)
      const vy = radiusY * Math.cos(phase)
      const mag = Math.hypot(vx, vy) || 1
      phase = (phase + (SPEED_PX_PER_SEC * dt) / mag) % (Math.PI * 2)
      render()
      requestAnimationFrame(tick)
    }

    recalcRadius()
    window.addEventListener('resize', recalcRadius)
    render()
    const frame = requestAnimationFrame((t) => {
      lastTime = t
      tick(t)
    })
    return () => {
      window.removeEventListener('resize', recalcRadius)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="hero-orbit">
      <div ref={trackRef} className="hero-orbit-track">
        {HERO_CAROUSEL_ITEMS.map((item, i) => (
          <div key={`${item.label}-${i}`} className="hero-orbit-item">
            <div className="hero-orbit-item-inner">
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt=""
                    className="hero-orbit-item-img"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <span className="hero-orbit-item-label">
                    <span className="hero-orbit-dot" />
                    {item.label}
                  </span>
                </>
              ) : (
                <span className="hero-orbit-item-label hero-orbit-item-label-only">
                  <span className="hero-orbit-dot" />
                  {item.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
