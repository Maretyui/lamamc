import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUsername || !adminPassword) {
    return NextResponse.json(
      { error: "Server-Konfiguration fehlerhaft." },
      { status: 500 }
    )
  }

  if (username === adminUsername && password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set("lamamc_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: "Benutzername oder Passwort falsch." },
    { status: 401 }
  )
}
