// Looping horizontal text band. Items are rendered twice inside one track;
// translating the track by -50% of its width loops seamlessly.
export default function Marquee({
  items = [],
  speed = 'marquee',
  reverse = false,
  className = '',
  parallax = 0,
}) {
  const doubled = [...items, ...items]

  return (
    <div
      className={`relative w-full overflow-hidden py-6 md:py-10 ${className}`}
      {...(parallax ? { 'data-parallax': parallax } : {})}
    >
      {/* skew wrapper reacts to scroll velocity; track keeps its loop animation */}
      <div data-skew>
        <div
          className={`marquee-track animate-${speed} ${reverse ? '[animation-direction:reverse]' : ''}`}
          aria-hidden
        >
          {doubled.map((item, i) => (
            <span key={i} className="group flex items-center">
              <span
                className={`px-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight ${
                  i % 2 === 0 ? 'marquee-word' : 'marquee-fill'
                }`}
              >
                {item}
              </span>
              <span className="text-[clamp(1.5rem,4vw,3rem)] text-magenta">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
