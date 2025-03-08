"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, differenceInDays, addMonths } from "date-fns"
import { ChevronLeft, ChevronRight, Loader2, Users, CalendarDays, CreditCard, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCalendarAvailability } from "@/utils/calendar"

interface Booking {
  startDate: Date
  endDate: Date
  summary?: string
}

export default function AvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date | [Date, Date] | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [guests, setGuests] = useState("2")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const baseRate = 249 // Base rate per night

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const calendarBookings = await getCalendarAvailability()
        console.log("Fetched bookings:", calendarBookings)

        if (Array.isArray(calendarBookings)) {
          setBookings(calendarBookings)
        } else {
          console.error("Invalid bookings data format:", calendarBookings)
          setError("Invalid data format received from server")
        }
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setError("Failed to load availability data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    if (!bookings || bookings.length === 0) return false

    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)
      // Only consider dates between start (inclusive) and end (exclusive)
      return date >= bookingStart && date < bookingEnd
    })
  }

  // Update the getTileClassName function to remove the triangular indicators
  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return ""

    const isBooked = isDateBooked(date)
    return isBooked ? "booked-date" : ""
  }

  // Update the price calculation
  const calculatePrice = () => {
    if (!selectedDates) return { basePrice: 0, total: 0, nights: 0, cleaningFee: 0, serviceFee: 0 }

    const nights = Array.isArray(selectedDates)
      ? differenceInDays(selectedDates[1] ?? selectedDates[0], selectedDates[0])
      : 1
    const cleaningFee = 170 // Updated cleaning fee
    const serviceFee = nights * baseRate * 0.06 // Updated service fee to 6%

    return {
      basePrice: nights * baseRate,
      cleaningFee,
      serviceFee,
      total: nights * baseRate + cleaningFee + serviceFee,
      nights,
    }
  }

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const { basePrice, cleaningFee, serviceFee, total, nights } = calculatePrice()

  return (
    <Card className="mx-auto w-full max-w-6xl shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Check Availability & Book</CardTitle>
        <CardDescription className="text-blue-100">
          Find your perfect dates and secure your stay instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Calendar Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-600"></div>
              <span>Selected</span>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth} className="rounded-full h-10 w-10">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-xl font-semibold">
              {format(currentMonth, "MMMM yyyy")} - {format(addMonths(currentMonth, 1), "MMMM yyyy")}
            </h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth} className="rounded-full h-10 w-10">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Calendar */}
          {isLoading ? (
            <div className="flex h-[350px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin mr-2 text-blue-500" />
              <span className="text-lg text-gray-600">Loading your calendar...</span>
            </div>
          ) : error ? (
            <div className="flex h-[350px] items-center justify-center text-red-500">
              <p className="text-center">{error}</p>
            </div>
          ) : (
            <>
              <style jsx global>{`
                /* Calendar container */
                .react-calendar {
                  width: 100%;
                  border: none;
                  font-family: inherit;
                  line-height: 1.5;
                }

                /* Navigation area */
                .react-calendar__navigation {
                  display: none;
                }

                /* Month view */
                .react-calendar__month-view {
                  display: block;
                }

                /* Weekday headers */
                .react-calendar__month-view__weekdays {
                  display: grid !important;
                  grid-template-columns: repeat(7, minmax(0, 1fr));
                  text-align: center;
                  text-transform: uppercase;
                  font-weight: 600;
                  font-size: 0.8rem;
                  color: #6b7280;
                  padding-bottom: 0.5rem;
                }

                .react-calendar__month-view__weekdays__weekday {
                  padding: 0.5rem;
                  text-align: center;
                }

                .react-calendar__month-view__weekdays__weekday abbr {
                  text-decoration: none;
                  cursor: default;
                }

                /* Days grid */
                .react-calendar__month-view__days {
                  display: grid !important;
                  grid-template-columns: repeat(7, minmax(0, 1fr));
                  grid-template-rows: repeat(6, 1fr); /* Force 6 rows always */
                  text-align: center;
                }

                /* Hide dates from neighboring months */
                .react-calendar__month-view__days__day--neighboringMonth {
                  visibility: hidden;
                  pointer-events: none;
                }

                /* Day tiles */
                .react-calendar__tile {
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1rem;
                  padding: 0;
                  position: relative;
                  transition: all 0.2s;
                }

                .react-calendar__tile > abbr {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 36px;
                  height: 36px;
                  border-radius: 9999px;
                  transition: all 0.2s;
                }

                .react-calendar__tile:enabled:hover > abbr {
                  background-color: #f3f4f6;
                }

                .react-calendar__tile:disabled {
                  color: #d1d5db;
                  cursor: not-allowed;
                }

                /* Booked dates */
                .booked-date > abbr {
                  background-color: #fee2e2;
                  color: #b91c1c;
                }

                .booked-date:enabled:hover > abbr {
                  background-color: #fecaca;
                }

                /* Selected dates */
                .react-calendar__tile--active > abbr {
                  background-color: #3b82f6 !important;
                  color: white !important;
                }

                .react-calendar__tile--active:enabled:hover > abbr {
                  background-color: #2563eb !important;
                }

                /* Range selection */
                .react-calendar__tile--rangeStart > abbr,
                .react-calendar__tile--rangeEnd > abbr {
                  background-color: #3b82f6 !important;
                  color: white !important;
                }

                .react-calendar__tile--rangeStart:enabled:hover > abbr,
                .react-calendar__tile--rangeEnd:enabled:hover > abbr {
                  background-color: #2563eb !important;
                }

                .react-calendar__tile--rangeBetween > abbr {
                  background-color: #dbeafe !important;
                  color: #1e40af !important;
                }

                /* Today's date */
                .react-calendar__tile--now > abbr {
                  background-color: #dbeafe;
                  font-weight: bold;
                }

                .react-calendar__tile--now:enabled:hover > abbr {
                  background-color: #bfdbfe;
                }
              `}</style>
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="grid md:grid-cols-2 gap-8">
                  <Calendar
                    onChange={(date) => setSelectedDates(date as Date | [Date, Date] | null)}
                    value={selectedDates}
                    minDate={new Date()}
                    tileClassName={getTileClassName}
                    selectRange={true}
                    activeStartDate={currentMonth}
                    showFixedNumberOfWeeks={true}
                    showNeighboringMonth={false}
                    onActiveStartDateChange={({ activeStartDate }) =>
                      activeStartDate && setCurrentMonth(activeStartDate)
                    }
                  />
                  <Calendar
                    onChange={(date) => setSelectedDates(date as Date | [Date, Date] | null)}
                    value={selectedDates}
                    minDate={new Date()}
                    tileClassName={getTileClassName}
                    selectRange={true}
                    activeStartDate={addMonths(currentMonth, 1)}
                    showFixedNumberOfWeeks={true}
                    showNeighboringMonth={false}
                    onActiveStartDateChange={({ activeStartDate }) =>
                      activeStartDate && setCurrentMonth(addMonths(activeStartDate, -1))
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* Booking Details */}
          {selectedDates && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[72px] flex flex-col justify-between w-full">
                  <label className="text-sm font-medium text-gray-700">Number of Guests</label>
                  <div className="flex-1 flex items-center w-full">
                    <Users className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
                    <Select value={guests} onValueChange={setGuests} className="w-full">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="h-[72px] flex flex-col justify-between w-full">
                  <label className="text-sm font-medium text-gray-700">Your Stay</label>
                  <div className="flex-1 flex items-center bg-gray-50 px-3 rounded-md border w-full">
                    <CalendarDays className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div className="truncate min-w-0">
                      <span className="font-medium">
                        {Array.isArray(selectedDates)
                          ? `${format(selectedDates[0], "MMM d")} - ${format(selectedDates[1] || selectedDates[0], "MMM d, yyyy")}`
                          : format(selectedDates as Date, "MMMM d, yyyy")}
                      </span>
                      <span className="ml-2 text-gray-500">
                        ({nights} night{nights !== 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-lg mb-4">Price Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>
                        ${baseRate} x {nights} night{nights !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <span>${basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Cleaning fee</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">One-time fee for professional cleaning after your stay</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Service fee</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">
                              This helps us run our platform and offer services like 24/7 support
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 mt-3 border-t flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 rounded-b-lg border-t">
        <Button className="w-full h-12 text-lg font-semibold" size="lg" disabled={!selectedDates}>
          <CreditCard className="mr-2 h-5 w-5" />
          {selectedDates ? "Book Now" : "Select Dates to Book"}
        </Button>
      </CardFooter>
    </Card>
  )
}

