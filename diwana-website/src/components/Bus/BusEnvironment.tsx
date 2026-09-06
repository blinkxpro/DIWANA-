import { useEffect, useState, useRef } from 'react'
import type { TimeOfDay } from '../../types'
import { timeConfig } from '../../data/atmosphere'

interface BusEnvironmentProps {
  timeOfDay: TimeOfDay
  reducedMotion: boolean
}

export default function BusEnvironment({ timeOfDay, reducedMotion }: BusEnvironmentProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const config = timeConfig[timeOfDay]

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])

  const parallaxStyle = reducedMotion ? {} : {
    transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px) scale(1.05)`,
  }

  const vibrateStyle = reducedMotion ? {} : {
    animation: 'busVibrate 0.15s ease-in-out infinite',
  }

  return (
    <div className="bus-environment" ref={containerRef}>
      <div
        className="bus-image-container"
        style={{
          ...vibrateStyle,
          filter: `brightness(${config.busBrightness}) saturate(${config.busSaturation}) contrast(${config.busContrast})`,
        }}
      >
        <img
          src="/images/bus.png"
          alt="Inside an old Indian bus"
          className="bus-image"
          style={parallaxStyle}
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  )
}
