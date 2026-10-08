'use client'

import { useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

// Without this, a runtime error fell through to Next.js's generic error
// screen instead of the site's own look — not-found.tsx already covers the
// 404 case, this covers the same gap for actual thrown errors.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Fehler
      </p>
      <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
        Etwas ist schiefgelaufen
      </h1>
      <p className="max-w-md text-pretty text-muted-foreground">
        Bitte versuche es erneut. Besteht das Problem weiterhin, komm später
        noch einmal vorbei.
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Erneut versuchen
      </button>
    </main>
  )
}
