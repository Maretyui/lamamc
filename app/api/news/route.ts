import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getNews, addNews, updateNews, deleteNews } from "@/lib/data"

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("lamamc_session")?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(getNews())
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const body = await request.json()
  const newItem = {
    id: Date.now().toString(),
    title: body.title,
    content: body.content,
    date: body.date || new Date().toISOString().split("T")[0],
    author: body.author || "Admin",
  }
  addNews(newItem)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const body = await request.json()
  const success = updateNews(body.id, body)
  if (!success) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "ID fehlt" }, { status: 400 })
  }

  const success = deleteNews(id)
  if (!success) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
