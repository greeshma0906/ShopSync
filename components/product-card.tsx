import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  compact?: boolean 
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-sm mb-2 line-clamp-2 text-pretty hover:text-primary">{product.name}</h3>
          </Link>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-lg">₹{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          </div>
          <Button className="w-full" size="sm">
            Add to Bag
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
