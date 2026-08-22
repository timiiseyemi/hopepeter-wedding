'use client'

import { useEffect, useState } from 'react'

type Particle = {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
}

export function Particles({ count = 18 }: { count?: number }) {
  // Generate only on the client after mount to avoid SSR hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      })),
    )
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: 0.5,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 8px var(--gold-soft)',
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
