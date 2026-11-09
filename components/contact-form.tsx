"use client"

import { useState, type FormEvent } from "react"

export function ContactForm({ variant = "section" }: { variant?: "section" | "modal" }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("")

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(["name", "email", "message", "website"].map((key) => [key, formData.get(key)]))

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus("Message sent. Thank you for getting in touch.")
        form.reset()
      } else {
        const body = await response.json().catch(() => null)
        setStatus(body?.error || "Your message could not be sent. Please email me directly.")
      }
    } catch {
      setStatus("Your message could not be sent. Please email me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={variant === "modal" ? "contact-modal max-h-[80vh] overflow-y-auto pr-2" : ""}>
      {variant === "modal" && <h2 id="contact-modal-title" className="mb-6 text-3xl font-medium tracking-tight">Start a conversation.</h2>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`website-${variant}`}>Website</label>
          <input id={`website-${variant}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="contact-form-field">
          <label htmlFor={`name-${variant}`}>Name</label>
          <input id={`name-${variant}`} name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" />
        </div>
        <div className="contact-form-field">
          <label htmlFor={`email-${variant}`}>Email</label>
          <input id={`email-${variant}`} name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="contact-form-field">
          <label htmlFor={`message-${variant}`}>Message</label>
          <textarea id={`message-${variant}`} name="message" required minLength={10} maxLength={4000} placeholder="Tell me what you are building..." />
        </div>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"}<span aria-hidden="true">↗</span></button>
        <p className="form-status" role="status" aria-live="polite">{status}</p>
      </form>
    </div>
  )
}
