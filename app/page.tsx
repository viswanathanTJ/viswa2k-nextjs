"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Phone, Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ContactForm from "@/components/contact-form"


export default function Home() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVideoId, setMobileVideoId] = useState<string | null>(null);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);

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

  // Auto-scrolling testimonials effect with smooth infinite loop
useEffect(() => {
  const container = testimonialContainerRef.current;
  if (!container) return;
  
  let animationFrameId: number;
  let lastTimestamp: number = 0;
  let scrollTimeout: NodeJS.Timeout;
  const scrollSpeed = 0.1; // Slow scrolling speed
  let savedPosition = container.scrollWidth / 3; // Store initial position

  const scrollTestimonials = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const elapsed = timestamp - lastTimestamp;
    
    if (!isScrollingPaused) {
      // Calculate the width of a single set of testimonials
      const setWidth = container.scrollWidth / 3;
      
      // Update scroll position smoothly
      const targetPosition = savedPosition + scrollSpeed * elapsed;
      
      // Check if we need to reset position
      if (targetPosition >= setWidth * 2) {
        savedPosition = setWidth;
        container.scrollLeft = savedPosition;
      } else {
        savedPosition = targetPosition;
        container.scrollLeft = savedPosition;
      }

      // Ensure we stay within the middle set bounds
      const scrollDelta = Math.abs(container.scrollLeft - savedPosition);
      if (scrollDelta > setWidth / 3) {
        savedPosition = container.scrollLeft;
      }
    }
    
    lastTimestamp = timestamp;
    animationFrameId = requestAnimationFrame(scrollTestimonials);
  };
  
  // Initial positioning at the start of the middle set
  container.scrollLeft = savedPosition;
  
  animationFrameId = requestAnimationFrame(scrollTestimonials);
  
  const handleScroll = () => {
    // Clear existing timeout to prevent multiple updates
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Update saved position after scroll stops
    if (isScrollingPaused) {
      scrollTimeout = setTimeout(() => {
        savedPosition = container.scrollLeft;
      }, 100);
    }
  };
  
  container.addEventListener('scroll', handleScroll);
  
  return () => {
    cancelAnimationFrame(animationFrameId);
    container.removeEventListener('scroll', handleScroll);
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };
}, [isScrollingPaused]);
  
  // Navigation functions - synchronized with auto-scroll
  const scrollTestimonials = (direction: 'left' | 'right') => {
    const container = testimonialContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 350; // Approximate width of one card
    const setWidth = container.scrollWidth / 3;
    
    // Calculate new position based on current scroll position
    let targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    // Ensure we stay within the middle set bounds
    if (targetScroll < setWidth) {
      targetScroll = setWidth;
    } else if (targetScroll > setWidth * 2) {
      targetScroll = setWidth * 2;
    }
    
    // Update scroll position smoothly
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
    {/* Hero Section */}
    <section className="relative">
      <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
        <Image
          src="/landing-bg.png?height=500&width=1200"
          alt="Spiritual Guidance"
          fill
          className="object-cover"
          priority
          onLoad={() => setBgImageLoaded(true)}
        />
        
        {/* Content wrapper with grid to separate text and image */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-5">
          {/* Text content - takes 3/5 columns on md screens */}
          <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-black/00 to-transparent flex flex-col justify-center p-8 md:p-16">
            <h1 className="tamil-heading text-2xl md:text-4xl font-bold text-primary mb-4">மஹா யாக பரிகார சக்கரவர்த்தி</h1>
            <p className="tamil-text text-l text-black/90 max-w-md mb-2">
              உங்கள் தொழில், திருமண வாழ்க்கை, கல்வி, செல்வ வளர்ச்சி பற்றிய தீர்வுகளை இன்று தெரிந்து கொள்ளுங்கள்.
            </p>
            <p className="tamil-text text-l text-black/90 max-w-md mb-2">
              எந்த விதமான தோஷமாக இருந்தாலும், ஜாதகத்தின் மூலம் காரணங்களை கண்டறிந்து அதற்கேற்ற பரிகாரங்களை செய்யலாம்.
            </p>
            <p className="tamil-text text-l text-black/90 max-w-md mb-8">
              பில்லி சூனியம் போன்ற எதுவாக இருந்தாலும், ஜாதகத்தின் மூலமும், பூஜைகளின் மூலமும் காரணங்களை கண்டறிந்து தீர்வு காண முடியும்.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#contact" className="tamil-text">தொடர்பு கொள்ள</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-black/80 text-white border-black/20 hover:bg-black/20">
                <Link href="/services" className="tamil-text">ஜாதக அறிய</Link>
              </Button>
            </div>
          </div>
          
          {/* Image column - takes 2/5 columns on md screens */}
          <div className="hidden md:block col-span-2 relative">
            {/* Standing Image with Animation */}
            <div className={`absolute bottom-0 right-0 transition-all duration-1000 ease-in-out ${bgImageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Image
                src="/ajs-standing.png"
                alt="Agathiyar Jana Chithar"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* TV Programs Section */}
      <section id="about" className="py-16 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="tamil-heading text-3xl font-bold mb-4">தொலைக்காட்சி நிகழ்ச்சிகள்</h2>
          <p className="tamil-text text-muted-foreground max-w-2xl mx-auto">
            பல்வேறு முன்னணி தொலைக்காட்சி ஒளிவழிகளில் சிறப்புத் தொடர்களில் இடம்பெற்றுள்ளோம்.
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
          <h2 className="tamil-heading text-4xl font-bold mb-4">எங்கள் ஜாதக சேவைகள்</h2>
          <p className="tamil-text text-muted-foreground max-w-2xl mx-auto">
            உங்கள் வாழ்க்கை பயணத்திற்கு வழிகாட்டும் ஆன்மீக ஜோதிட சேவைகளை கண்டறியுங்கள்.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="tamil-subheading mb-4">{service.title}</CardTitle>
                <div className="text-black/80 text-base leading-relaxed tamil-text">
                  {service.description}
                </div>
                {/* <CardDescription>{service.description}</CardDescription> */}
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/gigs#${service.id}`} className="tamil-text">மேலும் அறிய</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-muted rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="tamil-heading text-4xl font-bold mb-4">எங்கள் வாடிக்கையாளர்கள் கூறுவது</h2>
          <p className="tamil-text text-muted-foreground max-w-2xl mx-auto">
            எங்கள் சேவைகள் மூலம் மாற்றத்தை அனுபவித்த மக்களின் விமர்சனங்கள்
          </p>
        </div>

        {/* Scrollable testimonials container with controls */}
        <div className="relative">
          {/* Left shadow and button */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted to-transparent z-10 flex items-center justify-start">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-background/50 hover:bg-background/80 ml-2"
              onClick={() => scrollTestimonials('left')}
              onMouseEnter={() => setIsScrollingPaused(true)}
              onMouseLeave={() => setIsScrollingPaused(false)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Scrollable container with hover handlers */}
          <div
            ref={testimonialContainerRef}
            className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
            onMouseEnter={() => setIsScrollingPaused(true)}
            onMouseLeave={() => setIsScrollingPaused(false)}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card flex-shrink-0 w-[300px] md:w-[350px]">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <CardTitle className="tamil-subheading text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="tamil-text">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="tamil-text italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Create three sets of testimonials for seamless infinite scroll */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={`testimonial-${index}`} className="bg-card flex-shrink-0 w-[300px] md:w-[350px]">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <CardTitle className="tamil-subheading text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="tamil-text">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="tamil-text italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Right shadow and button */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted to-transparent z-10 flex items-center justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-background/50 hover:bg-background/80 mr-2"
              onClick={() => scrollTestimonials('right')}
              onMouseEnter={() => setIsScrollingPaused(true)}
              onMouseLeave={() => setIsScrollingPaused(false)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Visual indicator showing auto-scroll is active */}
        <div className="flex justify-center mt-4">
          <div className={`h-1 w-16 rounded-full ${isScrollingPaused ? 'bg-muted-foreground/30' : 'bg-primary animate-pulse'}`}></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="text-center mb-12">
          <h2 className="tamil-heading text-3xl font-bold mb-4">தொடர்பு கொள்ள</h2>
          <p className="tamil-text text-muted-foreground max-w-2xl mx-auto">
            ஆலோசனை பெற அல்லது எங்கள் சேவைகள் பற்றி மேலும் அறிய, தொடர்பு கொள்ளுங்கள்.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="tamil-subheading">நேரடியாக தொடர்பு கொள்ள</CardTitle>
              <CardDescription className="tamil-text">படிவத்தை நிரப்பவும், எங்கள் குழு விரைவில் தொடர்பு கொள்வார்கள்.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="tamil-subheading">தொடர்பு தகவல்கள்</CardTitle>
              <CardDescription className="tamil-text">நேரடியாக இந்த வழிகளில் எங்களை அணுகலாம்.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="tamil-text font-medium">தொலைபேசி</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="tamil-text font-medium">முகவரி</h3>
                  <p className="text-muted-foreground">123 ஆன்மீக மையம், சென்னை, தமிழ்நாடு, இந்தியா</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="tamil-text font-medium">வேலை நேரம்</h3>
                  <p className="text-muted-foreground">திங்கள் - சனி: காலை 9:00 - மாலை 6:00</p>
                  <p className="text-muted-foreground">ஞாயிறு: காலை 10:00 - பிற்பகல் 2:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="tamil-text font-medium">முன்பதிவு</h3>
                  <p className="text-muted-foreground">தனிப்பட்ட ஆலோசனைக்கு முன்பதிவு செய்யவும்</p>
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
    id: "one-page-horoscope",
    title: "ஒரு பக்க ஜாதக பலன்",
    description: "உங்கள் பிறப்பு கிரக நிலைகள் மற்றும் முக்கிய பொதுப்பலன்கள் எழுத்துப்பூர்வமாக வழங்கப்படும். அதே பலன்கள் ஆடியோ வடிவிலும் கிடைக்க, எப்போது வேண்டுமானாலும் கேட்டு பயனடையலாம்! இது வாழ்க்கையின் முக்கிய கட்டங்களை விளக்க உதவும்.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "binded-horoscope",
    title: "பதிக்கப்பட்ட ஜாதக பலன்",
    description: "40 பக்கம் எழுதிய ஜாதக பலனில் உங்கள் கிரக நிலை, இராசி பலன், முக்கிய யோகங்கள் பற்றிய தகவல்கள் வழங்கப்படும். அதே ஜாதக பலன் ஆடியோ வடிவிலும் கிடைக்கும், மேலும் உங்கள் வீட்டிற்கு பைண்டிங் செய்யப்பட்ட நொட்டு அனுப்பப்படும்.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "palm-leaf-horoscope",
    title: "ஓலைச்சுவடி ஜாதக பலன்",
    description: "நீங்கள் விரும்பும் பாரம்பரிய ஓலைச்சுவடி வடிவில் உங்கள் ஜாதக பலன் எழுதி வழங்கப்படும். அதே ஜாதக பலன் ஆடியோ வடிவிலும் கிடைக்கும், மேலும் உங்கள் வீட்டிற்கு ஓலைச்சுவடி அனுப்பப்படும். இது பாரம்பரிய முறையில் உங்கள் பலனை வழங்கும்.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "full-life-horoscope",
    title: "முழு ஆயுள் ஜோதிட கணிப்பு",
    description: "90 பக்கம் முழு ஆயுள் ஜாதக பலன் எழுதப்பட்டு, உங்கள் வாழ்க்கையின் முக்கிய நிகழ்வுகளை விளக்கும் வகையில் வழங்கப்படும். மேலும், தெளிவான விளக்கத்துடன் ஆடியோ வடிவிலும் பெற்றுக்கொள்ளலாம், மற்றும் உங்கள் வீட்டிற்கு நொட்டு அனுப்பப்படும்.",
    image: "/placeholder.svg?height=200&width=400",
  },
];

const testimonials = [
  {
    name: "ராஜேஷ் குமார்",
    location: "சென்னை",
    rating: 5,
    comment:
      "ஜோதிட ஆலோசனை மிகத் துல்லியமாக இருந்தது, மேலும் ஒரு கடினமான நேரத்தில் எனக்கு மதிப்புமிக்க வழிகாட்டுதலை வழங்கியது.",
  },
  {
    name: "பிரியா ஷர்மா",
    location: "பெங்களூரு",
    rating: 5,
    comment:
      "வாஸ்து ஆலோசனை எங்கள் வீட்டில் உள்ள சக்திகளை மாற்றி அமைக்க உதவியது. பரிந்துரைகளை செயல்படுத்தியதிலிருந்து நேர்மறை மாற்றங்களை அனுபவித்துள்ளோம்.",
  },
  {
    name: "ஆனந்த் படேல்",
    location: "மும்பை",
    rating: 4,
    comment:
      "தியான வகுப்புகள் வாழ்க்கையை மாற்றும் வகையில் இருந்தன. என் அலைபாயும் தினசரி வாழ்க்கையில் மனஅமைதியாக இருக்க தேவையான உத்திகளை கற்றுக்கொண்டேன்.",
  },
  {
    name: "லதா கிருஷ்ணன்",
    location: "கோயம்புத்தூர்",
    rating: 5,
    comment:
      "ஜாதக கணிப்பு மூலம் என்னுடைய வாழ்க்கையின் முக்கிய முடிவுகளை எடுக்க வழிகாட்டுதல் கிடைத்தது. இது மிக பயனுள்ள அனுபவமாக இருந்தது.",
  },
  {
    name: "சந்தோஷ் நாயர்",
    location: "திருவனந்தபுரம்",
    rating: 4,
    comment:
      "குண்டலி பரிகாரங்கள் தொடர்பாக வழங்கப்பட்ட வழிகாட்டுதல் மிகவும் தெளிவாகவும் பயனுள்ளதாகவும் இருந்தது. என் வாழ்க்கையில் நல்ல மாற்றங்களை காண முடிந்தது.",
  },
];

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