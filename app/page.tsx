import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"
import { FeaturedWork } from "@/components/featured-work"
import { Certifications, OpenSource, Research } from "@/components/evidence-sections"
import { AILabs } from "@/components/ai-labs"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionBlend />
        <FeaturedWork />
        <AILabs />
        <OpenSource />
        <Research />
        <Certifications />
        <About />
        <TechMarquee />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
