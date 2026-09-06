import { useMemo, useState, useEffect } from 'react'

interface RainProps {
  enabled: boolean
  heavy: boolean
  reducedMotion: boolean
}

export default function Rain({ enabled, heavy, reducedMotion }: RainProps) {
  const [showLightning, setShowLightning] = useState(false)

  const drops = useMemo(() => {
    if (!enabled || reducedMotion) return []
    const count = heavy ? 120 : 50
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.4 + Math.random() * 0.4,
      height: 15 + Math.random() * 25,
      opacity: 0.2 + Math.random() * 0.4,
    }))
  }, [enabled, heavy, reducedMotion])

  useEffect(() => {
    if (!enabled || reducedMotion) return
    const interval = setInterval(() => {
      if (Math.random() < (heavy ? 0.15 : 0.05)) {
        setShowLightning(true)
        setTimeout(() => setShowLightning(false), 200)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [enabled, heavy, reducedMotion])

  if (!enabled) return null

  return (
    <>
      <div className="rain-container" aria-hidden="true">
        {drops.map(drop => (
          <div
            key={drop.id}
            className="raindrop"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              opacity: drop.opacity,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>
      {showLightning && <div className="lightning-flash" aria-hidden="true" />}
    </>
  )
}
