"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Carolina Helou",
      location: "Visitng from Buenos Aires, ArgentinaY",
      image: "/argentina.png",
      rating: 5,
      date: "February 18, 2025", // New date field
      text: "The location is perfect, right on the beach. Pablo's attention is remarkable, super patient, he answered all our questions instantly. The apartment is comfortable and equipped with everything you need. We will be back!",
    },
    {
      name: "Florent Berthaut",
      location: "Visitng from Lille, France",
      image: "/france.png",
      rating: 5,
      date: "January 12, 2025", // New date field
      text: "The apartment is spacious, clean and very pleasant to live. Well equipped, easy access, hot and clean pool, beach accessible directly from the apartment without crossing any road. Friendly host who listens and is available. Video instructions very well done. Nothing to say.",
    },
    {
      name: "Paulo Carvalho",
      location: "Visitng from Sao Paulo, Brazil",
      image: "/brazil.png",
      rating: 5,
      date: "January 25, 2024", // New date field
      text: "Spacious and well equipped apartment, condominium with infrastructure and security. Out of the pool directly on the beach sand. Great location and neighborhood. Host Pablo very attentive and polite always answering very fast the requests. I will return soon. Rated 1000",
    },
    {
      name: "Tatiana Vikulina",
      location: "Visitng from New York, USA",
      image: "/usa.png",
      rating: 5,
      date: "November 7, 2024", // New date field
      text: "That was our second time in this building, I love the location, you can just wake up in the morning and go straight to the beach. I would call it a perfect calm family vacation option. The apartment was comfortable, all necessary was there. It was clean and cozy. Pablo, the host, was very helpful. We couldn’t turn on the stove, texted him and he helped us immediately.",
    },
    {
      name: "George Salamis",
      location: "Visitng from Vancouver, Canada",
      image: "/canada.png",
      rating: 5,
      date: "February 22, 2025", // New date field
      text: "Pablo is an extremely communicative and helpful host. His check-in instructions were excellent. Thanks Pablo!",
    },
    {
      name: "Maria Eugenia",
      location: "Visitng from Cordoba, Argentina",
      image: "/argentina.png",
      rating: 5,
      date: "October 5, 2024", // New date field
      text: "Excellent stay ❤️ The location of the Department is very good, it has supermarkets nearby and is a good starting point to visit different places in the area. Lots of options to eat in case you don't want to cook. Your host Pablo is extremely attentive and friendly, he is very careful that you do not miss anything and to help you with whatever you need. The beach and pool excellent!!️ Highly recommend this place!!️",
    },
    {
      name: "Cassandra Spearman",
      location: "Visitng from Nevada, USA",
      image: "/usa.png",
      rating: 5,
      date: "May 23, 2023", // New date field
      text: "Everything was perfect. The view of the beach from the balcony was Everything. The place looked just like the photos. It was cozy and have the feeling of home..",
    },
    {
      name: "Alberto Jose Cesare",
      location: "Visitng from Buenos Aires, Argentina",
      image: "/argentina.png",
      rating: 5,
      date: "March 5, 2024", // New date field
      text: "From the moment we arrived everything was perfect, I couldn't say anything in particular. Everything was like in the photos, the host was very attentive and the location was perfect. We really liked the balcony and the sea view.",
    },


    {
      name: "Javier David Gimenez",
      location: "Visitng from Buenos Aires, Argentina",
      image: "/argentina.png",
      rating: 5,
      date: "April 9, 2023", // New date field
      text: "The apartment is excellent. It has more than we expected! Full kitchen with stove, oven, microwave, refrigerator and freezer, washing machine and dryer. The living room/dining room is very spacious and the room comfortable. Chairs, umbrellas and even a beach bag! The complex of buildings offers a pool and access to the beach, parking and services. The location is excellent, in Hallandale, a very nice area to stay! We highly recommend it!",
    },
    {
      name: "Bernardette Dourlain",
      location: "Visitng from California, USA",
      image: "/usa.png",
      rating: 5,
      date: "December 9, 2022", // New date field
      text: "The location was great! Close to the popular areas, but far enough to feel more relaxed and less busy and touristy. Loved the modern feel and décor! Beautiful pool, gym and loved the café right downstairs (the fresh squeezed OJ was awesome in my mimosas 😊) And super easy access to the beach which was not crowded at all while we were there. The host is also super responsive and helpful!",
    },
    {
      name: "Johandy Lopez",
      location: "Visitng from Colorado, USA",
      image: "/usa.png",
      rating: 5,
      date: "October 12, 2022", // New date field
      text: "The apartment was great! confortable with everything you need to have a great time! location was great right on the beach!",
    },    
    {
      name: "Courtney Bernard",
      location: "Visitng from Maine, USA",
      image: "/usa.png",
      rating: 5,
      date: "October 12, 2022", // New date field
      text: "Everything went smooth with check in, the condo was spacious and beds really comfortable. Location was great, the laundry was an added bonus. The pool/beach were nice. There was a cafe you could order from and it was delivered right to you pool side.",
    },    
    {
      name: "Robert Quicke",
      location: "Visitng from New Jersey, USA",
      image: "/usa.png",
      rating: 5,
      date: "January 12, 2023", // New date field
      text: "We enjoyed our stay very much! It was exactly as described and as the pictures showed. The condo was well appointed and nicely updated with a beautiful ocean view. Pablo took good care of us throughout our stay and was very responsive. We would love to come back to this condo again!",
    },
    {
      name: "Brielle Viviani",
      location: "Visitng from New Jersey, USA",
      image: "/usa.png",
      rating: 5,
      date: "February 15, 2023", // New date field
      text: "Great location! Apartment was a nice size and the building had great amenities. Close to everything we wanted to see in Ft Lauderdale and Miami. Would stay again!",
    },

    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Guest Experiences
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don't just take our word for it. Here's what our guests have to say
            about their stay at our Hallandale Beach apartment.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative h-[300px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`absolute left-0 top-0 w-full transform transition-all duration-500 ${
                  index === activeIndex
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <CardContent className="p-6 relative">
                  {/* Date in the upper right corner */}
                  <p className="absolute right-4 top-4 text-sm text-muted-foreground">
                    {testimonial.date}
                  </p>

                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                      <div className="mt-1 flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="italic text-muted-foreground">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
