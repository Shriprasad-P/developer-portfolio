import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function ContactPage() {
    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen pt-20">
                <ContactForm />
            </main>
            <Footer />
        </SmoothScroll>
    )
}
