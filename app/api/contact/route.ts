import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const contactSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(4000),
    website: z.string().max(0).optional(),
}).strict()

function escapeHtml(value: string) {
    return value.replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;",
    })[character] ?? character)
}

export async function POST(req: Request) {
    try {
        const payload = contactSchema.safeParse(await req.json())
        if (!payload.success) {
            return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 })
        }

        const { name, email, message, website } = payload.data
        if (website) {
            return NextResponse.json({ message: "Message received" }, { status: 200 })
        }

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return NextResponse.json({ error: "Contact service is temporarily unavailable." }, { status: 503 })
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Sending to yourself
            subject: `Portfolio Contact: ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
}
