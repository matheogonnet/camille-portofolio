'use client'

import { useEffect, useRef, ReactNode } from 'react'
import anime from 'animejs'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeInSection({ 
  children, 
  delay = 0,
  direction = 'up' 
}: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const directionValues = {
              up: [20, 0],
              down: [-20, 0],
              left: [20, 0],
              right: [-20, 0]
            }

            const translateProp = direction === 'up' || direction === 'down' ? 'translateY' : 'translateX'

            anime({
              targets: entry.target,
              opacity: [0, 1],
              [translateProp]: directionValues[direction],
              scale: [0.98, 1],
              duration: 800,
              delay,
              easing: 'easeOutQuart',
              begin: function(anim) {
                const target = anim.animatables[0].target as HTMLElement
                target.style.visibility = 'visible'
              }
            })

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div 
      ref={sectionRef}
      className="invisible"
    >
      {children}
    </div>
  )
} 