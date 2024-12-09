'use client'

import { useEffect, useState, useCallback } from 'react'
import anime from 'animejs'

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const arrowAnimation = anime({
      targets: '.scroll-arrow svg',
      translateY: ['0px', '15px'],
      opacity: [0.8, 0.3],
      easing: 'easeInOutCubic',
      duration: 2000,
      loop: true,
      direction: 'alternate',
      autoplay: true
    })

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY
        setIsVisible(currentScroll < 100)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      arrowAnimation.pause()
    }
  }, [])

  const scrollToAbout = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (isAnimating) return

    const aboutSection = document.getElementById('about')
    if (!aboutSection) return

    // Démarrer l'animation immédiatement
    setIsAnimating(true)
    requestAnimationFrame(() => {
      const navHeight = 80
      const targetPosition = aboutSection.offsetTop - navHeight
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition

      anime({
        targets: document.scrollingElement || document.documentElement,
        scrollTop: targetPosition,
        duration: Math.min(Math.abs(distance), 600), // Durée réduite
        easing: 'easeOutQuad', // Easing plus rapide au début
        complete: () => setIsAnimating(false)
      })
    })
  }, [isAnimating])

  return (
    <button
      onClick={scrollToAbout}
      disabled={isAnimating}
      className={`scroll-arrow absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${isAnimating ? 'pointer-events-none' : ''}`}
      aria-label="Scroll to About section"
    >
      <svg 
        width="40" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
      >
        <path d="M4 9l8 8 8-8"/>
      </svg>
    </button>
  )
} 