import type { Mode, Durations } from '../types'

interface SettingsPanelProps {
  durations: Durations
  onChange: (mode: Mode, value: number) => void
}

const SETTINGS: { key: Mode; label: string }[] = [
  { key: 'focus', label: 'Focus' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
]

export function SettingsPanel({ durations, onChange }: SettingsPanelProps) {
  return (
    <div className="card">
      <div className="section-title">Settings</div>
      <div className="settings-grid">
        {SETTINGS.map(({ key, label }) => (
          <div key={key} className="setting-item">
            <label className="setting-label" htmlFor={`duration-${key}`}>
              {label}
            </label>
            <input
              id={`duration-${key}`}
              type="number"
              min={1}
              max={99}
              className="setting-input"
              value={durations[key]}
              onChange={e =>
                onChange(key, Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
