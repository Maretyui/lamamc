import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurueck zur Startseite
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/images/logo.png"
              alt="LamaMC Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Impressum</h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                {"Angaben gemaess \u00A7 5 TMG"}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Paul Fenske
                <br />
                Am Edelsfort 28
                <br />
                61169 Friedberg-Hessen
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Kontakt
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                E-Mail: lamamcnetworks@gmail.com
                <br />
                Discord: discord.gg/lamamc
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Haftungsausschluss
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Die Inhalte dieser Webseite wurden mit groesster Sorgfalt
                erstellt. Fuer die Richtigkeit, Vollstaendigkeit und Aktualitaet
                der Inhalte koennen wir jedoch keine Gewaehr uebernehmen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Website-Erstellung
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                  Diese Webseite wurde von Maik Reinhardt erstellt. 
                  <a href="https://maretyui.com" className="text-primary hover:underline" target="_blank" rel="noreferrer noopener"> maretyui.com</a>.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Urheberrecht
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Minecraft ist eine Marke von Mojang Studios. LamaMC.net ist
                nicht mit Mojang Studios verbunden.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
