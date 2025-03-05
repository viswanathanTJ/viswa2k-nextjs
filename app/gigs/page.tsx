import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, IndianRupee } from "lucide-react"

export default function GigsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=300&width=1200"
            alt="Our Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 md:p-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Spiritual Services</h1>
            <p className="text-lg text-white/90 max-w-md">Explore our range of spiritual and astrological services</p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" className="rounded-full">
            All Services
          </Button>
          <Button variant="outline" className="rounded-full">
            Astrology
          </Button>
          <Button variant="outline" className="rounded-full">
            Palmistry
          </Button>
          <Button variant="outline" className="rounded-full">
            Vastu
          </Button>
          <Button variant="outline" className="rounded-full">
            Numerology
          </Button>
          <Button variant="outline" className="rounded-full">
            Meditation
          </Button>
          <Button variant="outline" className="rounded-full">
            Rituals
          </Button>
        </div>
      </section>

      {/* Gigs Listing */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={gig.image || "/placeholder.svg"} alt={gig.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{gig.title}</CardTitle>
                    <CardDescription>{gig.category}</CardDescription>
                  </div>
                  <div className="flex items-center text-primary font-semibold">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {gig.price}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{gig.description}</p>
                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {gig.duration}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/gigs/${gig.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

const gigs = [
  {
    id: "personal-horoscope",
    title: "Personal Horoscope Reading",
    category: "Astrology",
    price: "1,999",
    duration: "60 minutes",
    description:
      "A comprehensive analysis of your birth chart to understand your personality traits, strengths, weaknesses, and life path. Includes predictions for the coming year and guidance on important life decisions.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "compatibility-analysis",
    title: "Relationship Compatibility Analysis",
    category: "Astrology",
    price: "2,499",
    duration: "90 minutes",
    description:
      "A detailed analysis of the astrological compatibility between you and your partner or potential partner. Understand the strengths and challenges in your relationship and receive guidance on how to navigate them.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "palm-reading",
    title: "Comprehensive Palm Reading",
    category: "Palmistry",
    price: "1,499",
    duration: "45 minutes",
    description:
      "An in-depth analysis of your palm lines to reveal insights about your personality, life path, relationships, career, and health. Includes guidance on potential future outcomes based on your current path.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "home-vastu",
    title: "Home Vastu Consultation",
    category: "Vastu",
    price: "3,999",
    duration: "120 minutes",
    description:
      "A comprehensive Vastu analysis of your home to identify imbalances affecting health, wealth, and relationships. Includes practical recommendations for corrections without major structural changes.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "office-vastu",
    title: "Office/Business Vastu Consultation",
    category: "Vastu",
    price: "4,999",
    duration: "150 minutes",
    description:
      "A detailed Vastu analysis of your office or business space to optimize for success, growth, and prosperity. Includes specific recommendations for placement of important elements like desks, entrances, and meeting areas.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "numerology-profile",
    title: "Personalized Numerology Profile",
    category: "Numerology",
    price: "1,799",
    duration: "60 minutes",
    description:
      "A comprehensive numerological analysis based on your birth date and name to reveal your life path number, destiny number, and other significant numbers influencing your life journey.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "meditation-course",
    title: "Guided Meditation Course (5 Sessions)",
    category: "Meditation",
    price: "3,499",
    duration: "5 x 60 minutes",
    description:
      "A structured course teaching various meditation techniques for stress reduction, mental clarity, and spiritual growth. Includes personalized guidance and take-home practices.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "prosperity-ritual",
    title: "Prosperity Ritual",
    category: "Rituals",
    price: "2,999",
    duration: "90 minutes",
    description:
      "A traditional ritual performed to remove obstacles to financial growth and invite prosperity. Includes personalized mantras and practices to continue at home.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "healing-ritual",
    title: "Healing Ritual",
    category: "Rituals",
    price: "2,799",
    duration: "90 minutes",
    description:
      "A powerful ritual designed to promote physical, emotional, and spiritual healing. Includes energy cleansing and balancing techniques you can practice at home.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

