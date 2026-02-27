import Image from "next/image"
import Link from "next/link"
import { LogIn } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/images/logo.png"
              alt="LamaMC Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-foreground">
            LamaMC.net
          </span>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
          aria-label="Footer Navigation"
        >
          <Link
            href="/impressum"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted-foreground">
        <p>
          {"LamaMC.net ist nicht mit Mojang Studios verbunden. \u00A9 2026 Maretyui"}
        </p>
      </div>
    </footer>
  )
}
