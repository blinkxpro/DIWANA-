import { useState } from 'react'
import { playlist } from '../../data/playlist'

interface PlaylistProps {
  visible: boolean
  onClose: () => void
}

export default function Playlist({ visible, onClose }: PlaylistProps) {
  const [playing, setPlaying] = useState<string | null>(null)

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '220px',
        maxHeight: '60vh',
        background: 'rgba(20, 15, 10, 0.9)',
        backdropFilter: 'blur(15px)',
        borderRadius: '12px',
        border: '1px solid rgba(138, 122, 106, 0.15)',
        padding: '1rem',
        zIndex: 300,
        overflowY: 'auto',
      }}
      role="dialog"
      aria-label="Playlist"
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.8rem',
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8a7a6a',
        }}>
          🎵 Playlist
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#6a5a4a',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.2rem',
          }}
          aria-label="Close playlist"
        >
          ✕
        </button>
      </div>
      {playlist.map((item, i) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setPlaying(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 0.5rem',
            borderRadius: '6px',
            textDecoration: 'none',
            color: playing === item.id ? '#d4c5a9' : '#8a7a6a',
            background: playing === item.id ? 'rgba(212, 197, 169, 0.08)' : 'transparent',
            fontSize: '0.75rem',
            transition: 'all 0.3s ease',
            marginBottom: '0.15rem',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(212, 197, 169, 0.08)'
            e.currentTarget.style.color = '#d4c5a9'
          }}
          onMouseLeave={e => {
            if (playing !== item.id) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#8a7a6a'
            }
          }}
        >
          <span style={{ fontSize: '0.65rem', opacity: 0.5, minWidth: '1rem' }}>
            {playing === item.id ? '▶' : `${i + 1}`}
          </span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Track {i + 1}
          </span>
        </a>
      ))}
    </div>
  )
}
