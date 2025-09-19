"use client"

import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import { Calendar, Clock } from "lucide-react"
import type { EventRecommendation } from "@/hooks/use-calendar"

interface EventRecommendationsProps {
  recommendations: EventRecommendation[]
}

export default function EventRecommendations({ recommendations }: EventRecommendationsProps) {
  const getEventTypeColor = (eventType: string) => {
    const colors = {
      business: "bg-blue-100 text-blue-800",
      formal: "bg-purple-100 text-purple-800",
      party: "bg-pink-100 text-pink-800",
      festival: "bg-orange-100 text-orange-800",
      sports: "bg-green-100 text-green-800",
      travel: "bg-cyan-100 text-cyan-800",
      casual: "bg-gray-100 text-gray-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[eventType as keyof typeof colors] || colors.other
  }

  const formatEventDate = (dateTime: string | undefined, date: string | undefined) => {
    if (dateTime) {
      return format(new Date(dateTime), "MMM dd, yyyy • h:mm a")
    } else if (date) {
      return format(new Date(date), "MMM dd, yyyy")
    }
    return "Date not available"
  }

  return (
    <div className="space-y-8">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.event.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  {recommendation.event.summary}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatEventDate(recommendation.event.start.dateTime, recommendation.event.start.date)}
                  </span>
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getEventTypeColor(recommendation.analysis.eventType)}>
                  {recommendation.analysis.eventType.charAt(0).toUpperCase() +
                    recommendation.analysis.eventType.slice(1)}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {Math.round(recommendation.analysis.confidence * 100)}% confidence
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Recommended for this event:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.analysis.suggestedCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </div>

            {recommendation.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recommendation.products.map((product) => (
                  <ProductCard key={product.id} product={product} compact />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No specific recommendations available for this event type.</p>
                <p className="text-sm mt-1">Check out our general collections instead.</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
