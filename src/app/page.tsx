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


const PROJECTS = [
  {
    id: 4,
    title: "AUXI",
    description: "I am currently working on my diploma thesis, on the topic of domestic violence. Where I'm trying to merge design and social innovation to help victims.",
    category: "Product Design",
    projectType: "Personal Project",
    brand: "Diploma Thesis",
    year: 2025,
    duration: "12 months",
    tags: [],
    thumbnail: "/images/prp/PRP_MAIN.png",
    steps: [],
    images: [
      "/images/prp/PRP.001.jpeg",
      "/images/prp/PRP.002.jpeg",
      "/images/prp/PRP.003.jpeg",
    ]  
  },
  {
    id: 3,
    title: "Spectapop",
    description: "Finalist in the Optical Design competition at the SILMO World Trade Fair in Paris.",
    category: "Product Design",
    projectType: "Design Competition",
    brand: "SILMO",
    year: 2024,
    duration: "1 month",
    tags: [],
    thumbnail: "/images/silmo/SILMO_MAIN.png",
    steps: [],
    images: [
      "/images/silmo/SILMO.001.jpeg",
      "/images/silmo/SILMO.002.jpeg",
      "/images/silmo/SILMO.003.jpeg",
      "/images/silmo/SILMO.004.jpeg"
    ]  
  },
  {
    id: 2,
    title: "CES 2024",
    description: "Contribution to the Forvia seat project for CES 2024",
    category: "Transportation Design",
    projectType: "Internship Project",
    brand: "Forvia",
    year: 2024,
    duration: "2 months",
    tags: [],
    thumbnail: "/images/forvia/FORVIA_MAIN.png",
    steps: [],
    images: [
      "/images/forvia/FORVIA.001.jpeg",
      "/images/forvia/FORVIA.002.jpeg",
      "/images/forvia/FORVIA.003.jpeg",
      "/images/forvia/FORVIA.004.jpeg"
    ]  
  },
  {
    id: 1,
    title: "Kido",
    description: "An innovative backpack designed specifically for Dacia vehicles, featuring the Youclip attachment system and integrated adventure accessories for children.",
    category: "Product Design",
    projectType: "Academic Project",
    brand: "Dacia",
    year: 2024,
    duration: "3 months",
    tags: [],
    thumbnail: "/images/dacia/DACIA_MAIN.png",
    steps: [],
    images: [
      "/images/dacia/DACIA.001.jpeg",
      "/images/dacia/DACIA.002.jpeg",
      "/images/dacia/DACIA.003.jpeg"
    ]
  },
  {
    id: 0,
    title: "Cyclauto",
    description: "An innovative bicycle concept, designed as a sustainable and efficient alternative to traditional vehicles, emphasizing compactness and modularity.",
    category: "Transportation Design",
    projectType: "Internship Project",
    brand: "Internship Project",
    year: 2022,
    duration: "2 months",
    tags: [],
    thumbnail: "/images/cyclauto/CYCLAUTO_MAIN.png",
    steps: [],
    images: [
      "/images/cyclauto/CYCLAUTO.001.jpeg",
      "/images/cyclauto/CYCLAUTO.002.jpeg",
      "/images/cyclauto/CYCLAUTO.003.jpeg"
    ]
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
                    Industrial Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ScrollArrow />
        </section>

        {/* About Section */}
        <section id="about" className="py-28 px-8 bg-gray-50">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-16">About</h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Industrial designer focused on automotive and product design,
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-16">
                creating meaningful experiences through thoughtful form and function.
              </p>
              
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-16"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-mortarboard text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                  <div className="space-y-2 text-center">
                    <p className="text-gray-600">ISD Rubika</p>
                    <p className="text-gray-600">L'Ecole de Design Nantes Atlantique</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-eye text-gray-400 text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Vision</h3>
                  <p className="text-gray-600 italic text-center">"I believe in merging human-centered thinking with design innovation, creating solutions that truly connect with people's needs and emotions."</p>
                </div>

                <div>
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-heart text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Commitment</h3>
                  <div className="space-y-2 text-center">
                    <p className="text-gray-600">Pour un Sourire d'Enfant</p>
                    <p className="text-gray-600">Paris 2024 Olympic Games</p>
                    <p className="text-gray-600">Mécénat Chirurgie Cardiaque</p>
                    <p className="text-gray-600">Les Restos du Cœur</p>
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
                    <ProjectCard {...project} />
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