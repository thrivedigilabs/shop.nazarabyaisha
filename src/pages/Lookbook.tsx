const Lookbook = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-display text-4xl md:text-6xl">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Lookbook
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our exquisite collection of bridal wear through our editorial shoots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Lookbook Image {i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
