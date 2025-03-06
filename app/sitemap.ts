import { MetadataRoute } from 'next'

// Sample gig IDs - in a real application, you would fetch these from your database
const gigIds = ['astrology', 'palmistry', 'vastu', 'numerology', 'meditation', 'rituals']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://agathiyarjanachithar.vercel.app'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/gigs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // Add individual gig pages
  const gigRoutes = gigIds.map(id => ({
    url: `${baseUrl}/gigs/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...gigRoutes]
} 