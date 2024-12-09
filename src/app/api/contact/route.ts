import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    // Ne pas échouer sur les certificats invalides
    rejectUnauthorized: false
  }
})

// Vérifier la configuration au démarrage
transporter.verify(function(error) {
  if (error) {
    console.log('SMTP connection error:', error)
  } else {
    console.log('SMTP server is ready to take our messages')
  }
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const mailOptions = {
      from: {
        name: "Portfolio Contact Form",
        address: process.env.MAIL_USER as string
      },
      to: 'camille.grand44@gmail.com',
      subject: `Portfolio Contact - Message from ${name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email // Pour pouvoir répondre directement à l'expéditeur
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 