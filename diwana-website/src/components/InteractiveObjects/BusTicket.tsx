interface BusTicketProps {
  onClick: () => void
}

export default function BusTicket({ onClick }: BusTicketProps) {
  return (
    <button
      className="interactive-object"
      onClick={onClick}
      aria-label="View bus ticket"
      style={{
        bottom: '40%',
        left: '12%',
        padding: '0.4rem 0.8rem',
        background: 'rgba(245, 230, 200, 0.9)',
        border: '1px solid #5a3d2b',
        borderRadius: '3px',
        color: '#2a1f14',
        fontSize: '0.6rem',
        fontFamily: "'Playfair Display', serif",
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transform: 'rotate(-3deg)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      🎫 TICKET
    </button>
  )
}
