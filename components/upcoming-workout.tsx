"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Dumbbell, Play } from "lucide-react"
import Link from "next/link"
import { useAppData } from "@/context/app-context"

export function UpcomingWorkout() {
  const { workouts } = useAppData()

  // Get the first workout from the strength workouts
  const workout = workouts.strength[0]

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <span className="font-medium">Full Body Workout</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>60 min</span>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p>A complete workout using your dumbbells, roller, and pushup handles.</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Warm-up: {Math.floor(workout.duration / 60)} minutes</li>
              <li>Circuit training: 45 minutes</li>
              <li>Cool down: 10 minutes</li>
            </ul>
          </div>
          <Button asChild className="mt-4 w-full">
            <Link href="/dashboard/workout">
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

