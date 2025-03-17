import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { AppProvider } from "@/context/app-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </AppProvider>
  )
}

