'use client'

import { useState, useEffect } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import anime from 'animejs'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (!section) return

    const navHeight = 80
    const targetPosition = section.offsetTop - navHeight

    anime({
      targets: window.document.scrollingElement,
      scrollTop: targetPosition,
      duration: 1000,
      easing: 'easeInOutQuart'
    })
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-8">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={scrollToSection(section)}
              className={`nav-link relative py-2 ${
                activeSection === section ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform origin-left transition-transform duration-300 ${
                  activeSection === section ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
} 