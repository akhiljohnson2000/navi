"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, CheckCircle, Clock, Dumbbell, Weight, X } from "lucide-react"
import { WorkoutSummary } from "@/components/workout-summary"
import { WeightChart } from "@/components/weight-chart"
import { UpcomingWorkout } from "@/components/upcoming-workout"
import { MotivationalQuote } from "@/components/motivational-quote"
import { useAppData } from "@/context/app-context"

export default function DashboardPage() {
  const { user, weightEntries, equipment } = useAppData()

  // Get the latest weight entry
  const latestWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].weight : user.weight

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <MotivationalQuote />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
                <Weight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestWeight} kg</div>
                <p className="text-xs text-muted-foreground">
                  Last updated{" "}
                  {weightEntries.length > 0
                    ? new Date(weightEntries[weightEntries.length - 1].date).toLocaleDateString()
                    : "N/A"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.streak.current} days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.streak.longest} days</div>
                <p className="text-xs text-muted-foreground">Your personal best</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workout Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 hours</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <WeightChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Workout</CardTitle>
                <CardDescription>Your next scheduled workout</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingWorkout />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Workout Summary</CardTitle>
                <CardDescription>Your workout activity for the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkoutSummary />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Available Equipment</CardTitle>
                <CardDescription>Equipment you have for your workouts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {equipment
                    .filter((item) => item.available)
                    .map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4" />
                        <span>
                          {item.name} - {item.details}
                        </span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Your workout and weight progress over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WeightChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Workout Consistency</CardTitle>
                <CardDescription>Days you completed your workouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div key={i} className="text-xs font-medium">
                      {day}
                    </div>
                  ))}
                  {[
                    true,
                    true,
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                    true,
                    true,
                    false,
                    true,
                    true,
                    true,
                    false,
                    true,
                    true,
                    true,
                    true,
                    false,
                    true,
                  ].map((completed, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-md flex items-center justify-center ${
                        completed ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
                      }`}
                    >
                      {completed ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

