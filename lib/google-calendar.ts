import { google } from "googleapis"

export interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  location?: string
}

export interface EventAnalysis {
  eventType: "business" | "casual" | "formal" | "party" | "wedding" | "festival" | "sports" | "travel" | "other"
  confidence: number
  suggestedCategories: string[]
  keywords: string[]
}

export class GoogleCalendarService {
  private calendar: any

  constructor(accessToken: string) {
    const auth = new google.auth.OAuth2()
    auth.setCredentials({ access_token: accessToken })
    this.calendar = google.calendar({ version: "v3", auth })
  }

  async getUpcomingEvents(maxResults = 10): Promise<CalendarEvent[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: "startTime",
      })

      const events = response.data.items || []
      return events.map((event: any) => ({
        id: event.id,
        summary: event.summary || "No Title",
        description: event.description,
        start: {
          dateTime: event.start?.dateTime,
          date: event.start?.date,
        },
        end: {
          dateTime: event.end?.dateTime,
          date: event.end?.date,
        },
        location: event.location,
      }))
    } catch (error) {
      console.error("Error fetching calendar events:", error)
      throw new Error("Failed to fetch calendar events")
    }
  }

  async createEvent(event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: event.summary,
          description: event.description,
          start: event.start,
          end: event.end,
          location: event.location,
        },
      })

      return {
        id: response.data.id,
        summary: response.data.summary,
        description: response.data.description,
        start: response.data.start,
        end: response.data.end,
        location: response.data.location,
      }
    } catch (error) {
      console.error("Error creating calendar event:", error)
      throw new Error("Failed to create calendar event")
    }
  }

  analyzeEvent(event: CalendarEvent): EventAnalysis {
    const summary = event.summary.toLowerCase()
    const description = (event.description || "").toLowerCase()
    const location = (event.location || "").toLowerCase()
    const text = `${summary} ${description} ${location}`

    // Business/Professional keywords
    const businessKeywords = [
      "meeting",
      "conference",
      "presentation",
      "interview",
      "office",
      "work",
      "client",
      "business",
      "corporate",
      "professional",
    ]
    const businessScore = businessKeywords.filter((keyword) => text.includes(keyword)).length

    // Formal event keywords
    const formalKeywords = [
      "wedding",
      "gala",
      "ceremony",
      "graduation",
      "formal",
      "black tie",
      "reception",
      "dinner party",
    ]
    const formalScore = formalKeywords.filter((keyword) => text.includes(keyword)).length

    // Party/Social keywords
    const partyKeywords = ["party", "celebration", "birthday", "anniversary", "social", "drinks", "nightout", "club"]
    const partyScore = partyKeywords.filter((keyword) => text.includes(keyword)).length

    // Festival/Cultural keywords
    const festivalKeywords = [
      "festival",
      "diwali",
      "holi",
      "christmas",
      "eid",
      "navratri",
      "durga puja",
      "cultural",
      "traditional",
    ]
    const festivalScore = festivalKeywords.filter((keyword) => text.includes(keyword)).length

    // Sports/Fitness keywords
    const sportsKeywords = ["gym", "workout", "sports", "fitness", "running", "yoga", "exercise", "match", "game"]
    const sportsScore = sportsKeywords.filter((keyword) => text.includes(keyword)).length

    // Travel keywords
    const travelKeywords = ["travel", "trip", "vacation", "holiday", "flight", "hotel", "tour", "visit"]
    const travelScore = travelKeywords.filter((keyword) => text.includes(keyword)).length

    // Determine event type based on highest score
    const scores = [
      {
        type: "business" as const,
        score: businessScore,
        categories: ["men-formal", "women-formal", "accessories-formal"],
      },
      { type: "formal" as const, score: formalScore, categories: ["men-formal", "women-formal", "accessories-formal"] },
      { type: "party" as const, score: partyScore, categories: ["men-party", "women-party", "accessories-party"] },
      {
        type: "festival" as const,
        score: festivalScore,
        categories: ["men-ethnic", "women-ethnic", "accessories-traditional"],
      },
      { type: "sports" as const, score: sportsScore, categories: ["men-sports", "women-sports", "footwear-sports"] },
      { type: "travel" as const, score: travelScore, categories: ["men-casual", "women-casual", "accessories-travel"] },
    ]

    const bestMatch = scores.reduce((prev, current) => (current.score > prev.score ? current : prev))

    // If no clear match, default to casual
    if (bestMatch.score === 0) {
      return {
        eventType: "casual",
        confidence: 0.3,
        suggestedCategories: ["men-casual", "women-casual"],
        keywords: [],
      }
    }

    return {
      eventType: bestMatch.type,
      confidence: Math.min(bestMatch.score / 3, 1),
      suggestedCategories: bestMatch.categories,
      keywords: text.split(" ").filter((word) => word.length > 3),
    }
  }
}
