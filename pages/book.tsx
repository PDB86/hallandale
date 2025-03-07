import BookingCalendar from "@/components/BookingCalendar";

export default function Book() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Book Your Stay</h1>
      <BookingCalendar />
    </div>
  );
}
