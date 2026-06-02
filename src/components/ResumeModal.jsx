import { useEffect, useState } from 'react'

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`

// Trigger from anywhere: openResume()
export function openResume() {
  window.dispatchEvent(new Event('open-resume'))
}

export default function ResumeModal() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-resume', onOpen)
    return () => window.removeEventListener('open-resume', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setShown(true))
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
    }
  }, [open])

  const close = () => {
    setShown(false)
    setTimeout(() => setOpen(false), 250)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 md:p-8">
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-ink/85 backdrop-blur-sm transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />

      {/* panel */}
      <div
        className={`relative z-10 flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl transition-all duration-300 ${
          shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
          <span className="font-display text-sm font-semibold">
            Résumé <span className="text-cream/40">— Jayant Dulani</span>
          </span>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              download="Jayant_Dulani_Resume.pdf"
              data-cursor
              className="rounded-full bg-ember px-4 py-1.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
            >
              Download
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-cream/80 transition-colors hover:border-magenta hover:text-magenta sm:inline-block"
            >
              Open ↗
            </a>
            <button
              onClick={close}
              data-cursor
              aria-label="Close résumé"
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-cream/70 transition-colors hover:border-magenta hover:text-magenta"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src={`${RESUME_URL}#view=FitH`}
          title="Résumé — Jayant Dulani"
          className="h-full w-full flex-1 bg-white"
        />
      </div>
    </div>
  )
}
