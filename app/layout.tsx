import type React from "react";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./providers"; // ✅ we moved SessionProvider etc. here
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurea - Fashion with Calendar Integration",
  description:
    "Discover the latest fashion trends with personalized recommendations based on your calendar events",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} antialiased`}
    >
      <body>
        {/* ✅ All client providers (Session, Cart, Toaster) are inside Providers.tsx */}
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
