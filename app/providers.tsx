// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </Suspense>
    </SessionProvider>
  );
}
