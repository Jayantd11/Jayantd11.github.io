import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import { scrollToTarget } from '../hooks/useLenis'
import { openResume } from './ResumeModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          data-cursor
          onClick={(e) => handleNav(e, '#top')}
          className="font-display text-xl font-bold tracking-tight"
        >
          <span className="text-gradient">JD</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-cursor
                onClick={(e) => handleNav(e, item.href)}
                className="text-sm font-medium text-cream/70 transition-colors hover:text-magenta"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              data-cursor
              onClick={openResume}
              className="rounded-full border border-magenta/50 px-4 py-1.5 text-sm font-semibold text-magenta transition-colors hover:bg-magenta hover:text-ink"
            >
              Résumé
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/5 bg-ink/95 px-6 pb-6 pt-2 backdrop-blur-md md:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className="block py-3 font-display text-lg font-medium text-cream/80 hover:text-magenta"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false)
                openResume()
              }}
              className="block py-3 font-display text-lg font-semibold text-magenta"
            >
              Résumé
            </button>
          </li>
        </ul>
      )}
    </header>
  )
}
