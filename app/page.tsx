import Header from "@/components/header"
import HeroBanner from "@/components/hero-banner"
import CategoryGrid from "@/components/category-grid"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6">
          <HeroBanner />
        </div>
        <CategoryGrid />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
