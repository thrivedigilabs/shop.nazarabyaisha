import { Link } from "react-router-dom";
import bridalImg from "@/assets/collection-bridal.jpg";
import lehengasImg from "@/assets/collection-lehengas.jpg";
import sareesImg from "@/assets/collection-sarees.jpg";
import gownsImg from "@/assets/collection-gowns.jpg";

const collections = [
  {
    title: "Bridal Couture",
    pieces: 28,
    image: bridalImg,
    category: "Bridal",
  },
  {
    title: "Lehengas",
    pieces: 45,
    image: lehengasImg,
    category: "Lehengas",
  },
  {
    title: "Sarees",
    pieces: 36,
    image: sareesImg,
    category: "Sarees",
  },
  {
    title: "Gowns",
    pieces: 22,
    image: gownsImg,
    category: "Gowns",
  },
];

export const CollectionCards = () => {
  return (
    <section className="py-20 bg-[hsl(var(--lux-black))]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Premium Collections
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of luxury couture, each piece a masterpiece
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.category}
              to={`/collections?category=${collection.category}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="font-display text-3xl mb-2 bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
                  {collection.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {collection.pieces} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
