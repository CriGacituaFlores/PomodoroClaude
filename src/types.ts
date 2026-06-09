export type Mode = 'focus' | 'shortBreak' | 'longBreak'

export interface Session {
  id: string
  mode: string
  duration: number
}

export interface Durations {
  focus: number
  shortBreak: number
  longBreak: number
}
