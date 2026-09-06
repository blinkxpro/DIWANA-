interface TicketOverlayProps {
  onClose: () => void
}

export default function TicketOverlay({ onClose }: TicketOverlayProps) {
  const today = new Date()
  const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  return (
    <div className="ticket-overlay" onClick={onClose} role="dialog" aria-label="Bus ticket">
      <div className="ticket" onClick={e => e.stopPropagation()}>
        <div className="ticket-header">
          <div className="ticket-name">DIWANA</div>
        </div>
        <div className="ticket-row">
          <span className="ticket-label">From</span>
          <span className="ticket-value">कहीं दूर</span>
        </div>
        <div className="ticket-row">
          <span className="ticket-label">To</span>
          <span className="ticket-value">कहीं और दूर</span>
        </div>
        <div className="ticket-row">
          <span className="ticket-label">Seat</span>
          <span className="ticket-value">खिड़की — WINDOW</span>
        </div>
        <div className="ticket-row">
          <span className="ticket-label">Date</span>
          <span className="ticket-value">{dateStr}</span>
        </div>
        <div className="ticket-row">
          <span className="ticket-label">Fare</span>
          <span className="ticket-value">₹ यादें</span>
        </div>
        <div className="ticket-footer">
          एक सफ़र, कुछ यादें...
        </div>
      </div>
    </div>
  )
}
