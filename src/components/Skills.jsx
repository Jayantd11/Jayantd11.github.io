import { useReveal } from '../hooks/useReveal'
import Mask from './Mask'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import FloatingIcons from './FloatingIcons'
import { skills } from '../data/content'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28 md:py-40">
      <GhostNumber className="-left-4 -top-10 md:-top-20">04</GhostNumber>
      <SectionMeta label="Toolkit" fig="Fig. 04" side="right" />
      <FloatingIcons />
      <div className="relative z-10">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">04 — Toolkit</p>
          <Mask
            as="h2"
            className="font-display text-4xl font-bold leading-tight md:text-5xl"
            lines={['What I', <>work <span className="text-gradient">with</span></>]}
          />
        </div>

        <div ref={ref} className="reveal">

        <div className="grid gap-10 md:grid-cols-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="border-t border-white/10 pt-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream/50">
                {group}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                  <span
                    key={item}
                    data-cursor
                    className="cursor-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-display text-sm font-medium text-cream/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-magenta/60 hover:bg-magenta/10 hover:text-magenta hover:shadow-[0_0_20px_-4px_rgba(209,116,210,0.7)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
