import { NextResponse } from "next/server"
import * as ical from "node-ical"

// These URLs should be stored as environment variables
const BOOKING_ICAL_URL = "https://admin.booking.com/hotel/hoteladmin/ical.html?t=55809b3f-f286-42bf-91f5-fb20976a5787"
const AIRBNB_ICAL_URL = "https://www.airbnb.com/calendar/ical/40068903.ics?s=e4d8a21e63c349a2262d00e579c1f618"

export async function GET() {
  try {
    console.log("Server: Fetching calendar data...")

    // Use fetch instead of ical.fromURL
    const [bookingResponse, airbnbResponse] = await Promise.all([fetch(BOOKING_ICAL_URL), fetch(AIRBNB_ICAL_URL)])

    if (!bookingResponse.ok || !airbnbResponse.ok) {
      throw new Error("Failed to fetch iCal data")
    }

    // Get the text content from the responses
    const [bookingData, airbnbData] = await Promise.all([bookingResponse.text(), airbnbResponse.text()])

    // Parse the iCal data
    const bookingEvents = ical.parseICS(bookingData)
    const airbnbEvents = ical.parseICS(airbnbData)

    // Process the events
    const allEvents = [...Object.values(bookingEvents), ...Object.values(airbnbEvents)]
      .filter((event: any) => event.type === "VEVENT")
      .map((event: any) => ({
        startDate: event.start,
        endDate: event.end,
        summary: event.summary || "Booked",
      }))

    console.log(`Server: Found ${allEvents.length} booking events`)
    return NextResponse.json({ bookings: allEvents })
  } catch (error) {
    console.error("Server: Error fetching calendar data:", error)
    return NextResponse.json({ error: "Failed to fetch calendar data", details: error.message }, { status: 500 })
  }
}

