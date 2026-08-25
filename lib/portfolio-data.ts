export type Project = {
  slug: string
  title: string
  eyebrow: string
  description: string
  problem: string
  engineering: string[]
  reliability?: string
  technologies: string[]
  github: string
  image: string
  imageAlt: string
  featured: boolean
}

export type Certification = {
  title: string
  issuer: string
  issuedAt: string
  credentialId: string
  skills: string[]
}

export const profile = {
  email: "shriprasadpatil8@gmail.com",
  github: "https://github.com/Shriprasad-P",
  linkedin: "https://www.linkedin.com/in/shriprasadpatil2001",
  resumeRequest: "mailto:shriprasadpatil8@gmail.com?subject=Resume%20request",
}

export const projects: Project[] = [
  {
    slug: "paperlens",
    title: "PaperLens",
    eyebrow: "AI Research Intelligence Platform",
    description: "Turn research papers into visual, evidence-grounded, verifiable explanations.",
    problem: "Dense research papers make it difficult to trace claims back to the source material while reading, comparing, and synthesizing work.",
    engineering: [
      "Separates ingestion, parsing, provenance, extraction, verification, and rendering into explicit stages.",
      "Combines lexical BM25 and optional semantic retrieval with hybrid reciprocal-rank fusion.",
      "Supports evidence registry artifacts, paper-aware chat, workspaces, comparison, citation graphs, and a bounded research agent.",
    ],
    reliability: "Claims remain explicitly unverified when evidence or model credentials are unavailable; evaluation reports are preliminary by design.",
    technologies: ["Next.js", "FastAPI", "Python", "RAG", "Agents", "PostgreSQL", "Docker", "Tauri"],
    github: "https://github.com/Shriprasad-P/Paper-Lens",
    image: "/abstract-memory-storage-visualization.jpg",
    imageAlt: "Abstract layered visualization representing a research evidence system",
    featured: true,
  },
  {
    slug: "agentdock",
    title: "AgentDock",
    eyebrow: "Secure AI Coding Agent Platform",
    description: "A secure coding-agent platform where AI agents work inside isolated sandboxes, validate changes, and open approval-gated GitHub pull requests.",
    problem: "AI coding workflows need a controlled path from repository access through edits, validation, and human-approved publication.",
    engineering: [
      "Runs a bounded inspect → edit → validate loop through constrained tools in ephemeral Docker sandboxes.",
      "Connects GitHub App installations and repository permissions to ownership-aware execution jobs.",
      "Streams authenticated run status, tool activity, and output through WebSockets with REST recovery.",
    ],
    reliability: "Uses Argon2id password hashing, hashed session tokens, rate limiting, signature-verified webhooks, bounded logs, cancellation, and approval-gated Git operations.",
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "WebSockets", "LLM Agents", "GitHub API"],
    github: "https://github.com/Shriprasad-P/CodeForge-AI",
    image: "/futuristic-data-dashboard-dark-minimal.jpg",
    imageAlt: "Abstract dark data dashboard visual representing a coding-agent control plane",
    featured: true,
  },
  {
    slug: "lexiassist",
    title: "LexiAssist",
    eyebrow: "AI Accessibility Platform",
    description: "An accessibility-focused AI system that transforms documents and visual content into more understandable formats through OCR, simplification, and speech.",
    problem: "Reading-heavy content is often inaccessible to people with dyslexia, learning differences, visual strain, or low reading confidence.",
    engineering: [
      "Processes images and PDFs through preprocessing, OCR, text cleaning, simplification, and voice generation.",
      "Offers adjustable reading settings, dyslexia-friendly presentation, high contrast, voice tones, and local session history.",
    ],
    technologies: ["Python", "Gradio", "Gemini", "FLAN-T5", "ElevenLabs", "OCR"],
    github: "https://github.com/Shriprasad-P/LexiAssist",
    image: "/sound-wave-visualization-dark-theme.jpg",
    imageAlt: "Abstract sound-wave visualization representing accessible text-to-speech",
    featured: true,
  },
  {
    slug: "deepvisionsuit",
    title: "DeepVision Suite",
    eyebrow: "Computer Vision & Explainable AI",
    description: "A PyTorch image-classification system that pairs custom ResNet modeling with interpretable visual diagnostics.",
    problem: "Image classifiers are more useful when their predictions can be inspected, explained, tested, and served consistently.",
    engineering: [
      "Trains a custom residual network on Tiny ImageNet and exports models for ONNX-based inference.",
      "Includes Grad-CAM, feature-map, filter, and architecture visualizations alongside FastAPI serving and Docker packaging.",
    ],
    technologies: ["Python", "PyTorch", "ResNet", "Tiny ImageNet", "Grad-CAM", "FastAPI", "ONNX", "Docker"],
    github: "https://github.com/Shriprasad-P/DeepVisionSuit",
    image: "/abstract-neural-network-visualization-dark-theme.jpg",
    imageAlt: "Abstract neural-network visualization representing explainable computer vision",
    featured: true,
  },
]

export const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    issuedAt: "February 14, 2026",
    credentialId: "c3DQ-uScT",
    skills: ["Azure AI", "Machine Learning", "Computer Vision", "NLP", "Generative AI Fundamentals"],
  },
]

export const technicalStack = [
  { label: "AI / ML", items: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "LLMs", "RAG", "AI Agents", "Computer Vision", "OpenCV"] },
  { label: "Backend", items: ["FastAPI", "REST APIs", "WebSockets", "PostgreSQL", "Redis", "MySQL", "Firebase"] },
  { label: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js"] },
  { label: "Infrastructure", items: ["Docker", "Git", "GitHub", "Linux", "CI/CD"] },
]
