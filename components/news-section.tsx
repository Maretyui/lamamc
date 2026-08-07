"use client"

import { useState, useMemo } from "react"
import { CalendarDays, ArrowUpDown, User } from "lucide-react"
import useSWR from "swr"
import type { NewsItem } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type SortMode = "date" | "alpha"

export function NewsSection() {
  const { data: news } = useSWR<NewsItem[]>("/api/news", fetcher, {
    fallbackData: [],
  })
  const [sortMode, setSortMode] = useState<SortMode>("date")

  const sorted = useMemo(() => {
    const items = [...(news || [])]
    if (sortMode === "date") {
      items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } else {
      items.sort((a, b) => a.title.localeCompare(b.title, "de"))
    }
    return items
  }, [sortMode, news])

  return (
    <section id="news" className="bg-background px-4 py-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Aktuelles
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Neuigkeiten
          </h2>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sortieren:</span>
          <button
            onClick={() => setSortMode("date")}
            aria-pressed={sortMode === "date"}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              sortMode === "date"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Nach Datum
          </button>
          <button
            onClick={() => setSortMode("alpha")}
            aria-pressed={sortMode === "alpha"}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              sortMode === "alpha"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Alphabetisch
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {sorted.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.content}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <User className="h-3 w-3" />
                    {item.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
