import type { Session } from '../types'

interface SessionListProps {
  sessions: Session[]
}

export function SessionList({ sessions }: SessionListProps) {
  return (
    <div className="card">
      <div className="section-title">Today's Sessions</div>
      {sessions.length === 0 ? (
        <p className="empty-state">No sessions yet — start focusing! 🍅</p>
      ) : (
        <ul className="sessions-list">
          {sessions.map(session => (
            <li key={session.id} className="session-item">
              <span className="session-mode">{session.mode}</span>
              <span className="session-duration">{session.duration} min</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
