"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Phone, Play, Star } from "lucide-react";
import ContactForm from "@/components/contact-form"


export default function Home() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVideoId, setMobileVideoId] = useState<string | null>(null);

  // Check if device is mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

      {/* TV Programs Section */}
      <section id="about" className="py-16 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">TV Programs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Featured in dedicated episodes across several prominent TV networks.
          </p>
        </div>

        {/* Active video player - only show on desktop */}
        {activeVideoId && !isMobile && (
          <div id="video-player" className="aspect-video rounded-lg overflow-hidden max-w-4xl mx-auto mb-8">
            <iframe
              src={videos.find(video => video.id === activeVideoId)?.url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture; accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
              allowFullScreen
              title={videos.find(video => video.id === activeVideoId)?.title}
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        )}
        
        {/* Video thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className={`aspect-video rounded-lg overflow-hidden cursor-pointer relative ${
                (activeVideoId === video.id && !isMobile) || (mobileVideoId === video.id && isMobile) 
                  ? "ring-2 ring-primary" 
                  : ""
              }`}
              onClick={() => {
                if (isMobile) {
                  // On mobile, toggle this video's inline player
                  setMobileVideoId(mobileVideoId === video.id ? null : video.id);
                } else {
                  // On desktop, use the single player approach
                  setActiveVideoId(video.id);
                  setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 100);
                }
              }}
            >
            {/* If on mobile and this video is selected, show iframe directly */}
            {isMobile && mobileVideoId === video.id ? (
              video.platform === "youtube" ? (
                // YouTube-specific iframe
                <iframe
                  src={video.url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allow="autoplay; fullscreen; picture-in-picture; accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
                  allowFullScreen
                  title={video.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              ) : (
                // Vimeo-specific iframe
                <iframe
                  src={video.url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title={video.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              )
            ) : (
              <>
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm">
                  {video.title}
                </div>
              </>
            )}
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16">
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
              <ContactForm />
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

// Vendhar TV url: "https://www.youtube.com/embed/dQi_zQ52tpI?si=9cZQ9U9IVUGcs-Gv",
const videos = [
  {
    id: "vendhar_tv",
    title: "Venthar TV - Moondaravathu Kan",
    url: "https://www.youtube.com/embed/videoseries?list=PLI1eLWqTtWrvh_ZrOmRJCjyBFapSEqIqt",
    platform: "youtube",
    thumbnailUrl: "https://img.youtube.com/vi/dQi_zQ52tpI/maxresdefault.jpg",
  },
  {
    id: "makkal_tv",
    title: "Makkal TV - Maya Ulagam",
    url: "https://www.youtube.com/embed/5JriwiFn10I?si=sX76NNjDssci522b",
    platform: "youtube",
    thumbnailUrl: "https://img.youtube.com/vi/5JriwiFn10I/maxresdefault.jpg",
  },
  {
    id: "zee_tamil_tv",
    title: "Zee Tamil - Nambinal Nambungal",
    url: "//player.vimeo.com/video/784322358",
    platform: "vimeo",
    thumbnailUrl: "https://vumbnail.com/784322358.jpg",
  },
  {
    id: "vasanth_tv",
    title: "Vasanth TV - Mannil Ulavum Marmangal",
    url: "//player.vimeo.com/video/893082114",
    platform: "vimeo",
    thumbnailUrl: "https://vumbnail.com/893082114.jpg",
  },
]