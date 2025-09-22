"use client"

import { useState } from "react"
import { PhotoUpload } from "@/components/photo-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Gift, Heart, Star, ShoppingBag, Sparkles, User } from "lucide-react"
import Link from "next/link"

interface FriendProfile {
  name: string
  age?: number
  budget: number
  occasion: string
  relationship: string
}

interface GiftRecommendation {
  id: string
  name: string
  brand: string
  price: number
  category: string
  matchScore: number
  reasons: string[]
  image: string
  inStock: boolean
}

export default function FriendGiftingPage() {
  const [friendProfile, setFriendProfile] = useState<FriendProfile>({
    name: "",
    budget: 100,
    occasion: "",
    relationship: "",
  })
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  // Mock gift recommendations
  const giftRecommendations: GiftRecommendation[] = [
    {
      id: "1",
      name: "Silk Scarf with Floral Print",
      brand: "Hermès",
      price: 85,
      category: "Accessories",
      matchScore: 95,
      reasons: [
        "Matches their love for floral patterns",
        "Complements their warm color palette",
        "Perfect for their elegant style",
      ],
      image: "/silk-scarf-floral.jpg",
      inStock: true,
    },
    {
      id: "2",
      name: "Minimalist Gold Necklace",
      brand: "Mejuri",
      price: 120,
      category: "Jewelry",
      matchScore: 88,
      reasons: ["Suits their minimalist aesthetic", "Gold complements their skin tone", "Versatile for daily wear"],
      image: "/gold-necklace-minimalist.jpg",
      inStock: true,
    },
    {
      id: "3",
      name: "Cashmere Cardigan",
      brand: "Everlane",
      price: 95,
      category: "Clothing",
      matchScore: 82,
      reasons: [
        "Matches their cozy style preference",
        "Neutral color fits their wardrobe",
        "High-quality material they'd appreciate",
      ],
      image: "/cashmere-cardigan-beige.jpg",
      inStock: false,
    },
  ]

  const handleAnalysisComplete = () => {
    setAnalysisComplete(true)
    setActiveTab("profile")
  }

  const handleProfileComplete = () => {
    setActiveTab("recommendations")
  }

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
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Friend Gifting Mode</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Find the Perfect Gift</h1>
            <p className="mt-2 text-muted-foreground">
              Upload photos of your friend and let AI analyze their style to recommend personalized gifts
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Photos</TabsTrigger>
              <TabsTrigger value="profile" disabled={!analysisComplete}>
                Friend Profile
              </TabsTrigger>
              <TabsTrigger value="recommendations" disabled={!friendProfile.name}>
                Gift Ideas
              </TabsTrigger>
            </TabsList>

            {/* Upload Photos Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <PhotoUpload mode="friend" onAnalysisComplete={handleAnalysisComplete} />
                </div>

                {/* Tips Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Photo Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">1</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Upload 3-5 photos showing different outfits</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">2</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Include full-body shots for better analysis</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">3</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Choose photos from different occasions</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What We Analyze</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-chart-1" />
                        <span className="text-sm text-muted-foreground">Color preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-chart-2" />
                        <span className="text-sm text-muted-foreground">Style patterns</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-chart-3" />
                        <span className="text-sm text-muted-foreground">Body type & fit</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-chart-4" />
                        <span className="text-sm text-muted-foreground">Accessory choices</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Friend Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Friend Profile
                  </CardTitle>
                  <CardDescription>Tell us more about your friend to personalize gift recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Friend's Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter their name"
                        value={friendProfile.name}
                        onChange={(e) => setFriendProfile((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age (Optional)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={friendProfile.age || ""}
                        onChange={(e) => setFriendProfile((prev) => ({ ...prev, age: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input
                        id="relationship"
                        placeholder="Best friend, colleague, sister..."
                        value={friendProfile.relationship}
                        onChange={(e) => setFriendProfile((prev) => ({ ...prev, relationship: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="occasion">Occasion</Label>
                      <Input
                        id="occasion"
                        placeholder="Birthday, holiday, graduation..."
                        value={friendProfile.occasion}
                        onChange={(e) => setFriendProfile((prev) => ({ ...prev, occasion: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="budget">Budget</Label>
                      <span className="text-sm text-muted-foreground">${friendProfile.budget}</span>
                    </div>
                    <Input
                      id="budget"
                      type="range"
                      min="25"
                      max="500"
                      step="25"
                      value={friendProfile.budget}
                      onChange={(e) => setFriendProfile((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>$25</span>
                      <span>$500</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleProfileComplete} disabled={!friendProfile.name}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Gift Ideas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Perfect Gifts for {friendProfile.name}</h2>
                  <p className="text-muted-foreground">
                    Based on AI analysis • Budget: ${friendProfile.budget} • {friendProfile.occasion}
                  </p>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {giftRecommendations.length} recommendations
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {giftRecommendations
                  .filter((gift) => gift.price <= friendProfile.budget)
                  .map((gift) => (
                    <Card key={gift.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={gift.image || "/placeholder.svg"}
                          alt={gift.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{gift.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{gift.brand}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{gift.matchScore}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{gift.category}</Badge>
                          <span className="text-lg font-bold text-foreground">${gift.price}</span>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Why it's perfect:</p>
                          <ul className="space-y-1">
                            {gift.reasons.slice(0, 2).map((reason, index) => (
                              <li key={index} className="flex items-start text-xs text-muted-foreground">
                                <Heart className="mr-2 mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1" disabled={!gift.inStock}>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            {gift.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {giftRecommendations.filter((gift) => gift.price <= friendProfile.budget).length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No gifts found within budget</h3>
                    <p className="text-muted-foreground mb-4">Try increasing your budget to see more recommendations</p>
                    <Button variant="outline" onClick={() => setActiveTab("profile")}>
                      Adjust Budget
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
