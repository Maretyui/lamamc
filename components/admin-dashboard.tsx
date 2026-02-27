"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LogOut, Newspaper, Users, ArrowLeft } from "lucide-react"
import { NewsEditor } from "@/components/admin/news-editor"
import { TeamEditor } from "@/components/admin/team-editor"

type Tab = "news" | "team"

export function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("news")

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.png"
                alt="LamaMC Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Inhalte verwalten
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Seite
            </Link>
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-destructive/20 hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
              Abmelden
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("news")}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              tab === "news"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            News
          </button>
          <button
            onClick={() => setTab("team")}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              tab === "team"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Users className="h-4 w-4" />
            Team
          </button>
        </div>

        {tab === "news" && <NewsEditor />}
        {tab === "team" && <TeamEditor />}
      </div>
    </main>
  )
}
