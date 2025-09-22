"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import ProductSort from "@/components/product-sort";
import { getProductsByCategory } from "@/lib/products";
import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessoriesPage() {
  // Fetch all accessories from men, women, and kids
  const menAccessories = getProductsByCategory("men", "accessories");
  const womenAccessories = getProductsByCategory("women", "accessories");
  const kidsAccessories = getProductsByCategory("kids", "accessories");
  const allAccessories = [
    ...menAccessories,
    ...womenAccessories,
    ...kidsAccessories,
  ];

  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
    filterOptions,
    totalProducts,
    filteredCount,
  } = useProductFilters(allAccessories);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-balance">
            All Accessories
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/men/accessories">
              <Button variant="outline">Men</Button>
            </Link>
            <Link href="/women/accessories">
              <Button variant="outline">Women</Button>
            </Link>
            <Link href="/kids/accessories">
              <Button variant="outline">Kids</Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={filterOptions.brands}
              availableSizes={filterOptions.sizes}
              availableColors={filterOptions.colors}
            />
          </aside>

          <div className="flex-1">
            <ProductSort
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={totalProducts}
              filteredCount={filteredCount}
            />

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 5000],
                      brands: [],
                      sizes: [],
                      colors: [],
                      ratings: [],
                      discount: 0,
                      inStock: false,
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
