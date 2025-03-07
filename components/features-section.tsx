import {
  Wifi,
  CookingPotIcon as Kitchen,
  Waves,
  PocketIcon as Pool,
  Clock,
  Shield,
  Tv,
  Car,
  CheckCircle,
  Droplet,
} from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Waves className="h-10 w-10 text-primary" />,
      title: "Beachfront Location",
      description: "Direct beach access with stunning ocean views from your private balcony.",
    },
    {
      icon: <Droplet className="h-10 w-10 text-primary" />,
      title: "Swimming Pool",
      description: "Heated outdoor pool with beach umbrellas and loungers available year-round.",
    },
    {
      icon: <Kitchen className="h-10 w-10 text-primary" />,
      title: "Fully Equipped Kitchen",
      description: "Modern kitchen with dishwasher, coffee maker, microwave, and all essentials.",
    },
    {
      icon: <Wifi className="h-10 w-10 text-primary" />,
      title: "Free WiFi",
      description: "High-speed internet access throughout the property.",
    },
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Parking Available",
      description: "Convenient and secure parking is available for guests, with pricing based on the length of stay.",
    },
    {
      icon: <Tv className="h-10 w-10 text-primary" />,
      title: "Entertainment",
      description: "Flat-screen TVs with streaming services and satellite channels.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24/7 Services",
      description: "Round-the-clock front desk, security, and express check-in/out available.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Enhanced Security",
      description: "CCTV monitoring, 24-hour security, and modern safety features.",
    },
  ]

  const amenities = [
    {
      category: "Room Features",
      items: [
        "950 ft² spacious layout",
        "Private balcony with ocean view",
        "Air conditioning",
        "Private bathroom with hairdryer",
        "Sofa bed",
        "Walk-in closet",
      ],
    },
    {
      category: "Kitchen Equipment",
      items: [
        "Full-size refrigerator",
        "Dishwasher",
        "Coffee machine",
        "Microwave",
        "Stovetop & oven",
        "Complete kitchenware",
      ],
    },
    {
      category: "Services & Facilities",
      items: [
        "24-hour front desk",
        "Express check-in/out",
        "Laundry service",
        "Business center access",
        "Convenience store on site",
        "Bilingual staff (English/Spanish)",
      ],
    },
  ]

  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Apartment Features & Amenities</h2>
          <p className="max-w-4xl text-lg sm:text-base text-center mx-auto whitespace-nowrap text-muted-foreground">
  Our beachfront apartment offers modern comfort with all the conveniences you need for a perfect stay.
</p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {amenities.map((category, index) => (
            <div key={index} className="rounded-lg border p-6">
              <h3 className="mb-4 text-lg font-semibold">{category.category}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-muted-foreground">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

