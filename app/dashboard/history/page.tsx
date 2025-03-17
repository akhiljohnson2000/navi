"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CheckCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample workout history data
const workoutHistory = [
  { date: new Date(2023, 2, 1), completed: true, type: "Full Body" },
  { date: new Date(2023, 2, 2), completed: true, type: "Upper Body" },
  { date: new Date(2023, 2, 3), completed: false, type: "Rest Day" },
  { date: new Date(2023, 2, 4), completed: true, type: "Lower Body" },
  { date: new Date(2023, 2, 5), completed: true, type: "Core & Cardio" },
  { date: new Date(2023, 2, 6), completed: false, type: "Rest Day" },
  { date: new Date(2023, 2, 7), completed: true, type: "Full Body" },
  { date: new Date(2023, 2, 8), completed: true, type: "Upper Body" },
  { date: new Date(2023, 2, 9), completed: true, type: "Lower Body" },
  { date: new Date(2023, 2, 10), completed: false, type: "Missed" },
  { date: new Date(2023, 2, 11), completed: true, type: "Full Body" },
  { date: new Date(2023, 2, 12), completed: true, type: "Core & Cardio" },
  { date: new Date(2023, 2, 13), completed: false, type: "Rest Day" },
  { date: new Date(2023, 2, 14), completed: true, type: "Upper Body" },
  { date: new Date(2023, 2, 15), completed: true, type: "Lower Body" },
  { date: new Date(2023, 2, 16), completed: false, type: "Missed" },
  { date: new Date(2023, 2, 17), completed: true, type: "Full Body" },
  { date: new Date(2023, 2, 18), completed: true, type: "Core & Cardio" },
  { date: new Date(2023, 2, 19), completed: false, type: "Rest Day" },
  { date: new Date(2023, 2, 20), completed: true, type: "Upper Body" },
  { date: new Date(2023, 2, 21), completed: true, type: "Lower Body" },
  { date: new Date(2023, 2, 22), completed: false, type: "Missed" },
  { date: new Date(2023, 2, 23), completed: true, type: "Full Body" },
  { date: new Date(2023, 2, 24), completed: true, type: "Core & Cardio" },
  { date: new Date(2023, 2, 25), completed: false, type: "Rest Day" },
  { date: new Date(2023, 2, 26), completed: true, type: "Upper Body" },
  { date: new Date(2023, 2, 27), completed: true, type: "Lower Body" },
  { date: new Date(2023, 2, 28), completed: false, type: "Missed" },
]

export default function HistoryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Function to determine if a date has a workout
  const hasWorkout = (date: Date) => {
    return workoutHistory.some(
      (workout) =>
        workout.date.getDate() === date.getDate() &&
        workout.date.getMonth() === date.getMonth() &&
        workout.date.getFullYear() === date.getFullYear(),
    )
  }

  // Function to get workout details for a date
  const getWorkoutForDate = (date: Date) => {
    return workoutHistory.find(
      (workout) =>
        workout.date.getDate() === date.getDate() &&
        workout.date.getMonth() === date.getMonth() &&
        workout.date.getFullYear() === date.getFullYear(),
    )
  }

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0
    const today = new Date()

    // Sort workouts by date (newest first)
    const sortedWorkouts = [...workoutHistory].sort((a, b) => b.date.getTime() - a.date.getTime())

    for (let i = 0; i < sortedWorkouts.length; i++) {
      const workout = sortedWorkouts[i]
      if (workout.completed) {
        streak++
      } else if (workout.type !== "Rest Day") {
        break
      }
    }

    return streak
  }

  // Calculate completion rate
  const calculateCompletionRate = () => {
    const totalWorkoutDays = workoutHistory.filter((w) => w.type !== "Rest Day").length
    const completedWorkouts = workoutHistory.filter((w) => w.completed && w.type !== "Rest Day").length

    return Math.round((completedWorkouts / totalWorkoutDays) * 100)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateStreak()} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateCompletionRate()}%</div>
            <p className="text-xs text-muted-foreground">Of planned workouts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workoutHistory.filter((w) => w.completed && w.type !== "Rest Day").length}
            </div>
            <p className="text-xs text-muted-foreground">Total workouts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Workouts</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workoutHistory.filter((w) => !w.completed && w.type !== "Rest Day").length}
            </div>
            <p className="text-xs text-muted-foreground">Opportunities to improve</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Select a date to see workout details</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date)
                setSelectedDate(date)
              }}
              className="rounded-md border"
              modifiers={{
                workout: (date) => hasWorkout(date),
              }}
              modifiersStyles={{
                workout: {
                  fontWeight: "bold",
                },
              }}
              components={{
                DayContent: (props) => {
                  const date = props.date
                  const workout = getWorkoutForDate(date)

                  return (
                    <div className="flex flex-col items-center justify-center">
                      <div>{props.date.getDate()}</div>
                      {workout && (
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            workout.completed
                              ? "bg-green-500"
                              : workout.type === "Rest Day"
                                ? "bg-blue-500"
                                : "bg-red-500"
                          }`}
                        />
                      )}
                    </div>
                  )
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
            <CardDescription>
              {selectedDate ? `Details for ${selectedDate.toLocaleDateString()}` : "Select a date to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div>
                {(() => {
                  const workout = getWorkoutForDate(selectedDate)

                  if (!workout) {
                    return (
                      <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-muted-foreground">No workout data for this date</p>
                      </div>
                    )
                  }

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{workout.type}</h3>
                        {workout.completed ? (
                          <Badge variant="outline" className="bg-green-500/20 text-green-700 hover:bg-green-500/20">
                            Completed
                          </Badge>
                        ) : workout.type === "Rest Day" ? (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/20">
                            Rest Day
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-500/20 text-red-700 hover:bg-red-500/20">
                            Missed
                          </Badge>
                        )}
                      </div>

                      {workout.type !== "Rest Day" && workout.type !== "Missed" && (
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium mb-2">Workout Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>60 minutes</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exercises:</span>
                              <span>7</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Equipment:</span>
                              <span>Dumbbells, Roller, Pushup Handles</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {workout.type === "Rest Day" && (
                        <div className="rounded-md border p-4">
                          <p className="text-muted-foreground">
                            Rest days are important for recovery and muscle growth. Your body needs time to repair and
                            strengthen.
                          </p>
                        </div>
                      )}

                      {workout.type === "Missed" && (
                        <div className="rounded-md border p-4">
                          <p className="text-muted-foreground">
                            You missed this workout. Don't worry, consistency over time is what matters. Try to get back
                            on track with your next scheduled workout.
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Select a date from the calendar to view workout details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workout Consistency</CardTitle>
          <CardDescription>Your workout history over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="pt-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={i} className="text-xs font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 4 }).map((_, weekIndex) =>
                  Array.from({ length: 7 }).map((_, dayIndex) => {
                    const date = new Date(2023, 2, 1 + weekIndex * 7 + dayIndex)
                    const workout = getWorkoutForDate(date)

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`h-10 rounded-md flex flex-col items-center justify-center ${
                          workout
                            ? workout.completed
                              ? "bg-green-500/20 text-green-700"
                              : workout.type === "Rest Day"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-red-500/20 text-red-700"
                            : "bg-muted"
                        }`}
                      >
                        <span className="text-xs">{date.getDate()}</span>
                        {workout && (
                          <span className="text-[10px]">
                            {workout.completed ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : workout.type === "Rest Day" ? (
                              "Rest"
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>
                    )
                  }),
                )}
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="pt-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={i} className="text-xs font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 5 }).map((_, weekIndex) =>
                  Array.from({ length: 7 }).map((_, dayIndex) => {
                    const date = new Date(2023, 2, 1 + weekIndex * 7 + dayIndex)
                    const workout = getWorkoutForDate(date)

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`h-10 rounded-md flex flex-col items-center justify-center ${
                          workout
                            ? workout.completed
                              ? "bg-green-500/20 text-green-700"
                              : workout.type === "Rest Day"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-red-500/20 text-red-700"
                            : "bg-muted"
                        }`}
                      >
                        <span className="text-xs">{date.getDate()}</span>
                        {workout && (
                          <span className="text-[10px]">
                            {workout.completed ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : workout.type === "Rest Day" ? (
                              "Rest"
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </div>
                    )
                  }),
                )}
              </div>
            </TabsContent>
            <TabsContent value="yearly" className="pt-4">
              <div className="grid grid-cols-12 gap-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (month, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-xs font-medium mb-2">{month}</div>
                      <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: 4 }).map((_, weekIndex) => (
                          <div key={weekIndex} className="h-4 w-4 rounded-sm bg-muted" />
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

