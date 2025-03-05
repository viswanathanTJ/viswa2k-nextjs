import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-primary">Agathiyar</span> Janachithar
            </Link>
            <p className="text-muted-foreground mb-6">
              Providing spiritual guidance and astrological insights to transform lives since 1995.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gigs" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gigs#astrology" className="text-muted-foreground hover:text-primary">
                  Astrology
                </Link>
              </li>
              <li>
                <Link href="/gigs#palmistry" className="text-muted-foreground hover:text-primary">
                  Palmistry
                </Link>
              </li>
              <li>
                <Link href="/gigs#vastu" className="text-muted-foreground hover:text-primary">
                  Vastu Consultation
                </Link>
              </li>
              <li>
                <Link href="/gigs#numerology" className="text-muted-foreground hover:text-primary">
                  Numerology
                </Link>
              </li>
              <li>
                <Link href="/gigs#meditation" className="text-muted-foreground hover:text-primary">
                  Meditation Classes
                </Link>
              </li>
              <li>
                <Link href="/gigs#rituals" className="text-muted-foreground hover:text-primary">
                  Spiritual Rituals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">123 Spiritual Center, Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">info@agathiyarjanachithar.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Agathiyar Janachithar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

