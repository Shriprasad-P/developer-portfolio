"use client"

import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"

const FloatingShapes = dynamic(() => import("./three/floating-shapes").then((module) => module.FloatingShapes), {
  ssr: false,
})

const statements = [
  "Grounded AI systems.",
  "Useful developer infrastructure.",
  "Research tools with evidence.",
  "Interfaces that respect attention.",
]

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
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

      // Horizontal Scroll Text
      if (textContainerRef.current) {
        gsap.to(textContainerRef.current, {
          x: "-20%", // Move left
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Decorative Line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Bio Section
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2, // Small delay relative to scroll trigger if needed, but usually strictly by trigger
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={containerRef} className="relative py-32 overflow-hidden md:py-0">
      <FloatingShapes />
      {/* Section Header */}
      <div
        ref={headerRef}
        className="px-8 md:px-12 mb-0 py-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">06 — BIOGRAPHY</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Built with care for the <span className="not-italic">real world.</span></h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative flex items-center overflow-hidden py-0 gap-0 h-16">
        <div ref={textContainerRef} className="flex gap-16 md:gap-24 px-8 md:px-12 whitespace-nowrap">
          {statements.map((statement, index) => (
            <p
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white/90"
              style={{
                WebkitTextStroke: index % 2 === 0 ? "none" : "1px rgba(255,255,255,0.3)",
                color: index % 2 === 0 ? "inherit" : "transparent",
              }}
            >
              {statement}
            </p>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div
        ref={lineRef}
        className="mt-16 mx-8 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />

      {/* Bio Section */}
      <div
        ref={bioRef}
        className="px-8 md:px-12 py-20 max-w-4xl"
      >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8">ABOUT</p>
          <div className="space-y-6 font-sans text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <p>
            I&apos;m an MCA student and AI-focused software engineer building agentic systems, research tools, and full-stack products.
            My work spans LLM agents, retrieval systems, FastAPI/Next.js applications, computer vision, developer infrastructure,
            and applied AI research.
            </p>
            <p>
            I care about systems that are verifiable, secure, and useful beyond a demo—whether that means preserving evidence,
            constraining an autonomous workflow, or making information easier to access.
          </p>
        </div>
      </div>
    </section>
  )
}
