"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import appData from "@/data/app-data.json"

export function MotivationalQuote() {
  const [quote, setQuote] = useState({ quote: "", author: "" })

  useEffect(() => {
    // Get a random quote from the app data
    const quotes = appData.motivationalQuotes
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  if (!quote.quote) return null

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4 flex items-start gap-3">
        <Quote className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="italic text-sm">&ldquo;{quote.quote}&rdquo;</p>
          <p className="text-xs text-muted-foreground mt-1">— {quote.author}</p>
        </div>
      </CardContent>
    </Card>
  )
}

