interface BusFanProps {
  spinning: boolean
  onToggle: () => void
}

export default function BusFan({ spinning, onToggle }: BusFanProps) {
  return (
    <button
      className="interactive-object bus-fan"
      onClick={onToggle}
      aria-label={`Ceiling fan: ${spinning ? 'on' : 'off'}`}
      style={{ top: '5%', right: '15%' }}
    >
      <div className={`fan-blade ${spinning ? 'fan-spinning' : ''}`} />
    </button>
  )
}
