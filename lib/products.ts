export interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  subcategory: string
  sizes: string[]
  colors: string[]
  description: string
  features: string[]
  inStock: boolean
}

export const products: Product[] = [
  // Men's Products
  {
    id: 1,
    name: "Classic Cotton Shirt",
    brand: "StyleSync",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.2,
    reviews: 1250,
    image: "/classic-cotton-shirt-men-formal-casual-blue-white.jpg",
    images: [
      "/classic-cotton-shirt-men-formal-casual-blue-white.jpg",
      "/men-formal-shirt-blue-cotton-office-wear.jpg",
      "/men-casual-shirt-white-cotton-weekend-wear.jpg",
    ],
    category: "men",
    subcategory: "topwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "White", "Light Blue"],
    description:
      "Premium cotton shirt perfect for both formal and casual occasions. Made with 100% cotton fabric for maximum comfort.",
    features: ["100% Cotton", "Machine Washable", "Wrinkle Resistant", "Comfortable Fit"],
    inStock: true,
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    brand: "DenimCo",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    rating: 4.4,
    reviews: 890,
    image: "/men-slim-fit-jeans-dark-blue-denim-casual.jpg",
    images: ["/men-slim-fit-jeans-dark-blue-denim-casual.jpg", "/men-jeans-light-blue-casual-weekend-wear.jpg"],
    category: "men",
    subcategory: "bottomwear",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    description: "Comfortable slim fit jeans made from premium denim. Perfect for casual outings and everyday wear.",
    features: ["Stretch Denim", "Fade Resistant", "5 Pocket Design", "Slim Fit"],
    inStock: true,
  },
  // Women's Products
  {
    id: 3,
    name: "Floral Print Kurta",
    brand: "Ethnic Wear Co",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.5,
    reviews: 890,
    image: "/floral-print-kurta-women-ethnic-wear-colorful-trad.jpg",
    images: [
      "/floral-print-kurta-women-ethnic-wear-colorful-trad.jpg",
      "/women-ethnic-kurta-pink-floral-traditional.jpg",
      "/women-kurta-blue-ethnic-wear-festival.jpg",
    ],
    category: "women",
    subcategory: "ethnic-wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "Blue", "Green"],
    description:
      "Beautiful floral print kurta perfect for festivals and traditional occasions. Made with soft cotton fabric.",
    features: ["Cotton Fabric", "Floral Print", "3/4 Sleeves", "Comfortable Fit"],
    inStock: true,
  },
  {
    id: 4,
    name: "Casual Top",
    brand: "TrendyWear",
    price: 699,
    originalPrice: 1199,
    discount: 42,
    rating: 4.1,
    reviews: 567,
    image: "/women-casual-top-white-cotton-summer-wear.jpg",
    images: ["/women-casual-top-white-cotton-summer-wear.jpg", "/women-top-pink-casual-summer-comfortable.jpg"],
    category: "women",
    subcategory: "western-wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Pink", "Black"],
    description: "Comfortable casual top perfect for summer days. Made with breathable cotton fabric.",
    features: ["Cotton Blend", "Breathable", "Short Sleeves", "Regular Fit"],
    inStock: true,
  },
  // Kids Products
  {
    id: 5,
    name: "Kids Cartoon T-Shirt",
    brand: "Little Stars",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.3,
    reviews: 567,
    image: "/kids-cartoon-t-shirt-colorful-fun-children-wear.jpg",
    images: ["/kids-cartoon-t-shirt-colorful-fun-children-wear.jpg", "/kids-t-shirt-blue-cartoon-character-fun.jpg"],
    category: "kids",
    subcategory: "boys",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Red", "Blue", "Yellow"],
    description: "Fun cartoon printed t-shirt for kids. Made with soft cotton fabric that's gentle on skin.",
    features: ["100% Cotton", "Cartoon Print", "Soft Fabric", "Machine Washable"],
    inStock: true,
  },
  // Footwear
  {
    id: 6,
    name: "Running Sneakers",
    brand: "SportMax",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.4,
    reviews: 2100,
    image: "/running-sneakers-sports-shoes-athletic-footwear.jpg",
    images: [
      "/running-sneakers-sports-shoes-athletic-footwear.jpg",
      "/sports-shoes-white-running-athletic-comfortable.jpg",
    ],
    category: "footwear",
    subcategory: "sports",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Grey"],
    description:
      "High-performance running sneakers with excellent cushioning and support. Perfect for workouts and running.",
    features: ["Cushioned Sole", "Breathable Mesh", "Lightweight", "Anti-Slip"],
    inStock: true,
  },
  // Accessories
  {
    id: 7,
    name: "Leather Handbag",
    brand: "LuxeBags",
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.1,
    reviews: 445,
    image: "/leather-handbag-women-accessories-brown-black-eleg.jpg",
    images: [
      "/leather-handbag-women-accessories-brown-black-eleg.jpg",
      "/women-handbag-black-leather-elegant-office.jpg",
    ],
    category: "accessories",
    subcategory: "bags",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    description:
      "Elegant leather handbag perfect for office and formal occasions. Spacious interior with multiple compartments.",
    features: ["Genuine Leather", "Multiple Compartments", "Adjustable Strap", "Elegant Design"],
    inStock: true,
  },
]

export function getProductsByCategory(category: string, subcategory?: string): Product[] {
  return products.filter((product) => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory
    }
    return product.category === category
  })
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
