import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'POWERLVL - Everything Has a Power Level',
  description: 'Scan anything. Measure your dominance. Everything has a power level.',
  openGraph: {
    title: 'POWERLVL',
    description: 'Everything has a power level.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-black`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
