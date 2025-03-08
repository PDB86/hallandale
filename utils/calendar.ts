export async function getCalendarAvailability() {
  try {
    console.log("Fetching calendar data from API...")

    const response = await fetch("/api/calendar")

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API error: ${response.status} - ${errorData.error || "Unknown error"}`)
    }

    const data = await response.json()
    console.log(`Fetched ${data.bookings?.length || 0} calendar events`)

    if (!data.bookings || !Array.isArray(data.bookings)) {
      console.error("Invalid response format:", data)
      return []
    }

    return data.bookings.map((booking: any) => ({
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      summary: booking.summary,
    }))
  } catch (error) {
    console.error("Error fetching calendar data:", error)
    return []
  }
}

