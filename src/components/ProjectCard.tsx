'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import ProjectModal from './ProjectModal'
import PlaceholderImage from './PlaceholderImage'

interface ProjectStep {
  title: string
  description: string
  image: string
  imagePosition: 'left' | 'right'
}

interface ProjectCardProps {
  title: string
  description: string
  category: string
  projectType: string
  brand?: string
  year: number
  duration: string
  thumbnail: string
  tags: string[]
  steps?: ProjectStep[]
  images?: string[]
}

export default function ProjectCard({ 
  title, 
  description, 
  category,
  projectType,
  brand,
  year,
  duration,
  thumbnail,
  tags,
  steps,
  images
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 40
    const rotateY = (centerX - x) / 40

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      <div 
        ref={cardRef}
        className="relative w-full cursor-pointer transition-all duration-300 ease-out"
        onClick={() => setIsModalOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="group h-full bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-xl rounded-lg border border-gray-100">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            {thumbnail.includes('coming-soon') || imageError ? (
              <PlaceholderImage />
            ) : (
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                onError={handleImageError}
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
          <div className="p-6 space-y-2">
            <span className="text-sm text-gray-500 font-medium">{category}</span>
            <h3 className="font-serif text-xl text-gray-900 group-hover:text-gray-600 transition-colors duration-300">{title}</h3>
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{ 
          title,
          description,
          category,
          projectType,
          brand,
          year,
          duration,
          tags,
          steps: steps || [],
          images
        }}
      />
    </>
  )
} 