"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Server, Braces } from "lucide-react"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Background & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate full-stack developer with expertise in modern web technologies and a strong foundation in
            computer science fundamentals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-4">
                  Based in Bangalore, I started my programming journey with Python, building small automation tools and
                  scripts. As I grew more interested in web development, I mastered the MERN stack and began creating
                  full-stack applications.
                </p>
                <p className="text-muted-foreground">
                  My strong foundation in data structures and algorithms helps me write efficient and optimized code.
                  Recently, I've been exploring AI and NLP through LangChain and similar technologies to build
                  intelligent applications.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Core Competencies</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Frontend</h4>
                      <p className="text-sm text-muted-foreground">React, Next.js, Tailwind CSS, TypeScript</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Server className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Backend</h4>
                      <p className="text-sm text-muted-foreground">Node.js, Express, Python, FastAPI</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Databases</h4>
                      <p className="text-sm text-muted-foreground">MongoDB, PostgreSQL, Redis</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Braces className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">CS Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">Data Structures, Algorithms, System Design</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

