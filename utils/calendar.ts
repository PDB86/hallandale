import ical from "node-ical";

const bookingIcalURL = "https://admin.booking.com/hotel/hoteladmin/ical.html?t=55809b3f-f286-42bf-91f5-fb20976a5787";
const airbnbIcalURL = "https://www.airbnb.com/calendar/ical/40068903.ics?s=e4d8a21e63c349a2262d00e579c1f618";

export async function getCalendarAvailability() {
  try {
    const [bookingEvents, airbnbEvents] = await Promise.all([
      ical.fromURL(bookingIcalURL),
      ical.fromURL(airbnbIcalURL),
    ]);

    return [...Object.values(bookingEvents), ...Object.values(airbnbEvents)]
      .filter(event => event.type === "VEVENT")
      .map(event => ({
        start: event.start,
        end: event.end,
        summary: event.summary || "Booked",
      }));
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return [];
  }
}
