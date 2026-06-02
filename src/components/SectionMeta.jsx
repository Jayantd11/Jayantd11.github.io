// Minimal editorial labels echoing the hero: a vertical side label + a small
// "figure" caption in the corner. Purely decorative, desktop-only.
export default function SectionMeta({ label, fig, side = 'left' }) {
  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-display text-[0.65rem] uppercase tracking-[0.4em] text-cream/35 lg:block ${
          side === 'right' ? 'right-0 rotate-180' : 'left-0'
        }`}
      >
        {label}
      </span>
      {fig && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 z-20 hidden font-display text-[0.65rem] uppercase tracking-[0.3em] text-cream/25 md:block"
        >
          {fig}
        </span>
      )}
    </>
  )
}
