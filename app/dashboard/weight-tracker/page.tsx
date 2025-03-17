"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WeightChart } from "@/components/weight-chart"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAppData } from "@/context/app-context"

export default function WeightTrackerPage() {
  const { weightEntries, addWeightEntry } = useAppData()
  const [date, setDate] = useState<Date>(new Date())
  const [weight, setWeight] = useState("")

  const handleAddWeight = () => {
    if (!weight) return

    const newWeight = Number.parseFloat(weight)
    if (isNaN(newWeight)) return

    addWeightEntry(format(date, "yyyy-MM-dd"), newWeight)
    setWeight("")
    setDate(new Date())
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Weight Tracker</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
            <CardDescription>Track your weight changes over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <WeightChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Weight Entry</CardTitle>
            <CardDescription>Record your current weight</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddWeight}>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
          <CardDescription>Your recorded weight entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-3 border-b p-3 text-sm font-medium">
              <div>Date</div>
              <div>Weight (kg)</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {weightEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-3 items-center p-3 text-sm">
                  <div>{format(new Date(entry.date), "MMM d, yyyy")}</div>
                  <div>{entry.weight} kg</div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

