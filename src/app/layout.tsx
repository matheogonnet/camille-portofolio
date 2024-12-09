import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Portfolio de Camille',
  description: 'Portfolio artistique de Camille',
  keywords: ['art', 'portfolio', 'photographie', 'création'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${playfair.variable} font-sans min-h-screen bg-gradient-to-b from-white to-cream antialiased`}>
        {children}
      </body>
    </html>
  )
} 