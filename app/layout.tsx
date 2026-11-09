import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { GSAPRegistry } from "@/components/gsap-registry"
import { ContactModal } from "@/components/contact-modal"
import { profile, projects } from "@/lib/portfolio-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://shriprasadpatil.dev"),
  title: "Shriprasad Patil — AI/ML and backend engineer",
  description: "Shriprasad Patil builds agentic systems, research tools, full stack AI products, and secure backend infrastructure.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Shriprasad Patil — AI/ML and backend engineer",
    description: "Agentic systems, research tools, AI products, and developer infrastructure.",
    images: [{ url: "/abstract-neural-network-visualization-dark-theme.jpg", width: 1024, height: 1024, alt: "Abstract neural network visualization" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shriprasad Patil — AI/ML and backend engineer",
    description: "Agentic systems, research tools, AI products, and developer infrastructure.",
    images: ["/abstract-neural-network-visualization-dark-theme.jpg"],
  },
  icons: {
    icon: "/browser-tab-logo.png",
  },
}

export const viewport: Viewport = { themeColor: "#181818" }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", name: "Shriprasad Patil", url: "https://shriprasadpatil.dev", email: profile.email, sameAs: [profile.github, profile.linkedin, profile.huggingFace], jobTitle: "AI-Native Software Engineer" },
      { "@type": "WebSite", name: "Shriprasad Patil", url: "https://shriprasadpatil.dev" },
      ...projects.map((project) => ({ "@type": "SoftwareSourceCode", name: project.title, description: project.description, codeRepository: project.github })),
      { "@type": "EducationalOccupationalCredential", name: "Microsoft Certified: Azure AI Fundamentals", credentialCategory: "AI-900", recognizedBy: { "@type": "Organization", name: "Microsoft" }, dateCreated: "2026-02-14", identifier: "c3DQ-uScT" },
      { "@type": "CreativeWork", name: "MCP 1st Birthday Hackathon — Contributor", url: profile.huggingFace, contributor: { "@type": "Person", name: "Shriprasad Patil" } },
    ],
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
        <GSAPRegistry />
        {children}
        <ContactModal />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  )
}
