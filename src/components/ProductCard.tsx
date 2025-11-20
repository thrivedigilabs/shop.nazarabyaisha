import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, addItem, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const image = product.images.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <Link to={`/products/${product.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--photo-stage))] aspect-[3/4] mb-4">
        {image && (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background",
            inWishlist && "text-red-500"
          )}
          onClick={toggleWishlist}
        >
          <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
        </Button>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background hover:opacity-90">
            View Details
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-1 group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        <p className="text-accent font-semibold">
          {product.priceRange.minVariantPrice.currencyCode} {price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};
