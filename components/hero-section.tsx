import Image from "next/image"
import { ChevronDown } from "lucide-react"
import type { NewsItem } from "@/lib/types"

interface HeroSectionProps {
  latestNews: NewsItem | null
}

export function HeroSection({ latestNews }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="LamaMC Minecraft Welt"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="relative h-40 w-40 md:h-56 md:w-56">
          <Image
            src="/images/logo.png"
            alt="LamaMC Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-balance text-5xl font-extrabold tracking-tight md:text-7xl">
          <span className="text-primary">Lama</span>
          <span className="text-foreground">MC</span>
          <span className="text-muted-foreground">.net</span>
        </h1>

        <p className="max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
          Dein Minecraft-Netzwerk mit einzigartigen Spielmodi, einer aktiven
          Community und unvergesslichen Abenteuern.
        </p>

        {latestNews && (
          <div className="mt-2 rounded-xl border border-border/60 bg-card/80 px-6 py-4 backdrop-blur-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Neuste News
            </p>
            <p className="text-base font-semibold text-card-foreground">
              {latestNews.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(latestNews.date).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      <a
        href="#spielmodi"
        className="absolute bottom-10 z-10 flex animate-bounce-slow cursor-pointer flex-col items-center text-muted-foreground transition-colors hover:text-primary"
        aria-label="Nach unten scrollen"
      >
        <ChevronDown className="h-6 w-6" />
        <ChevronDown className="-mt-3 h-6 w-6" />
        <ChevronDown className="-mt-3 h-6 w-6" />
      </a>
    </section>
  )
}
