import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { SiteFooter, SiteHeader } from "@/components/portfolio-home"
import { AnimatedLink } from "@/components/ui/skiper-ui/animated-link"
import { profile } from "@/lib/portfolio-data"

export const metadata: Metadata = {
  title: "Contact — Shriprasad Patil",
  description: "Start a conversation with Shriprasad Patil about AI, machine learning, backend engineering, and research tools.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader inner />
      <main id="main-content" className="contact-main shell">
        <div className="contact-intro">
          <p className="eyebrow"><span className="eyebrow-index">08</span>Contact</p>
          <h1>Let&apos;s build something <span className="accent-text">useful.</span></h1>
          <p>Tell me about the challenge, the system you have in mind, or the research question you want to explore.</p>
        </div>
        <div className="contact-grid">
          <section aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="sr-only">Send a message</h2>
            <ContactForm />
          </section>
          <aside className="contact-aside">
            <p className="subsection-label">Direct line</p>
            <h2>Prefer email?</h2>
            <AnimatedLink className="text-link" href={`mailto:${profile.email}`} arrow>{profile.email}</AnimatedLink>
            <p>You can also find my projects, contributions, and current work on GitHub.</p>
            <AnimatedLink className="text-link mt-5" href={profile.github} external arrow>Visit GitHub</AnimatedLink>
          </aside>
        </div>
      </main>
      <SiteFooter contactPage />
    </>
  )
}
