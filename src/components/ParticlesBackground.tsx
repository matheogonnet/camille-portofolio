'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration des particules
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const PARTICLE_COUNT = 30
    const PARTICLE_SIZE_RANGE = [2, 4]
    const SPEED_RANGE = [-0.2, 0.2]

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialiser les particules
    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (PARTICLE_SIZE_RANGE[1] - PARTICLE_SIZE_RANGE[0]) + PARTICLE_SIZE_RANGE[0],
          speedX: Math.random() * (SPEED_RANGE[1] - SPEED_RANGE[0]) + SPEED_RANGE[0],
          speedY: Math.random() * (SPEED_RANGE[1] - SPEED_RANGE[0]) + SPEED_RANGE[0],
          opacity: Math.random() * 0.3
        })
      }
    }

    // Animation des particules
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 200, 200, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
} 