'use client'

import anime from 'animejs'
import { useLayoutEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  // useLayoutEffect s'exécute de manière synchrone après le rendu initial
  useLayoutEffect(() => {
    setIsLoaded(true)

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    })
    
    timeline
      .add({
        targets: '.portfolio-text',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1600,
      })
      .add({
        targets: '.name-text',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1800,
      }, '-=1400')
      .add({
        targets: '.quote-text',
        opacity: [0, 1],
        duration: 1600,
      }, '-=1000')

    anime({
      targets: '.elegant-border',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 2000,
      easing: 'easeOutExpo'
    })
  }, [])

  // Utilisation de classes statiques pour le rendu initial
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-12 relative">
        <div className="elegant-border px-12 py-16 border border-gray-200 rounded-lg shadow-sm bg-white/50 backdrop-blur-sm opacity-0">
          <h1 className="space-y-6">
            <span className="portfolio-text block text-text-dark text-2xl font-serif tracking-wide opacity-0">
              Portfolio de
            </span>
            <span className="name-text block text-accent-red text-8xl font-script mt-6 tracking-wider opacity-0">
              Camille
            </span>
          </h1>
          <p className="quote-text font-serif text-text-dark text-xl mt-8 tracking-wide leading-relaxed italic opacity-0">
            « L'art de créer des souvenirs »
          </p>
        </div>
      </div>
    </main>
  )
} 