import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"


export const metadata: Metadata = {
  title: "Shriprasad R Patil | Developer Portfolio",
  description: "Full-stack developer specializing in MERN, Python, and LangChain | Based in Bangalore, India",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />

      <Contact />
    </main>
  )
}

