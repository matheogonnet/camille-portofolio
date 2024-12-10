'use client'

import anime from 'animejs'
import { useLayoutEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Navbar from '@/components/Navbar'
import FadeInSection from '@/components/FadeInSection'
import Image from 'next/image'
import ScrollArrow from '@/components/ScrollArrow'
import AboutCard from '@/components/AboutCard'
import ContactForm from '@/components/ContactForm'

// Données de démonstration
const PROJECTS = [
  {
    id: 1,
    title: "Coming Soon",
    description: "An innovative transportation design project exploring future mobility solutions",
    category: "Transportation Design",
    projectType: "Academic Project",
    brand: "Concept Study",
    year: 2024,
    duration: "4 months",
    tags: ["3D", "Interior", "Concept", "Sustainable"],
    thumbnail: "/images/placeholder/coming-soon-1.jpg",
    steps: [
      {
        title: "Initial Research & Concept",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Preliminary research focused on understanding future mobility needs and emerging technologies that could shape transportation design.",
        image: "/images/placeholder/step-1.jpg",
        imagePosition: "right" as const
      },
      {
        title: "Design Development",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Exploration of form language and integration of innovative features through iterative sketching and 3D modeling.",
        image: "/images/placeholder/step-2.jpg",
        imagePosition: "left" as const
      },
      {
        title: "Final Design Solution",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The final design represents a harmonious blend of aesthetics and functionality.",
        image: "/images/placeholder/step-3.jpg",
        imagePosition: "right" as const
      }
    ],
    details: "A comprehensive exploration of future mobility solutions, combining innovative design thinking with practical considerations for tomorrow's transportation needs."
  }
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

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
                    Transportation Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-8 bg-gray-50">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-12">About</h2>
              
              <p className="leading-relaxed text-lg text-gray-600 mb-16">
                As a fifth-year Master's student in Transportation Design at ISD Rubika, 
                I explore the intersection of mobility, innovation, and human-centered design.
              </p>

              {/* Vision, Approach, Passion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <AboutCard
                  icon="bi-eye"
                  title="Vision"
                  description="Shaping tomorrow's mobility through innovative design solutions that harmonize functionality, sustainability, and emotional connection."
                />
                <AboutCard
                  icon="bi-bezier2"
                  title="Approach"
                  description="Combining analytical thinking with creative exploration to transform complex challenges into elegant, user-centric designs."
                />
                <AboutCard
                  icon="bi-heart"
                  title="Passion"
                  description="Driven by the belief that thoughtful design can enhance human experiences and shape a more sustainable future of transportation."
                />
              </div>

              {/* Education & Goals Section */}
              <div className="relative py-8">
                <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* Education Column - Left */}
                  <div className="text-right space-y-4 md:pr-12">
                    <span className="inline-block mb-4 text-sm tracking-wider text-gray-500 uppercase">
                      Education
                    </span>
                    <h3 className="font-serif text-2xl mb-4">ISD Rubika</h3>
                    <p className="text-gray-600">
                      Currently pursuing my Master's degree, combining academic excellence 
                      with hands-on experience in transportation design.
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                  </div>

                  {/* Goals Column - Right */}
                  <div className="text-left space-y-4 md:pl-12">
                    <span className="inline-block mb-4 text-sm tracking-wider text-gray-500 uppercase">
                      Professional Goals
                    </span>
                    <h3 className="font-serif text-2xl mb-4">Future Vision</h3>
                    <p className="text-gray-600">
                      Contributing to shaping the future of mobility through innovative and 
                      sustainable solutions that push the boundaries of what's possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-8">
          <FadeInSection>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif mb-12 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id} 
                    className="project-card"
                  >
                    <ProjectCard
                      {...project}
                    />
                  </div>
                ))}
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
                let's keep in touch
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-16">
                {/* Colonne de gauche - CV Downloads et Social Links */}
                <div className="space-y-16">
                  {/* CV Download Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl tracking-wide uppercase text-gray-800 mb-8">Download Resume</h3>
                    <div className="flex flex-col gap-4">
                      <a 
                        href="/cv/CV_CamilleGrand_FR.pdf" 
                        target="_blank"
                        className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <span className="tracking-wide text-lg text-gray-900">CV Français</span>
                        <i className="bi bi-download absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                      </a>
                      <a 
                        href="/cv/CV_CamilleGrand_EN.pdf" 
                        target="_blank"
                        className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <span className="tracking-wide text-lg text-gray-900">CV English</span>
                        <i className="bi bi-download absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-6">
                    <h3 className="text-xl tracking-wide uppercase text-gray-800 mb-8">Social Links</h3>
                    <div className="flex flex-col gap-6">
                      <a 
                        href="https://www.linkedin.com/in/camille-grand-a82aa5201/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg justify-center group text-gray-900 hover:text-gray-600"
                      >
                        <i className="bi bi-linkedin"></i>
                        <span className="border-b-2 border-transparent group-hover:border-gray-600 transition-colors duration-200">
                          LinkedIn
                        </span>
                      </a>
                      <a 
                        href="https://www.instagram.com/camillegrand.design/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg justify-center group text-gray-900 hover:text-gray-600"
                      >
                        <i className="bi bi-instagram"></i>
                        <span className="border-b-2 border-transparent group-hover:border-gray-600 transition-colors duration-200">
                          camillegrand.design
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
      </main>
    </div>
  )
} 