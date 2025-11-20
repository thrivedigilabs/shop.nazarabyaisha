const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-display text-4xl md:text-6xl">
            <span className="block text-foreground">About</span>
            <span className="block bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Nazara by Aisha
            </span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          <section className="space-y-4">
            <h2 className="font-display text-3xl text-accent">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nazara by Aisha was born from a deep passion for preserving traditional Indian craftsmanship while 
              creating contemporary couture for the modern woman. Founded by designer Aisha, our atelier has 
              become synonymous with luxury, heritage, and uncompromising quality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-3xl text-accent">The Designer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Aisha's journey began in the heritage workshops of traditional artisans, where she learned the ancient 
              techniques of zari work, meenakari, and hand embroidery. Today, she leads a team of master 
              craftspeople who share her vision of creating wearable art that tells a story.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-3xl text-accent">Our Craftsmanship</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every Nazara creation requires between 300-650 hours of meticulous handwork. We use only authentic 
              24k gold thread, the finest silks, and heritage embroidery techniques that have been passed down 
              through generations. Our artisans are the heart of our brand, and their dedication ensures that each 
              piece is truly one-of-a-kind.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-3xl text-accent">Our Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that luxury is in the details, the time invested, and the stories woven into every thread. 
              Sustainability and ethical practices are at our core - we work directly with artisan communities, ensuring 
              fair wages and preserving traditional crafts for future generations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
