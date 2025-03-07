"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")

  // Listen for hash changes and scroll events
  useEffect(() => {
    // Function to check which section is currently in view
    const checkActiveSection = () => {
      const sections = document.querySelectorAll("section[id]")
      let currentActiveHash = window.location.hash
      
      // Get the actual navbar height
      const navbarHeight = document.querySelector("header")?.offsetHeight || 64;

      // If no hash in URL, determine which section is in view
      if (!currentActiveHash) {
        let currentSection = ""
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top
          const sectionId = section.getAttribute("id")

          // Use navbar height instead of fixed 100px value
          if (sectionTop <= navbarHeight + 200 && sectionId) {
            currentSection = `#${sectionId}`
          }
        })
        currentActiveHash = currentSection
      }

      setActiveHash(currentActiveHash)
    }

    // Initial check
    checkActiveSection()

    // Check on scroll
    window.addEventListener("scroll", checkActiveSection)

    // Check on hash change
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("scroll", checkActiveSection)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])
  
  // ...rest of the code remains unchanged

  // Function to check if the current path/hash matches the nav item
  const isActive = (href: string) => {
    // For full page routes (like "/gigs")
    if (!href.startsWith("#")) {
      if (href === "/") {
        return pathname === href && !activeHash
      }
      return pathname.startsWith(href)
    }
    // For hash links (like "#contact")
    else {
      return activeHash === href
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
                  <span className="text-primary">அகத்தியர்</span> ஜெனா சித்தர் 
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`px-7 py-2 text-lg transition-colors relative ${
                      isActive(item.href) ? "text-primary font-medium" : "hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute left-0 top-0 h-full w-1 bg-primary" />}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">அகத்தியர்</span>
            <span className="hidden sm:inline">ஜெனா சித்தர்</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 relative">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-sm font-medium transition-colors relative py-1 ${
                isActive(item.href) ? "text-primary" : "hover:text-primary"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-[slideIn_0.2s_ease-in-out]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="hidden sm:flex"> */}
            {/* <Phone className="h-5 w-5" /> */}
            {/* <span className="sr-only">Contact</span> */}
          {/* </Button> */}
          <Button asChild>
            <Link href="#contact">தொடர்பு கொள்ள</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

const navItems = [
  {
    label: "முகப்பு",
    href: "/",
  },
  {
    label: "எங்களை பற்றி",
    href: "#about",
  },
  {
    label: "சேவைகள்",
    href: "#services",
  },
  {
    label: "விமர்சனம்",
    href: "#testimonials",
  },
  {
    label: "தொடர்பு கொள்ள",
    href: "#contact",
  },
];

