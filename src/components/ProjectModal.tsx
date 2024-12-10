'use client'

import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import PlaceholderImage from './PlaceholderImage'
import ImageZoom from './ImageZoom'
import { useState } from 'react'

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
    steps: {
      title: string
      description: string
      image: string
      imagePosition: 'left' | 'right'
    }[]
    details: string
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl p-6 shadow-xl">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Dialog.Title className="text-2xl font-serif">{project.title}</Dialog.Title>
                    <p className="text-gray-600 mt-2 tracking-wide">{project.description}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                
                {/* Project Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div>
                    <h4 className="text-sm text-gray-500 tracking-wide uppercase">Category</h4>
                    <p className="text-gray-900 tracking-wide">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 tracking-wide uppercase">Project Type</h4>
                    <p className="text-gray-900 tracking-wide">{project.projectType}</p>
                  </div>
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
                <div className="relative py-8">
                  <div className="absolute left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-gray-300" />
                </div>
              </div>

              {/* Project Steps */}
              <div className="relative space-y-16 pl-8 before:absolute before:left-2 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-gray-200">
                {project.steps.map((step, index) => (
                  <div 
                    key={index}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-8 top-3 h-4 w-4 rounded-full border-2 border-gray-300 bg-white" />
                    
                    <div className={cn(
                      "grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-8 items-start"
                    )}>
                      <div className="space-y-4">
                        <h3 className="text-xl tracking-wide uppercase">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed tracking-wide">{step.description}</p>
                      </div>
                      <ImageZoom
                        src={step.image}
                        alt={step.title}
                        isPlaceholder={step.image.includes('placeholder')}
                        index={index}
                        total={project.steps.length}
                        onPrevious={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                        onNext={() => setCurrentImageIndex(prev => Math.min(project.steps.length - 1, prev + 1))}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Details */}
              <div className="border-t pt-8">
                <h3 className="text-xl tracking-wide uppercase mb-4">Project Details</h3>
                <p className="text-gray-600 leading-relaxed tracking-wide">{project.details}</p>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
} 