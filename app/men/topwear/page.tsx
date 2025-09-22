// app/men/topwear/page.tsx
"use client";

import { getProductsByCategory } from "@/lib/products";
// make sure this path is correct and ProductCard is default-exported
import ProductCard from "@/components/product-card";

export default function MenTopwearPage() {
  const products = getProductsByCategory("men", "topwear");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Men&apos;s Topwear</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
