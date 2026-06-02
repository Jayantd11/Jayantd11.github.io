import Blobs from './Blobs'
import Mask from './Mask'
import Magnetic from './Magnetic'
import GhostNumber from './GhostNumber'
import SectionMeta from './SectionMeta'
import { openResume } from './ResumeModal'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/content'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="noise relative overflow-hidden py-32 md:py-48">
      <Blobs variant="hero" />
      <GhostNumber className="-right-4 -top-8 md:-top-12">06</GhostNumber>
      <SectionMeta label="Get in touch" fig="Boston, MA · 42.36° N" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-8">06 — Contact</p>

        <Mask
          as="h2"
          className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.92]"
          stagger={110}
          lines={["Let's build", <><span className="text-gradient">something</span>.</>]}
        />

        <div ref={ref} className="reveal">

        <p className="mx-auto mt-6 max-w-md text-lg text-cream/70">
          Open to roles and projects in backend, systems, and automation. Let’s talk.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor
              className="inline-block rounded-full bg-ember px-9 py-4 font-semibold text-ink"
            >
              {profile.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <button
              onClick={openResume}
              data-cursor
              className="inline-block rounded-full border border-white/15 px-9 py-4 font-semibold text-cream/80 transition-colors hover:border-magenta hover:text-magenta"
            >
              View résumé
            </button>
          </Magnetic>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8 text-sm font-medium text-cream/60">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="transition-colors hover:text-magenta"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="transition-colors hover:text-magenta"
          >
            LinkedIn
          </a>
        </div>
        </div>
      </div>
    </section>
  )
}
