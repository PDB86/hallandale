import { MapPin, Navigation, Car, Clock } from "lucide-react";

export default function LocationMapSection() {
  const nearbyAttractions = [
    {
      name: "Aventura Mall",
      distance: "4.2 miles",
      time: "12 min drive",
    },
    {
      name: "Gulfstream Park and Casino",
      distance: "2.1 miles",
      time: "7 min drive",
    },
    {
      name: "Sawgrass Mills Mall",
      distance: "15.4 miles",
      time: "25 min drive",
    },
    {
      name: "Miami International Airport",
      distance: "20.3 miles",
      time: "35 min drive",
    },
    {
      name: "Fort Lauderdale Airport",
      distance: "7.5 miles",
      time: "20 min drive",
    },
    {
      name: "Hollywood Beach Boardwalk",
      distance: "0.5 miles",
      time: "10 min walk",
    },
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Location</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Perfectly situated on the oceanfront in Hollywood, Florida, <br></br>with
            easy access to attractions, dining, and shopping.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative h-[595px] w-full overflow-hidden rounded-lg border shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.9733507596377!2d-80.12170492414787!3d26.00483197785075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d25c5a475b5b6d%3A0x1c3d9f5e1d3c9bd8!2s3801%20S%20Ocean%20Dr%2C%20Hollywood%2C%20FL%2033019!5e0!3m2!1sen!2sus!4v1709673731889!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location Map"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Address</h3>
                  <p className="text-muted-foreground">3801 S Ocean Dr</p>
                  <p className="text-muted-foreground">Hollywood, FL 33019</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Nearby Attractions</h3>
              <div className="space-y-4">
                {nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Navigation className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{attraction.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Car className="h-3 w-3" /> {attraction.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {attraction.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
