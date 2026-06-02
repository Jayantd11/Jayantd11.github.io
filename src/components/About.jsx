import { useReveal } from '../hooks/useReveal'
import Mask from './Mask'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import { about, aboutFacts } from '../data/content'

export default function About() {
  const ref = useReveal()
  const factsRef = useReveal()

  return (
    <section id="about" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28 md:py-40">
      <GhostNumber className="-right-4 -top-10 md:-top-20">01</GhostNumber>
      <SectionMeta label="Introduction" fig="Fig. 01" />

      <div className="relative grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <p className="eyebrow mb-4">01 — About</p>
          <Mask
            as="h2"
            className="font-display text-4xl font-bold leading-tight md:text-5xl"
            lines={['A little', <>about <span className="text-gradient">me</span></>]}
          />

          {/* quick facts */}
          <dl ref={factsRef} className="reveal mt-10 space-y-4">
            {aboutFacts.map((f) => (
              <div key={f.label} className="border-t border-white/10 pt-3">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/40">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm text-cream/80">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={ref} className="reveal space-y-6">
          {about.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-cream/75">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
