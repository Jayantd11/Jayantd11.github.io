import { useRef } from 'react'

// Wraps an element with a soft glow that follows the cursor (revealed on hover).
// Mirrors the project-card torch effect, but subtle — for cards/panels.
export default function Spotlight({
  as: Tag = 'div',
  className = '',
  glow = 'rgba(209,116,210,0.16)',
  radius = 260,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${(e.clientX - r.left).toFixed(0)}px`)
    el.style.setProperty('--sy', `${(e.clientY - r.top).toFixed(0)}px`)
  }
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`group/sp relative overflow-hidden ${className}`} {...rest}>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/sp:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--sx,50%) var(--sy,50%), ${glow}, transparent 70%)`,
        }}
      />
    </Tag>
  )
}
