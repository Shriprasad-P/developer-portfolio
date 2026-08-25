"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

const contactEvent = "portfolio:open-contact"
let shouldOpenWhenReady = false

export function openContactModal() {
  shouldOpenWhenReady = true
  window.dispatchEvent(new Event(contactEvent))
}

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const open = () => {
      shouldOpenWhenReady = false
      setIsOpen(true)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener(contactEvent, open)
    window.addEventListener("keydown", onKeyDown)
    if (shouldOpenWhenReady) open()
    return () => {
      window.removeEventListener(contactEvent, open)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setIsOpen(false)}
          role="presentation"
        >
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#101010] p-5 shadow-2xl sm:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button type="button" onClick={() => setIsOpen(false)} className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/65 transition hover:bg-white/10 hover:text-white" aria-label="Close contact form">
              <X size={20} aria-hidden="true" />
            </button>
            <ContactForm variant="modal" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
