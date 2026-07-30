"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react"
import useSWR from "swr"
import { toast } from "sonner"
import type { TeamMember } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function TeamEditor() {
  const { data: team, mutate } = useSWR<TeamMember[]>("/api/team", fetcher, {
    fallbackData: [],
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    role: "",
    image: "https://mc-heads.net/avatar/Maretyui/128",
    link: "",
  })

  function startEdit(member: TeamMember) {
    setEditingId(member.id)
    setForm({
      name: member.name,
      role: member.role,
      image: member.image,
      link: member.link,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm({
      name: "",
      role: "",
        image: "https://mc-heads.net/avatar/Maretyui/128",
      link: "",
    })
  }

  async function handleAdd() {
    if (!form.name || !form.role) return
    setLoading(true)
    try {
      await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      await mutate()
      setShowAdd(false)
      setForm({
        name: "",
        role: "",
        image: "https://mc-heads.net/avatar/Maretyui/128",
        link: "",
      })
      toast.success("Teammitglied hinzugefügt")
    } catch {
      toast.error("Fehler beim Hinzufügen")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string) {
    setLoading(true)
    try {
      await fetch("/api/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      })
      await mutate()
      setEditingId(null)
      toast.success("Teammitglied aktualisiert")
    } catch {
      toast.error("Fehler beim Aktualisieren")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    try {
      await fetch(`/api/team?id=${id}`, { method: "DELETE" })
      await mutate()
      toast.success("Teammitglied gelöscht")
    } catch {
      toast.error("Fehler beim Löschen")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    "rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-card-foreground">
          Team verwalten
        </h2>
        <button
          onClick={() => {
            setShowAdd(!showAdd)
            cancelEdit()
          }}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Neues Mitglied
        </button>
      </div>

      {showAdd && (
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-secondary/50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
            <input
              type="text"
              placeholder="Rolle (z.B. Moderator)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputClasses}
            />
          </div>
          <input
            type="url"
            placeholder="Avatar-URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className={inputClasses}
          />
          <input
            type="url"
            placeholder="Profil-Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className={inputClasses}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Hinzufügen
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              <X className="h-4 w-4" />
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {team?.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border border-border bg-secondary/30 p-4"
          >
            {editingId === member.id ? (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  className={inputClasses}
                />
                <input
                  type="url"
                  value={form.link}
                  onChange={(e) =>
                    setForm({ ...form, link: e.target.value })
                  }
                  className={inputClasses}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(member.id)}
                    disabled={loading}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    Speichern
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                  >
                    <X className="h-4 w-4" />
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-10 w-10 rounded-full"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(member)}
                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    aria-label="Bearbeiten"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive-foreground"
                    aria-label="Löschen"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
