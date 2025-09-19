import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { GoogleCalendarService } from "@/lib/google-calendar"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const calendarService = new GoogleCalendarService(session.accessToken)
    const events = await calendarService.getUpcomingEvents(20)

    // Analyze each event
    const analyzedEvents = events.map((event) => ({
      ...event,
      analysis: calendarService.analyzeEvent(event),
    }))

    return NextResponse.json({ events: analyzedEvents })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json({ error: "Failed to fetch calendar events" }, { status: 500 })
  }
}
