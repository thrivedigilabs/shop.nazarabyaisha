import { useWishlistStore } from "@/stores/wishlistStore";

const Wishlist = () => {
  const items = useWishlistStore(state => state.items);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl md:text-5xl mb-8 text-center">
          <span className="bg-gradient-to-r from-[hsl(var(--gold-start))] to-[hsl(var(--gold-end))] bg-clip-text text-transparent">
            Your Wishlist
          </span>
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your wishlist is empty</p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">{items.length} items saved</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
