"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 text-black shadow-md backdrop-blur-sm" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Hallandale Haven
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link href="#gallery" className="hover:text-primary">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="#booking" className="hover:text-primary">
                Book Now
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 z-50 w-full bg-white px-4 py-4 shadow-md md:hidden">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/"
                className="block py-2 text-black hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="block py-2 text-black hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#gallery"
                className="block py-2 text-black hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#booking"
                className="block py-2 text-black hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block py-2 text-black hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

