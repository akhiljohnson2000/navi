"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppData } from "@/context/app-context"

export default function ProfilePage() {
  const { user, equipment, updateUser, updateEquipment } = useAppData()

  const [name, setName] = useState(user.name)
  const [height, setHeight] = useState(user.height)
  const [weight, setWeight] = useState(user.weight.toString())
  const [age, setAge] = useState(user.age.toString())
  const [gender, setGender] = useState(user.gender)
  const [fitnessLevel, setFitnessLevel] = useState(user.fitnessLevel)

  const handleSaveChanges = () => {
    updateUser({
      name,
      height,
      weight: Number.parseFloat(weight),
      age: Number.parseInt(age),
      gender,
      fitnessLevel,
    })
  }

  const handleToggleEquipment = (index: number, available: boolean) => {
    updateEquipment(index, available)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitness-level">Fitness Level</Label>
                  <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                    <SelectTrigger id="fitness-level">
                      <SelectValue placeholder="Select fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Body Measurements</h3>
                <p className="text-sm text-muted-foreground">Your current body measurements</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>Calculated based on your information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">BMI</div>
                  <div className="text-2xl font-bold">
                    {(
                      Number.parseFloat(weight) /
                      (Number.parseFloat(height) * Number.parseFloat(height) * 0.0254 * 0.0254)
                    ).toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Overweight</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">BMR</div>
                  <div className="text-2xl font-bold">1,850</div>
                  <div className="text-xs text-muted-foreground">calories/day</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Target Weight</div>
                  <div className="text-2xl font-bold">80 kg</div>
                  <div className="text-xs text-muted-foreground">-{Number.parseFloat(weight) - 80} kg to go</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout Preferences</CardTitle>
              <CardDescription>Customize your workout experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="workout-reminders">Workout Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for scheduled workouts</p>
                </div>
                <Switch
                  id="workout-reminders"
                  checked={user.preferences.workoutReminders}
                  onCheckedChange={(checked) =>
                    updateUser({
                      preferences: { ...user.preferences, workoutReminders: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weight-reminders">Weight Tracking Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders to log your weight</p>
                </div>
                <Switch
                  id="weight-reminders"
                  checked={user.preferences.weightReminders}
                  onCheckedChange={(checked) =>
                    updateUser({
                      preferences: { ...user.preferences, weightReminders: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-effects">Workout Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds during workout intervals</p>
                </div>
                <Switch
                  id="sound-effects"
                  checked={user.preferences.soundEffects}
                  onCheckedChange={(checked) =>
                    updateUser({
                      preferences: { ...user.preferences, soundEffects: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for the app</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={user.preferences.darkMode}
                  onCheckedChange={(checked) =>
                    updateUser({
                      preferences: { ...user.preferences, darkMode: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Goals</CardTitle>
              <CardDescription>Set your fitness goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-goal">Primary Goal</Label>
                <Select
                  value={user.goals.primaryGoal}
                  onValueChange={(value) =>
                    updateUser({
                      goals: { ...user.goals, primaryGoal: value },
                    })
                  }
                >
                  <SelectTrigger id="primary-goal">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="endurance">Improve Endurance</SelectItem>
                    <SelectItem value="strength">Increase Strength</SelectItem>
                    <SelectItem value="flexibility">Improve Flexibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workout-days">Workout Days Per Week</Label>
                <Select
                  value={user.goals.workoutDaysPerWeek.toString()}
                  onValueChange={(value) =>
                    updateUser({
                      goals: { ...user.goals, workoutDaysPerWeek: Number.parseInt(value) },
                    })
                  }
                >
                  <SelectTrigger id="workout-days">
                    <SelectValue placeholder="Select days per week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="4">4 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workout-duration">Workout Duration</Label>
                <Select
                  value={user.goals.workoutDuration.toString()}
                  onValueChange={(value) =>
                    updateUser({
                      goals: { ...user.goals, workoutDuration: Number.parseInt(value) },
                    })
                  }
                >
                  <SelectTrigger id="workout-duration">
                    <SelectValue placeholder="Select workout duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Goals</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Equipment</CardTitle>
              <CardDescription>Manage your workout equipment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-3 border-b p-3 text-sm font-medium">
                  <div>Equipment</div>
                  <div>Details</div>
                  <div className="text-right">Status</div>
                </div>
                <div className="divide-y">
                  {equipment.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 items-center p-3 text-sm">
                      <div>{item.name}</div>
                      <div>{item.details}</div>
                      <div className="flex justify-end">
                        <Switch
                          checked={item.available}
                          onCheckedChange={(checked) => handleToggleEquipment(index, checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add Equipment</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

