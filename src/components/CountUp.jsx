import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `to` when scrolled into view. Respects reduced motion
// (shows the final value immediately).
export default function CountUp({ to, decimals = 0, duration = 1600, className = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVal(to)
      return
    }

    let raf
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setVal(to * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    // safety if observer is delayed
    const fallback = setTimeout(() => setVal(to), 2500)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [to, duration])

  const display =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString('en-US')

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
