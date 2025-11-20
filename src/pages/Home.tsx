import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { CollectionCards } from "@/components/CollectionCards";
import { CreativeDirectorSection } from "@/components/CreativeDirectorSection";
import { LookbookSection } from "@/components/LookbookSection";
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
  return <div className="min-h-screen">
      <Hero />
      
      <CollectionCards />
      
      <CreativeDirectorSection />
      
      <LookbookSection />
      
      

      
    </div>;
};
export default Home;