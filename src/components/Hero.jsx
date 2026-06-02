import Waves from './Waves'
import Splash from './Splash'
import Mask from './Mask'
import Magnetic from './Magnetic'
import { profile } from '../data/content'
import { scrollToTarget } from '../hooks/useLenis'

export default function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Flowing contour waves + drifting ink splashes over them */}
      <Waves />
      <Splash />

      {/* Vignette + directional darkening for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50"
      />
      {/* Warm glow bloom behind the name */}
      <div
        aria-hidden
        className="absolute left-[10%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-magenta/20 blur-[130px]"
      />

      {/* ── Editorial micro-labels (Lando-style) ─────────────────────── */}
      {/* left vertical label */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] md:block">
        <span className="font-display text-xs uppercase tracking-[0.4em] text-cream/35">
          Portfolio — 2026
        </span>
      </div>
      {/* location, bottom-right */}
      <div className="absolute bottom-10 right-8 hidden text-right md:block">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-cream/45">
          {profile.location}
        </p>
        <p className="mt-1 font-display text-[0.65rem] uppercase tracking-[0.3em] text-cream/25">
          42.36° N
        </p>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <p className="eyebrow mb-8 reveal is-visible">
          {profile.role} · {profile.role2}
        </p>

        <Mask
          as="h1"
          className="font-display text-[clamp(3.75rem,15vw,13rem)] font-bold leading-[0.84] tracking-[-0.03em] drop-shadow-[0_2px_40px_rgba(0,0,0,0.4)]"
          stagger={120}
          lines={['Jayant', <span className="text-gradient">Dulani</span>]}
        />

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-cream/75">
          {profile.tagline}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              data-cursor
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#work')
              }}
              className="inline-block rounded-full bg-ember px-7 py-3 text-sm font-semibold text-ink"
            >
              View my work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-cursor
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#contact')
              }}
              className="inline-block rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-cream/80 transition-colors hover:border-magenta hover:text-magenta"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>

    </section>
  )
}
