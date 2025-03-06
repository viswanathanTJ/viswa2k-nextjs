import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Phone, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=500&width=1200"
            alt="Spiritual Guidance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 md:p-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Agathiyar Janachithar</h1>
            <p className="text-xl text-white/90 max-w-md mb-8">
              Discover spiritual guidance and astrological insights to transform your life
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/gigs">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="about" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Spiritual Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our range of spiritual and astrological services designed to provide guidance and clarity in your
            life journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/gigs#${service.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-muted rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from people who have experienced transformation through our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reach out to schedule a consultation or learn more about our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input id="name" className="w-full p-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input id="email" type="email" className="w-full p-2 border rounded-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input id="subject" className="w-full p-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea id="message" rows={4} className="w-full p-2 border rounded-md"></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out directly through these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">123 Spiritual Center, Chennai, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Appointments</h3>
                  <p className="text-muted-foreground">Book in advance for personal consultations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    id: "astrology",
    title: "Astrological Consultation",
    description: "Personalized horoscope reading and astrological guidance for your life path",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "palmistry",
    title: "Palmistry",
    description: "Discover insights about your past, present, and future through palm reading",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "vastu",
    title: "Vastu Consultation",
    description: "Harmonize your living and working spaces with ancient Vastu principles",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "numerology",
    title: "Numerology",
    description: "Understand the influence of numbers in your life and personality",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "meditation",
    title: "Meditation Classes",
    description: "Learn meditation techniques to achieve inner peace and spiritual growth",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "rituals",
    title: "Spiritual Rituals",
    description: "Traditional rituals to remove obstacles and invite positive energies",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Chennai",
    rating: 5,
    comment:
      "The astrological consultation was incredibly accurate and provided me with valuable guidance during a difficult time.",
  },
  {
    name: "Priya Sharma",
    location: "Bangalore",
    rating: 5,
    comment:
      "The Vastu consultation helped transform the energy in our home. We've experienced positive changes since implementing the suggestions.",
  },
  {
    name: "Anand Patel",
    location: "Mumbai",
    rating: 4,
    comment:
      "The meditation classes have been life-changing. I've learned techniques that help me stay centered throughout my busy days.",
  },
]

