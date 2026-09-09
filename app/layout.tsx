import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const SITE_TITLE = 'LamaMC.net - Dein Minecraft Netzwerk'
const SITE_DESCRIPTION =
  'LamaMC.net ist ein deutsches Minecraft-Netzwerk mit Survival, GoldPVP, Duels und Realms. Jetzt mitspielen!'

export const metadata: Metadata = {
  metadataBase: new URL('https://lamamc.net'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/images/logo.png',
  },
  // Without these, links dropped in Discord/Twitter (where this server's
  // invite/site link actually gets shared day to day) unfurl with no
  // image and a generic fallback title instead of the real branding.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'LamaMC.net',
    images: ['/images/logo.png'],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/logo.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1f3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={poppins.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
