"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Shirt, Camera, Sparkles, ShoppingBag, TrendingUp, ArrowLeft, Check, Plus } from "lucide-react"
import Link from "next/link"

interface WardrobeItem {
  id: string
  name: string
  category: "tops" | "bottoms" | "shoes" | "accessories"
  color: string
  brand?: string
  owned: boolean
  price?: number
  image?: string
}

interface OutfitCombination {
  id: string
  items: WardrobeItem[]
  occasions: string[]
  completeness: number
}

export default function CapsuleWardrobePage() {
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([])
  const [budget, setBudget] = useState<number[]>([500])
  const [activeTab, setActiveTab] = useState("build")

  // Sample base items for demonstration
  const baseItems: WardrobeItem[] = [
    { id: "1", name: "White Button Shirt", category: "tops", color: "white", owned: true },
    { id: "2", name: "Black Jeans", category: "bottoms", color: "black", owned: true },
    { id: "3", name: "Navy Blazer", category: "tops", color: "navy", owned: false, price: 120 },
    { id: "4", name: "Brown Leather Shoes", category: "shoes", color: "brown", owned: false, price: 85 },
    { id: "5", name: "Gray Sweater", category: "tops", color: "gray", owned: true },
    { id: "6", name: "Dark Wash Jeans", category: "bottoms", color: "blue", owned: false, price: 75 },
    { id: "7", name: "White Sneakers", category: "shoes", color: "white", owned: true },
    { id: "8", name: "Black Belt", category: "accessories", color: "black", owned: false, price: 35 },
  ]

  // Sample outfit combinations
  const outfitCombinations: OutfitCombination[] = [
    {
      id: "1",
      items: [
        { id: "1", name: "White Button Shirt", category: "tops", color: "white", owned: true },
        { id: "2", name: "Black Jeans", category: "bottoms", color: "black", owned: true },
        { id: "4", name: "Brown Leather Shoes", category: "shoes", color: "brown", owned: false, price: 85 },
      ],
      occasions: ["Work", "Casual"],
      completeness: 67,
    },
    {
      id: "2",
      items: [
        { id: "3", name: "Navy Blazer", category: "tops", color: "navy", owned: false, price: 120 },
        { id: "6", name: "Dark Wash Jeans", category: "bottoms", color: "blue", owned: false, price: 75 },
        { id: "4", name: "Brown Leather Shoes", category: "shoes", color: "brown", owned: false, price: 85 },
      ],
      occasions: ["Business Casual", "Date Night"],
      completeness: 0,
    },
    {
      id: "3",
      items: [
        { id: "5", name: "Gray Sweater", category: "tops", color: "gray", owned: true },
        { id: "2", name: "Black Jeans", category: "bottoms", color: "black", owned: true },
        { id: "7", name: "White Sneakers", category: "shoes", color: "white", owned: true },
      ],
      occasions: ["Weekend", "Casual"],
      completeness: 100,
    },
  ]

  const toggleItemSelection = (item: WardrobeItem) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item],
    )
  }

  const ownedItems = selectedItems.filter((item) => item.owned).length
  const totalCost = selectedItems.filter((item) => !item.owned).reduce((sum, item) => sum + (item.price || 0), 0)
  const budgetValue = budget[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Shirt className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Capsule Wardrobe Builder</span>
              </div>
            </div>
            <Link href="/upload">
              <Button>
                <Camera className="mr-2 h-4 w-4" />
                Upload Items
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground text-balance">Build Your Capsule Wardrobe</h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Select base items and discover combinations that maximize your style potential
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="build">Build Capsule</TabsTrigger>
              <TabsTrigger value="combinations">View Combinations</TabsTrigger>
              <TabsTrigger value="recommendations">AI Suggestions</TabsTrigger>
            </TabsList>

            {/* Build Capsule Tab */}
            <TabsContent value="build" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Item Selection */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Select Base Items
                      </CardTitle>
                      <CardDescription>Choose items you own or want to add to your wardrobe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {baseItems.map((item) => (
                          <div
                            key={item.id}
                            className={`relative cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                              selectedItems.find((i) => i.id === item.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => toggleItemSelection(item)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium text-foreground">{item.name}</h3>
                                <div className="mt-1 flex items-center space-x-2">
                                  <Badge variant="secondary" className="text-xs capitalize">
                                    {item.category}
                                  </Badge>
                                  <div
                                    className="h-3 w-3 rounded-full border border-border"
                                    style={{ backgroundColor: item.color === "white" ? "#f8f9fa" : item.color }}
                                  />
                                </div>
                                <div className="mt-2 flex items-center space-x-2">
                                  {item.owned ? (
                                    <Badge variant="default" className="text-xs">
                                      <Check className="mr-1 h-3 w-3" />
                                      Owned
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">
                                      ${item.price}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {selectedItems.find((i) => i.id === item.id) && (
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Add Custom Item Card */}
                        <Link href="/upload">
                          <div className="flex h-full min-h-[120px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-border/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                            <div className="text-center">
                              <Plus className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                              <p className="text-sm font-medium text-muted-foreground">Add Your Own Item</p>
                              <p className="text-xs text-muted-foreground">Upload photo or add manually</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Capsule Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Items Selected</span>
                        <span className="font-medium">{selectedItems.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Already Owned</span>
                        <span className="font-medium text-chart-4">{ownedItems}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Cost</span>
                        <span className="font-medium">${totalCost}</span>
                      </div>
                      <Separator />
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="budget" className="text-sm">
                            Budget
                          </Label>
                          <span className="text-sm text-muted-foreground">${budgetValue}</span>
                        </div>
                        <Slider
                          value={budget}
                          onValueChange={setBudget}
                          max={1000}
                          min={100}
                          step={50}
                          className="w-full"
                        />
                        <Progress value={Math.min((totalCost / budgetValue) * 100, 100)} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {totalCost > budgetValue ? "Over budget" : `${budgetValue - totalCost} remaining`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full" disabled={selectedItems.length === 0}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Combinations
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Combinations Tab */}
            <TabsContent value="combinations" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {outfitCombinations.map((combination) => (
                  <Card key={combination.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Outfit #{combination.id}</CardTitle>
                        <Badge variant={combination.completeness === 100 ? "default" : "secondary"}>
                          {combination.completeness}% Complete
                        </Badge>
                      </div>
                      <CardDescription>Perfect for: {combination.occasions.join(", ")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {combination.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className="h-4 w-4 rounded-full border border-border"
                                style={{ backgroundColor: item.color === "white" ? "#f8f9fa" : item.color }}
                              />
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {item.owned ? (
                                <Check className="h-4 w-4 text-chart-4" />
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  ${item.price}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Progress value={combination.completeness} className="mb-2" />
                        <p className="text-xs text-muted-foreground">
                          {combination.completeness === 100
                            ? "You have everything for this outfit!"
                            : `Add ${combination.items.filter((i) => !i.owned).length} more items to complete`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    AI-Powered Recommendations
                  </CardTitle>
                  <CardDescription>Based on your selected items and style preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedItems.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                              <Shirt className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-medium mb-2">Versatile Cardigan</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              A neutral cardigan would create 8 new outfit combinations with your selected items
                            </p>
                            <Badge variant="outline">$65 - $120</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="mx-auto h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-4">
                              <ShoppingBag className="h-6 w-6 text-chart-1" />
                            </div>
                            <h3 className="font-medium mb-2">Statement Accessories</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              Add a watch and scarf to elevate your existing combinations
                            </p>
                            <Badge variant="outline">$40 - $80</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border/50 p-8 text-center">
                      <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Select items in the Build tab to see personalized recommendations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
