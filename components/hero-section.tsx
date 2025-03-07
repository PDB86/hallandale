"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero2.webp"
          alt="Beachfront view of Hallandale Beach"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-20 md:pt-32 px-4 text-center text-white">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="mb-2 text-5xl sm:text-6xl font-bold">
            Your Beachfront Escape Awaits
          </h1>
          <p className="mb-4 max-w-3xl text-lg sm:text-xl sm:text-left sm:pl-1.5">
  Experience luxury oceanfront living in Hallandale Beach – Book direct and save!
</p>


          <div className="flex flex-col sm:flex-row sm:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
              size="lg"
              className="bg-orange-600 text-white text-base font-semibold hover:bg-orange-700"
              asChild
            >
              <Link href="#booking">
                Book Now <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-base font-semibold text-white hover:bg-white/20"
              asChild
            >
              <Link href="#gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm font-medium text-white">
            Scroll Down
          </span>
          <div className="h-6 w-[1.5px] bg-white"></div>
        </div>
      </div>
    </section>
  );
}
