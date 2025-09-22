import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredProducts = [
  {
    id: 1,
    name: "Classic Cotton Shirt",
    brand: "Aurea",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.2,
    reviews: 1250,
    image: "/classic-cotton-shirt-men-formal-casual-blue-white.jpg",
    category: "men",
  },
  {
    id: 2,
    name: "Floral Print Kurta",
    brand: "Ethnic Wear Co",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.5,
    reviews: 890,
    image: "/floral-print-kurta-women-ethnic-wear-colorful-trad.jpg",
    category: "women",
  },
  {
    id: 3,
    name: "Kids Cartoon T-Shirt",
    brand: "Little Stars",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.3,
    reviews: 567,
    image: "/kids-cartoon-t-shirt-colorful-fun-children-wear.jpg",
    category: "kids",
  },
  {
    id: 4,
    name: "Running Sneakers",
    brand: "SportMax",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.4,
    reviews: 2100,
    image: "/running-sneakers-sports-shoes-athletic-footwear.jpg",
    category: "footwear",
  },
  {
    id: 5,
    name: "Leather Handbag",
    brand: "LuxeBags",
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.1,
    reviews: 445,
    image: "/leather-handbag-women-accessories-brown-black-eleg.jpg",
    category: "accessories",
  },
  {
    id: 6,
    name: "Silk Bedsheet Set",
    brand: "HomeComfort",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    rating: 4.6,
    reviews: 789,
    image: "/silk-bedsheet-set-home-decor-luxury-comfortable.jpg",
    category: "home",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-balance">Featured Products</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                    {product.discount}% OFF
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <span>❤️</span>
                  </Button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 text-pretty">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <Button className="w-full" size="sm">
                      Add to Bag
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
