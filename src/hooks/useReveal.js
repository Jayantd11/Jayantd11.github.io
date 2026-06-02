import { useEffect, useRef } from 'react'

// Adds `.is-visible` to the element when it enters the viewport.
// Pair with `.reveal` / `.mask-inner` in index.css. Respects reduced-motion.
//
// Robustness: elements already on-screen at mount are revealed on the next
// frame (so the CSS transition still plays), and a safety timeout guarantees
// content is never left permanently hidden if observer callbacks are delayed.
export function useReveal({ threshold = 0.14 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => el.classList.add('is-visible')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      reveal()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal()
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)

    // If it's already in view at mount, reveal on the next frame so the
    // transition animates rather than waiting on an observer callback.
    const raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) reveal()
    })

    // Last-resort safety: never leave content stuck hidden.
    const fallback = setTimeout(reveal, 3000)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [threshold])

  return ref
}
