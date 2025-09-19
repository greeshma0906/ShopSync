"use client"

import { useSession, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle } from "lucide-react"

export default function CalendarConnect() {
  const { data: session, status } = useSession()

  if (status === "authenticated" && session) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Calendar Connected!</CardTitle>
          <CardDescription>
            Welcome {session.user?.name}! Your Google Calendar is connected and we're analyzing your events for
            personalized recommendations.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const handleConnect = () => {
    signIn("google", { callbackUrl: "/calendar-recommendations" })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Smart Fashion Recommendations</CardTitle>
        <CardDescription>
          Connect your Google Calendar to get personalized clothing suggestions based on your upcoming events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleConnect} disabled={status === "loading"} className="w-full" size="lg">
          {status === "loading" ? "Loading..." : "Connect Google Calendar"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-4">
          We only read your calendar events to provide better recommendations. Your data is secure and private.
        </p>
      </CardContent>
    </Card>
  )
}
