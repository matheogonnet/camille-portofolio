'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface AboutCardProps {
  icon: string
  title: string
  description: string
}

export default function AboutCard({ icon, title, description }: AboutCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutCubic'
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 opacity-0"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-gray-700 mb-2">
          <i className={`bi ${icon} text-2xl`}></i>
        </div>
        <h3 className="text-gray-900 font-serif text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  )
} 