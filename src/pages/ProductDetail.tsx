import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Heart, Phone, MessageCircle, Package, Shield, Award, Video, Scissors, Clock, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAppointmentModal } from "@/stores/appointmentModalStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateWhatsAppUrl } from "@/config/constants";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const addItem = useCartStore(state => state.addItem);
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { open: openAppointmentModal } = useAppointmentModal();

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
      position: "top-center",
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

  const handleWhatsAppClick = () => {
    const sku = selectedVariant?.sku || handle?.toUpperCase() || 'PRODUCT';
    const url = generateWhatsAppUrl(product.title, sku);
    window.open(url, '_blank');
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
  const sku = selectedVariant?.sku || handle?.toUpperCase() || 'PRODUCT';

  // Calculate reward points (example: 1 point per $10)
  const rewardPoints = Math.floor(price / 10);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collections">Collections</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-[52%_48%] gap-8 lg:gap-12">
          {/* Left: Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[hsl(var(--photo-stage))] border-2 transition-all hover:border-accent",
                      selectedImage === idx ? "border-accent ring-2 ring-accent/20" : "border-border"
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

            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-elegant)]">
              <div className="absolute inset-0 rounded-2xl border-4 border-[hsl(var(--gold-start))]/20 pointer-events-none" />
              {mainImage && (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Title & SKU */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-2 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                SKU: {sku}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold text-accent">
                {selectedVariant?.price.currencyCode} {price.toLocaleString()}
              </p>
            </div>

            {/* Reward Points */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">
                Earn {rewardPoints} Reward Points
              </span>
            </div>

            {/* Options (Color, Size, etc.) */}
            {product.options.map((option: any) => (
              <div key={option.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold uppercase tracking-wider">
                    {option.name}
                  </label>
                  {option.name.toLowerCase() === 'size' && (
                    <button className="text-sm text-accent hover:underline">
                      Size Chart
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value: string) => {
                    const isSelected = selectedOptions[option.name] === value;
                    return (
                      <Button
                        key={value}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleOptionChange(option.name, value)}
                        className={cn(
                          "min-w-[60px] transition-all",
                          isSelected
                            ? "bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background border-transparent"
                            : "border-accent/30 text-foreground hover:border-accent hover:bg-accent/5"
                        )}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="flex-1 h-12 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background hover:opacity-90 text-base font-semibold"
                size="lg"
              >
                {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={toggleWishlist}
                className={cn(
                  "h-12 w-12 border-accent/30 hover:border-accent hover:bg-accent/5",
                  isInWishlist(product.id) && "text-red-500 border-red-500"
                )}
              >
                <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-accent/30 text-foreground hover:border-accent hover:bg-accent/5"
                onClick={openAppointmentModal}
              >
                <Phone className="w-4 h-4 mr-2" />
                Speak to our Stylist
              </Button>
              <Button 
                variant="outline" 
                className="border-accent/30 text-foreground hover:border-accent hover:bg-accent/5"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>

            {/* Gift Box Banner */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Luxury Gift Packaging Available</p>
                  <p className="text-sm text-muted-foreground">Make it extra special with our premium gift box</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Shipping Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">COD Available</span>
              </div>
            </div>

            {/* Product Info Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="customization">Customization</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="care">Care</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4 pt-4">
                <div 
                  className="prose prose-invert prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.description || product.descriptionHtml || 'No description available.' }}
                />
              </TabsContent>
              <TabsContent value="customization" className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  We offer full customization services. Contact our stylists to discuss your requirements for tailored measurements, fabric choices, and design modifications.
                </p>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Free shipping on orders above ₹10,000. Standard delivery takes 7-10 business days. Express shipping available at checkout.
                </p>
              </TabsContent>
              <TabsContent value="care" className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Dry clean only. Store in a cool, dry place away from direct sunlight. Handle embellishments with care.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Video Call Card */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl mb-2 text-foreground">Video Call</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a virtual consultation with our styling experts to see the product in detail
              </p>
              <Button 
                variant="outline" 
                className="w-full border-accent/30 hover:border-accent hover:bg-accent/5"
                onClick={openAppointmentModal}
              >
                Book Video Call
              </Button>
            </div>
          </div>

          {/* Customise Card */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl mb-2 text-foreground">Customise</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Personalize this piece with custom measurements, colors, or design modifications
              </p>
              <Button 
                variant="outline" 
                className="w-full border-accent/30 hover:border-accent hover:bg-accent/5"
                onClick={openAppointmentModal}
              >
                Request Customization
              </Button>
            </div>
          </div>

          {/* Need it Sooner Card */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl mb-2 text-foreground">Need it Sooner?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Express delivery available for urgent orders. Get in touch for expedited processing
              </p>
              <Button 
                variant="outline" 
                className="w-full border-accent/30 hover:border-accent hover:bg-accent/5"
                onClick={handleWhatsAppClick}
              >
                Contact for Rush Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
