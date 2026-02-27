import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("lamamc_session")

  if (!session || session.value !== "authenticated") {
    redirect("/login")
  }

  return <AdminDashboard />
}
