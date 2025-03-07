import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import GallerySection from "@/components/gallery-section"
import BookingSection from "@/components/booking-section"
import SpecialOffersSection from "@/components/special-offers-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import LocationMapSection from "@/components/location-map-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <GallerySection />
      <TestimonialsSection />
      <FeaturesSection />
      <LocationMapSection />
      <BookingSection />
      <SpecialOffersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

