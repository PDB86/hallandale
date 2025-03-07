import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Hallandale Haven</h3>
            <p className="mb-4 text-gray-400">
              Your luxury beachfront escape in Hallandale Beach, Florida. Book direct for the best rates and exclusive
              perks.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 transition-colors hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#booking" className="text-gray-400 transition-colors hover:text-white">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-white">
                  House Rules
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-gray-400">Subscribe to our newsletter for special offers and updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border-gray-700 bg-gray-800 px-4 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hallandale Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

