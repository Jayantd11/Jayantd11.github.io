import { profile, nav } from '../data/content'
import { scrollToTarget } from '../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand + back to top */}
          <div>
            <a
              href="#top"
              data-cursor
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#top')
              }}
              className="font-display text-3xl font-bold tracking-tight"
            >
              <span className="text-gradient">JD</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-cream/55">
              {profile.role} · {profile.role2} — open to new opportunities.
            </p>
          </div>

          {/* quick nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget(item.href)
                }}
                className="text-sm text-cream/60 transition-colors hover:text-magenta"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* socials */}
          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${profile.email}`} data-cursor className="text-cream/60 transition-colors hover:text-magenta">
              {profile.email}
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" data-cursor className="text-cream/60 transition-colors hover:text-magenta">
              GitHub ↗
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" data-cursor className="text-cream/60 transition-colors hover:text-magenta">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span className="font-display tracking-wide">Built with React · {profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
