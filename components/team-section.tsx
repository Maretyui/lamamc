"use client"

import { ExternalLink } from "lucide-react"
import useSWR from "swr"
import type { TeamMember } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const roleColors: Record<string, string> = {
  Owner: "bg-primary text-primary-foreground",
  Moderator: "bg-orange-500/20 text-secondary-foreground",
  Developer: "bg-emerald-500/20 text-emerald-300",
  "Public Relations": "bg-sky-500/20 text-sky-300",
}

export function TeamSection() {
  const { data: team } = useSWR<TeamMember[]>("/api/team", fetcher, {
    fallbackData: [],
  })

  return (
    <section id="team" className="bg-secondary/30 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Das Team
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Unser Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Die Menschen hinter LamaMC, die täglich für euch arbeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {team?.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 transition-all duration-300 group-hover:border-primary">
                <img
                  src={member.image}
                  alt={`${member.name} Avatar`}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <h3 className="text-lg font-bold text-card-foreground">
                {member.name}
              </h3>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  roleColors[member.role] ||
                  "bg-muted text-muted-foreground"
                }`}
              >
                {member.role}
              </span>
              {member.link && (
                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`${member.name} Profil (öffnet in einem neuen Tab)`}
                >
                  Profil <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
