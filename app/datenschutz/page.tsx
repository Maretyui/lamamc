import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function DatenschutzPage() {
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
          <h1 className="text-3xl font-bold text-foreground">
            Datenschutzerklaerung
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                1. Datenschutz auf einen Blick
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Ueberblick
                darueber, was mit Ihren personenbezogenen Daten passiert, wenn
                Sie diese Website besuchen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                2. Datenerfassung auf dieser Website
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Die Kontaktdaten koennen Sie dem Impressum
                dieser Website entnehmen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                3. Cookies
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Diese Website verwendet Cookies ausschliesslich fuer technisch
                notwendige Zwecke (z.B. Login-Session). Es werden keine
                Tracking-Cookies oder Cookies fuer Werbezwecke verwendet.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                4. Hosting
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Diese Website wird bei einem externen Dienstleister gehostet
                (Vercel Inc.). Die personenbezogenen Daten, die auf dieser
                Website erfasst werden, werden auf den Servern des Hosters
                gespeichert.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                5. Ihre Rechte
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft ueber
                Herkunft, Empfaenger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Kontaktieren Sie uns hierzu
                unter kontakt@lamamc.net.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
