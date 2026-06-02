import { useEffect, useRef } from 'react'

// Bold, erratic "ink splash" blooms that wander chaotically, pulse, shift color
// as they move, and chase the cursor. Additive blending glows over the contour
// waves. Perf-light (radial-gradient lobes) + reduced-motion aware.

// Color palette the splashes continuously cycle through.
const PAL = [
  [209, 116, 210], // magenta
  [224, 86, 63],   // ember
  [150, 90, 190],  // violet
  [245, 181, 246], // pink
  [120, 150, 230], // periwinkle
]

export default function Splash() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Skip this heavier additive-blend canvas on small screens for performance;
    // the contour waves remain as the hero backdrop.
    const small = window.matchMedia('(max-width: 767px)').matches
    if (reduced || small) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf, running = true
    const pointer = { x: -9999, y: -9999, active: false }
    const lerp = (a, b, k) => a + (b - a) * k

    const colorAt = (p) => {
      p = ((p % 1) + 1) % 1
      const n = PAL.length
      const f = p * n
      const i = Math.floor(f)
      const k = f - i
      const a = PAL[i % n]
      const b = PAL[(i + 1) % n]
      return [
        Math.round(lerp(a[0], b[0], k)),
        Math.round(lerp(a[1], b[1], k)),
        Math.round(lerp(a[2], b[2], k)),
      ]
    }

    let blobs = []
    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const base = Math.min(w, h)
      blobs = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: base * (0.28 + Math.random() * 0.18),
        rT: base * (0.28 + Math.random() * 0.18),
        ct: Math.random(),
        cs: 0.0016 + Math.random() * 0.002, // color cycle speed
        burst: 0,
      }))
    }

    const lobe = (x, y, r, col, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${a})`)
      g.addColorStop(0.45, `rgba(${col[0]},${col[1]},${col[2]},${a * 0.4})`)
      g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (const b of blobs) {
        // erratic wander
        b.vx += (Math.random() - 0.5) * 1.4
        b.vy += (Math.random() - 0.5) * 1.4

        // cursor attraction + a colour "burst" when it gets close
        if (pointer.active) {
          const dx = pointer.x - b.x
          const dy = pointer.y - b.y
          const dist = Math.hypot(dx, dy) || 1
          b.vx += (dx / dist) * 0.7
          b.vy += (dy / dist) * 0.7
          if (dist < 150) {
            b.burst = Math.min(1, b.burst + 0.06)
            b.cs = 0.006 // colour shifts faster on splash
          }
        }
        b.burst *= 0.96
        if (b.burst < 0.02) b.cs = Math.max(0.0016, b.cs * 0.98)

        // damp + speed clamp
        b.vx *= 0.94
        b.vy *= 0.94
        const sp = Math.hypot(b.vx, b.vy)
        const MAX = 3.2
        if (sp > MAX) {
          b.vx = (b.vx / sp) * MAX
          b.vy = (b.vy / sp) * MAX
        }
        b.x += b.vx
        b.y += b.vy

        // soft bounce within bounds
        const m = 0.04
        if (b.x < w * m) { b.x = w * m; b.vx = Math.abs(b.vx) }
        if (b.x > w * (1 - m)) { b.x = w * (1 - m); b.vx = -Math.abs(b.vx) }
        if (b.y < h * m) { b.y = h * m; b.vy = Math.abs(b.vy) }
        if (b.y > h * (1 - m)) { b.y = h * (1 - m); b.vy = -Math.abs(b.vy) }

        // erratic radius retargeting
        if (Math.random() < 0.01) b.rT = Math.min(w, h) * (0.26 + Math.random() * 0.22)
        b.r += (b.rT - b.r) * 0.04

        // colour cycles as it moves; brighter on burst
        b.ct += b.cs + sp * 0.0006
        const col = colorAt(b.ct)
        const a = 0.26 + b.burst * 0.2
        const r = b.r * (1 + b.burst * 0.16)

        lobe(b.x, b.y, r, col, a)
        lobe(b.x + r * 0.34, b.y - r * 0.24, r * 0.6, colorAt(b.ct + 0.1), a * 0.7)
        lobe(b.x - r * 0.3, b.y + r * 0.32, r * 0.55, colorAt(b.ct - 0.1), a * 0.6)
      }

      ctx.globalCompositeOperation = 'source-over'
      if (running) raf = requestAnimationFrame(render)
    }

    setup()

    if (reduced) {
      const r = requestAnimationFrame(() => { running = false; render() })
      return () => cancelAnimationFrame(r)
    }

    raf = requestAnimationFrame(render)

    const onResize = () => setup()
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => (pointer.active = false)

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running) raf = requestAnimationFrame(render)
        else cancelAnimationFrame(raf)
      },
      { threshold: 0 }
    )
    io.observe(canvas)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90 [filter:blur(6px)]"
    />
  )
}
