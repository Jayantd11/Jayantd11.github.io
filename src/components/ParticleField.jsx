import { useEffect, useRef } from 'react'

// Light canvas particle-network: nodes drift, near neighbors are linked,
// pointer gently attracts. Perf-guarded: low node count scaled to viewport,
// clamped DPR, paused when offscreen, disabled for reduced motion.
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf
    let running = true
    const pointer = { x: -999, y: -999 }

    let particles = []
    const LINK_DIST = 130

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Scale count to area, kept modest for performance.
      const count = Math.min(70, Math.round((w * h) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // gentle pointer attraction
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < 26000) {
          p.vx += (dx / 8000) * 0.6
          p.vy += (dy / 8000) * 0.6
        }
        // clamp speed
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx))
        p.vy = Math.max(-0.8, Math.min(0.8, p.vy))

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(209,116,210,0.7)'
        ctx.fill()
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22
            ctx.strokeStyle = `rgba(224,86,63,${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (running) raf = requestAnimationFrame(step)
    }

    setup()
    raf = requestAnimationFrame(step)

    const onResize = () => setup()
    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onLeave = () => {
      pointer.x = -999
      pointer.y = -999
    }

    // pause when scrolled offscreen
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
    window.addEventListener('mousemove', onPointer)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onPointer)
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
