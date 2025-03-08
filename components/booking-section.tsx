import AvailabilityCalendar from "./availability-calendar"

export default function BookingSection() {
  return (
    <section id="booking" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Stay</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check availability and book your dream vacation directly through our website. Enjoy the best rates and
            special perks when booking directly with us.
          </p>
        </div>
        <AvailabilityCalendar />
      </div>
    </section>
  )
}

