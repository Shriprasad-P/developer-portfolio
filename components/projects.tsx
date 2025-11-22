"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce user interface with product catalog, shopping cart functionality, and responsive design.",
      image: "/screenshots/e-commerce.jpg",
      tags: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
      demoUrl: "/projects/e-commerce",
      githubUrl: "https://github.com/Shriprasad-P/modern-ecommerce-ui",
    },
    {
      id: 2,
      title: "AI-Powered Chat Assistant",
      description:
        "A responsive chat interface featuring simulated AI conversations, typing indicators, and a modern message layout.",
      image: "/images/ai-chat.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Lucide React"],
      demoUrl: "/projects/ai-chat",
      githubUrl: "https://github.com/Shriprasad-P/ai-chat-assistant",
    },
    {
      id: 3,
      title: "Algorithm Visualizer",
      description:
        "An interactive educational tool to visualize sorting algorithms like Bubble, Merge, and Quick sort in real-time.",
      image: "/images/algo-viz.png",
      tags: ["Next.js", "Framer Motion", "Algorithms", "React"],
      demoUrl: "/projects/algorithm-visualizer",
      githubUrl: "https://github.com/Shriprasad-P/sorting-algorithm-visualizer",
    },
    {
      id: 4,
      title: "Task Management System",
      description:
        "A Kanban-style task management board with drag-and-drop capabilities, column organization, and priority tagging.",
      image: "/images/task-mgmt.png",
      tags: ["Next.js", "React", "Tailwind CSS", "Drag & Drop"],
      demoUrl: "/projects/task-management",
      githubUrl: "https://github.com/Shriprasad-P/kanban-task-board",
    },
    {
      id: 5,
      title: "iOS Style Todo App",
      description:
        "A web-based To-Do application replicating the iOS design language with smooth animations and dynamic island.",
      image: "/images/ios-todo.png",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "iOS Design"],
      demoUrl: "/projects/ios-todo",
      githubUrl: "https://github.com/Shriprasad-P/ios-style-todo-app",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
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
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent projects showcasing my technical skills and problem-solving abilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${hoveredProject === project.id ? "scale-110" : "scale-100"
                      }`}
                  />
                </div>

                <CardHeader>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.demoUrl} target={project.demoUrl.startsWith("http") ? "_blank" : undefined} rel={project.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <span>Live Demo</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <a href="https://github.com/Shriprasad-P" target="_blank" rel="noopener noreferrer">
              <span>View More Projects</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

