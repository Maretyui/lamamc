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
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-foreground">
            LamaMC.net
          </span>
        </div>
        <p className="text-sm">
          {`LamaMC.net ist nicht mit Mojang Studios verbunden. \u00A9 ${new Date().getFullYear()} Maretyui`}
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
          aria-label="Footer Navigation"
        >
          <Link
            href="/impressum"
            className="rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Datenschutz
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Login
          </Link>
        </nav>
      </div>
    </footer>
  )
}
