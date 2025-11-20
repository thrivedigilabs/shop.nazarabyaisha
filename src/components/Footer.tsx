import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--lux-black))] border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl mb-4 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Nazara by Aisha
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted luxury couture. Every piece tells a story of artisan dedication and 24k gold craftsmanship.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-[hsl(var(--text-cream))]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/collections" className="text-muted-foreground hover:text-accent transition-colors">Collections</Link></li>
              <li><Link to="/bridal" className="text-muted-foreground hover:text-accent transition-colors">Bridal</Link></li>
              <li><Link to="/lookbook" className="text-muted-foreground hover:text-accent transition-colors">Lookbook</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-[hsl(var(--text-cream))]">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-accent transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-accent transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-[hsl(var(--text-cream))]">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@nazarabyaisha.com" className="hover:text-accent transition-colors">
                  hello@nazarabyaisha.com
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="hover:text-accent transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Nazara by Aisha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
