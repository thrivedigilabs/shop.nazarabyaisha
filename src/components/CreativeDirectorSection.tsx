export const CreativeDirectorSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Label */}
        <p className="text-center text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-6">
          Creative Director
        </p>

        {/* Main Heading */}
        <h2 className="text-center font-serif text-4xl md:text-5xl lg:text-6xl mb-12 bg-gradient-to-r from-[#D4AF37] to-[#F4E5C2] bg-clip-text text-transparent">
          By Aisha — The Vision
        </h2>

        {/* Quote Block */}
        <div className="mb-12">
          <blockquote className="relative border-l-4 border-gold pl-6 md:pl-8">
            <p className="text-text-secondary text-base md:text-lg lg:text-xl italic leading-relaxed">
              "Each Nazara creation is more than just a garment—it's a celebration of the woman who wears it. My vision is to craft pieces that honor our rich heritage while empowering the modern bride to write her own story. Every stitch, every embellishment is a testament to the artisans whose hands bring these dreams to life."
            </p>
          </blockquote>
        </div>

        {/* Attribution */}
        <div className="text-right">
          <p className="font-serif text-2xl md:text-3xl text-text-primary mb-2">
            — Aisha
          </p>
          <p className="text-text-secondary text-sm tracking-wide">
            Founder & Creative Director
          </p>
        </div>
      </div>
    </section>
  );
};
