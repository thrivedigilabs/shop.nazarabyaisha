import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroDesktop from "@/assets/hero-bridal.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0">
        <img 
          src={heroDesktop} 
          alt="Nazara Bridal Couture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Mobile Background */}
      <div className="md:hidden absolute inset-0">
        <img 
          src={heroMobile} 
          alt="Nazara Bridal Couture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20 relative z-10">
        <div className="max-w-2xl md:max-w-xl space-y-6 animate-fade-in md:text-left text-center md:items-start items-center flex flex-col">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Couture for the Modern Royal
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground font-light">
            Where Heritage Meets Contemporary Luxury
          </p>
          
          <p className="text-base md:text-lg text-foreground/90 max-w-xl leading-relaxed">
            Exquisite handcrafted couture celebrating Indian artistry. Each piece tells a story 
            of timeless elegance and meticulous craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-[hsl(var(--lux-black))] hover:opacity-90 text-base font-medium px-8 py-6 rounded-full"
            >
              <Link to="/collections">Explore the Collection</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-[hsl(var(--gold-start))] text-foreground hover:bg-[hsl(var(--gold-start))]/10 text-base font-medium px-8 py-6 rounded-full bg-transparent"
            >
              <Link to="/contact">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
