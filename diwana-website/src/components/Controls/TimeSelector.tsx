import type { TimeOfDay } from '../../types'
import { timeConfig, timeOrder } from '../../data/atmosphere'

interface TimeSelectorProps {
  current: TimeOfDay
  onChange: (time: TimeOfDay) => void
  hidden: boolean
}

export default function TimeSelector({ current, onChange, hidden }: TimeSelectorProps) {
  return (
    <div className={`time-selector ${hidden ? 'hidden' : ''}`} role="radiogroup" aria-label="Time of day">
      {timeOrder.map(time => (
        <button
          key={time}
          className={`time-btn ${current === time ? 'active' : ''}`}
          onClick={() => onChange(time)}
          role="radio"
          aria-checked={current === time}
          aria-label={timeConfig[time].label}
          title={timeConfig[time].label}
        >
          {timeConfig[time].icon}
        </button>
      ))}
    </div>
  )
}
