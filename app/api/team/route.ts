import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  getTeam,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/data"

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("lamamc_session")?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(getTeam())
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const body = await request.json()
  const newMember = {
    id: Date.now().toString(),
    name: body.name,
    role: body.role,
    image: body.image || "https://mc-heads.net/avatar/MHF_Steve/128",
    link: body.link || "",
  }
  addTeamMember(newMember)
  return NextResponse.json(newMember, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const body = await request.json()
  const success = updateTeamMember(body.id, body)
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

  const success = deleteTeamMember(id)
  if (!success) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
