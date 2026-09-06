interface AnalogModeProps {
  enabled: boolean
}

export default function AnalogMode({ enabled }: AnalogModeProps) {
  if (!enabled) return null
  return <div className="analog-overlay" aria-hidden="true" />
}
