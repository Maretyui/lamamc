"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react"
import useSWR from "swr"
import { toast } from "sonner"
import type { NewsItem } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function NewsEditor() {
  const { data: news, mutate } = useSWR<NewsItem[]>("/api/news", fetcher, {
    fallbackData: [],
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
  })

  function startEdit(item: NewsItem) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      content: item.content,
      date: item.date,
      author: item.author,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
    })
  }

  async function handleAdd() {
    if (!form.title || !form.content) return
    setLoading(true)
    try {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      await mutate()
      setShowAdd(false)
      setForm({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        author: "",
      })
      toast.success("News hinzugefuegt")
    } catch {
      toast.error("Fehler beim Hinzufuegen")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string) {
    setLoading(true)
    try {
      await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      })
      await mutate()
      setEditingId(null)
      toast.success("News aktualisiert")
    } catch {
      toast.error("Fehler beim Aktualisieren")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    try {
      await fetch(`/api/news?id=${id}`, { method: "DELETE" })
      await mutate()
      toast.success("News geloescht")
    } catch {
      toast.error("Fehler beim Loeschen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-card-foreground">
          News verwalten
        </h2>
        <button
          onClick={() => {
            setShowAdd(!showAdd)
            cancelEdit()
          }}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Neue News
        </button>
      </div>

      {showAdd && (
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-secondary/50 p-4">
          <input
            type="text"
            placeholder="Titel"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <textarea
            placeholder="Inhalt"
            rows={3}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Autor"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
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
              Hinzufuegen
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
        {news?.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-secondary/30 p-4"
          >
            {editingId === item.id ? (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
                <textarea
                  rows={3}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) =>
                      setForm({ ...form, author: e.target.value })
                    }
                    className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.content}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString("de-DE")} -{" "}
                    {item.author}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    aria-label="Bearbeiten"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive-foreground"
                    aria-label="Loeschen"
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
