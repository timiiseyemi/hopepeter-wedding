import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Omije Hope & Ayogu Peter | Wedding Invitation',
  description:
    'Join Omije Hope and Ayogu Peter for their wedding on Saturday, November 14, 2026 in Lagos.',
  generator: 'v0.app',
  openGraph: {
    title: 'Omije Hope & Ayogu Peter | Wedding Invitation',
    description: 'With great joy, we invite you to celebrate our wedding in Lagos on November 14, 2026.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/wedding-favicon.png', type: 'image/png' }],
    apple: '/wedding-favicon.png',
  },
}

export const viewport: Viewport = { themeColor: '#FAF7F2' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
