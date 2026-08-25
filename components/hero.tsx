"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react"
import { SentientSphere } from "./sentient-sphere"
import { profile } from "@/lib/portfolio-data"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      )
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[760px] h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35">
        <SentientSphere />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />

      {/* Typography Overlay */}
      <motion.div style={{ opacity, scale }} className="relative z-10 flex min-h-[760px] h-full flex-col justify-between p-6 pt-28 sm:p-8 sm:pt-32 md:px-12 md:py-20">
        {/* Top Left */}
        <div ref={titleRef} className="drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">01 — SHRIPRASAD PATIL</p>
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance">
            Shriprasad
            <br />
            <span className="italic">Patil</span>
          </h1>
        </div>



        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[40rem] self-end text-right drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-3">02 — PRACTICE</p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance">
            AI-Native
            <br />
            <span className="italic">Software Engineer</span>
          </h2>
          <p className="mt-5 max-w-md font-mono text-xs leading-6 text-white/65 sm:text-sm">
            I build agentic systems, AI-powered products, research tools, and production-grade developer infrastructure.
          </p>
          <p className="mt-3 max-w-lg font-mono text-[11px] leading-5 text-white/40">
            LLM agents · retrieval systems · computer vision · FastAPI · Next.js · full-stack AI engineering
          </p>
          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <a href="#work" className="hero-action">View work <ArrowDownRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub"><Github size={17} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href={profile.huggingFace} target="_blank" rel="noreferrer" className="social-icon" aria-label="Hugging Face">HF</a>
            <a href={`mailto:${profile.email}`} className="social-icon" aria-label="Email Shriprasad Patil"><Mail size={17} /></a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
