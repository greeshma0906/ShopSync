"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Festival Collection",
    subtitle: "Celebrate in Style",
    description: "Discover our exclusive festival wear collection",
    image: "/festival-fashion-collection-colorful-traditional-w.jpg",
    cta: "Shop Now",
    link: "/festival-collection",
  },
  {
    id: 2,
    title: "Business Essentials",
    subtitle: "Professional Wardrobe",
    description: "Elevate your work style with our business collection",
    image: "/business-professional-clothing-suits-formal-wear.jpg",
    cta: "Explore",
    link: "/business-wear",
  },
  {
    id: 3,
    title: "Weekend Vibes",
    subtitle: "Casual Comfort",
    description: "Relax in style with our weekend collection",
    image: "/casual-weekend-clothing-comfortable-stylish-wear.jpg",
    cta: "Shop Collection",
    link: "/casual-wear",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-2xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">{banner.title}</h2>
                <p className="text-xl md:text-2xl mb-2 text-accent">{banner.subtitle}</p>
                <p className="text-lg mb-8 text-pretty">{banner.description}</p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {banner.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <span>‹</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <span>›</span>
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
