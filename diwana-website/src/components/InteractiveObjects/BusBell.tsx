import { useState } from 'react'

interface BusBellProps {
  onRing: (stop: string) => void
  sfxEnabled: boolean
}

const stops = [
  'अगला स्टॉप — रामबाग़',
  'अगला स्टॉप — गाँधी चौक',
  'अगला स्टॉप — बस स्टैंड',
  'अगला स्टॉप — बाज़ार',
  'अगला स्टॉप — स्कूल',
  'अगला स्टॉप — अस्पताल',
  'अगला स्टॉप — रेलवे स्टेशन',
]

export default function BusBell({ onRing, sfxEnabled }: BusBellProps) {
  const [ringing, setRinging] = useState(false)

  const handleClick = () => {
    if (ringing) return
    setRinging(true)
    const stop = stops[Math.floor(Math.random() * stops.length)]

    if (sfxEnabled) {
      try {
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 800
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.3)
      } catch { /* ignore */ }
    }

    onRing(stop)
    setTimeout(() => setRinging(false), 500)
  }

  return (
    <button
      className={`interactive-object bus-bell ${ringing ? 'ringing' : ''}`}
      onClick={handleClick}
      aria-label="Bus bell - press to ring"
      style={{ bottom: '30%', right: '8%' }}
    >
      🔔
    </button>
  )
}
