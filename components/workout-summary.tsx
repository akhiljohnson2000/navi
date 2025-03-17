"use client"

import { CheckCircle, X } from "lucide-react"
import { useAppData } from "@/context/app-context"

export function WorkoutSummary() {
  const { workoutHistory } = useAppData()

  // Get the last 7 days of workout history
  const last7Days = [...workoutHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
    .reverse()

  // Create an array of the last 7 days with their workout data
  const today = new Date()
  const last7DaysData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" })

    // Find workout for this day
    const workout = last7Days.find((w) => {
      const workoutDate = new Date(w.date)
      return (
        workoutDate.getDate() === date.getDate() &&
        workoutDate.getMonth() === date.getMonth() &&
        workoutDate.getFullYear() === date.getFullYear()
      )
    })

    if (workout) {
      return {
        day: dayName,
        completed: workout.completed,
        duration: workout.type === "Rest Day" ? 0 : 60,
        type: workout.type,
      }
    } else {
      return {
        day: dayName,
        completed: false,
        duration: 0,
        type: "No Workout",
      }
    }
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-4 border-b p-3 text-sm font-medium">
          <div>Day</div>
          <div>Workout Type</div>
          <div>Duration</div>
          <div className="text-right">Status</div>
        </div>
        <div className="divide-y">
          {last7DaysData.map((workout) => (
            <div key={workout.day} className="grid grid-cols-4 items-center p-3 text-sm">
              <div>{workout.day}</div>
              <div>{workout.type}</div>
              <div>{workout.duration} min</div>
              <div className="flex justify-end">
                {workout.completed ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Completed
                  </span>
                ) : workout.type === "Rest Day" ? (
                  <span className="flex items-center text-blue-600">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Rest Day
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <X className="mr-1 h-4 w-4" />
                    Missed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

