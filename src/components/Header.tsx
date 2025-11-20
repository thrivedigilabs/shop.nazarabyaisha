import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useWishlistStore } from "@/stores/wishlistStore";

export const Header = () => {
  const wishlistItems = useWishlistStore(state => state.items);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-display text-2xl tracking-wide">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              NAZARA BY AISHA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/collections" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Collections
            </Link>
            <Link to="/bridal" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Bridal
            </Link>
            <Link to="/lookbook" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Lookbook
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative hover:text-accent transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-background text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};
