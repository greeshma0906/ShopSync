"use client"

import { useState, useMemo } from "react"
import type { Product } from "@/lib/products"

export interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  sizes: string[]
  colors: string[]
  ratings: number[]
  discount: number
  inStock: boolean
}

export interface SortOption {
  value: string
  label: string
}

export const sortOptions: SortOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Discount" },
  { value: "newest", label: "Newest First" },
]

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    sizes: [],
    colors: [],
    ratings: [],
    discount: 0,
    inStock: false,
  })

  const [sortBy, setSortBy] = useState("relevance")

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const brands = [...new Set(products.map((p) => p.brand))].sort()
    const sizes = [...new Set(products.flatMap((p) => p.sizes))].sort()
    const colors = [...new Set(products.flatMap((p) => p.colors))].sort()

    return { brands, sizes, colors }
  }, [products])

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false
      }

      // Rating filter
      if (filters.ratings.length > 0 && !filters.ratings.some((rating) => product.rating >= rating)) {
        return false
      }

      // Discount filter
      if (filters.discount > 0 && product.discount < filters.discount) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id) // Assuming higher ID means newer
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [products, filters, sortBy])

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
    filterOptions,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
  }
}
