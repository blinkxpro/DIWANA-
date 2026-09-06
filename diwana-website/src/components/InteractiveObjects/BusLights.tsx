import type { LightMode } from '../../types'

interface BusLightsProps {
  mode: LightMode
  onToggle: () => void
}

export default function BusLights({ mode, onToggle }: BusLightsProps) {
  const labels: Record<LightMode, string> = {
    on: 'ON',
    dim: 'DIM',
    off: 'OFF',
  }

  return (
    <button
      className="interactive-object"
      onClick={onToggle}
      aria-label={`Bus lights: ${labels[mode]}`}
      style={{
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0.4rem 0.8rem',
        background: 'rgba(20, 15, 10, 0.6)',
        border: '1px solid rgba(138, 122, 106, 0.3)',
        borderRadius: '6px',
        color: mode === 'on' ? '#d4c5a9' : '#6a5a4a',
        fontSize: '0.6rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}
    >
      💡 {labels[mode]}
    </button>
  )
}
