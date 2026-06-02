import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-level instance so non-React code (e.g. anchor clicks) can drive it.
let lenisInstance = null

// Smoothly scroll to an element selector or offset. Falls back to native.
export function scrollToTarget(target) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -1 })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Initializes Lenis momentum scrolling for the app lifetime.
// Respects prefers-reduced-motion by skipping smoothing entirely.
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    // Scroll-driven parallax: any element with [data-parallax="<speed>"] is
    // translated relative to its own on-screen position. Positive = moves
    // slower (drifts down), negative = moves faster (drifts up).
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'))
    const applyParallax = () => {
      const vh = window.innerHeight
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax) || 0
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const offset = (center - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }
    lenis.on('scroll', applyParallax)
    applyParallax()

    // Scroll-velocity skew: elements with [data-skew] stretch/skew based on
    // how fast you're scrolling, then ease back to flat when you stop.
    const skewEls = Array.from(document.querySelectorAll('[data-skew]'))
    let targetSkew = 0
    let skew = 0
    lenis.on('scroll', ({ velocity }) => {
      targetSkew = Math.max(-2.5, Math.min(2.5, (velocity || 0) * 0.08))
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      // decay target toward 0 when not actively scrolling, ease current skew
      targetSkew *= 0.9
      skew += (targetSkew - skew) * 0.1
      if (Math.abs(skew) > 0.01) {
        for (const el of skewEls) {
          el.style.transform = `skewY(${skew.toFixed(2)}deg)`
        }
      }
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
