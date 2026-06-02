// Thematic animated SVG backgrounds revealed when hovering each project card.
// NVIDIA (GPU), Google-Maps-style route finder (spatial search), server/event
// network, and a terminal/shell. Fill the card (preserveAspectRatio slice).
const MAG = 'rgba(209,116,210,0.7)'
const EMB = 'rgba(224,86,63,0.75)'
const VIO = 'rgba(150,90,200,0.7)'
const BLU = 'rgba(110,150,235,0.7)'
const TEAL = 'rgba(70,205,190,0.75)'
const PNK = 'rgba(245,150,225,0.75)'
const FAINT = 'rgba(255,255,255,0.16)'

function svgProps() {
  return {
    viewBox: '0 0 300 200',
    preserveAspectRatio: 'xMidYMid slice',
    className: 'h-full w-full',
  }
}

// NVIDIA — just the wordmark, magnified across the card, as a subtle green
// watermark so the card text stays readable.
function Nvidia() {
  return (
    <svg {...svgProps()}>
      <rect x="0" y="0" width="300" height="200" fill="rgba(118,185,0,0.4)" />
      <text x="150" y="118" textAnchor="middle" fontFamily="sans-serif" fontWeight="800"
        fontSize="62" letterSpacing="1" fill="rgba(255,255,255,0.45)">NVIDIA</text>
    </svg>
  )
}

// Google-Maps-style route finder — roads, parks/water, and an animated best route.
function Maps() {
  const ROUTE = 'M30 170 H92 V120 H150 V72 H214 V44 H280'
  return (
    <svg {...svgProps()}>
      <rect x="0" y="0" width="300" height="200" fill="#1c2433" />
      {/* water + park blocks */}
      <rect x="0" y="0" width="78" height="58" fill="rgba(66,133,244,0.22)" />
      <rect x="186" y="120" width="80" height="60" rx="4" fill="rgba(52,168,83,0.28)" />
      <rect x="120" y="20" width="55" height="46" rx="4" fill="rgba(52,168,83,0.18)" />
      {/* roads */}
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round">
        {[92, 150, 214].map((x) => <line key={x} x1={x} y1="10" x2={x} y2="190" />)}
        {[72, 120, 170].map((y) => <line key={y} x1="10" y1={y} x2="290" y2={y} />)}
      </g>
      {/* route casing + line (Google blue), drawing in */}
      <path d={ROUTE} fill="none" stroke="#1b3a8f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROUTE} fill="none" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="520" strokeDashoffset="520">
        <animate attributeName="stroke-dashoffset" values="520;0;0;520" dur="4.5s" repeatCount="indefinite" />
      </path>
      {/* navigating dot */}
      <circle r="4" fill="#fff" stroke="#4285F4" strokeWidth="2">
        <animateMotion dur="4.5s" repeatCount="indefinite" path={ROUTE} />
      </circle>
      {/* start dot (green) */}
      <circle cx="30" cy="170" r="6" fill="#34A853" stroke="#fff" strokeWidth="2" />
      {/* destination pin (red) */}
      <g transform="translate(280 44)">
        <path d="M0 4 C 10 4, 10 -8, 0 -20 C -10 -8, -10 4, 0 4 Z" fill="#EA4335" stroke="#fff" strokeWidth="1.5" />
        <circle cx="0" cy="-10" r="3.5" fill="#fff" />
      </g>
    </svg>
  )
}

// Personal Server — client → event loop → server stack, with packets.
function Server() {
  return (
    <svg {...svgProps()}>
      <circle cx="60" cy="100" r="14" fill="none" stroke={TEAL} strokeWidth="1.8" />
      {[55, 90, 125].map((y, i) => (
        <g key={i}>
          <rect x="200" y={y} width="60" height="26" rx="3" fill="none" stroke={[MAG, VIO, BLU][i]} strokeWidth="1.8" />
          <circle cx="210" cy={y + 13} r="3.2" fill={[EMB, PNK, TEAL][i]}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <path d="M74 100 C 130 100, 150 103, 200 103" fill="none" stroke={FAINT} strokeWidth="1.5" />
      <path d="M74 100 C 130 100, 150 138, 200 138" fill="none" stroke={FAINT} strokeWidth="1.5" />
      {[0, 1.3, 2.1].map((d, i) => (
        <circle key={i} r="3.2" fill={[EMB, PNK, BLU][i]}>
          <animateMotion dur="2.2s" begin={`${d}s`} repeatCount="indefinite" path="M74 100 C 130 100, 150 103, 200 103" />
        </circle>
      ))}
      <circle r="3.2" fill={TEAL}>
        <animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite" path="M74 100 C 130 100, 150 138, 200 138" />
      </circle>
    </svg>
  )
}

// Personal Terminal — shell window with lines typing in and a blinking cursor.
function Terminal() {
  const lines = [
    { y: 78, w: 90 },
    { y: 94, w: 130 },
    { y: 110, w: 70 },
    { y: 126, w: 110 },
  ]
  return (
    <svg {...svgProps()}>
      <rect x="45" y="40" width="210" height="120" rx="8" fill="none" stroke={MAG} strokeWidth="1.5" />
      <line x1="45" y1="58" x2="255" y2="58" stroke={FAINT} strokeWidth="1" />
      {[58, 68, 78].map((cx, i) => (
        <circle key={i} cx={cx} cy="49" r="2.5" fill={i === 0 ? EMB : FAINT} />
      ))}
      {lines.map((l, i) => (
        <g key={i}>
          <text x="58" y={l.y + 4} fontSize="9" fill={TEAL} fontFamily="monospace">$</text>
          <rect x="68" y={l.y - 4} height="5" rx="2" fill={[MAG, EMB, VIO, BLU][i % 4]}>
            <animate attributeName="width" values={`0;${l.w};${l.w}`} dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      <rect x="68" y="138" width="8" height="9" fill={EMB}>
        <animate attributeName="opacity" values="1;1;0;0" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

const VARIANTS = {
  nvidia: Nvidia,
  gpu: Nvidia,
  maps: Maps,
  quadtree: Maps,
  server: Server,
  terminal: Terminal,
}

export default function ProjectArt({ variant = 'nvidia', className = '' }) {
  const Motif = VARIANTS[variant] || Nvidia
  return (
    <div aria-hidden className={className}>
      <Motif />
    </div>
  )
}
