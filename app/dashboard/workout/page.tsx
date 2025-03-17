"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Clock, Heart, Dumbbell, Pause, Play, RotateCcw, Volume2 } from "lucide-react"
import Image from "next/image"
import appData from "@/data/app-data.json"
import { MotivationalQuote } from "@/components/motivational-quote"
import { useAppData } from "@/context/app-context"

export default function WorkoutPage() {
  const { completeWorkout } = useAppData()
  const [workoutType, setWorkoutType] = useState<"strength" | "cardio">("strength")
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const exercises = appData.workouts[workoutType]
  const currentExercise = exercises[currentExerciseIndex]
  const totalExercises = exercises.length
  const progress = (currentExerciseIndex / totalExercises) * 100

  const [timeRemaining, setTimeRemaining] = useState(currentExercise.duration)
  const [exerciseComplete, setExerciseComplete] = useState(false)

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && isPlaying) {
      // Time is up
      if (isResting) {
        // Rest period is over, go back to exercise
        setIsResting(false)
        setTimeRemaining(currentExercise.duration)
      } else if (currentExercise.sets && currentSet < currentExercise.sets) {
        // Move to rest period between sets
        setIsResting(true)
        setCurrentSet((prev) => prev + 1)
        setTimeRemaining(currentExercise.rest || 30)
      } else if (currentExerciseIndex < totalExercises - 1) {
        // Move to next exercise
        setCurrentExerciseIndex((prev) => prev + 1)
        setCurrentSet(1)
        setIsResting(false)
        setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
      } else {
        // Workout complete
        setIsPlaying(false)
        setExerciseComplete(true)

        // Record workout completion
        const today = new Date()
        const formattedDate = today.toISOString().split("T")[0] // YYYY-MM-DD
        completeWorkout(formattedDate, workoutType === "strength" ? "Strength Training" : "Cardio")
      }
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [
    isPlaying,
    timeRemaining,
    isResting,
    currentExercise,
    currentSet,
    currentExerciseIndex,
    exercises,
    totalExercises,
    workoutType,
    completeWorkout,
  ])

  // Reset timer when changing workout type
  useEffect(() => {
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setIsResting(false)
    setIsPlaying(false)
    setTimeRemaining(appData.workouts[workoutType][0].duration)
    setExerciseComplete(false)
  }, [workoutType])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleNext = () => {
    setIsPlaying(false)

    if (currentExercise.sets && currentSet < currentExercise.sets) {
      // Move to next set of the same exercise
      setCurrentSet(currentSet + 1)
      setIsResting(true)
      setTimeRemaining(currentExercise.rest || 30)
    } else if (currentExerciseIndex < totalExercises - 1) {
      // Move to next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setCurrentSet(1)
      setIsResting(false)
      setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
    }
  }

  const handlePrevious = () => {
    setIsPlaying(false)

    if (currentSet > 1) {
      // Move to previous set of the same exercise
      setCurrentSet(currentSet - 1)
      setIsResting(false)
      setTimeRemaining(currentExercise.duration)
    } else if (currentExerciseIndex > 0) {
      // Move to previous exercise
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      const prevExercise = exercises[currentExerciseIndex - 1]
      setCurrentSet(prevExercise.sets || 1)
      setIsResting(false)
      setTimeRemaining(prevExercise.duration)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setIsResting(false)
    setTimeRemaining(currentExercise.duration)
  }

  const handleWorkoutTypeChange = (type: "strength" | "cardio") => {
    setWorkoutType(type)
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setIsResting(false)
    setIsPlaying(false)
    setTimeRemaining(appData.workouts[type][0].duration)
    setExerciseComplete(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workout Session</h1>
      </div>

      <MotivationalQuote />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>1-Hour Home Workout</CardTitle>
                <CardDescription>Using dumbbells (2x2.5kg), roller, and pushup handles</CardDescription>
              </div>
              <Tabs
                value={workoutType}
                onValueChange={(value) => handleWorkoutTypeChange(value as "strength" | "cardio")}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="strength" className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    Strength
                  </TabsTrigger>
                  <TabsTrigger value="cardio" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Cardio
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Exercise {currentExerciseIndex + 1} of {totalExercises}
                {currentExercise.sets && ` • Set ${currentSet} of ${currentExercise.sets}`}
                {isResting && " • Rest Period"}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-4 w-4" />
                {formatTime(timeRemaining)}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{currentExercise.name}</CardTitle>
            <CardDescription>{isResting ? "Rest Period" : currentExercise.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {exerciseComplete ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <h3 className="text-2xl font-bold mb-2">Workout Complete!</h3>
                <p className="text-muted-foreground mb-4">Great job! You've completed your workout.</p>
                <Button
                  onClick={() => {
                    setCurrentExerciseIndex(0)
                    setCurrentSet(1)
                    setIsResting(false)
                    setTimeRemaining(exercises[0].duration)
                    setExerciseComplete(false)
                  }}
                  className="mt-4"
                >
                  Start Again
                </Button>
              </div>
            ) : !isResting ? (
              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg bg-muted flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(currentExercise.name)}`}
                    alt={currentExercise.name}
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {currentExercise.instructions.map((instruction, i) => (
                      <li key={i} className="text-sm">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
                {currentExercise.equipment && currentExercise.equipment.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Equipment:</h4>
                    <div className="flex gap-2">
                      {currentExercise.equipment.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <h3 className="text-2xl font-bold mb-2">Rest Time</h3>
                <p className="text-muted-foreground mb-4">Take a short break before the next set</p>
                <div className="text-4xl font-bold mb-6">{formatTime(timeRemaining)}</div>
                <p className="text-sm text-muted-foreground">
                  Next: {currentExercise.name} (Set {currentSet})
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={(currentExerciseIndex === 0 && currentSet === 1) || exerciseComplete}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleReset} disabled={exerciseComplete}>
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handlePlayPause} disabled={exerciseComplete}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                <Button variant="outline" size="icon" disabled={exerciseComplete}>
                  <Volume2 className="h-4 w-4" />
                  <span className="sr-only">Volume</span>
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={
                  (currentExerciseIndex === totalExercises - 1 && currentSet === (currentExercise.sets || 1)) ||
                  exerciseComplete
                }
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout Plan</CardTitle>
            <CardDescription>Your 1-hour {workoutType} workout routine</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="exercises">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="exercises" className="pt-4">
                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        index === currentExerciseIndex ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <div>
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {exercise.sets
                            ? `${exercise.sets} sets × ${formatTime(exercise.duration)}`
                            : formatTime(exercise.duration)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {index < currentExerciseIndex ? (
                          <span className="text-green-600">Completed</span>
                        ) : index === currentExerciseIndex ? (
                          <span className="text-primary font-medium">Current</span>
                        ) : (
                          <span>Upcoming</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="summary" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Total Time</div>
                      <div className="text-2xl font-bold">60 min</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Exercises</div>
                      <div className="text-2xl font-bold">{exercises.length}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Focus</div>
                      <div className="text-2xl font-bold capitalize">{workoutType}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Equipment</div>
                      <div className="text-2xl font-bold">{workoutType === "strength" ? "3 items" : "None"}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

