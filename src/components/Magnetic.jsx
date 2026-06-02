import { useRef } from 'react'

// Wraps an element so it drifts toward the pointer while hovered, then eases
// back on leave. No-op on touch / coarse pointers and reduced motion.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  const active = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = ref.current
    if (!el || !active()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  )
}
