import { useEffect, useRef } from 'react'

// Cinematic "silk" flow field: agents follow a smoothly animated vector field
// and leave fading trails, forming flowing magenta→ember ribbons. Cheap layered
// trig is used as the field (no noise lib). Perf-guarded and reduced-motion aware.
export default function FlowField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf, agents, t = 0, running = true
    const pointer = { x: -9999, y: -9999, active: false }

    const lerp = (a, b, k) => a + (b - a) * k

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#1a0f24'
      ctx.fillRect(0, 0, w, h)
      const count = Math.min(420, Math.round((w * h) / 4200))
      agents = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        life: Math.random() * 200,
      }))
    }

    // Smoothly varying angle field — layered sines create curling flow.
    const field = (x, y) => {
      const s = 0.0019
      const a =
        Math.sin(x * s + t) * Math.cos(y * s - t * 0.8) +
        Math.sin((x + y) * s * 0.5 + t * 0.5) * 0.7
      return a * Math.PI
    }

    const step = () => {
      // translucent fade for silky trails
      ctx.fillStyle = 'rgba(26,15,36,0.055)'
      ctx.fillRect(0, 0, w, h)

      ctx.lineWidth = 1.2
      for (const p of agents) {
        let ang = field(p.x, p.y)

        // gentle pointer swirl
        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 40000) {
            ang += Math.atan2(dy, dx) * 0.25
          }
        }

        const px = p.x
        const py = p.y
        const speed = 1.5
        p.x += Math.cos(ang) * speed
        p.y += Math.sin(ang) * speed
        p.life += 1

        // color blends magenta → ember across the width
        const mix = Math.min(1, Math.max(0, p.x / w))
        const r = Math.round(lerp(209, 224, mix))
        const g = Math.round(lerp(116, 86, mix))
        const b = Math.round(lerp(210, 63, mix))
        ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        // respawn when off-screen or aged out
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life > 260) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.life = 0
        }
      }

      t += 0.0016
      if (running) raf = requestAnimationFrame(step)
    }

    if (reduced) {
      // static gradient fallback
      setup()
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, 'rgba(209,116,210,0.25)')
      g.addColorStop(1, 'rgba(224,86,63,0.18)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
      return
    }

    setup()
    raf = requestAnimationFrame(step)

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
        if (running) raf = requestAnimationFrame(step)
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
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
