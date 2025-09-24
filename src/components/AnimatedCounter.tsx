'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
  value: string
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^\d]/g, ''))
      if (isNaN(numericValue)) {
        setCount(0)
        return
      }

      let startTime: number | null = null
      const duration = 2000

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easeOutQuad = 1 - (1 - progress) * (1 - progress)
        const currentCount = Math.floor(easeOutQuad * numericValue)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, value])

  const formatCount = (num: number) => {
    const suffix = value.replace(/[\d,]/g, '')
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K${suffix}`
    }
    return `${num}${suffix}`
  }

  return (
    <span ref={ref}>
      {value.includes('%') ? `${count}%` : formatCount(count)}
    </span>
  )
}