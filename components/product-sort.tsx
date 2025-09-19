"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sortOptions } from "@/hooks/use-product-filters"

interface ProductSortProps {
  sortBy: string
  onSortChange: (value: string) => void
  totalCount: number
  filteredCount: number
}

export default function ProductSort({ sortBy, onSortChange, totalCount, filteredCount }: ProductSortProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} products
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
