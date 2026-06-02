import { useReveal } from '../hooks/useReveal'

// A single clipped line whose inner content slides up into view.
function MaskLine({ children, delay = 0 }) {
  const ref = useReveal()
  return (
    <span className="mask">
      <span ref={ref} className="mask-inner" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  )
}

// Renders an array of lines as staggered mask reveals.
// `as` sets the wrapper element (h1, h2, p…). Each line animates independently.
export default function Mask({ lines, as: Tag = 'span', className = '', stagger = 90 }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <MaskLine key={i} delay={i * stagger}>
          {line}
        </MaskLine>
      ))}
    </Tag>
  )
}
