import gownBlack from "@/assets/lookbook-gown-black.jpg";
import gownYellow from "@/assets/lookbook-gown-yellow.jpg";
import lehengaDark from "@/assets/lookbook-lehenga-dark.jpg";
import lehengaGold1 from "@/assets/lookbook-lehenga-gold-1.jpg";
import lehengaGold2 from "@/assets/lookbook-lehenga-gold-2.jpg";
import lehengaOrange from "@/assets/lookbook-lehenga-orange.jpg";
import lehengaRedYellow from "@/assets/lookbook-lehenga-red-yellow.jpg";
import lehengaWhite from "@/assets/lookbook-lehenga-white.jpg";

const lookbookImages = [
  gownBlack,
  gownYellow,
  lehengaDark,
  lehengaGold1,
  lehengaGold2,
  lehengaOrange,
  lehengaRedYellow,
  lehengaWhite
];

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
          {lookbookImages.map((image, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]">
              <img
                src={image}
                alt={`Lookbook ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
