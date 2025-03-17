"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Activity, Calendar, Dumbbell, Home, LogOut, User, Weight, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear the login state
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("appData")

    // Clear the cookie
    Cookies.remove("isLoggedIn")

    // Redirect to login page
    router.push("/")
  }

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Dumbbell className="h-6 w-6" />
            <span>Home Workout</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/workout"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/workout" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Activity className="h-4 w-4" />
              Workout
            </Link>
            <Link
              href="/dashboard/weight-tracker"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/weight-tracker" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Weight className="h-4 w-4" />
              Weight Tracker
            </Link>
            <Link
              href="/dashboard/history"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/history" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Calendar className="h-4 w-4" />
              Workout History
            </Link>
            <Link
              href="/dashboard/diet-plan"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/diet-plan" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Utensils className="h-4 w-4" />
              Diet Plan
            </Link>
            <Link
              href="/dashboard/profile"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/dashboard/profile" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </ScrollArea>
        <div className="border-t p-2">
          <Button
            variant="outline"
            className="w-full justify-start text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

