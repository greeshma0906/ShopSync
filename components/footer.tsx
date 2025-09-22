import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Aurea</h3>
            <p className="text-sm text-muted-foreground mb-4 text-pretty">
              Your smart fashion companion that syncs with your calendar to
              suggest perfect outfits for every occasion.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="text-xl">📘</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="text-xl">🐦</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="text-xl">📷</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="text-xl">📺</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/men"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/women"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/kids"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  href="/footwear"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/accessories"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/calendar-recommendations"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Smart Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/notifications"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Notifications
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Aurea. All rights reserved. | Privacy Policy | Terms of
            Service
          </p>
        </div>
      </div>
    </footer>
  );
}
