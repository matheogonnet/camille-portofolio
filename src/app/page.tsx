'use client'

import React from 'react'
import anime from 'animejs'
import { useLayoutEffect, useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import FadeInSection from '@/components/FadeInSection'
import Image from 'next/image'
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
      "/images/prp/PRP.014.jpeg",
      "/images/prp/PRP.015.jpeg"
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
      "/images/renault/RENAULT.001.jpeg",
      "/images/renault/RENAULT.002.jpeg",
      "/images/renault/RENAULT.003.jpeg",
      "/images/renault/RENAULT.004.jpeg",
      "/images/renault/RENAULT.005.jpeg",
      "/images/renault/RENAULT.006.jpeg",
      "/images/renault/RENAULT.007.jpeg",
      "/images/renault/RENAULT.008.jpeg",
      "/images/renault/RENAULT.009.jpeg",
      "/images/renault/RENAULT.010.jpeg",
      "/images/renault/RENAULT.011.jpeg",
      "/images/renault/RENAULT.012.jpeg",
      "/images/renault/RENAULT.013.jpeg",
      "/images/renault/RENAULT.014.jpeg"
    ]
  }
]

// Mapping des valeurs aux projets (visuels cover : public/images/cover-picts/forme_01 … 05)
const VALUE_PROJECTS = [
  { value: 'Listen', coverImage: '/images/cover-picts/forme_01.png', projectId: 4, subtitle: 'Master Thesis', description: 'Domestic Violence' },
  { value: 'Collaborate', coverImage: '/images/cover-picts/forme_02.png', projectId: 2, subtitle: 'FORVIA Seating', description: 'CES 2024' },
  { value: 'Meet', coverImage: '/images/cover-picts/forme_03.png', projectId: 3, subtitle: 'SILMO', description: 'Optical Design Competition' },
  { value: 'Understand', coverImage: '/images/cover-picts/forme_04.png', projectId: 1, subtitle: 'Dacia', description: 'Accessory Design Competition' },
  { value: 'Empower', coverImage: '/images/cover-picts/forme_05.png', projectId: 0, subtitle: 'Renault', description: 'Renault Interlude' },
]

// 7 orbs (same colors as project circles, some repeated for coverage)
// wx / wy are fractions [0..1] of section W/H — closed loop (last = first)
const HERO_ORBS = [
  { color: '#f1dbb2', opacity: 0.72, wx: [0.05, 0.62, 0.88, 0.42, 0.10, 0.72, 0.05], wy: [0.05, 0.28, 0.72, 0.90, 0.58, 0.14, 0.05], d: 145000 },
  { color: '#f3974a', opacity: 0.68, wx: [0.80, 0.18, 0.72, 0.04, 0.88, 0.44, 0.80], wy: [0.08, 0.52, 0.88, 0.32, 0.66, 0.04, 0.08], d: 120000 },
  { color: '#fec96b', opacity: 0.70, wx: [0.42, 0.90, 0.14, 0.70, 0.28, 0.86, 0.42], wy: [0.50, 0.18, 0.82, 0.38, 0.92, 0.62, 0.50], d: 162000 },
  { color: '#a8a264', opacity: 0.66, wx: [0.14, 0.76, 0.38, 0.92, 0.18, 0.56, 0.14], wy: [0.82, 0.14, 0.52, 0.88, 0.22, 0.70, 0.82], d: 128000 },
  { color: '#7b876f', opacity: 0.64, wx: [0.66, 0.08, 0.82, 0.34, 0.76, 0.04, 0.66], wy: [0.72, 0.38, 0.08, 0.60, 0.92, 0.20, 0.72], d: 106000 },
  { color: '#f3974a', opacity: 0.58, wx: [0.50, 0.86, 0.22, 0.60, 0.08, 0.76, 0.50], wy: [0.20, 0.62, 0.36, 0.82, 0.54, 0.04, 0.20], d: 152000 },
  { color: '#fec96b', opacity: 0.56, wx: [0.28, 0.04, 0.72, 0.46, 0.96, 0.12, 0.28], wy: [0.34, 0.76, 0.56, 0.14, 0.42, 0.86, 0.34], d: 126000 },
] as const

// Without keyframes, anime 3 splits `d` evenly across path legs — first leg was ~d/6 (several seconds of barely visible drift).
const HERO_ORB_FAST_LEG_RATIO = 0.05

/** Soft halo without `filter: blur()` — integrated/mobile GPUs often composite blur as a rectangle when the layer moves. */
function parseHexRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function heroOrbRadialBackground(hex: string, orbOpacity: number): string {
  const { r, g, b } = parseHexRgb(hex)
  const a = (t: number) => Math.min(1, orbOpacity * t)
  const rgba = (t: number) => `rgba(${r},${g},${b},${a(t).toFixed(3)})`
  return `radial-gradient(circle, ${rgba(0.98)} 0%, ${rgba(0.52)} 30%, ${rgba(0.18)} 52%, ${rgba(0)} 71%)`
}

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
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroOrbRefs = useRef<(HTMLDivElement | null)[]>([])
  const heroOrbAnimeRef = useRef<ReturnType<typeof anime>[]>([])
  const projectCirclesRowRef = useRef<HTMLDivElement>(null)
  const projectPanelEndRef = useRef<HTMLDivElement>(null)
  const [projectCloseVisible, setProjectCloseVisible] = useState(false)

  const SCROLL_TO_CIRCLES_MS = 780

  const handleCloseProjectPanel = () => {
    const ROW = projectCirclesRowRef.current
    if (ROW) {
      ROW.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
    window.setTimeout(() => setOpenValue(null), SCROLL_TO_CIRCLES_MS)
  }

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

  const handleBannerClick = (value: string) => {
    // Allow opening for all projects
    if (openValue === value) {
      setOpenValue(null)
    } else {
      setOpenValue(value)
      // Scroll to the opened banner after a short delay to allow DOM update
      setTimeout(() => {
        const bannerElement = document.querySelector(`[data-banner-value="${value}"]`)
        if (bannerElement) {
          bannerElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const handleImageClick = (images: string[], index: number) => {
    setViewerImages(images)
    setViewerIndex(index)
    setIsViewerOpen(true)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Preload all images and video on page load
  useEffect(() => {
    // Collect all image URLs from all projects
    const allImageUrls = PROJECTS.flatMap(project => project.images || [])
    
    // Preload all images
    allImageUrls.forEach((imageUrl) => {
      const img = new window.Image()
      img.src = imageUrl
    })
    
    // Preload video
    const video = document.createElement('video')
    video.src = '/images/forvia/FORVIA.VIDEO.mp4'
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    // Keep video element in memory for faster access
    document.body.appendChild(video)
    video.style.display = 'none'
    
    return () => {
      // Cleanup: remove hidden video element
      if (video.parentNode) {
        video.parentNode.removeChild(video)
      }
    }
  }, [])

  // Control video play/pause based on banner open state
  useEffect(() => {
    const isForviaOpen = openValue === 'Collaborate'
    if (isForviaOpen) {
      // Wait longer after scroll to ensure video is mounted and visible
      const timeoutId = setTimeout(() => {
        if (videoRef.current) {
          const video = videoRef.current
          // Try to play the video
          const tryPlay = () => {
            if (video && !video.paused) return // Already playing
            video.play().catch(() => {
              // Ignore errors silently
            })
          }
          
          // If video is ready, play immediately
          if (video.readyState >= 2) {
            tryPlay()
          } else {
            // Otherwise wait for it to load
            const handleCanPlay = () => {
              tryPlay()
              video.removeEventListener('canplay', handleCanPlay)
            }
            video.addEventListener('canplay', handleCanPlay)
          }
        }
      }, 500) // Increased delay to account for scroll animation
      
      // Monitor video to ensure it keeps playing
      const checkInterval = setInterval(() => {
        if (videoRef.current && isForviaOpen && videoRef.current.paused) {
          videoRef.current.play().catch(() => {})
        }
      }, 1000) // Check every second
      
      return () => {
        clearTimeout(timeoutId)
        clearInterval(checkInterval)
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [openValue])

  useLayoutEffect(() => {
    if (!openValue) {
      setProjectCloseVisible(false)
      return
    }
    const NODE = projectPanelEndRef.current
    if (!NODE) return

    setProjectCloseVisible(false)

    const OBSERVER = new IntersectionObserver(
      (entries) => {
        const [ENTRY] = entries
        if (ENTRY) setProjectCloseVisible(ENTRY.isIntersecting)
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )
    OBSERVER.observe(NODE)
    return () => OBSERVER.disconnect()
  }, [openValue])

  useLayoutEffect(() => {
    setIsLoaded(true)

    // Halos hero : en même temps que l’intro logo / texte (pas après isLoaded ni la fin du texte)
    heroOrbAnimeRef.current.forEach((A) => {
      try {
        A.pause()
      } catch {
        /* ignore */
      }
    })
    heroOrbAnimeRef.current = []

    const SECTION = heroSectionRef.current
    if (
      SECTION &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const W = Math.max(SECTION.clientWidth || 0, window.innerWidth || 0)
      const H = Math.max(SECTION.clientHeight || 0, window.innerHeight || 0)
      const ORB_PX = window.innerWidth < 640 ? 96 : window.innerWidth < 768 ? 112 : 128

      if (W >= 2 && H >= 2) {
        const INSTANCES: ReturnType<typeof anime>[] = []

        HERO_ORBS.forEach((ORB, I) => {
          const EL = heroOrbRefs.current[I]
          if (!EL) return

          const clampX = (f: number) => Math.round(Math.max(0, Math.min(f * W, W - ORB_PX)))
          const clampY = (f: number) => Math.round(Math.max(0, Math.min(f * H, H - ORB_PX)))

          EL.style.left = `${clampX(ORB.wx[0])}px`
          EL.style.top = `${clampY(ORB.wy[0])}px`

          const LEGS = ORB.wx.length - 1
          const R_SLOW = (1 - 2 * HERO_ORB_FAST_LEG_RATIO) / (LEGS - 2)
          const MS_FAST = Math.round(ORB.d * HERO_ORB_FAST_LEG_RATIO)
          const MS_SLOW = Math.round(ORB.d * R_SLOW)
          const SEG_MS = [
            MS_FAST,
            MS_FAST,
            ...Array.from({ length: LEGS - 2 }, () => MS_SLOW),
          ] as number[]
          const DRIFT = ORB.d - SEG_MS.reduce((a, b) => a + b, 0)
          SEG_MS[SEG_MS.length - 1] += DRIFT

          const KEYFRAMES = Array.from({ length: LEGS }, (_, S) => ({
            left: clampX(ORB.wx[S + 1]),
            top: clampY(ORB.wy[S + 1]),
            duration: SEG_MS[S],
            easing: 'easeInOutQuad',
          }))

          INSTANCES.push(
            anime({
              targets: EL,
              keyframes: KEYFRAMES,
              delay: I * 40,
              loop: true,
              autoplay: true,
            })
          )
        })

        heroOrbAnimeRef.current = INSTANCES
      }
    }

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

    return () => {
      heroOrbAnimeRef.current.forEach((A) => {
        try {
          A.pause()
        } catch {
          /* ignore */
        }
      })
      heroOrbAnimeRef.current = []
    }
  }, [])

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          ref={heroSectionRef}
          className="relative flex h-screen min-h-screen flex-col overflow-hidden bg-gradient-to-b from-stone-50 via-neutral-50 to-white p-8"
        >
          {/* Orbs flottants - pilotes par anime.js */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            {HERO_ORBS.map((ORB, I) => (
              <div
                key={`hero-orb-${I}`}
                ref={(EL) => { heroOrbRefs.current[I] = EL }}
                className="absolute"
                style={{ width: 128, height: 128, left: 0, top: 0 }}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: heroOrbRadialBackground(ORB.color, ORB.opacity),
                  }}
                />
              </div>
            ))}
          </div>

          {/* Brume légère — pas de backdrop-blur plein écran (il supprimait les halos) */}
          <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/28 to-white/55" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 85% 70% at 50% 45%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 55%, rgba(252,251,250,0.7) 100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </div>

          <div
            className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-2"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
          >
            <div className="relative space-y-12 text-center">
              <div className="elegant-border rounded-lg border border-gray-200/90 bg-white/55 px-12 py-16 opacity-0 shadow-sm ring-1 ring-white/60 backdrop-blur-md">
                <div className="relative flex flex-col items-center space-y-8">
                  <div className="relative h-32 w-32">
                    <div className="logo-shine absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0" />
                    <Image
                      src="/images/logo/cg_logo.png"
                      alt="CG Logo"
                      width={120}
                      height={120}
                      className="logo-animation h-full w-full transform-gpu object-contain opacity-0"
                      priority
                    />
                  </div>
                  <div className="space-y-4">
                    <h1 className="name-text block text-6xl font-serif tracking-wide text-gray-900 opacity-0">
                      Camille Grand
                    </h1>
                    <p className="subtitle-text text-xl tracking-widest text-gray-600 opacity-0 uppercase">
                      Industrial Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Vision Section */}
        <section id="about" className="py-28 px-8 bg-[#fdfaf6]">
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
                  {[
                    'Petits Princes',
                    'Paris 2024 Olympic Games',
                    'Les Restos du Cœur',
                    'Mécénat Chirurgie Cardiaque',
                    "Pour un Sourire d'Enfant",
                  ].map((label) => (
                    <p
                      key={label}
                      className="mx-auto max-w-lg cursor-default rounded-md px-3 py-2 transition-all duration-300 ease-out hover:translate-x-1 hover:text-gray-900"
                    >
                      {label}
                    </p>
                  ))}
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
              
              <div className="space-y-8">
                <div
                  ref={projectCirclesRowRef}
                  className="grid scroll-mt-24 grid-cols-6 justify-items-center gap-x-3 gap-y-8 pb-2 max-w-md mx-auto sm:max-w-none sm:mx-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-6 md:gap-8 lg:flex-nowrap lg:justify-center lg:gap-5 xl:gap-8"
                >
                  {VALUE_PROJECTS.map(({ value, coverImage, subtitle }, index) => {
                    const isOpen = openValue === value
                    const HAS_PANEL_OPEN = openValue !== null
                    const isDimmed = HAS_PANEL_OPEN && !isOpen
                    const MOBILE_CELL =
                      index < 3
                        ? 'col-span-2'
                        : index === 3
                          ? 'col-span-2 col-start-2'
                          : 'col-span-2 col-start-4'

                    return (
                      <div
                        key={value}
                        data-banner-value={value}
                        className={`${MOBILE_CELL} w-full max-w-[150px] justify-self-center text-center sm:max-w-none sm:shrink-0 sm:col-auto sm:col-start-auto sm:w-[200px] md:w-auto md:min-w-0 lg:flex-1 lg:min-w-0 lg:max-w-[220px]`}
                      >
                        <button
                          type="button"
                          onClick={() => handleBannerClick(value)}
                          className="w-full flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer"
                          aria-expanded={isOpen}
                          aria-label={`${value} — ${subtitle}`}
                        >
                          <span
                            className={`relative inline-block shrink-0 transition-all duration-300 ease-out w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 ${
                              isOpen
                                ? 'z-[1] scale-[1.14] sm:scale-[1.12] md:scale-[1.15]'
                                : ''
                            } ${
                              !HAS_PANEL_OPEN
                                ? 'group-hover:scale-110 group-hover:drop-shadow-md group-active:scale-105 sm:group-hover:scale-[1.11] md:group-hover:scale-[1.12]'
                                : ''
                            } ${
                              isDimmed
                                ? 'scale-95 opacity-45 saturate-[0.5] brightness-110 contrast-95'
                                : ''
                            }`}
                          >
                            <Image
                              src={coverImage}
                              alt={`${value} — ${subtitle}`}
                              fill
                              sizes="(max-width: 639px) 128px, (max-width: 767px) 160px, 192px"
                              className="object-contain"
                              priority={index < 3}
                            />
                          </span>
                          <span
                            className={`font-serif text-xs sm:text-sm md:text-base tracking-wide transition-colors duration-300 ${
                              isDimmed ? 'text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            {value}
                          </span>
                          <span
                            className={`text-[10px] sm:text-xs md:text-sm font-medium leading-tight px-0.5 transition-colors duration-300 ${
                              isDimmed ? 'text-gray-400/80' : 'text-gray-600'
                            }`}
                          >
                            {subtitle}
                          </span>
                          <i
                            className={`bi bi-chevron-down text-xs sm:text-sm transition-all duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            } ${isDimmed ? 'text-gray-400/50' : 'text-gray-600'}`}
                          />
                        </button>
                      </div>
                    )
                  })}
                </div>

                {(() => {
                  const ACTIVE = openValue
                    ? VALUE_PROJECTS.find((v) => v.value === openValue)
                    : null
                  const project = ACTIVE ? PROJECTS.find((p) => p.id === ACTIVE.projectId) : null
                  const projectId = ACTIVE?.projectId
                  const subtitle = ACTIVE?.subtitle ?? ''
                  const description = ACTIVE?.description ?? ''
                  const PANEL_BG = '#f6f6f6'
                  const PANEL_BODY = 'text-gray-900'
                  const PANEL_RULE = 'bg-gray-300'
                  const PANEL_DOT = 'bg-gray-500'
                  const PANEL_IMG_BORDER = 'border-gray-200'
                  const PANEL_IMG_BG = 'bg-white'

                  if (!ACTIVE || !project?.images?.length) return null

                  return (
                    <div
                      className="relative w-full overflow-hidden rounded-xl shadow-lg motion-reduce:animate-none animate-panel-reveal"
                      style={{ backgroundColor: PANEL_BG }}
                      data-open-project={ACTIVE.value}
                    >
                      <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6">
                        <div className="flex items-center justify-center max-w-3xl mx-auto pt-2">
                          <div className={`w-24 h-px ${PANEL_RULE}`} />
                          <div className={`mx-3 w-1 h-1 rounded-full ${PANEL_DOT}`} />
                          <div className={`w-24 h-px ${PANEL_RULE}`} />
                        </div>

                        {projectId === 2 && (
                          <p className={`${PANEL_BODY} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto`}>
                            The CES in Las Vegas is one of the biggest tech shows in the world,<br />
                            where Forvia showcases its innovations every two years.
                          </p>
                        )}
                        {projectId === 3 && (
                          <p className={`${PANEL_BODY} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto`}>
                            What attracted me most to this competition was the freedom: glasses allow any designer, whatever their specialty, to create emotion and meaning for the user.
                          </p>
                        )}
                        {projectId === 1 && (
                          <div className={`${PANEL_BODY} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto`}>
                            <p>
                              The goal is to design the rest of the YouClip range to meet passengers' needs.
                            </p>
                            <p>
                              YouClip is Dacia's flexible system for personalizing your car interior.
                            </p>
                          </div>
                        )}
                        {projectId === 4 && (
                          <p className={`${PANEL_BODY} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto`}>
                            In France, femicides keep rising with over 130 cases a year, yet only 1 in 6 victims reports it.<br />
                            Built on emotional dependence and manipulative techniques like DARVO,<br />
                            this project explores how design can respond to this silent emergency.
                          </p>
                        )}
                        {projectId === 0 && (
                          <p className={`${PANEL_BODY} text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto`}>
                            During my internship, I worked on accessories as well as Renault's Premium Family segment, which served as a guiding vision for my personal project.
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
                            <div className={`relative w-full aspect-video overflow-hidden rounded-lg border ${PANEL_IMG_BORDER} ${PANEL_IMG_BG}`}>
                              <Image
                                src={imgSrc}
                                alt={`${subtitle} ${description} - Image ${idx + 1}`}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                quality={100}
                                unoptimized={true}
                                priority={true}
                                loading="eager"
                              />
                              <div className="pointer-events-none absolute bottom-2 left-2">
                                <div className="bg-black/50 text-white rounded-full h-7 w-7 flex items-center justify-center backdrop-blur-sm animate-pulse">
                                  <i className="bi bi-zoom-in text-xs"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {projectId === 2 && (
                          <div
                            className="relative w-full max-w-3xl mx-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className={`relative w-full aspect-video overflow-hidden rounded-lg border ${PANEL_IMG_BORDER}`} style={{ minHeight: '400px', backgroundColor: 'transparent' }}>
                              <video
                                ref={videoRef}
                                src="/images/forvia/FORVIA.VIDEO.mp4"
                                loop
                                muted
                                playsInline
                                autoPlay
                                preload="auto"
                                width="1920"
                                height="1080"
                                className="w-full h-full object-contain"
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  height: '100%',
                                  minHeight: '400px',
                                  backgroundColor: 'transparent',
                                  opacity: 1,
                                  visibility: 'visible',
                                  zIndex: 1,
                                  position: 'relative'
                                }}
                                onCanPlay={() => {
                                  if (videoRef.current && openValue === 'Collaborate' && videoRef.current.paused) {
                                    videoRef.current.play().catch(() => {})
                                  }
                                }}
                                onPause={() => {
                                  if (videoRef.current && openValue === 'Collaborate') {
                                    videoRef.current.play().catch(() => {})
                                  }
                                }}
                                onEnded={() => {
                                  if (videoRef.current && openValue === 'Collaborate') {
                                    videoRef.current.currentTime = 0
                                    videoRef.current.play().catch(() => {})
                                  }
                                }}
                                onTimeUpdate={() => {
                                  if (videoRef.current && openValue === 'Collaborate' && videoRef.current.paused) {
                                    videoRef.current.play().catch(() => {})
                                  }
                                }}
                              >
                                <source src="/images/forvia/FORVIA.VIDEO.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}

                        <div
                          ref={projectPanelEndRef}
                          className="pt-8 pb-2 flex flex-col items-center gap-5 scroll-mt-8"
                        >
                          <div className={`w-10 h-px ${PANEL_RULE}`} />
                          <button
                            type="button"
                            tabIndex={projectCloseVisible ? 0 : -1}
                            aria-hidden={!projectCloseVisible}
                            aria-label="Back to projects"
                            onClick={handleCloseProjectPanel}
                            className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/90 bg-white/90 text-gray-600 shadow-sm backdrop-blur-sm transition-all duration-500 ease-out hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400 motion-safe:hover:-translate-y-0.5 ${
                              projectCloseVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-3 pointer-events-none'
                            }`}
                          >
                            <i
                              className="bi bi-chevron-up text-lg transition-transform duration-500 ease-out group-hover:-translate-y-1"
                              aria-hidden
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8 bg-[#fdfaf6]">
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
                        href="/resume/CAMILLE_GRAND_RESUME_2026.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View resume PDF"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      >
                        <i className="bi bi-eye text-xl text-gray-900"></i>
                      </a>
                      <a 
                        href="/resume/CAMILLE_GRAND_RESUME_2026.pdf" 
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
                  <div className="relative h-full w-full">
                    <Image
                      key={viewerImages[viewerIndex]}
                      src={viewerImages[viewerIndex]}
                      alt={`Image ${viewerIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, min(100vw, 72rem)"
                      draggable={false}
                      priority={viewerIndex === 0}
                    />
                  </div>
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