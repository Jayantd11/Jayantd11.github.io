// Large decorative outlined number that drifts on scroll (parallax).
// Purely visual — sits behind section content.
export default function GhostNumber({ children, className = '', speed = 0.18 }) {
  return (
    <span
      aria-hidden
      data-parallax={speed}
      className={`pointer-events-none absolute select-none font-display text-[28vw] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(209,116,210,0.32)] md:text-[16rem] ${className}`}
    >
      {children}
    </span>
  )
}
