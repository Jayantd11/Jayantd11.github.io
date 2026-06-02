import CountUp from './CountUp'
import { useReveal } from '../hooks/useReveal'

const stats = [
  { to: 1380, suffix: '×', label: 'GPU pipeline speedup' },
  { to: 135, suffix: ' FPS', label: 'live on edge hardware' },
  { to: 200, suffix: '+', label: 'students mentored' },
  { to: 40, suffix: '%', label: 'less manual workload' },
]

export default function Stats() {
  const ref = useReveal()
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div
        ref={ref}
        className="reveal grid grid-cols-2 gap-y-10 border-y border-white/10 py-12 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none">
              <span className="text-gradient">
                <CountUp to={s.to} />
                {s.suffix}
              </span>
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-cream/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
