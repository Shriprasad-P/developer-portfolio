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
  issuedAt?: string
  credentialId?: string
  recognition?: string
  verificationUrl?: string
  skills: string[]
}

export type Contribution = {
  ecosystem: string
  pullRequest: string
  title?: string
  status: "Merged" | "Open" | "Closed — Not Merged" | "Merged collaborative contribution"
  url: string
}

export const profile = {
  email: "shriprasadpatil8@gmail.com",
  github: "https://github.com/Shriprasad-P",
  linkedin: "https://www.linkedin.com/in/shriprasadpatil2001",
  huggingFace: "https://huggingface.co/Shriprasad-P",
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

export const mergedContributions: Contribution[] = [
  { ecosystem: "pytest", pullRequest: "PR #14845", title: "docs: endorse pytest-skip-slow plugin", status: "Merged", url: "https://github.com/pytest-dev/pytest/pull/14845" },
  { ecosystem: "Hiero Analytics", pullRequest: "PR #351", title: "feat: add fail-fast option to full pipeline run", status: "Merged", url: "https://github.com/hiero-hackers/analytics/pull/351" },
  { ecosystem: "CAMEL-AI", pullRequest: "PR #4265", title: "fix(mcp): preserve multiple tool result content blocks", status: "Merged", url: "https://github.com/camel-ai/camel/pull/4265" },
  { ecosystem: "Judgment Pack", pullRequest: "PR #38", title: "test: cover JSON Pointer escaping", status: "Merged", url: "https://github.com/Judgment-Pack/judgment-pack-spec/pull/38" },
]

export const activeContributions: Contribution[] = [
  { ecosystem: "n8n", pullRequest: "PR #35544", status: "Open", url: "https://github.com/n8n-io/n8n/pull/35544" },
  { ecosystem: "Poetry", pullRequest: "PR #11007", status: "Open", url: "https://github.com/python-poetry/poetry/pull/11007" },
  { ecosystem: "Smart Search VLM", pullRequest: "PR #3", status: "Open", url: "https://github.com/githubbermoon/smart-search-vlm/pull/3" },
  { ecosystem: "OpenTelemetry Python Contrib", pullRequest: "PR #4928", title: "Fix Botocore test compatibility with newer aiohttp", status: "Open", url: "https://github.com/open-telemetry/opentelemetry-python-contrib/pull/4928" },
]

export const collaborativeContribution: Contribution = {
  ecosystem: "Octo",
  pullRequest: "PR #1",
  title: "Add EO pipeline, Hugging Face app, and MLOps infrastructure",
  status: "Merged collaborative contribution",
  url: "https://github.com/githubbermoon/octo/pull/1",
}

export const priorContribution: Contribution = {
  ecosystem: "FastAPI",
  pullRequest: "PR #16147",
  title: "Proposed a regression-tested fix for ServerSentEvent response-model include/exclude behavior.",
  status: "Closed — Not Merged",
  url: "https://github.com/fastapi/fastapi/pull/16147",
}

export const aiLab = {
  title: "Feedback-Driven Image Pipeline",
  description: "A local feedback-driven image-generation experiment that enhances prompts, generates images, scores outputs with a vision critic, and performs a repair pass.",
  architecture: ["User prompt", "Qwen3-4B enhancement", "Bonsai 4B generation", "Vision critic", "Qwen3-4B repair"],
  technologies: ["Ollama", "Qwen3", "Hugging Face MLX", "Streamlit", "Local inference"],
  github: "https://github.com/Shriprasad-P/FeedbackDrivenImagePipeline",
}

export const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    issuedAt: "February 14, 2026",
    credentialId: "c3DQ-uScT",
    skills: ["Azure AI", "Machine Learning", "Computer Vision", "NLP", "Generative AI Fundamentals"],
  },
  {
    title: "MCP 1st Birthday Hackathon — Contributor",
    issuer: "Hugging Face / MCP-1st-Birthday",
    recognition: "Contributor recognition",
    verificationUrl: "https://huggingface.co/Shriprasad-P",
    skills: ["Model Context Protocol", "Hugging Face Spaces", "MLOps", "Open Source"],
  },
]

export const technicalStack = [
  { label: "AI / ML", items: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "LLMs", "RAG", "AI Agents", "Computer Vision", "OpenCV"] },
  { label: "Backend", items: ["FastAPI", "REST APIs", "WebSockets", "PostgreSQL", "Redis", "MySQL", "Firebase"] },
  { label: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js"] },
  { label: "Infrastructure", items: ["Docker", "Git", "GitHub", "Linux", "CI/CD"] },
]
