// Procedural techy SVG motifs in the magenta palette. Used as project-card
// hover reveals and lightweight section accents. Each variant is decorative.
const stroke = 'rgba(209,116,210,0.55)'
const stroke2 = 'rgba(224,86,63,0.5)'

function Radar() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {[30, 55, 80].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={stroke} strokeWidth="1" />
      ))}
      <line x1="100" y1="20" x2="100" y2="180" stroke={stroke} strokeWidth="0.75" />
      <line x1="20" y1="100" x2="180" y2="100" stroke={stroke} strokeWidth="0.75" />
      <path d="M100 100 L180 100 A80 80 0 0 0 140 30 Z" fill={stroke2} opacity="0.25">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="6s" repeatCount="indefinite" />
      </path>
      <circle cx="140" cy="70" r="3" fill={stroke2} />
    </svg>
  )
}

function Grid() {
  const lines = []
  for (let i = 0; i <= 10; i++) {
    const p = i * 20
    lines.push(<line key={`v${i}`} x1={p} y1="0" x2={p} y2="200" stroke={stroke} strokeWidth="0.5" />)
    lines.push(<line key={`h${i}`} x1="0" y1={p} x2="200" y2={p} stroke={stroke} strokeWidth="0.5" />)
  }
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {lines}
      <rect x="60" y="60" width="80" height="80" fill="none" stroke={stroke2} strokeWidth="1.5">
        <animate attributeName="x" values="60;80;60" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y" values="60;40;60" dur="5s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

function Waveform() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d="M0 100 Q 25 60 50 100 T 100 100 T 150 100 T 200 100"
          fill="none"
          stroke={k === 1 ? stroke2 : stroke}
          strokeWidth="1.5"
          opacity={0.8 - k * 0.2}
          transform={`translate(0 ${(k - 1) * 22})`}
        >
          <animate attributeName="d"
            values="M0 100 Q 25 60 50 100 T 100 100 T 150 100 T 200 100;
                    M0 100 Q 25 140 50 100 T 100 100 T 150 100 T 200 100;
                    M0 100 Q 25 60 50 100 T 100 100 T 150 100 T 200 100"
            dur={`${3 + k}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  )
}

function Orbit() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <circle cx="100" cy="100" r="4" fill={stroke2} />
      {[40, 65, 90].map((r, i) => (
        <g key={r}>
          <ellipse cx="100" cy="100" rx={r} ry={r / 2.4} fill="none" stroke={stroke} strokeWidth="1"
            transform={`rotate(${i * 60} 100 100)`} />
          <circle r="3" fill={stroke2}>
            <animateMotion dur={`${5 + i * 2}s`} repeatCount="indefinite"
              path={`M ${100 + r} 100 A ${r} ${r / 2.4} 0 1 1 ${100 - r} 100 A ${r} ${r / 2.4} 0 1 1 ${100 + r} 100`} />
          </circle>
        </g>
      ))}
    </svg>
  )
}

const VARIANTS = { radar: Radar, grid: Grid, waveform: Waveform, orbit: Orbit }

export default function AbstractArt({ variant = 'grid', className = '' }) {
  const Motif = VARIANTS[variant] || Grid
  return (
    <div aria-hidden className={className}>
      <Motif />
    </div>
  )
}
