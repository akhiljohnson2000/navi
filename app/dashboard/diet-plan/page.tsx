"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Check, Info, X, AlertTriangle } from "lucide-react"
import { useAppData } from "@/context/app-context"
import { MotivationalQuote } from "@/components/motivational-quote"
import { Progress } from "@/components/ui/progress"

export default function DietPlanPage() {
  const { dietPlan } = useAppData()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFoods = selectedCategory
    ? dietPlan.keralaCuisine.filter((food) => food.category === selectedCategory)
    : dietPlan.keralaCuisine

  const categories = Array.from(new Set(dietPlan.keralaCuisine.map((food) => food.category)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Diet Plan</h1>
      </div>

      <MotivationalQuote />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Nutrition is key to your fitness journey</AlertTitle>
        <AlertDescription>
          A balanced diet complements your workout routine. Remember, you can't out-train a poor diet!
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="daily-nutrition" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily-nutrition">Daily Nutrition</TabsTrigger>
          <TabsTrigger value="kerala-foods">Kerala Foods</TabsTrigger>
          <TabsTrigger value="avoid-list">Foods to Avoid</TabsTrigger>
          <TabsTrigger value="meal-tips">Meal Planning Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="daily-nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Nutritional Requirements</CardTitle>
              <CardDescription>
                Based on a {dietPlan.dailyNutrition.calories} calorie diet for an active individual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Protein: {dietPlan.dailyNutrition.protein.amount}</div>
                    <div className="text-xs text-muted-foreground">{dietPlan.dailyNutrition.protein.description}</div>
                  </div>
                  <div className="text-sm">{dietPlan.dailyNutrition.protein.percentage}%</div>
                </div>
                <Progress value={dietPlan.dailyNutrition.protein.percentage} className="h-2 bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      Carbohydrates: {dietPlan.dailyNutrition.carbohydrates.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dietPlan.dailyNutrition.carbohydrates.description}
                    </div>
                  </div>
                  <div className="text-sm">{dietPlan.dailyNutrition.carbohydrates.percentage}%</div>
                </div>
                <Progress value={dietPlan.dailyNutrition.carbohydrates.percentage} className="h-2 bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Fats: {dietPlan.dailyNutrition.fats.amount}</div>
                    <div className="text-xs text-muted-foreground">{dietPlan.dailyNutrition.fats.description}</div>
                  </div>
                  <div className="text-sm">{dietPlan.dailyNutrition.fats.percentage}%</div>
                </div>
                <Progress value={dietPlan.dailyNutrition.fats.percentage} className="h-2 bg-muted" />
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Fiber</div>
                    <div className="text-xs text-muted-foreground">{dietPlan.dailyNutrition.fiber.description}</div>
                  </div>
                  <div className="text-sm font-medium">{dietPlan.dailyNutrition.fiber.amount}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Water</div>
                    <div className="text-xs text-muted-foreground">{dietPlan.dailyNutrition.water.description}</div>
                  </div>
                  <div className="text-sm font-medium">{dietPlan.dailyNutrition.water.amount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kerala-foods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kerala Cuisine Food Guide</CardTitle>
              <CardDescription>Traditional Kerala foods and their nutritional benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {filteredFoods.map((food, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{food.name}</h3>
                      {food.recommended ? (
                        <Badge variant="outline" className="bg-green-500/20 text-green-700">
                          <Check className="mr-1 h-3 w-3" /> Recommended
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-500/20 text-red-700">
                          <X className="mr-1 h-3 w-3" /> Limit Intake
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="font-medium w-32">Category:</span>
                        <span>{food.category}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Nutritional Value:</span>
                        <span>{food.nutritionalValue}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Health Benefits:</span>
                        <span>{food.healthBenefits}</span>
                      </div>
                      {food.portionControl && (
                        <div className="flex items-start">
                          <span className="font-medium w-32">Portion Control:</span>
                          <span className="text-amber-600">{food.portionControl}</span>
                        </div>
                      )}
                      {food.healthierAlternative && (
                        <div className="flex items-start">
                          <span className="font-medium w-32">Healthier Alternative:</span>
                          <span className="text-green-600">{food.healthierAlternative}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avoid-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Foods to Limit or Avoid</CardTitle>
              <CardDescription>These foods can hinder your fitness progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dietPlan.avoidList.map((category, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium">{category.category}</h3>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium">Items to avoid: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {category.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="bg-red-500/10">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meal-tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal Planning Tips</CardTitle>
              <CardDescription>Practical advice for healthy eating</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {dietPlan.mealPlanTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Remember that consistency is key. Small, sustainable changes to your diet will lead to better long-term
                results than drastic, short-term changes.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

