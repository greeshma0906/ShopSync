"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  selectedSize?: string
  selectedColor?: string
  className?: string
}

export default function AddToCartButton({
  product,
  selectedSize = "M",
  selectedColor = "Default",
  className,
}: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
      },
    })

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })

    setIsAdding(false)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className={className}>
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
