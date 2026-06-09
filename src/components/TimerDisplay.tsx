interface TimerDisplayProps {
  minutes: number
  seconds: number
}

export function TimerDisplay({ minutes, seconds }: TimerDisplayProps) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="timer">
      {pad(minutes)}:{pad(seconds)}
    </div>
  )
}
