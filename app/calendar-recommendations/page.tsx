"use client"

import { useSession } from "next-auth/react"
import { useCalendar } from "@/hooks/use-calendar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CalendarConnect from "@/components/calendar-connect"
import EventRecommendations from "@/components/event-recommendations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, TrendingUp, RefreshCw } from "lucide-react"

export default function CalendarRecommendationsPage() {
  const { data: session } = useSession()
  const { recommendations, loading, error, refetch, isAuthenticated } = useCalendar()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-3 text-primary" />
            <h1 className="text-3xl font-bold text-balance">Smart Fashion Recommendations</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get personalized clothing suggestions based on your upcoming calendar events. Perfect outfits for every
            occasion, automatically curated for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CalendarConnect />

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Event Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We analyze your calendar events to understand the occasion and suggest appropriate clothing styles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI matches your events with the perfect outfits from our curated collection of fashion items.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Personalized Style</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get recommendations tailored to your personal style preferences and the specific requirements of each
                  event.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Show recommendations section only if authenticated */}
          {isAuthenticated && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Your Personalized Recommendations</h2>
                  <p className="text-muted-foreground">Based on your upcoming calendar events</p>
                </div>
                <Button onClick={refetch} disabled={loading} variant="outline">
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {error && (
                <Card className="mb-6 border-destructive">
                  <CardContent className="pt-6">
                    <p className="text-destructive">Error: {error}</p>
                    <Button onClick={refetch} className="mt-4 bg-transparent" variant="outline">
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}

              {loading ? (
                <div className="grid gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((j) => (
                            <div key={j} className="space-y-2">
                              <div className="aspect-square bg-muted rounded"></div>
                              <div className="h-3 bg-muted rounded"></div>
                              <div className="h-3 bg-muted rounded w-2/3"></div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : recommendations.length > 0 ? (
                <EventRecommendations recommendations={recommendations} />
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any upcoming events in your calendar. Add some events to get personalized
                      recommendations!
                    </p>
                    <Button onClick={refetch} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Check Again
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
