import Header from "@/components/header";
import HeroBanner from "@/components/hero-banner";
import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Camera, Shirt, Heart, Gift } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ✅ Reuse your Header */}
      <Header />

      <main>
        {/* ✅ Your existing hero banner */}
        <div className="container mx-auto px-4 py-6">
          <HeroBanner />
        </div>

        {/* ✅ Existing Myntra sections */}
        <CategoryGrid />
        <FeaturedProducts />

        {/* ============================= */}
        {/* ✨ New Features Section Start */}
        {/* ============================= */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need for smart fashion choices
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powered by AI to understand your style and maximize your
                wardrobe potential
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Capsule Wardrobe Feature */}
              <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shirt className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Capsule Wardrobe Builder</CardTitle>
                  <CardDescription>
                    Select base items and get AI suggestions for pieces that
                    maximize outfit combinations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      Upload existing items via photo
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      Smart combination suggestions
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      Budget-conscious recommendations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Friend Gifting Feature */}
              <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
                    <Gift className="h-6 w-6 text-chart-1" />
                  </div>
                  <CardTitle>Friend Gifting Mode</CardTitle>
                  <CardDescription>
                    Upload friend photos and get personalized gift
                    recommendations based on their style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-1" />
                      AI style analysis from photos
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-1" />
                      Color preference detection
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-1" />
                      Personalized gift matching
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* AI Analysis Feature */}
              <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                    <Sparkles className="h-6 w-6 text-chart-2" />
                  </div>
                  <CardTitle>AI Style Intelligence</CardTitle>
                  <CardDescription>
                    Advanced computer vision analyzes style, fit, and color
                    preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Body type analysis
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Style pattern recognition
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Color palette extraction
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to revolutionize your wardrobe?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of users who've discovered smarter shopping with
                Aurea
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Link href="/capsule">
                  <Button size="lg" className="px-8">
                    <Shirt className="mr-2 h-4 w-4" />
                    Build Capsule Wardrobe
                  </Button>
                </Link>
                <Link href="/gifting">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 bg-transparent"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Find Perfect Gifts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* ============================= */}
        {/* ✨ New Features Section End */}
        {/* ============================= */}
      </main>

      {/* ✅ Reuse your Footer */}
      <Footer />
    </div>
  );
}
