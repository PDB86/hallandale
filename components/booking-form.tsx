"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, differenceInDays } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"

export default function BookingForm() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [guests, setGuests] = useState("2")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  // Mock available dates (in a real app, this would come from an API)
  const disabledDates = [
    new Date(2025, 2, 10),
    new Date(2025, 2, 11),
    new Date(2025, 2, 12),
    new Date(2025, 2, 20),
    new Date(2025, 2, 21),
    new Date(2025, 2, 22),
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotal = () => {
    if (!dateRange.from || !dateRange.to) return 0

    const nights = differenceInDays(dateRange.to, dateRange.from)
    const baseRate = 249 // Base rate per night
    return nights * baseRate
  }

  const handleContinue = () => {
    if (step === 1 && dateRange.from && dateRange.to) {
      setStep(2)
    } else if (step === 2 && formData.firstName && formData.lastName && formData.email && formData.phone) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a payment processor like Stripe
    alert("This would connect to Stripe for payment processing in a real application.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation Details</CardTitle>
        <CardDescription>
          {step === 1 && "Select your dates and number of guests"}
          {step === 2 && "Enter your contact information"}
          {step === 3 && "Review and confirm your booking"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={new Date()}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() ||
                        disabledDates.some(
                          (disabledDate) =>
                            date.getDate() === disabledDate.getDate() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getFullYear() === disabledDate.getFullYear(),
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from || new Date()}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        (dateRange.from && date < dateRange.from) ||
                        date < new Date() ||
                        disabledDates.some(
                          (disabledDate) =>
                            date.getDate() === disabledDate.getDate() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getFullYear() === disabledDate.getFullYear(),
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange.from && dateRange.to && (
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">Price Summary</h3>
                <div className="flex justify-between">
                  <span>{differenceInDays(dateRange.to, dateRange.from)} nights</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-4 font-semibold">Booking Summary</h3>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Check-in:</span>
                  <span>{dateRange.from ? format(dateRange.from, "PPP") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Check-out:</span>
                  <span>{dateRange.to ? format(dateRange.to, "PPP") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span>{guests}</span>
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Guest:</span>
                  <span>
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{formData.phone}</span>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>{differenceInDays(dateRange.to!, dateRange.from!)} nights</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700">
                  By proceeding, you'll pay a 25% deposit (${(calculateTotal() * 0.25).toFixed(2)}) to secure your
                  booking.
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button
            onClick={handleContinue}
            disabled={
              (step === 1 && (!dateRange.from || !dateRange.to)) ||
              (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
            }
          >
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-primary">
            Pay Deposit & Book
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

