"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addDays, format, differenceInDays, addMonths } from "date-fns";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { collection, getDocs } from "firebase/firestore"; // ✅ Firestore imports added
import { db } from "@/utils/firebase"; // ✅ Ensure this path is correct

interface Booking {
  startDate: Date;
  endDate: Date;
}

export default function AvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date | [Date, Date] | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState("2");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ✅ Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);

      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = querySnapshot.docs.map((doc) => doc.data() as Booking);

        console.log("Fetched bookings from Firestore:", bookingsData); // ✅ Debugging
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Custom day rendering
  const renderDay = (day: Date) => {
    const isBooked = isDateBooked(day);

    return (
      <div className="relative h-9 w-9 p-0">
        <div
          className={`flex h-full w-full items-center justify-center rounded-full ${
            isBooked ? "bg-red-100 text-red-600" : ""
          }`}
        >
          {day.getDate()}
        </div>
      </div>
    );
  };

  // Calculate price
  const calculatePrice = () => {
    if (!selectedDates) return { basePrice: 0, total: 0, nights: 0 };

    const nights = Array.isArray(selectedDates)
      ? differenceInDays(selectedDates[1] ?? selectedDates[0], selectedDates[0])
      : 1;
    const baseRate = 249; // Base rate per night
    const cleaningFee = 100;
    const serviceFee = nights * baseRate * 0.12;

    return {
      basePrice: nights * baseRate,
      cleaningFee,
      serviceFee,
      total: nights * baseRate + cleaningFee + serviceFee,
      nights,
    };
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const { basePrice, cleaningFee, serviceFee, total, nights } = calculatePrice();

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Check Availability & Book</CardTitle>
        <CardDescription>View available dates and book your stay directly through our website.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              Previous Month
            </Button>
            <h3 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              Next Month
            </Button>
          </div>

          {isLoading ? (
            <div className="flex h-[350px] items-center justify-center">
              <span className="ml-2">Loading calendar...</span>
            </div>
          ) : (
            <Calendar
              onChange={(date) => setSelectedDates(date as Date | [Date, Date] | null)}
              value={selectedDates}
              minDate={new Date()}
              tileContent={({ date }) => renderDay(date)}
              className="rounded-md border"
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={!selectedDates}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
