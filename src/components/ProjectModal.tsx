'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import anime from 'animejs'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    category: string
    thumbnail: string
    images: string[]
    details: string
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Animation d'ouverture
      anime.timeline({
        duration: 600,
        easing: 'easeOutQuart'
      })
      .add({
        targets: '.modal-overlay',
        opacity: [0, 1],
        duration: 300
      })
      .add({
        targets: '.modal-content',
        opacity: [0, 1],
        scale: [0.98, 1],
        translateY: [20, 0],
      }, '-=200')
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div 
        className="modal-overlay absolute inset-0 bg-white/80 backdrop-blur-lg opacity-0"
        onClick={onClose}
      />
      <div className="absolute inset-12 md:inset-16">
        <div 
          className="modal-content opacity-0 expanded-content relative w-full h-full bg-white shadow-2xl overflow-y-auto rounded-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 group"
            aria-label="Close"
          >
            <div className="relative">
              <div className="absolute -inset-2.5 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              <svg 
                className="w-5 h-5 relative text-gray-400 group-hover:text-gray-900 transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>

          <div className="max-w-[1800px] mx-auto px-8 py-16 md:px-16 md:py-20">
            {/* En-tête avec style amélioré */}
            <div className="mb-20 max-w-3xl">
              <span className="inline-block text-sm text-gray-500 font-medium tracking-wider uppercase mb-4 px-3 py-1 bg-gray-50 rounded-full">
                {project.category}
              </span>
              <h2 className="font-serif text-5xl mt-3 mb-8">{project.title}</h2>
              <p className="text-gray-600 leading-relaxed text-xl">{project.description}</p>
            </div>

            {/* Image principale avec ombre subtile */}
            <div className="relative w-full aspect-[21/9] mb-20 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Détails du projet avec style amélioré */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-20 mb-20">
              <div>
                <h3 className="font-serif text-3xl mb-8">Project Details</h3>
                <p className="text-gray-600 leading-relaxed text-xl">{project.details}</p>
              </div>

              {project.images.length > 1 && (
                <div className="grid grid-cols-2 gap-8 self-start">
                  {project.images.slice(1).map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={img}
                        alt={`${project.title} - image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informations supplémentaires avec style amélioré */}
            <div className="border-t border-gray-100 pt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div>
                  <h4 className="text-sm text-gray-400 font-medium uppercase mb-2">Year</h4>
                  <p className="text-lg font-serif">2024</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 font-medium uppercase mb-2">Role</h4>
                  <p className="text-lg font-serif">Transportation Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
} 