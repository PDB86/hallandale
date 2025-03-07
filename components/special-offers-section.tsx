import { Clock, Car, Gift, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SpecialOffersSection() {
  const offers = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Early Check-in / Late Check-out",
      description:
        "Start your vacation early or extend your last day at the beach with flexible check-in and check-out times.",
      price: 49,
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Airport Transfer",
      description:
        "Hassle-free transportation from Fort Lauderdale or Miami International Airport directly to your apartment.",
      price: 79,
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Romantic Package",
      description:
        "Surprise your loved one with champagne, chocolate-covered strawberries, and fresh flowers upon arrival.",
      price: 99,
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Welcome Grocery Package",
      description:
        "Arrive to a fully stocked refrigerator with breakfast essentials, snacks, and beverages of your choice.",
      price: 69,
    },
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Special Offers & Add-ons</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Enhance your stay with our exclusive add-on services. Book direct and enjoy special perks not available on
            other platforms.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="grid flex-1 grid-rows-[auto_auto_1fr_auto] gap-4 p-6">
                <div>{offer.icon}</div>
                <h3 className="text-xl font-semibold">{offer.title}</h3>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
                <p className="text-2xl font-bold text-primary">${offer.price}</p>
              </CardContent>
              <CardFooter className="border-t p-6">
                <Button variant="outline" className="w-full">
                  Add to Booking
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

