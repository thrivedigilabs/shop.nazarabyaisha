import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(8);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20 bg-[hsl(var(--lux-black))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
                Premium Collections
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of exquisite handcrafted pieces that celebrate heritage and elegance
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
              <p className="text-sm text-muted-foreground">
                Create your first product by telling me what you'd like to add!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product.node} />
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  <Link to="/collections">View All Collections</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-display text-4xl md:text-5xl">
                By Aisha — <span className="text-accent">The Vision</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                "Every Nazara creation is more than just a garment—it's a celebration of the ancient craft 
                passed down through generations. I believe in preserving our rich heritage while creating 
                contemporary pieces that empower the modern woman. Each stitch carries the dedication of our 
                master artisans who pour their heart into every creation."
              </p>
              <p className="text-sm italic text-muted-foreground">
                — Aisha, Creative Director
              </p>
              <Button 
                asChild 
                className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background hover:opacity-90"
              >
                <Link to="/about">Read Our Story</Link>
              </Button>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="font-display text-xl text-muted-foreground">
                    Designer Portrait
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
