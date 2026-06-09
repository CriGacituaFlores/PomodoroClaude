import { useState, useEffect } from 'react'
import type { Mode, Session, Durations } from './types'
import { TimerDisplay } from './components/TimerDisplay'
import { ModeSelector } from './components/ModeSelector'
import { SettingsPanel } from './components/SettingsPanel'
import { SessionList } from './components/SessionList'

const MODE_LABELS: Record<Mode, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
}

const DEFAULT_DURATIONS: Durations = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
}

function App() {
  const [mode, setMode] = useState<Mode>(
    () => (localStorage.getItem('pomo-mode') as Mode) ?? 'focus'
  )
  const [durations, setDurations] = useState<Durations>(() => {
    const saved = localStorage.getItem('pomo-durations')
    return saved ? (JSON.parse(saved) as Durations) : DEFAULT_DURATIONS
  })
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const saved = localStorage.getItem('pomo-time')
    return saved ? parseInt(saved) : DEFAULT_DURATIONS.focus * 60
  })
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('pomo-sessions')
    return saved ? (JSON.parse(saved) as Session[]) : []
  })

  // Persist state to localStorage
  useEffect(() => { localStorage.setItem('pomo-mode', mode) }, [mode])
  useEffect(() => { localStorage.setItem('pomo-durations', JSON.stringify(durations)) }, [durations])
  useEffect(() => { localStorage.setItem('pomo-time', String(timeRemaining)) }, [timeRemaining])
  useEffect(() => { localStorage.setItem('pomo-sessions', JSON.stringify(sessions)) }, [sessions])

  // Countdown: runs every second while the timer is active
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeRemaining(t => (t > 0 ? t - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  // Completion: fires when the timer reaches zero
  useEffect(() => {
    if (timeRemaining !== 0 || !isRunning) return

    setSessions(prev => [
      {
        id: crypto.randomUUID(),
        mode: MODE_LABELS[mode],
        duration: durations[mode],
      },
      ...prev,
    ])
    setIsRunning(false)
  }, [timeRemaining, isRunning, mode, durations])

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setTimeRemaining(durations[newMode] * 60)
    setIsRunning(false)
  }

  const handleDurationChange = (changedMode: Mode, value: number) => {
    setDurations(prev => ({ ...prev, [changedMode]: value }))
    if (changedMode === mode) {
      setTimeRemaining(value * 60)
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setTimeRemaining(durations[mode] * 60)
    setIsRunning(false)
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="app">
      <h1 className="header">🍅 Pomodoro</h1>

      <div className="card">
        <ModeSelector mode={mode} onChange={handleModeChange} />
        <TimerDisplay minutes={minutes} seconds={seconds} />
        <div className="controls">
          <button className="btn btn-primary" onClick={() => setIsRunning(r => !r)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <SettingsPanel durations={durations} onChange={handleDurationChange} />

      <SessionList sessions={sessions} />
    </div>
  )
}

export default App
