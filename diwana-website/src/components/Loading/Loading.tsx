import { useState, useEffect } from 'react'

interface LoadingProps {
  onEnter: () => void
}

export default function Loading({ onEnter }: LoadingProps) {
  const [fadeOut, setFadeOut] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 4500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setFadeOut(true)
    setTimeout(onEnter, 1200)
  }

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`} role="status" aria-label="Loading">
      <h1 className="loading-title">DIWANA</h1>
      <p className="loading-tagline">एक सफ़र, कुछ यादें...</p>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
      {ready && (
        <button
          className="enter-button"
          onClick={handleEnter}
          aria-label="Enter the journey"
        >
          ENTER JOURNEY
        </button>
      )}
    </div>
  )
}
