import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { GoogleCalendarService } from "@/lib/google-calendar"
import { products } from "@/lib/products"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const calendarService = new GoogleCalendarService(session.accessToken)
    const events = await calendarService.getUpcomingEvents(10)

    // Analyze events and generate recommendations
    const recommendations = events
      .map((event) => {
        const analysis = calendarService.analyzeEvent(event)

        // Filter products based on event analysis
        const recommendedProducts = products
          .filter((product) => {
            const productCategory = `${product.category}-${product.subcategory}`.toLowerCase()
            return analysis.suggestedCategories.some(
              (category) => productCategory.includes(category.split("-")[1]) || category.includes(product.category),
            )
          })
          .slice(0, 6) // Limit to 6 products per event

        return {
          event: {
            id: event.id,
            summary: event.summary,
            start: event.start,
            end: event.end,
          },
          analysis,
          products: recommendedProducts,
        }
      })
      .filter((rec) => rec.products.length > 0) // Only include events with product recommendations

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Recommendations API error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
