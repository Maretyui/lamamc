"use client"

import Image from "next/image"
import { useState } from "react"

const servers = [
  {
    name: "Survival",
    description:
      "Erlebe klassisches Survival mit Custom Items, Clans und einer lebendigen Welt.",
    image: "/images/servers/survival.png",
    version: "1.21.10",
  },
  {
    name: "GoldPVP",
    description:
      "Kämpfe in einem PvP-Modus um Gold-Coins zum Gear-Upgrade.",
    image: "/images/servers/goldpvp.png",
    version: "1.8.9",
  },
  {
    name: "Duels",
    description:
      "Fordere Freunde zu spannenden 1v1-Duellen heraus und verbessere deine Skills.",
    image: "/images/servers/duels.png",
    version: "1.21.11",
  },
  {
    name: "Realms",
    description:
      "Baue und teile deine eigene Welt mit Freunden in unserem Realms-Modus.",
    image: "/images/servers/realms.png",
    version: "1.21.10",
  },
  {
    name: "Lobby",
    description:
      "Treffe andere Spieler, chatte und bereite dich auf deine Abenteuer vor.",
    image: "/images/servers/lobby.png",
    version: "1.21.10",
  },
  {
    name: "???",
    description:
      "Hierfür hast du nicht die nötigen Berechtigungen ...",
    image: "/images/servers/image.png",
    version: "1.21.x",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="bg-background px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          {/* <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Spielmodi
          </p> */}
          <h2 className="text-primary text-4xl font-bold tracking-tight md:text-5xl">
            Spielmodi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Entdecke unsere vielfältigen Spielmodi und finde deinen Favoriten.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {servers.map((server, index) => (
            <div
              key={server.name}
              className={`group relative w-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                hoveredIndex === index
                  ? "scale-[1.02] border-primary/50 shadow-xl shadow-primary/10"
                  : "hover:scale-[1.02] hover:border-primary/30"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={server.image}
                  alt={`${server.name} Server`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
                <div className="absolute bottom-3 right-3 rounded-md bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                  {server.version}
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-card-foreground">
                  {server.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {server.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-card-foreground">
              Server-IP:{" "}
              <span className="font-bold text-primary">LamaMC.net</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
