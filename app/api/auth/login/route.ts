import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, password } = body

  const adminUser = process.env.ADMIN_USERNAME || "admin"
  const adminPass = process.env.ADMIN_PASSWORD || "admin123"

  if (username === adminUser && password === adminPass) {
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
    { success: false, error: "Ungueltige Zugangsdaten" },
    { status: 401 }
  )
}
