declare module 'nodemailer' {
  export interface TransportOptions {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
    tls?: {
      rejectUnauthorized: boolean
    }
  }

  export interface MailOptions {
    from: string | { name: string; address: string }
    to: string
    subject: string
    text?: string
    html?: string
    replyTo?: string
  }

  export interface Transporter {
    sendMail(mailOptions: MailOptions): Promise<any>
    verify(callback: (error: Error | null, success: boolean) => void): void
  }

  export function createTransport(options: TransportOptions): Transporter
}

export default nodemailer 