"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import appData from "@/data/app-data.json"

type AppContextType = {
  user: typeof appData.user
  equipment: typeof appData.equipment
  weightEntries: typeof appData.weightEntries
  workoutHistory: typeof appData.workoutHistory
  workouts: typeof appData.workouts
  motivationalQuotes: typeof appData.motivationalQuotes
  dietPlan: typeof appData.dietPlan
  addWeightEntry: (date: string, weight: number) => void
  updateUser: (userData: Partial<typeof appData.user>) => void
  completeWorkout: (date: string, type: string) => void
  updateEquipment: (index: number, available: boolean) => void
  updateStreak: (current: number, longest: number, lastWorkoutDate: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(appData)

  // Load data from localStorage on client side
  useEffect(() => {
    const savedData = localStorage.getItem("appData")
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error parsing saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data))
  }, [data])

  const addWeightEntry = (date: string, weight: number) => {
    setData((prev) => ({
      ...prev,
      weightEntries: [...prev.weightEntries, { date, weight }].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    }))
  }

  const updateUser = (userData: Partial<typeof appData.user>) => {
    setData((prev) => ({
      ...prev,
      user: { ...prev.user, ...userData },
    }))
  }

  const completeWorkout = (date: string, type: string) => {
    // Check if workout already exists for this date
    const existingIndex = data.workoutHistory.findIndex((w) => w.date === date)

    if (existingIndex >= 0) {
      // Update existing workout
      const updatedHistory = [...data.workoutHistory]
      updatedHistory[existingIndex] = { date, completed: true, type }

      setData((prev) => ({
        ...prev,
        workoutHistory: updatedHistory,
      }))
    } else {
      // Add new workout
      setData((prev) => ({
        ...prev,
        workoutHistory: [...prev.workoutHistory, { date, completed: true, type }],
      }))
    }

    // Update streak
    updateStreakAfterWorkout(date)
  }

  const updateStreakAfterWorkout = (date: string) => {
    const today = new Date(date)
    const lastWorkoutDate = data.user.streak.lastWorkoutDate ? new Date(data.user.streak.lastWorkoutDate) : null

    // Calculate if this is a consecutive day
    let current = data.user.streak.current
    let longest = data.user.streak.longest

    if (lastWorkoutDate) {
      // Check if this workout is the next day after the last one
      const dayDifference = Math.floor((today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dayDifference === 1) {
        // Consecutive day, increment streak
        current += 1
      } else if (dayDifference > 1) {
        // Streak broken, reset to 1
        current = 1
      }
      // If dayDifference is 0 (same day), don't change the streak
    } else {
      // First workout, set streak to 1
      current = 1
    }

    // Update longest streak if needed
    if (current > longest) {
      longest = current
    }

    // Update streak data
    updateStreak(current, longest, date)
  }

  const updateStreak = (current: number, longest: number, lastWorkoutDate: string) => {
    setData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        streak: {
          current,
          longest,
          lastWorkoutDate,
        },
      },
    }))
  }

  const updateEquipment = (index: number, available: boolean) => {
    const updatedEquipment = [...data.equipment]
    updatedEquipment[index] = { ...updatedEquipment[index], available }

    setData((prev) => ({
      ...prev,
      equipment: updatedEquipment,
    }))
  }

  return (
    <AppContext.Provider
      value={{
        user: data.user,
        equipment: data.equipment,
        weightEntries: data.weightEntries,
        workoutHistory: data.workoutHistory,
        workouts: data.workouts,
        motivationalQuotes: data.motivationalQuotes,
        dietPlan: data.dietPlan,
        addWeightEntry,
        updateUser,
        completeWorkout,
        updateEquipment,
        updateStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppProvider")
  }
  return context
}

