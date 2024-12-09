import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "Camille's Portfolio",
  description: 'Creative Portfolio by Camille',
  keywords: ['art', 'portfolio', 'photography', 'design'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
      </head>
      <body 
        className={`${playfair.variable} font-sans min-h-screen bg-gradient-to-b from-white to-cream antialiased`}
        suppressHydrationWarning
      >
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  )
} 