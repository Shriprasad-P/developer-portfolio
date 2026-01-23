"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { FloatingShapes } from "./three/floating-shapes"

const statements = [
  "I build products that think alongside humans.",
  "Design systems that adapt and evolve.",
  "Interfaces should feel inevitable.",
  "Every interaction is a conversation.",
  "Code is just crystallized thought.",
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
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">03 — PHILOSOPHY</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Stream of Consciousness</h2>
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
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8">04 — BIOGRAPHY</p>
        <div className="space-y-6 font-sans text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          <p>
            I’m a passionate developer focused on building smart, scalable, and meaningful digital experiences. With
            experience across full-stack development and emerging technologies like AI/ML, I bridge creativity with
            engineering to turn ideas into working, impactful solutions.
          </p>
          <p>
            My work spans across frontend, backend, cloud technologies, and intelligent systems. I enjoy solving
            real-world problems through automation, data-driven decision-making, and intuitive user experiences.
          </p>
          <p>
            Whether it&apos;s developing applications using the MERN stack, building intelligent AI-powered tools, or
            exploring microservices and modern software architectures, I believe technology should be accessible,
            efficient, and built for the future.
          </p>
          <p>
            I’m continuously learning, experimenting, and pushing boundaries—because for me, development isn’t just a
            job, it’s a craft.
          </p>
        </div>
      </div>
    </section>
  )
}
