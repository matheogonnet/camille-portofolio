'use client'

import { Dialog } from '@headlessui/react'
import { cn } from '@/lib/utils'
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
    tags: string[]
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
  const [, setCurrentImageIndex] = useState(0)

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 pt-4">
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
                  <div className="relative py-8 group">
                    <div className="absolute left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-gray-300 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                </div>

                {/* Project Steps */}
                <div className="relative space-y-12 sm:space-y-16 pl-8 sm:pl-12 before:absolute before:left-[5px] sm:before:left-[8px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-gray-200">
                  {project.steps.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot and text group */}
                      <div className="group/step">
                        <div className="absolute -left-8 sm:-left-12 top-3 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-gray-300 bg-white transition-all duration-300 group-hover/step:scale-125 group-hover/step:border-gray-400" />
                        
                        {/* Content grid with text and image */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-4 sm:gap-8 items-start">
                          {/* Text section */}
                          <div className="space-y-4 cursor-default">
                            <h3 className="text-lg sm:text-xl tracking-wide uppercase text-gray-600 transition-colors duration-300 group-hover/step:text-gray-900">{step.title}</h3>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide transition-colors duration-300 group-hover/step:text-gray-600">{step.description}</p>
                          </div>
                          {/* Image section */}
                          <ImageZoom
                            src={step.image}
                            alt={step.title}
                            isPlaceholder={step.image.includes('placeholder')}
                            index={index}
                            total={project.steps.length}
                            steps={project.steps}
                          />
                        </div>
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
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
} 