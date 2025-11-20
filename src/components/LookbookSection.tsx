import useEmblaCarousel from "embla-carousel-react";
import gownBlack from "@/assets/lookbook-gown-black.jpg";
import gownYellow from "@/assets/lookbook-gown-yellow.jpg";
import lehengaDark from "@/assets/lookbook-lehenga-dark.jpg";
import lehengaGold1 from "@/assets/lookbook-lehenga-gold-1.jpg";
import lehengaGold2 from "@/assets/lookbook-lehenga-gold-2.jpg";
import lehengaOrange from "@/assets/lookbook-lehenga-orange.jpg";
import lehengaRedYellow from "@/assets/lookbook-lehenga-red-yellow.jpg";
import lehengaWhite from "@/assets/lookbook-lehenga-white.jpg";

const lookbookImages = {
  row1: [gownBlack, gownYellow, lehengaDark, lehengaGold1],
  row2: [lehengaGold2, lehengaOrange, lehengaRedYellow, lehengaWhite]
};

export const LookbookSection = () => {
  const [emblaRef1] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [emblaRef2] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
              Lookbook
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our latest collections
          </p>
        </div>

        <div className="space-y-6">
          {/* Row 1 */}
          <div className="overflow-hidden" ref={emblaRef1}>
            <div className="flex gap-4">
              {lookbookImages.row1.map((image, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-[0_0_280px] md:flex-[0_0_350px] aspect-[3/4] rounded-2xl overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]"
                >
                  <img
                    src={image}
                    alt={`Lookbook ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex gap-4">
              {lookbookImages.row2.map((image, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-[0_0_280px] md:flex-[0_0_350px] aspect-[3/4] rounded-2xl overflow-hidden bg-[hsl(var(--photo-stage))] shadow-[var(--shadow-gold)]"
                >
                  <img
                    src={image}
                    alt={`Lookbook ${index + 5}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
