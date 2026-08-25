"use client"

import { motion } from "framer-motion"
import { technicalStack } from "@/lib/portfolio-data"

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group font-sans text-5xl md:text-7xl lg:text-8xl font-light tracking-tight whitespace-nowrap cursor-default"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              color: "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white"
              e.currentTarget.style.webkitTextStroke = "none"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "transparent"
              e.currentTarget.style.webkitTextStroke = "1px rgba(255,255,255,0.3)"
            }}
          >
            {item}
            <span className="mx-8 text-white/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section aria-labelledby="stack-title" className="relative border-t border-white/10 py-24 overflow-hidden md:py-32">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-12 mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">07 — TECHNICAL STACK</p>
        <h2 id="stack-title" className="section-title">Tools, applied with <em>intent.</em></h2>
      </motion.div>

      <div className="space-y-12">
        {technicalStack.map((group, index) => (
          <div key={group.label}>
            <p className="px-8 pb-3 font-mono text-[11px] tracking-[0.22em] text-[#86a8ff] md:px-12">{group.label.toUpperCase()}</p>
            <MarqueeRow items={group.items.map((item) => item.toUpperCase())} direction={index % 2 === 0 ? "left" : "right"} />
          </div>
        ))}
      </div>
    </section>
  )
}
