import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(var(--lux-black))]" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="font-display text-5xl md:text-7xl leading-tight">
              <span className="block text-foreground">Couture for the</span>
              <span className="block bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
                Modern Royal
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Where traditional Indian craftsmanship meets contemporary luxury. 
              Every piece is handcrafted over 300-650 hours using authentic 24k gold thread 
              and heritage embroidery techniques.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-background hover:opacity-90 px-8"
              >
                <Link to="/collections">Explore Collections</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-accent text-accent hover:bg-accent/10 px-8"
              >
                <Link to="/contact">Book Appointment</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-gold)]">
              <div className="aspect-[3/4] bg-gradient-to-br from-[hsl(var(--photo-stage))] to-[hsl(var(--gold-end))/20]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-2xl text-muted-foreground">
                  Hero Image Placeholder
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
