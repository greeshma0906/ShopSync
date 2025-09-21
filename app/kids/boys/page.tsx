"use client";

import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/product-card";

export default function KidsBoysPage() {
  const products = getProductsByCategory("kids", "boys");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Boys Fashion</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
