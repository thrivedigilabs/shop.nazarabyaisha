import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Heart, Phone, MessageCircle, Package, Shield, Award } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const addItem = useCartStore(state => state.addItem);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await getProduct(handle);
        setProduct(data);
        
        if (data.variants.edges.length > 0) {
          setSelectedVariant(data.variants.edges[0].node);
          const initialOptions: Record<string, string> = {};
          data.variants.edges[0].node.selectedOptions.forEach((opt: any) => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    
    const variant = product.variants.edges.find((v: any) => {
      return v.node.selectedOptions.every((opt: any) => newOptions[opt.name] === opt.value);
    });
    
    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: `${product.title} has been added to your cart.`,
    });
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const images = product.images.edges;
  const mainImage = images[selectedImage]?.node;
  const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]">
              {mainImage && (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden bg-[hsl(var(--photo-stage))] border-2 transition-colors",
                      selectedImage === idx ? "border-accent" : "border-transparent"
                    )}
                  >
                    <img
                      src={img.node.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-2 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-accent">
                {selectedVariant?.price.currencyCode} {price.toLocaleString()}
              </p>
            </div>

            {/* Options */}
            {product.options.map((option: any) => (
              <div key={option.name} className="space-y-3">
                <label className="text-sm font-medium uppercase tracking-wider">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value: string) => (
                    <Button
                      key={value}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={
                        selectedOptions[option.name] === value
                          ? "bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background"
                          : "border-accent text-accent hover:bg-accent/10"
                      }
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="flex-1 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background hover:opacity-90"
                size="lg"
              >
                {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={toggleWishlist}
                className={cn(
                  "border-accent",
                  isInWishlist(product.id) && "text-red-500 border-red-500"
                )}
              >
                <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 border-accent text-accent">
                <Phone className="w-4 h-4 mr-2" />
                Speak to our Stylist
              </Button>
              <Button variant="outline" className="flex-1 border-accent text-accent">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center space-y-2">
                <Package className="w-6 h-6 mx-auto text-accent" />
                <p className="text-xs text-muted-foreground">Shipping worldwide</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="w-6 h-6 mx-auto text-accent" />
                <p className="text-xs text-muted-foreground">COD available</p>
              </div>
              <div className="text-center space-y-2">
                <Award className="w-6 h-6 mx-auto text-accent" />
                <p className="text-xs text-muted-foreground">Premium gift box</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="pt-6">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="customization" className="flex-1">Customization</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div 
                  className="prose prose-invert max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </TabsContent>
              <TabsContent value="customization" className="pt-4 text-muted-foreground">
                <p>Every Nazara creation can be customized to your measurements and preferences. Contact our styling team to discuss your requirements.</p>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4 text-muted-foreground">
                <p>We offer worldwide shipping with complimentary domestic delivery. Express delivery options are available.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
