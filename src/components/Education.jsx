import { useReveal } from '../hooks/useReveal'
import Mask from './Mask'
import AbstractArt from './AbstractArt'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import Spotlight from './Spotlight'
import { education, awards } from '../data/content'

export default function Education() {
  const ref = useReveal()

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28 md:py-40">
      <GhostNumber className="-left-4 -top-10 md:-top-16">05</GhostNumber>
      <SectionMeta label="Academic" fig="Fig. 05" side="right" />
      <AbstractArt
        variant="orbit"
        className="pointer-events-none absolute -right-10 top-10 hidden h-72 w-72 opacity-30 md:block"
      />

      <div className="relative mb-16 max-w-2xl">
        <p className="eyebrow mb-4">05 — Education</p>
        <Mask
          as="h2"
          className="font-display text-4xl font-bold leading-tight md:text-5xl"
          lines={['Background', <span className="text-gradient">& honors</span>]}
        />
      </div>

      <div ref={ref} className="reveal grid gap-6 md:grid-cols-2">
        <Spotlight
          data-cursor
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-magenta/40"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
            Education
          </p>
          <h3 className="font-display text-2xl font-bold">{education.degree}</h3>
          <p className="mt-1 text-lg text-cream/80">{education.school}</p>
          <p className="mt-3 text-sm text-cream/60">{education.detail}</p>
        </Spotlight>

        <Spotlight
          data-cursor
          glow="rgba(224,86,63,0.16)"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
            Awards
          </p>
          {awards.map((a) => (
            <div key={a.title}>
              <h3 className="font-display text-xl font-bold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{a.detail}</p>
            </div>
          ))}
        </Spotlight>
      </div>
    </section>
  )
}
