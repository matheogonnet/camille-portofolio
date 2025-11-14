'use client'

import React from 'react'
import anime from 'animejs'
import { useLayoutEffect, useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import FadeInSection from '@/components/FadeInSection'
import Image from 'next/image'
import ScrollArrow from '@/components/ScrollArrow'
import ContactForm from '@/components/ContactForm'


const PROJECTS = [
  {
    id: 4,
    images: [
      "/images/prp/PRP.001.jpeg",
      "/images/prp/PRP.002.jpeg",
      "/images/prp/PRP.003.jpeg",
      "/images/prp/PRP.004.jpeg",
      "/images/prp/PRP.005.jpeg",
      "/images/prp/PRP.006.jpeg",
      "/images/prp/PRP.007.jpeg",
      "/images/prp/PRP.008.jpeg",
      "/images/prp/PRP.009.jpeg",
      "/images/prp/PRP.010.jpeg",
      "/images/prp/PRP.011.jpeg",
      "/images/prp/PRP.012.jpeg",
      "/images/prp/PRP.013.jpeg",
      "/images/prp/PRP.014.jpeg"
    ]  
  },
  {
    id: 3,
    images: [
      "/images/silmo/SILMO.001.jpeg",
      "/images/silmo/SILMO.002.jpeg",
      "/images/silmo/SILMO.003.jpeg",
      "/images/silmo/SILMO.004.jpeg",
      "/images/silmo/SILMO.005.jpeg"
    ]  
  },
  {
    id: 2,
    images: [
      "/images/forvia/FORVIA.001.jpeg",
      "/images/forvia/FORVIA.002.jpeg",
      "/images/forvia/FORVIA.003.jpeg",
      "/images/forvia/FORVIA.004.jpeg",
      "/images/forvia/FORVIA.005.jpeg"
    ]  
  },
  {
    id: 1,
    images: [
      "/images/dacia/DACIA.001.jpeg",
      "/images/dacia/DACIA.002.jpeg",
      "/images/dacia/DACIA.003.jpeg",
      "/images/dacia/DACIA.004.jpeg",
      "/images/dacia/DACIA.005.jpeg",
      "/images/dacia/DACIA.006.jpeg",
      "/images/dacia/DACIA.007.jpeg",
      "/images/dacia/DACIA.008.jpeg",
      "/images/dacia/DACIA.009.jpeg"
    ]
  },
  {
    id: 0,
    images: [
      "/images/cyclauto/CYCLAUTO.001.jpeg",
      "/images/cyclauto/CYCLAUTO.002.jpeg",
      "/images/cyclauto/CYCLAUTO.003.jpeg"
    ]
  }
]

// Mapping des valeurs aux projets
const VALUE_PROJECTS = [
  { value: 'Listen', color: '#c85a4a', projectId: 4, subtitle: 'Master Thesis', description: 'Domestic Violence' }, // AUXI
  { value: 'Collaborate', color: '#8b3d52', projectId: 2, subtitle: 'FORVIA Seating', description: 'CES 2024' }, // FORVIA
  { value: 'Meet', color: '#c4b83a', projectId: 3, subtitle: 'SILMO', description: 'Optical Design Competition' }, // SILMO
  { value: 'Understand', color: '#4a7d7a', projectId: 1, subtitle: 'Dacia', description: 'Accessory Design Competition' }, // Kido/Dacia
  { value: 'Empower', color: '#7db8c8', projectId: 0, subtitle: 'Renault', description: 'Renault Interlude' }, // Cyclauto
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [openValue, setOpenValue] = useState<string | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const [viewerImages, setViewerImages] = useState<string[]>([])
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 })
  const videoRef = useRef<HTMLVideoElement>(null)

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
    if (viewerImages.length > 0) {
      setViewerIndex((prev) => (prev === 0 ? viewerImages.length - 1 : prev - 1))
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const goToNextImage = () => {
    if (viewerImages.length > 0) {
      setViewerIndex((prev) => (prev === viewerImages.length - 1 ? 0 : prev + 1))
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleBannerClick = (value: string, projectId: number) => {
    // Only allow opening for Forvia (projectId: 2), SILMO (projectId: 3), Dacia (projectId: 1), and PRP (projectId: 4)
    if (projectId !== 2 && projectId !== 3 && projectId !== 1 && projectId !== 4) return
    
    if (openValue === value) {
      setOpenValue(null)
    } else {
      setOpenValue(value)
    }
  }

  const handleImageClick = (images: string[], index: number) => {
    setViewerImages(images)
    setViewerIndex(index)
    setIsViewerOpen(true)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Control video play/pause based on banner open state
  useEffect(() => {
    if (videoRef.current) {
      const isForviaOpen = openValue === 'Collaborate'
      if (isForviaOpen) {
        videoRef.current.play().catch((err) => {
          console.error('Error playing video:', err)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [openValue])

  useLayoutEffect(() => {
    setIsLoaded(true)

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    })
    
    timeline
      .add({
        targets: '.logo-animation',
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 1800,
      })
      .add({
        targets: '.name-text',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1800,
      }, '-=1200')
      .add({
        targets: '.subtitle-text',
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 1200,
      }, '-=1400')
      .add({
        targets: '.project-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        duration: 800,
        begin: function() {
          document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('invisible');
          });
        }
      })

    anime({
      targets: '.elegant-border',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 2000,
      easing: 'easeOutExpo'
    })

    // Animation continue du logo (sans rotation)
    anime({
      targets: '.logo-animation',
      translateY: [-5, 5],
      scale: [0.98, 1.02],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    })

    // Effet de brillance
    anime({
      targets: '.logo-shine',
      translateX: [-200, 200],
      translateY: [-100, 100],
      opacity: [0, 0.4, 0],
      duration: 2500,
      loop: true,
      delay: 1000,
      easing: 'easeInOutSine'
    })
  }, [])

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center h-screen p-8 relative overflow-hidden">
          <div 
            className="text-center space-y-12 relative"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            <div className="elegant-border px-12 py-16 border border-gray-200 rounded-lg shadow-sm bg-white/50 backdrop-blur-sm opacity-0">
              <div className="flex flex-col items-center space-y-8 relative">
                <div className="relative w-32 h-32">
                  <div className="logo-shine absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0" />
                  <Image
                    src="/images/logo/cg_logo.png"
                    alt="CG Logo"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain opacity-0 logo-animation transform-gpu"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <h1 className="name-text block text-gray-900 text-6xl font-serif tracking-wide opacity-0">
                    Camille Grand
                  </h1>
                  <p className="subtitle-text text-gray-600 text-xl opacity-0 tracking-widest uppercase">
                    Industrial Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow />
        </section>

        {/* My Vision Section */}
        <section id="about" className="py-28 px-8 bg-gray-50">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-16">My vision</h2>
              
              {/* My vision content */}
              <div className="mb-12">
                <p className="text-lg text-gray-600 leading-relaxed">
                  I design products as vectors of emotion,<br />
                  always at the service of people.
                    </p>
                  </div>

                  {/* Separator */}
              <div className="mb-12 flex items-center justify-center">
                <div className="w-12 h-px bg-gray-300"></div>
                <div className="mx-3 w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="w-12 h-px bg-gray-300"></div>
                  </div>

              {/* My volunteer work */}
              <div>
                <h3 className="text-4xl font-serif text-gray-900 mb-6">Volunteer work</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  This human approach is not limited to my professional projects.
                </p>
                <div className="space-y-3 text-gray-600">
                  <p>Petits Princes</p>
                  <p>Paris 2024 Olympic Games</p>
                  <p>Les Restos du Cœur</p>
                  <p>Mécénat Chirurgie Cardiaque</p>
                  <p>Pour un Sourire d'Enfant</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* My Projects Section */}
        <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <FadeInSection>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-serif mb-6 sm:mb-8 text-center">Projects</h2>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
                All my work is driven by human connection and guided by five core values.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Each shows a step in my path as a designer and how I create objects for people.
              </p>
              
              <div className="space-y-1">
                {VALUE_PROJECTS.map(({ value, color, subtitle, description, projectId }) => {
                  const project = PROJECTS.find(p => p.id === projectId)
                  const isOpen = openValue === value
                  const canOpen = projectId === 2 || projectId === 3 || projectId === 1 || projectId === 4 // Forvia, SILMO, Dacia, and PRP can open
                  
                  return (
                    <div key={value}>
                      <div
                        onClick={() => canOpen && handleBannerClick(value, projectId)}
                        className={`relative w-full transition-all duration-[400ms] ease-in-out overflow-hidden shadow-sm ${
                          canOpen ? 'cursor-pointer hover:shadow-md' : ''
                        }`}
                        style={{
                          backgroundColor: color,
                          minHeight: '120px',
                          height: isOpen ? 'auto' : '120px',
                        }}
                      >
                        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-5 sm:py-6 h-full">
                          <h3 
                            className="text-xl sm:text-2xl font-serif tracking-wide text-white"
                          >
                            {value}
                          </h3>
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="text-right text-white">
                              <div className="text-sm sm:text-base md:text-lg font-medium">{subtitle}</div>
                              <div className="text-xs sm:text-sm opacity-90">{description}</div>
                            </div>
                            {canOpen && (
                              <i 
                                className={`bi bi-chevron-down text-white transition-transform duration-300 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Images section when opened */}
                        {isOpen && project?.images && project.images.length > 0 && (
                          <div className="px-4 sm:px-6 md:px-8 pb-6 space-y-6">
                            {/* Separator line for Forvia, SILMO, Dacia, and PRP */}
                            {(projectId === 2 || projectId === 3 || projectId === 1 || projectId === 4) && (
                              <div className="flex items-center justify-center max-w-3xl mx-auto pt-2">
                                <div className="w-24 h-px bg-white/30"></div>
                                <div className="mx-3 w-1 h-1 rounded-full bg-white/40"></div>
                                <div className="w-24 h-px bg-white/30"></div>
                              </div>
                            )}
                            {/* Context text for Forvia before first image */}
                            {projectId === 2 && (
                              <p className="text-white text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                                The CES in Las Vegas is one of the biggest tech shows in the world,<br />
                                where Forvia showcases its innovations every two years.
                              </p>
                            )}
                            {/* Context text for SILMO before first image */}
                            {projectId === 3 && (
                              <p className="text-white text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                                What attracted me most to this competition was the freedom: glasses allow any designer, whatever their specialty, to create emotion and meaning for the user.
                              </p>
                            )}
                            {/* Context text for Dacia before first image */}
                            {projectId === 1 && (
                              <div className="text-white text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto space-y-3">
                                <p>
                                  The goal is to design the rest of the YouClip range to meet passengers' needs.
                                </p>
                                <p>
                                  YouClip is Dacia's flexible system for personalizing your car interior.
                                </p>
                              </div>
                            )}
                            {/* Context text for PRP before first image */}
                            {projectId === 4 && (
                              <p className="text-white text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                                In France, femicides keep rising with more than 130 cases a year while only 1 in 6 victims file a complaint. Built on emotional dependence and manipulative techniques like DARVO, this project explores how design can respond to this silent emergency.
                              </p>
                            )}
                            {project.images.map((imgSrc, idx) => (
                              <div 
                                key={idx} 
                                className="relative w-full max-w-3xl mx-auto cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleImageClick(project.images || [], idx)
                                }}
                              >
                                <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-white/20 bg-white/10">
                                  <Image
                                    src={imgSrc}
                                    alt={`${subtitle} ${description} - Image ${idx + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    quality={100}
                                    unoptimized={true}
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
                            {/* Video for Forvia */}
                            {projectId === 2 && (
                              <div 
                                className="relative w-full max-w-3xl mx-auto"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-white/20 bg-white/10">
                                  <video
                                    ref={videoRef}
                                    src="/images/forvia/FORVIA.VIDEO.mp4"
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8 bg-gray-50">
          <FadeInSection>
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-6">Contact</h2>
              <p 
                className="text-xl text-gray-600 mb-16 tracking-wide inline-block hover:animate-wave cursor-default"
              >
                Let's keep in touch !
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-16">
                {/* Colonne de gauche - CV Downloads et Social Links */}
                <div className="space-y-16">
                  {/* CV Download Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl tracking-wide uppercase text-gray-800 mb-8">Resume</h3>
                    <div className="flex items-center justify-center gap-4">
                      <a 
                        href="/resume/CAMILLE_GRAND_CV_2025.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View resume PDF"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      >
                        <i className="bi bi-eye text-xl text-gray-900"></i>
                      </a>
                      <a 
                        href="/resume/CAMILLE_GRAND_CV_2025.pdf" 
                        download
                        aria-label="Download resume PDF"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      >
                        <i className="bi bi-download text-xl text-gray-900"></i>
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-6">
                    <h3 className="text-xl tracking-wide uppercase text-gray-800 mb-8">Social Links</h3>
                    <div className="flex flex-col gap-6">
                      <a 
                        href="https://www.linkedin.com/in/camille-grand/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg justify-center group text-gray-900 hover:text-gray-600"
                      >
                        <i className="bi bi-linkedin"></i>
                        <span className="border-b-2 border-transparent group-hover:border-gray-600 transition-colors duration-200">
                          in/camille-grand/
                        </span>
                      </a>
                      <a 
                        href="mailto:camille.grand44@gmail.com" 
                        className="inline-flex items-center gap-2 text-lg justify-center group text-gray-900 hover:text-gray-600"
                      >
                        <i className="bi bi-envelope"></i>
                        <span className="border-b-2 border-transparent group-hover:border-gray-600 transition-colors duration-200">
                          camille.grand44@gmail.com
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Colonne de droite - Formulaire de contact */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl tracking-wide uppercase text-gray-800 mb-8 text-left">Send a Message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Image Viewer */}
        {isViewerOpen && viewerImages.length > 0 && (
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
                  className="relative w-full h-full flex items-center justify-center"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                  onDoubleClick={handleDoubleClick}
                  style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: 'center',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img
                    src={viewerImages[viewerIndex]}
                    alt={`Image ${viewerIndex + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    draggable={false}
                    style={{
                      imageRendering: 'auto',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      WebkitTransform: 'translateZ(0)',
                      transform: 'translateZ(0)'
                    }}
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
                {viewerImages.length > 1 && (
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
      </main>
    </div>
  )
} 