import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Fehler 404
      </p>
      <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
        Diese Seite gibt es nicht
      </h1>
      <p className="max-w-md text-pretty text-muted-foreground">
        Der Link ist entweder veraltet oder die Seite wurde verschoben. Komm zurück zur Startseite und finde von dort aus weiter.
      </p>
      <Link
        href="/"
        className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        Zurück zur Startseite
      </Link>
    </main>
  )
}
