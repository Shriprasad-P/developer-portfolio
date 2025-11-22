"use server"

import nodemailer from "nodemailer"

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error("Missing environment variables");
        return { success: false, error: "Server configuration error: Missing email credentials." };
    }

    if (!name || !email || !subject || !message) {
        return { success: false, error: "Please fill in all fields." }
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address (your Gmail)
            to: process.env.GMAIL_USER, // Receiver address (also your Gmail)
            replyTo: email, // The user's email so you can reply to them
            subject: `Portfolio Contact: ${subject}`,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        }

        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error("Error sending email:", error)
        // Return the specific error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        return { success: false, error: errorMessage }
    }
}
