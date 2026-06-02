import { useRef } from 'react'
import Blobs from './Blobs'
import Mask from './Mask'
import ProjectArt from './ProjectArt'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/content'

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const revealRef = useReveal()
  const cardRef = useRef(null)

  const interactive = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = cardRef.current
    if (!el || !interactive()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * 8
    const ry = (px - 0.5) * 10
    el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <div ref={revealRef} style={{ transitionDelay: `${index * 90}ms` }} className="reveal [perspective:1000px]">
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.accent} p-7 hover:border-magenta/50`}
    >
      {/* Hover-revealed thematic art — only the area under the cursor shows,
          via a radial mask centered on the pointer (--mx/--my), and it follows. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle 150px at var(--mx,50%) var(--my,50%), #000 30%, transparent 70%)',
          maskImage:
            'radial-gradient(circle 150px at var(--mx,50%) var(--my,50%), #000 30%, transparent 70%)',
        }}
      >
        <ProjectArt variant={project.art} className="h-full w-full opacity-90" />
      </div>

      {/* cursor-tracking spotlight */}
      <span className="card-spotlight" aria-hidden />

      <div className="relative mb-5 flex items-start justify-between">
        <span className="font-display text-sm font-semibold text-cream/40">
          0{index + 1}
        </span>
        <span className="text-cream/40 transition-colors group-hover:text-magenta">
          <ArrowIcon />
        </span>
      </div>

      <h3 className="relative font-display text-2xl font-bold [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">{project.title}</h3>

      {project.metric && (
        <p className="relative mt-2 text-xs font-semibold uppercase tracking-wider text-magenta [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] group-hover:text-cream">
          {project.metric}
        </p>
      )}

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-cream/65 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
        {project.blurb}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cream/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="noise relative overflow-hidden py-28 md:py-40">
      <Blobs variant="soft" />
      <GhostNumber className="-right-4 -top-10 md:-top-16">03</GhostNumber>
      <SectionMeta label="Selected Work" fig="Fig. 03" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">03 — Selected Work</p>
          <Mask
            as="h2"
            className="font-display text-4xl font-bold leading-tight md:text-5xl"
            lines={["Things I've", <span className="text-gradient">built</span>]}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
