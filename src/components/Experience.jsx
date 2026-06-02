import { useReveal } from '../hooks/useReveal'
import Mask from './Mask'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import { experience } from '../data/content'

function TimelineItem({ item, index }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className="reveal relative pl-10 md:pl-14"
    >
      {/* node + line */}
      <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-magenta shadow-[0_0_0_4px_rgba(209,116,210,0.18)]" />
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl font-bold md:text-2xl">{item.role}</h3>
        <span className="text-magenta">·</span>
        <span className="font-display text-lg text-cream/80">{item.company}</span>
      </div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
        {item.period}
      </p>
      <ul className="space-y-2">
        {item.points.map((pt, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-cream/70">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28 md:py-40">
      <GhostNumber className="-left-4 -top-10 md:-top-20">02</GhostNumber>
      <SectionMeta label="Career" fig="Fig. 02" side="right" />

      <div className="relative mb-16 max-w-2xl">
        <p className="eyebrow mb-4">02 — Experience</p>
        <Mask
          as="h2"
          className="font-display text-4xl font-bold leading-tight md:text-5xl"
          lines={['Where I’ve', <span className="text-gradient">worked</span>]}
        />
      </div>

      <div className="relative space-y-12 border-l border-white/10 pl-0 md:space-y-16">
        {experience.map((item, i) => (
          <TimelineItem key={item.company} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
