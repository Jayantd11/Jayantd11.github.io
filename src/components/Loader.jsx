import { useEffect, useState } from 'react'

// Intro loader: a big "JD" monogram that fills like water — an animated wavy
// surface rises from bottom to top as progress climbs 0→100, then the panel
// lifts away. Locks scroll while active; skipped for reduced-motion.

// Wave path: period 200, drawn across 0→400 so a -200 horizontal loop is seamless.
const WAVE =
  'M0 8 q 50 -16 100 0 q 50 16 100 0 q 50 -16 100 0 q 50 16 100 0 L 400 130 L 0 130 Z'

export default function Loader() {
  // Plays on every load (skipped only for reduced-motion).
  const skip =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [count, setCount] = useState(0)
  const [done, setDone] = useState(skip)
  const [gone, setGone] = useState(skip)

  useEffect(() => {
    if (skip) return
    document.body.style.overflow = 'hidden'

    const start = performance.now()
    const DURATION = 2900
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      const eased = -(Math.cos(Math.PI * t) - 1) / 2 // easeInOutSine
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setDone(true)
        setTimeout(() => {
          document.body.style.overflow = ''
          window.scrollTo(0, 0)
          setGone(true)
        }, 700)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [skip])

  if (gone) return null

  // water surface y: 130 (below, empty) → -6 (above top, full)
  const level = 130 - (count / 100) * 136

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        done ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden
    >
      <div className="w-[clamp(16rem,40vw,32rem)]">
        <svg viewBox="0 0 200 130" className="w-full">
          <defs>
            <linearGradient id="ld-water" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#D174D2" />
              <stop offset="0.5" stopColor="#E0563F" />
              <stop offset="1" stopColor="#D174D2" />
            </linearGradient>
            <clipPath id="ld-jd">
              <text x="100" y="104" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="120">JD</text>
            </clipPath>
          </defs>

          {/* empty outline */}
          <text x="100" y="104" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="120"
            fill="none" stroke="rgba(245,241,247,0.22)" strokeWidth="1.4">JD</text>

          {/* water, clipped to the letters */}
          <g clipPath="url(#ld-jd)">
            <g transform={`translate(0 ${level.toFixed(1)})`}>
              {/* back wave */}
              <path d={WAVE} fill="url(#ld-water)" opacity="0.45">
                <animateTransform attributeName="transform" type="translate" from="0 4" to="-200 4" dur="3.2s" repeatCount="indefinite" />
              </path>
              {/* front wave */}
              <path d={WAVE} fill="url(#ld-water)">
                <animateTransform attributeName="transform" type="translate" from="0 0" to="-200 0" dur="2.1s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
      </div>

      <p className="mt-8 font-display text-xs uppercase tracking-[0.4em] text-cream/40">{count}%</p>
    </div>
  )
}
