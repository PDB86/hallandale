"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: "/Living_main.webp",
      alt: "Living room with ocean view",
      caption: "Spacious living room with panoramic ocean views",
    },
    {
      src: "/Room_1.webp",
      alt: "Master bedroom",
      caption: "Master bedroom with two queen-size beds",
    },
    {
      src: "/Kitchen.webp",
      alt: "Modern kitchen",
      caption: "Fully equipped modern kitchen",
    },
    {
      src: "/Bath.webp",
      alt: "Bathroom",
      caption: "Elegant bathroom with walk-in shower",
    },
    {
      src: "/Balcony.webp",
      alt: "Balcony view",
      caption: "Private balcony overlooking the ocean",
    },
    {
      src: "/Pool_1.webp",
      alt: "Pool area",
      caption: "Pool with beach access (Not the apartment's balcony)",
    },
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateLightbox = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }
  }

  return (
    <section id="gallery" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Apartment Gallery</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Take a visual tour of our beautiful beachfront apartment and imagine your perfect vacation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] w-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button className="absolute right-4 top-4 text-white" onClick={closeLightbox}>
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
            onClick={() => navigateLightbox("prev")}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={images[currentImageIndex].src || "/placeholder.svg"}
              alt={images[currentImageIndex].alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg">{images[currentImageIndex].caption}</p>
              <p className="text-sm">
                {currentImageIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            onClick={() => navigateLightbox("next")}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  )
}

