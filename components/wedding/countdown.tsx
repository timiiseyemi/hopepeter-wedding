'use client'

import { useEffect, useState } from 'react'

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({ date, light = false }: { date: string; light?: boolean }) {
  const target = new Date(date).getTime()
  const [time, setTime] = useState(() => getTimeLeft(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  const textColor = light ? 'text-background' : 'text-foreground'
  const labelColor = light ? 'text-background/70' : 'text-muted-foreground'
  const border = light ? 'border-background/25' : 'border-border'

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-6">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-6">
          <div className="flex min-w-[3.5rem] flex-col items-center sm:min-w-[5rem]">
            <span
              className={`font-serif text-4xl font-light tabular-nums sm:text-6xl ${textColor}`}
            >
              {mounted ? String(u.value).padStart(2, '0') : '00'}
            </span>
            <span
              className={`mt-2 text-[0.6rem] uppercase tracking-[0.3em] sm:text-xs ${labelColor}`}
            >
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className={`font-serif text-3xl font-thin sm:text-5xl ${labelColor}`}>:</span>
          )}
        </div>
      ))}
    </div>
  )
}
