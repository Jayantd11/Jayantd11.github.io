import { useEffect, useRef } from 'react'

// Animated topographic contours — the Lando-style background. An evolving
// scalar field is sampled on a grid and its iso-lines are traced with marching
// squares, producing organic, nested, slowly-morphing contour "waves".
// Magenta→ember palette, subtle over dark. Perf-guarded + reduced-motion aware.
//
// Marching-squares connections keyed by corner bits a=tl(8) b=tr(4) c=br(2) d=bl(1).
const CASES = {
  1: [['L', 'B']],
  2: [['B', 'R']],
  3: [['L', 'R']],
  4: [['T', 'R']],
  5: [['T', 'L'], ['B', 'R']],
  6: [['T', 'B']],
  7: [['T', 'L']],
  8: [['T', 'L']],
  9: [['T', 'B']],
  10: [['T', 'R'], ['B', 'L']],
  11: [['T', 'R']],
  12: [['L', 'R']],
  13: [['B', 'R']],
  14: [['L', 'B']],
}

export default function Waves() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf, t = 0, running = true
    // Coarser grid + fewer contour levels on small screens for performance.
    const small = window.matchMedia('(max-width: 767px)').matches
    const CELL = small ? 44 : 30
    const LEVELS = small ? 7 : 11
    let cols, rows, grid
    const pointer = { x: -9999, y: -9999, active: false }
    const lerp = (a, b, k) => a + (b - a) * k

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL) + 1
      rows = Math.ceil(h / CELL) + 1
      grid = new Float32Array(cols * rows)
    }

    // Evolving scalar field — layered sines give smooth organic terrain.
    const fieldAt = (x, y) => {
      let v =
        Math.sin(x * 0.0032 + t) +
        Math.sin(y * 0.0041 - t * 0.8) +
        Math.sin((x + y) * 0.0026 + t * 0.5) +
        Math.sin((x - y) * 0.0036 - t * 0.35)
      if (pointer.active) {
        const dx = x - pointer.x
        const dy = y - pointer.y
        v += 2.2 * Math.exp(-(dx * dx + dy * dy) / 90000)
      }
      return v
    }

    const interp = (la, lb, level) => {
      const d = lb - la
      if (Math.abs(d) < 1e-6) return 0.5
      return (level - la) / d
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // sample field
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid[r * cols + c] = fieldAt(c * CELL, r * CELL)
        }
      }

      const minL = -3.2
      const maxL = 3.2
      for (let li = 0; li < LEVELS; li++) {
        const f = li / (LEVELS - 1)
        const level = lerp(minL, maxL, f)

        const cr = 245
        const cg = 241
        const cb = 247
        const centerGlow = 1 - Math.abs(f - 0.5) * 1.5
        const alpha = 0.16 + Math.max(0, centerGlow) * 0.4

        ctx.beginPath()
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const gx = c * CELL
            const gy = r * CELL
            const va = grid[r * cols + c] // tl
            const vb = grid[r * cols + c + 1] // tr
            const vc = grid[(r + 1) * cols + c + 1] // br
            const vd = grid[(r + 1) * cols + c] // bl

            let idx = 0
            if (va > level) idx |= 8
            if (vb > level) idx |= 4
            if (vc > level) idx |= 2
            if (vd > level) idx |= 1
            const conns = CASES[idx]
            if (!conns) continue

            const pt = (edge) => {
              switch (edge) {
                case 'T':
                  return [gx + interp(va, vb, level) * CELL, gy]
                case 'R':
                  return [gx + CELL, gy + interp(vb, vc, level) * CELL]
                case 'B':
                  return [gx + interp(vd, vc, level) * CELL, gy + CELL]
                case 'L':
                  return [gx, gy + interp(va, vd, level) * CELL]
                default:
                  return [gx, gy]
              }
            }
            for (const [e1, e2] of conns) {
              const p1 = pt(e1)
              const p2 = pt(e2)
              ctx.moveTo(p1[0], p1[1])
              ctx.lineTo(p2[0], p2[1])
            }
          }
        }
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
        ctx.lineWidth = 1.1
        ctx.stroke()
      }

      t += 0.005
      if (running) raf = requestAnimationFrame(render)
    }

    setup()

    if (reduced) {
      const r = requestAnimationFrame(() => {
        running = false
        render()
      })
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
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
