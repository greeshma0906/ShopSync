"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

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
  analysis?: {
    eventType: string
    confidence: number
    suggestedCategories: string[]
    keywords: string[]
  }
}

export interface EventRecommendation {
  event: {
    id: string
    summary: string
    start: any
    end: any
  }
  analysis: {
    eventType: string
    confidence: number
    suggestedCategories: string[]
    keywords: string[]
  }
  products: any[]
}

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  const fetchEvents = async () => {
    if (status !== "authenticated" || !session) {
      setError("Please sign in to access your calendar")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/calendar/events")
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please sign in with Google to access your calendar")
        }
        throw new Error("Failed to fetch events")
      }

      const data = await response.json()
      setEvents(data.events)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    if (status !== "authenticated" || !session) {
      setError("Please sign in to get personalized recommendations")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/calendar/recommendations")
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please sign in with Google to get recommendations")
        }
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents()
      fetchRecommendations()
    }
  }, [status])

  return {
    events,
    recommendations,
    loading,
    error,
    isAuthenticated: status === "authenticated",
    refetch: () => {
      fetchEvents()
      fetchRecommendations()
    },
  }
}
