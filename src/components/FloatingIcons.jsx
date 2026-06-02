// Decorative tech logos drifting in the Toolkit background. Uses Devicon SVGs
// from jsDelivr. Subtle (low opacity) and behind the section content.
const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const ICONS = [
  { name: 'python', file: 'python/python-original.svg', top: 14, left: 10, size: 48, dur: 7, delay: 0 },
  { name: 'javascript', file: 'javascript/javascript-original.svg', top: 22, left: 82, size: 38, dur: 8, delay: 1.2 },
  { name: 'react', file: 'react/react-original.svg', top: 58, left: 88, size: 42, dur: 9, delay: 0.5 },
  { name: 'docker', file: 'docker/docker-original.svg', top: 78, left: 16, size: 46, dur: 8, delay: 2 },
  { name: 'kubernetes', file: 'kubernetes/kubernetes-plain.svg', top: 40, left: 70, size: 40, dur: 10, delay: 1.5 },
  { name: 'postgresql', file: 'postgresql/postgresql-original.svg', top: 70, left: 60, size: 36, dur: 7.5, delay: 0.8 },
  { name: 'git', file: 'git/git-original.svg', top: 86, left: 80, size: 34, dur: 8.5, delay: 2.4 },
  { name: 'android', file: 'android/android-original.svg', top: 30, left: 30, size: 44, dur: 9.5, delay: 1 },
  { name: 'java', file: 'java/java-original.svg', top: 64, left: 12, size: 36, dur: 7, delay: 1.8 },
  { name: 'cplusplus', file: 'cplusplus/cplusplus-original.svg', top: 88, left: 44, size: 38, dur: 9, delay: 0.3 },
  { name: 'linux', file: 'linux/linux-original.svg', top: 16, left: 56, size: 34, dur: 8.2, delay: 2.1 },
]

export default function FloatingIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ICONS.map((ic) => (
        <img
          key={ic.name}
          src={`${BASE}/${ic.file}`}
          alt=""
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
          style={{
            top: `${ic.top}%`,
            left: `${ic.left}%`,
            width: `${ic.size}px`,
            height: `${ic.size}px`,
            animationDuration: `${ic.dur}s`,
            animationDelay: `${ic.delay}s`,
          }}
          className="absolute animate-floaty opacity-25 grayscale-[0.2] transition-opacity duration-500 hover:opacity-60"
        />
      ))}
    </div>
  )
}
