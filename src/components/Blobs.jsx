// Animated mesh-gradient backdrop (abstract "aurora"). Purely decorative.
// `variant` controls intensity: 'hero' = full strength, 'soft' = subtler.
export default function Blobs({ variant = 'hero' }) {
  return (
    <div
      aria-hidden
      className={`aurora ${variant === 'soft' ? 'aurora--soft' : ''}`}
    />
  )
}
