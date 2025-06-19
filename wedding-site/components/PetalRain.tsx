'use client'
import { useEffect, useState } from 'react'

export default function PetalRain() {
  const [isWeddingDay, setIsWeddingDay] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    setIsWeddingDay(today === '2025-07-05')
  }, [])

  if (!isWeddingDay) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-pink-200 rounded-full opacity-70 animate-[fall_5s_linear_infinite]"
          style={{
            top: `${Math.random() * -100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
