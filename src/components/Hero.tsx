import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroDesktop from "@/assets/hero-bridal.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={heroDesktop}
          alt="Nazara Bridal Couture"
          className="w-full h-full object-cover"
        />
        {/* Horizontal gradient overlay for desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden absolute inset-0">
        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          src={heroMobile}
          alt="Nazara Bridal Couture"
          className="w-full h-full object-cover object-center"
        />
        {/* Darker bottom gradient on mobile so text sits over a dark area */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>

      {/* Content wrapper - ensure content sits above images */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 min-h-screen flex items-end md:items-center pb-12 md:pb-0">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="w-full md:max-w-2xl lg:max-w-xl text-center md:text-left"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Couture for the Modern Royal
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-4 font-light">
            Where Heritage Meets Contemporary Luxury
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl mx-auto md:mx-0">
            Exquisite handcrafted couture celebrating Indian artistry. Each piece tells a story of timeless elegance and meticulous craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] text-[hsl(var(--lux-black))] hover:opacity-95 text-base font-medium px-8 py-4 rounded-xl"
            >
              <Link to="/collections">Explore the Collection</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[hsl(var(--gold-start))] text-white hover:bg-[hsl(var(--gold-start))]/10 text-base font-medium px-8 py-4 rounded-xl bg-transparent"
            >
              <Link to="/contact">Book Appointment</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
