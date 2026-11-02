'use client'

import { useEffect, useRef } from 'react'
import { Poppins } from 'next/font/google'
import { RefreshCw } from 'lucide-react'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

// error.tsx only wraps page.tsx, not the RootLayout itself - a failure
// while rendering app/layout.tsx (e.g. the font loader) falls through to
// Next's bare default error screen instead. This is the dedicated boundary
// for that case, so it has to recreate the <html>/<body> shell layout.tsx
// normally provides.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    console.error(error)
    // Mirrors error.tsx: this boundary swaps in the whole document without
    // a route change or title update, so there's no normal cue for
    // assistive tech that something happened - move focus to the heading
    // so it gets announced immediately.
    headingRef.current?.focus()
  }, [error])

  return (
    <html lang="de" className={poppins.variable}>
      <body className="font-sans antialiased">
        <main
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Fehler
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-balance text-4xl font-extrabold tracking-tight outline-none md:text-6xl"
          >
            Etwas ist schiefgelaufen
          </h1>
          <p className="max-w-md text-pretty text-muted-foreground">
            Bitte versuche es erneut. Besteht das Problem weiterhin, komm
            später noch einmal vorbei.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Erneut versuchen
          </button>
        </main>
      </body>
    </html>
  )
}
