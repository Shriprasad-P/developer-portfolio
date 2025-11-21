"use server"

import nodemailer from "nodemailer"

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

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
        return { success: false, error: "Failed to send email. Please try again later." }
    }
}
