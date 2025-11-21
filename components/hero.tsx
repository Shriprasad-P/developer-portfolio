"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "./navbar"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "MERN Stack Developer | Python | Data Structures | LangChain"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Hi, I'm <span className="text-primary">Shriprasad R Patil</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-6 h-8">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
            I build modern web applications with React, Node.js, and MongoDB. Passionate about creating efficient
            algorithms and leveraging AI with LangChain.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button asChild size="lg">
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Shriprasad-P" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/shriprasad-patil-helloworld"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:shriprasadpatil8@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <Button variant="ghost" size="icon" asChild>
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </section>
  )
}

