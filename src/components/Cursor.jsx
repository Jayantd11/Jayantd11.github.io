import { useEffect, useRef, useState } from 'react'

// Custom cursor: an instant dot + a lagging ring that enlarges over
// interactive targets. Only active on fine pointers (mouse) and when the
// user hasn't requested reduced motion.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    setEnabled(true)
    document.body.classList.add('has-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const isInteractive = (el) =>
      el && (el.closest('a, button, [data-cursor]') ? true : false)

    const onOver = (e) => {
      ringRef.current?.classList.toggle('cursor-ring--active', isInteractive(e.target))
    }

    let raf
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
