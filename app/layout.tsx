import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shriprasad R Patil | Full-Stack Developer Portfolio",
  description: "Full-stack developer specializing in MERN Stack, Python, LangChain, and modern web technologies. Building scalable applications with React, Node.js, and MongoDB.",
  keywords: ["Full-Stack Developer", "MERN Stack", "React", "Node.js", "MongoDB", "Python", "LangChain", "Web Developer", "Software Engineer", "Bangalore"],
  authors: [{ name: "Shriprasad R Patil" }],
  creator: "Shriprasad R Patil",
  publisher: "Shriprasad R Patil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shriprasad-portfolio.vercel.app'),
  openGraph: {
    title: "Shriprasad R Patil | Full-Stack Developer",
    description: "Full-stack developer specializing in MERN Stack, Python, and modern web technologies. Check out my projects and get in touch!",
    url: 'https://shriprasad-portfolio.vercel.app',
    siteName: 'Shriprasad Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shriprasad R Patil - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shriprasad R Patil | Full-Stack Developer',
    description: 'Full-stack developer specializing in MERN Stack, Python, and modern web technologies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'