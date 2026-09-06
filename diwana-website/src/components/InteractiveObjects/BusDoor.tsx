interface BusDoorProps {
  open: boolean
  onToggle: () => void
}

export default function BusDoor({ open, onToggle }: BusDoorProps) {
  return (
    <button
      className="interactive-object"
      onClick={onToggle}
      aria-label={`Bus door: ${open ? 'open' : 'closed'}`}
      style={{
        bottom: '15%',
        left: '5%',
        padding: '0.5rem 1rem',
        background: 'rgba(20, 15, 10, 0.6)',
        border: '1px solid rgba(138, 122, 106, 0.3)',
        borderRadius: '6px',
        color: '#8a7a6a',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.5s ease',
      }}
    >
      🚪 {open ? 'CLOSE' : 'OPEN'}
    </button>
  )
}
