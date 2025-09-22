"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Search, TrendingUp, Sparkles, Filter, Star, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

interface TrendingItem {
  id: string
  name: string
  brand: string
  price: number
  category: string
  image: string
  trending: boolean
  aiScore: number
  tags: string[]
}

interface PersonalizedRecommendation {
  id: string
  name: string
  brand: string
  price: number
  category: string
  image: string
  matchReason: string
  confidence: number
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("trending")

  // Mock trending items
  const trendingItems: TrendingItem[] = [
    {
      id: "1",
      name: "Oversized Blazer",
      brand: "Zara",
      price: 89,
      category: "Outerwear",
      image: "/trending-blazer.jpg",
      trending: true,
      aiScore: 92,
      tags: ["versatile", "professional", "trending"],
    },
    {
      id: "2",
      name: "Wide-Leg Trousers",
      brand: "COS",
      price: 125,
      category: "Bottoms",
      image: "/wide-leg-trousers.jpg",
      trending: true,
      aiScore: 88,
      tags: ["comfortable", "elegant", "sustainable"],
    },
    {
      id: "3",
      name: "Chunky Gold Chain",
      brand: "Mejuri",
      price: 165,
      category: "Jewelry",
      image: "/gold-chain-chunky.jpg",
      trending: true,
      aiScore: 85,
      tags: ["statement", "luxury", "timeless"],
    },
  ]

  // Mock personalized recommendations
  const personalizedRecs: PersonalizedRecommendation[] = [
    {
      id: "1",
      name: "Silk Midi Dress",
      brand: "Reformation",
      price: 198,
      category: "Dresses",
      image: "/silk-midi-dress.jpg",
      matchReason: "Matches your preference for elegant, sustainable pieces",
      confidence: 94,
    },
    {
      id: "2",
      name: "Leather Ankle Boots",
      brand: "Everlane",
      price: 225,
      category: "Shoes",
      image: "/leather-ankle-boots.jpg",
      matchReason: "Perfect for your minimalist style and neutral color palette",
      confidence: 89,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Discover</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Discover Fashion</h1>
            <p className="mt-2 text-muted-foreground">
              Explore trending items and get personalized recommendations powered by AI
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trending">Trending Now</TabsTrigger>
              <TabsTrigger value="personalized">For You</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>

            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">What's Trending</h2>
                </div>
                <Badge variant="secondary">Updated hourly</Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trendingItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                          AI: {item.aiScore}%
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                        <span className="text-lg font-bold text-foreground">${item.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Personalized Tab */}
            <TabsContent value="personalized" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                </div>
                <Badge variant="secondary">Based on your style</Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {personalizedRecs.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-48 aspect-square overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-foreground">${item.price}</span>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{item.confidence}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Why we recommend this:</p>
                          <p className="text-sm text-foreground">{item.matchReason}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="py-12 text-center">
                  <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Want more personalized recommendations?</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload photos of your style or build a capsule wardrobe to get better suggestions
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link href="/upload">
                      <Button variant="outline">Upload Photos</Button>
                    </Link>
                    <Link href="/capsule">
                      <Button>Build Capsule</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections" className="space-y-6">
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-foreground mb-2">Curated Collections</h2>
                <p className="text-muted-foreground mb-8">Coming soon - expertly curated fashion collections</p>
                <Button variant="outline">Notify Me</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
