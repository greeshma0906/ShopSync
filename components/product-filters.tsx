"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  sizes: string[]
  colors: string[]
  ratings: number[]
  discount: number
  inStock: boolean
}

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  availableBrands: string[]
  availableSizes: string[]
  availableColors: string[]
  className?: string
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableBrands,
  availableSizes,
  availableColors,
  className,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 5000],
      brands: [],
      sizes: [],
      colors: [],
      ratings: [],
      discount: 0,
      inStock: false,
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.brands.length > 0) count++
    if (filters.sizes.length > 0) count++
    if (filters.colors.length > 0) count++
    if (filters.ratings.length > 0) count++
    if (filters.discount > 0) count++
    if (filters.inStock) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) count++
    return count
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={5000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("brands", [...filters.brands, brand])
                  } else {
                    updateFilter(
                      "brands",
                      filters.brands.filter((b) => b !== brand),
                    )
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (filters.sizes.includes(size)) {
                    updateFilter(
                      "sizes",
                      filters.sizes.filter((s) => s !== size),
                    )
                  } else {
                    updateFilter("sizes", [...filters.sizes, size])
                  }
                }}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <Button
                key={color}
                variant={filters.colors.includes(color) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (filters.colors.includes(color)) {
                    updateFilter(
                      "colors",
                      filters.colors.filter((c) => c !== color),
                    )
                  } else {
                    updateFilter("colors", [...filters.colors, color])
                  }
                }}
              >
                {color}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("ratings", [...filters.ratings, rating])
                  } else {
                    updateFilter(
                      "ratings",
                      filters.ratings.filter((r) => r !== rating),
                    )
                  }
                }}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}★ & above
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Discount */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Discount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[10, 20, 30, 40, 50].map((discount) => (
            <div key={discount} className="flex items-center space-x-2">
              <Checkbox
                id={`discount-${discount}`}
                checked={filters.discount >= discount}
                onCheckedChange={(checked) => {
                  updateFilter("discount", checked ? discount : 0)
                }}
              />
              <Label htmlFor={`discount-${discount}`} className="text-sm">
                {discount}% and above
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter("inStock", checked)}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      <Button onClick={clearAllFilters} variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className={`hidden lg:block ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filters</h3>
          {getActiveFilterCount() > 0 && <Badge variant="secondary">{getActiveFilterCount()}</Badge>}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
