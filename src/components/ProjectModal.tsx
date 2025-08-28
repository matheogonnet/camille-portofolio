'use client'

import { Dialog } from '@headlessui/react'
import { cn } from '@/lib/utils'
import ImageZoom from './ImageZoom'
import { useState } from 'react'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    category: string
    projectType: string
    brand?: string
    year: number
    duration: string
    tags: string[]
    steps?: {
      title: string
      description: string
      image: string
      imagePosition: 'left' | 'right'
    }[]
    images?: string[]
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [, setCurrentImageIndex] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 })

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      setLastTouchDistance(distance)
    } else if (e.touches.length === 1) {
      setLastTouchPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      
      if (lastTouchDistance > 0) {
        const newScale = scale * (distance / lastTouchDistance)
        setScale(Math.min(Math.max(newScale, 0.5), 3))
      }
      setLastTouchDistance(distance)
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan when zoomed - only on X axis (left-right)
      const touch = e.touches[0]
      const deltaX = touch.clientX - lastTouchPosition.x
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: 0 // Keep Y position fixed at 0
      }))
      
      setLastTouchPosition({
        x: touch.clientX,
        y: touch.clientY
      })
    }
  }

  const handleTouchEnd = () => {
    setLastTouchDistance(0)
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = scale * delta
    setScale(Math.min(Math.max(newScale, 0.5), 3))
  }

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2)
      setPosition({ x: 0, y: 0 })
    } else {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const goToPreviousImage = () => {
    const images = project.images
    if (images && images.length > 0) {
      setViewerIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }
  }

  const goToNextImage = () => {
    const images = project.images
    if (images && images.length > 0) {
      setViewerIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => { if (!isViewerOpen) onClose() }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300" aria-hidden="true" />
      
      <div className="fixed inset-0">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4 animate-modal-in">
          <Dialog.Panel className="mx-auto max-w-5xl w-full bg-white rounded-2xl shadow-xl max-h-[95vh] flex flex-col">
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Dialog.Title className="text-xl sm:text-2xl font-serif">{project.title}</Dialog.Title>
                      <p className="text-sm sm:text-base text-gray-600 mt-2 tracking-wide">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 tracking-wide hover:bg-gray-200 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 p-2 sm:p-0"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  
                  {/* Project Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-6 pt-4">
                    <div>
                      <h4 className="text-sm text-gray-500 tracking-wide uppercase">Category</h4>
                      <p className="text-gray-900 tracking-wide">{project.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 tracking-wide uppercase">Project Type</h4>
                      <p className="text-gray-900 tracking-wide">{project.projectType}</p>
                    </div>
                    {project.brand && (
                      <div>
                        <h4 className="text-sm text-gray-500 tracking-wide uppercase">Brand</h4>
                        <p className="text-gray-900 tracking-wide">{project.brand}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm text-gray-500 tracking-wide uppercase">Year</h4>
                      <p className="text-gray-900 tracking-wide">{project.year}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 tracking-wide uppercase">Duration</h4>
                      <p className="text-gray-900 tracking-wide">{project.duration}</p>
                    </div>
                  </div>
                  {/* Elegant Separator */}
                  <div className="relative py-8 group">
                    <div className="absolute left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-gray-300 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                </div>

                {/* Project Content */}
                {project.images && project.images.length > 0 ? (
                  <div className="space-y-6">
                    {project.images.map((imgSrc, idx) => (
                      <div 
                        key={idx} 
                        className="relative w-full cursor-pointer"
                        onClick={() => { setViewerIndex(idx); setIsViewerOpen(true) }}
                      >
                        <div className="relative w-full aspect-[3500/1350] overflow-hidden rounded-lg border border-gray-100 bg-white">
                          <Image
                            src={imgSrc}
                            alt={`${project.title} image ${idx + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority={idx === 0}
                          />
                          <div className="pointer-events-none absolute bottom-2 left-2">
                            <div className="bg-black/50 text-white rounded-full h-7 w-7 flex items-center justify-center backdrop-blur-sm animate-pulse">
                              <i className="bi bi-zoom-in text-xs"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative space-y-12 sm:space-y-16 pl-8 sm:pl-12 before:absolute before:left-[5px] sm:before:left-[8px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-gray-200">
                    {project.steps?.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="group/step">
                          <div className="absolute -left-8 sm:-left-12 top-3 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-gray-300 bg-white transition-all duration-300 group-hover/step:scale-125 group-hover/step:border-gray-400" />
                          <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-4 sm:gap-8 items-start">
                            <div className="space-y-4 cursor-default">
                              <h3 className="text-lg sm:text-xl tracking-wide uppercase text-gray-600 transition-colors duration-300 group-hover/step:text-gray-900">{step.title}</h3>
                              <p className="text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide transition-colors duration-300 group-hover/step:text-gray-600">{step.description}</p>
                            </div>
                            <ImageZoom
                              src={step.image}
                              alt={step.title}
                              isPlaceholder={step.image.includes('placeholder')}
                              index={index}
                              total={project.steps?.length || 0}
                              steps={project.steps || []}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Work in Progress Indicator for PRP Project */}
                {project.title === "Domestic Violence" && (
                  <div className="mt-16 text-center">
                    <div className="relative">
                      {/* Ligne horizontale animée */}
                      <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>{/* Le "shimmer" */}
                        <div className="absolute inset-0 w-1/2 h-full bg-white animate-shimmer-loop"></div>
                        </div>
                      {/* Texte principal */}
                      <div className="mb-6">
                        <span className="text-lg text-gray-700 tracking-widest uppercase font-medium">
                          Work Still in Progress
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
      {isViewerOpen && project.images && (
        <div 
          className="fixed inset-0 z-[60]" 
          onClick={(e) => e.stopPropagation()} 
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsViewerOpen(false)}
            onTouchStart={() => setIsViewerOpen(false)}
          />
          <div 
            className="absolute inset-0 flex items-center justify-center p-4" 
            onClick={(e) => e.stopPropagation()} 
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl h-[80vh]">
              <div
                className="relative w-full h-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src={project.images[viewerIndex]}
                  alt={`${project.title} image ${viewerIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
              <button
                onClick={() => setIsViewerOpen(false)}
                onTouchStart={() => setIsViewerOpen(false)}
                className="absolute top-3 right-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full h-8 w-8 flex items-center justify-center p-0 touch-manipulation"
                aria-label="Close image viewer"
              >
                <i className="bi bi-x-lg text-sm"></i>
              </button>
              
              {/* Navigation arrows - PC only */}
              {project.images && project.images.length > 1 && (
                <>
                  {/* Left arrow - Previous image */}
                  <button
                    onClick={goToPreviousImage}
                    className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 bg-black/20 hover:bg-black/40 rounded-full h-8 w-8 items-center justify-center p-0 transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <i className="bi bi-chevron-left text-sm"></i>
                  </button>
                  
                  {/* Right arrow - Next image */}
                  <button
                    onClick={goToNextImage}
                    className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 bg-black/20 hover:bg-black/40 rounded-full h-8 w-8 items-center justify-center p-0 transition-all duration-200"
                    aria-label="Next image"
                  >
                    <i className="bi bi-chevron-right text-sm"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
} 