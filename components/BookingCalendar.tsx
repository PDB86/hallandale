import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCalendarAvailability } from "../utils/calendar";
import { db } from "../utils/firebase"; // Correct Firebase path
import { collection, addDoc } from "firebase/firestore";

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch booked dates from Booking.com & Airbnb iCal
  useEffect(() => {
    async function fetchAvailability() {
      console.log("Fetching calendar availability...");
      const events = await getCalendarAvailability();
      console.log("Fetched events:", events);

      if (!events || events.length === 0) {
        console.warn("No booked dates found. Check iCal fetch function.");
      }

      setBookedDates(events.map(event => new Date(event.start))); // Store booked dates
    }
    fetchAvailability();
  }, []);

  // Disable already booked dates
  const isTileDisabled = ({ date }: { date: Date }) => {
    return bookedDates.some(booked => booked.getTime() === date.getTime());
  };

  // Handle booking confirmation
  async function handleBooking() {
    if (!selectedDate) return alert("Please select a date before booking.");

    const bookingDate = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;

    setIsLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        date: bookingDate?.toISOString(),
        status: "confirmed",
      });
      alert("Booking Confirmed!");
      setSelectedDate(null); // Reset selection
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Select Your Stay Dates</h2>
      <Calendar
  onChange={(date) => setSelectedDate(date as Date | [Date, Date] | null)}
  value={selectedDate as Date | [Date, Date] | null}
  minDate={new Date()}
  tileDisabled={isTileDisabled} // Disable booked dates
/>


      {selectedDate && (
        <p className="mt-4 text-lg font-semibold">
          Selected Date: {Array.isArray(selectedDate) ? selectedDate[0].toDateString() : selectedDate.toDateString()}
        </p>
      )}
      <button
        className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition disabled:opacity-50"
        onClick={handleBooking}
        disabled={!selectedDate || isLoading}
      >
        {isLoading ? "Processing..." : "Confirm Booking"}
      </button>
    </div>
  );
}
