import type { Mode } from '../types'

interface ModeSelectorProps {
  mode: Mode
  onChange: (mode: Mode) => void
}

const MODES: { key: Mode; label: string }[] = [
  { key: 'focus', label: 'Focus' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
]

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="modes">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          className={`mode-btn${mode === key ? ' active' : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
