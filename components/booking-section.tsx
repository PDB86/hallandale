"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AvailabilityCalendar from "@/components/availability-calendar"
import BookingForm from "@/components/booking-form"

export default function BookingSection() {
  const [step, setStep] = useState(1)

  return (
    <section id="booking" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Book Your Stay</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Book directly with us for the best rates and exclusive perks. <br></br>Check availability and secure your beachfront
            getaway today.
          </p>
        </div>

        <Tabs defaultValue="calendar" className="mx-auto max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Check Availability</TabsTrigger>
            <TabsTrigger value="booking">Book Now</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-6">
            <AvailabilityCalendar />
          </TabsContent>
          <TabsContent value="booking" className="mt-6">
            <BookingForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

