"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

            if (formRef.current) {
                const elements = formRef.current.children
                gsap.fromTo(elements,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: "top 85%",
                        }
                    }
                )
            }
        }, containerRef)
        return () => ctx.revert()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                alert("Message sent successfully!")
                    ; (e.target as HTMLFormElement).reset()
            } else {
                alert("Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error("Error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div
                ref={containerRef}
                className="container px-4 md:px-6 mx-auto max-w-2xl"
            >
                <div className="mb-12 text-center">
                    <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">06 — CONTACT</p>
                    <h2 className="font-sans text-3xl md:text-5xl font-light italic">Let&apos;s Collaborate</h2>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label htmlFor="name" className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                            Name
                        </label>
                        <Input id="name" name="name" required placeholder="Your Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                            Email
                        </label>
                        <Input id="email" name="email" type="email" required placeholder="your@email.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            placeholder="Tell me about your project..."
                            className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 font-mono text-xs tracking-widest uppercase bg-white text-black hover:bg-white/90"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </section>
    )
}
