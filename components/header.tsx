"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSidebar from "@/components/cart-sidebar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const renderAuthButton = () => {
    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <span className="mr-2">👤</span>
              {session.user?.name || "Profile"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <Button variant="ghost" size="sm" onClick={() => signIn("google")}>
          <span className="mr-2">👤</span>
          Sign In
        </Button>
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-2xl font-bold text-primary">
            StyleSync
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                🔍
              </span>
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex">{renderAuthButton()}</div>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <span className="mr-2">❤️</span>
              Wishlist
            </Button>
            <CartSidebar />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <span>✕</span> : <span>☰</span>}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-2 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/men">
                <Button variant="ghost" className="font-medium">
                  MEN
                </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/men/topwear">Topwear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/men/bottomwear">Bottomwear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/men/footwear">Footwear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/men/accessories">Accessories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/women">
                <Button variant="ghost" className="font-medium">
                  WOMEN
                </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/women/western-wear">Western Wear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/women/ethnic-wear">Ethnic Wear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/women/footwear">Footwear</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/women/accessories">Accessories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/kids">
                <Button variant="ghost" className="font-medium">
                  KIDS
                </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/kids/boys">Boys</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/kids/girls">Girls</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/kids/infants">Infants</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/calendar-recommendations">
            <Button variant="ghost" className="font-medium text-accent">
              Smart Recommendations
            </Button>
          </Link>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Input placeholder="Search for products..." />
              <Link href="/men" className="font-medium">
                MEN
              </Link>
              <Link href="/women" className="font-medium">
                WOMEN
              </Link>
              <Link href="/kids" className="font-medium">
                KIDS
              </Link>
              <Link
                href="/calendar-recommendations"
                className="font-medium text-accent"
              >
                Smart Recommendations
              </Link>
              <div className="flex space-x-4 pt-4">
                {session ? (
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signIn("google")}
                  >
                    Sign In
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Wishlist
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
