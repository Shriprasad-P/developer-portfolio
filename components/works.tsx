"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ParticleBackground } from "./three/particle-background"

const projects = [
  {
    title: "SwingChat",
    tags: ["Java", "Swing", "Socket"],
    image: "/abstract-neural-network-visualization-dark-theme.jpg",
    year: "2024",
    link: "https://github.com/Shriprasad-P/SwingChat.git",
  },
  {
    title: "LexiAssist",
    tags: ["Python", "AI", "Assistant"],
    image: "/futuristic-data-dashboard-dark-minimal.jpg",
    year: "2024",
    link: "https://github.com/Shriprasad-P/LexiAssist.git",
  },

  {
    title: "AI Mock Interview",
    tags: ["Python", "AI", "Interview"],
    image: "/sound-wave-visualization-dark-theme.jpg",
    year: "2023",
    link: "https://github.com/Shriprasad-P/ai_mock_interview.git",
  },
]

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // GSAP x/y setters for performance
  const xTo = useRef<gsap.QuickToFunc>(null)
  const yTo = useRef<gsap.QuickToFunc>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup quickTo for mouse movement
      if (imageRef.current) {
        xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.1, ease: "power3" })
        yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.1, ease: "power3" })
      }

      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Projects Animation
      projectRefs.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && xTo.current && yTo.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      xTo.current(x)
      yTo.current(y)
    }
  }

  // Handle project hover for specific title animations if needed, 
  // though CSS group-hover is often cleaner for simple shifts. 
  // We'll stick to CSS for the simple shifts or use GSAP if requested.
  // The original used Framer Motion for x: 20. We can do that with GSAP context or simple conditional, 
  // but CSS `transition-transform hover:translate-x-4` is much more efficient for this.

  return (
    <section id="works" className="relative py-32 px-8 md:px-12 md:py-24 overflow-hidden">
      <ParticleBackground count={150} color="#4ade80" />
      {/* Section Header */}
      <div
        ref={headerRef}
        className="mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 — SELECTED WORKS</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">The Distortion Gallery</h2>
      </div>

      {/* Projects List */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el: HTMLDivElement | null) => { projectRefs.current[index] = el }}
            className="relative border-t border-white/10 py-8 md:py-12"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Year */}
              <span className="font-mono text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                {project.year}
              </span>

              {/* Title */}
              <h3
                className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:text-white/70 transition-all duration-300 flex-1 group-hover:translate-x-5"
              >
                {project.title}
              </h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap order-2 md:order-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}

        {/* Floating Image */}
        <div
          ref={imageRef}
          className="absolute pointer-events-none z-50 w-64 h-40 md:w-80 md:h-48 overflow-hidden rounded-lg top-0 left-0"
          style={{
            opacity: 0, // start hidden
            transform: 'translate(-50%, -50%)' // center on cursor
          }}
        >
          {/* We flip visibility via GSAP in the updated useEffect below or simply conditional rendering + gsap animation */}
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              style={{
                filter: "grayscale(50%) contrast(1.1)",
              }}
            />
          ))}
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
        </div>
      </div>

      {/* GSAP effect to show/hide the floating container container based on hover */}
      {/* We can use a small effect to animate scale/opacity of the containerRef */}
      <FloatingImageController hoveredIndex={hoveredIndex} imageRef={imageRef} />

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}

function FloatingImageController({ hoveredIndex, imageRef }: { hoveredIndex: number | null, imageRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    if (imageRef.current) {
      if (hoveredIndex !== null) {
        gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.3 })
      } else {
        gsap.to(imageRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
      }
    }
  }, [hoveredIndex])
  return null
}
