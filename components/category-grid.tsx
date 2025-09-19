import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "men",
    title: "Men",
    subtitle: "Shirts, T-Shirts & More",
    image: "/men-fashion-clothing-shirts-casual-formal-wear.jpg",
    link: "/men",
  },
  {
    id: "women",
    title: "Women",
    subtitle: "Kurtas, Sarees & More",
    image: "/women-fashion-clothing-kurtas-sarees-ethnic-wester.jpg",
    link: "/women",
  },
  {
    id: "kids",
    title: "Kids",
    subtitle: "T-Shirts, Shirts & More",
    image: "/kids-children-fashion-clothing-colorful-playful-we.jpg",
    link: "/kids",
  },
  {
    id: "footwear",
    title: "Footwear",
    subtitle: "Casual & Formal Shoes",
    image: "/shoes-footwear-sneakers-formal-casual-boots-sandal.jpg",
    link: "/footwear",
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "Watches, Bags & More",
    image: "/fashion-accessories-watches-bags-jewelry-sunglasse.jpg",
    link: "/accessories",
  },
  {
    id: "home",
    title: "Home & Living",
    subtitle: "Bedsheets, Curtains & More",
    image: "/home-decor-bedsheets-curtains-cushions-living-room.jpg",
    link: "/home",
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-balance">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.link}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{category.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
