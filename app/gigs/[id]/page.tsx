import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, CheckCircle, Clock, IndianRupee, MapPin, Share2, Star } from "lucide-react"
import { notFound } from "next/navigation"
import BookingForm from "@/components/booking-form"

interface GigPageProps {
  params: {
    id: string
  }
}

export default function GigPage({ params }: GigPageProps) {
  const gig = gigs.find((g) => g.id === params.id)

  if (!gig) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex mb-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link href="/gigs" className="text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span>{gig.title}</span>
          </nav>

          {/* Gig Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{gig.category}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span className="font-medium">4.9</span>
                <span className="text-muted-foreground ml-1">(120 reviews)</span>
              </div>
            </div>
          </div>

          {/* Gig Images */}
          <div className="mb-8">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-4">
              <Image src={gig.image || "/placeholder.svg"} alt={gig.title} fill className="object-cover" priority />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Image ${i + 1}`}
                    alt={`${gig.title} - Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gig Details Tabs */}
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="includes">What's Included</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4">
              <h2 className="text-xl font-semibold">About This Service</h2>
              <p>{gig.description}</p>
              <p>
                Our experienced practitioners have been providing this service for over 15 years, helping thousands of
                clients find clarity and direction in their lives. The session is conducted in a peaceful, sacred
                environment designed to enhance the spiritual experience.
              </p>
              <p>
                Prior to your appointment, you will receive a short questionnaire to help us prepare for your specific
                needs and concerns. This allows us to tailor the session to address your most important questions.
              </p>

              <h3 className="text-lg font-semibold mt-6">Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gain clarity on your life path and purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Understand patterns in your life and relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Receive guidance on important decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Learn practical techniques to overcome challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Connect with your higher self and spiritual guides</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="includes" className="space-y-4">
              <h2 className="text-xl font-semibold">What's Included</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{gig.duration} Session</h3>
                    <p className="text-muted-foreground">One-on-one consultation with our expert</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Report</h3>
                    <p className="text-muted-foreground">Detailed written analysis sent within 48 hours</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Follow-up Support</h3>
                    <p className="text-muted-foreground">
                      15-minute follow-up call within 7 days to address any questions
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Share2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Resources</h3>
                    <p className="text-muted-foreground">Access to relevant spiritual texts and practice guides</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Client Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium text-lg">4.9</span>
                  <span className="text-muted-foreground">(120)</span>
                </div>
              </div>

              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${review.name.charAt(0)}`}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{review.name}</h3>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Price</span>
                <div className="flex items-center text-primary">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span className="text-2xl font-bold">{gig.price}</span>
                </div>
              </CardTitle>
              <CardDescription>Book your session today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <BookingForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Services */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gigs
            .filter((g) => g.category === gig.category && g.id !== gig.id)
            .slice(0, 3)
            .map((relatedGig, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={relatedGig.image || "/placeholder.svg"}
                    alt={relatedGig.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{relatedGig.title}</CardTitle>
                      <CardDescription>{relatedGig.category}</CardDescription>
                    </div>
                    <div className="flex items-center text-primary font-semibold">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {relatedGig.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {relatedGig.duration}
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button asChild className="w-full">
                    <Link href={`/gigs/${relatedGig.id}`}>View Details</Link>
                  </Button>
                </div>
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
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "compatibility-analysis",
    title: "Relationship Compatibility Analysis",
    category: "Astrology",
    price: "2,499",
    duration: "90 minutes",
    description:
      "A detailed analysis of the astrological compatibility between you and your partner or potential partner. Understand the strengths and challenges in your relationship and receive guidance on how to navigate them.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "palm-reading",
    title: "Comprehensive Palm Reading",
    category: "Palmistry",
    price: "1,499",
    duration: "45 minutes",
    description:
      "An in-depth analysis of your palm lines to reveal insights about your personality, life path, relationships, career, and health. Includes guidance on potential future outcomes based on your current path.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "home-vastu",
    title: "Home Vastu Consultation",
    category: "Vastu",
    price: "3,999",
    duration: "120 minutes",
    description:
      "A comprehensive Vastu analysis of your home to identify imbalances affecting health, wealth, and relationships. Includes practical recommendations for corrections without major structural changes.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "office-vastu",
    title: "Office/Business Vastu Consultation",
    category: "Vastu",
    price: "4,999",
    duration: "150 minutes",
    description:
      "A detailed Vastu analysis of your office or business space to optimize for success, growth, and prosperity. Includes specific recommendations for placement of important elements like desks, entrances, and meeting areas.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "numerology-profile",
    title: "Personalized Numerology Profile",
    category: "Numerology",
    price: "1,799",
    duration: "60 minutes",
    description:
      "A comprehensive numerological analysis based on your birth date and name to reveal your life path number, destiny number, and other significant numbers influencing your life journey.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "meditation-course",
    title: "Guided Meditation Course (5 Sessions)",
    category: "Meditation",
    price: "3,499",
    duration: "5 x 60 minutes",
    description:
      "A structured course teaching various meditation techniques for stress reduction, mental clarity, and spiritual growth. Includes personalized guidance and take-home practices.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "prosperity-ritual",
    title: "Prosperity Ritual",
    category: "Rituals",
    price: "2,999",
    duration: "90 minutes",
    description:
      "A traditional ritual performed to remove obstacles to financial growth and invite prosperity. Includes personalized mantras and practices to continue at home.",
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: "healing-ritual",
    title: "Healing Ritual",
    category: "Rituals",
    price: "2,799",
    duration: "90 minutes",
    description:
      "A powerful ritual designed to promote physical, emotional, and spiritual healing. Includes energy cleansing and balancing techniques you can practice at home.",
    image: "/placeholder.svg?height=400&width=800",
  },
]

const reviews = [
  {
    name: "Rajesh Kumar",
    date: "2 months ago",
    rating: 5,
    comment:
      "The session was incredibly insightful. The practitioner was knowledgeable and provided guidance that has already helped me make important decisions. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    date: "3 months ago",
    rating: 5,
    comment:
      "I was skeptical at first, but the reading was surprisingly accurate. The practitioner was warm and professional, and the follow-up materials were very helpful.",
  },
  {
    name: "Anand Patel",
    date: "1 month ago",
    rating: 4,
    comment:
      "Very good experience overall. The insights were valuable and the practitioner was patient with all my questions. Would book again for future guidance.",
  },
]

