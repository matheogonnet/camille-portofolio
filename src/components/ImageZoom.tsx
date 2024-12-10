'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import PlaceholderImage from './PlaceholderImage'
import { useKeyPress } from '@/hooks/useKeyPress'

interface ImageZoomProps {
  src?: string
  alt?: string
  isPlaceholder?: boolean
  index?: number
  total?: number
  onPrevious?: () => void
  onNext?: () => void
  steps: Array<{ image: string; title: string }>
}

export default function ImageZoom({ 
  src, 
  alt = '', 
  isPlaceholder = false,
  index = 0,
  total,
  steps
}: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(index)

  useEffect(() => {
    setCurrentIndex(index)
  }, [index])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < (steps.length - 1)) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  // Keyboard shortcuts
  useKeyPress('Escape', () => setIsOpen(false))
  useKeyPress('ArrowLeft', handlePrevious)
  useKeyPress('ArrowRight', handleNext)

  return (
    <>
      {/* Image container with hover effect */}
      <div 
        className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in group"
        onClick={() => setIsOpen(true)}
      >
        {isPlaceholder ? (
          <PlaceholderImage />
        ) : (
          <Image
            src={src || ''}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <i className="bi bi-zoom-in text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl"></i>
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[60]">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
          <Dialog.Panel className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-5xl aspect-[4/3] bg-transparent">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 p-2"
            >
              <i className="bi bi-x-lg text-xl sm:text-2xl"></i>
            </button>

            {/* Image */}
            <div className="w-full h-full relative rounded-lg overflow-hidden bg-gray-800">
              {isPlaceholder ? (
                <PlaceholderImage />
              ) : (
                <Image
                  src={steps[currentIndex].image}
                  alt={steps[currentIndex].title}
                  fill
                  className="object-contain transition-all duration-500 ease-in-out"
                  quality={95}
                />
              )}
            </div>

            {/* Navigation buttons */}
            {total && total > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
                  disabled={currentIndex === 0}
                >
                  <i className="bi bi-chevron-left text-2xl sm:text-3xl"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                  disabled={currentIndex === steps.length - 1}
                >
                  <i className="bi bi-chevron-right text-3xl"></i>
                </button>
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white">
                  {currentIndex + 1} / {total}
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
} 